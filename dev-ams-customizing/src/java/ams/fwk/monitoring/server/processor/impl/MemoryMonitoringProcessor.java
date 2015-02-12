package ams.fwk.monitoring.server.processor.impl;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import nexcore.framework.core.parameter.WasInstance;
import nexcore.framework.core.util.DateUtils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import ams.fwk.constants.DBNamingConstants;
import ams.fwk.monitoring.server.ServerEnvMonitoringManager;
import ams.fwk.monitoring.server.dao.MonitoringDAO;
import ams.fwk.monitoring.server.processor.IMonitoringProcessor;
import ams.fwk.monitoring.server.processor.ServerInfo;
import ams.fwk.utils.BaseUtils;

public class MemoryMonitoringProcessor extends Thread implements IMonitoringProcessor{

	private ServerEnvMonitoringManager manager;
	private Log log;
	private MonitoringDAO dao;
	private MemInfoReadProcessor readProcessor;
	private Timestamp sendedMailTime;
	
	public MemoryMonitoringProcessor(ServerEnvMonitoringManager manager, String threadName) {
		this.manager = manager;
		this.log = LogFactory.getLog(ServerEnvMonitoringManager.MONITORING_LOG_NAME);
		this.dao = new MonitoringDAO();
		this.readProcessor = new MemInfoReadProcessor();
		setName(threadName);
		/**
		 * Read Processor는 실행status와 상관없이 실행되도록 하기 위해 생성사에 정의함.   
		 */
		readProcessor.start();
	}
	
	@Override
	public void run() {
		int sleepTime = manager.getCheckIntervalTime();
		if(log.isInfoEnabled())log.info(">>>>>>>>>>>>>Start Memory Monitoring Write Processor");
		try {
			Map memPerMap = null;
			BigDecimal totalMem = null;
			BigDecimal usedMem = null;
			while(true) {
				if(manager.isStartProcessor()) {
					if(log.isDebugEnabled())log.debug(">>>>>>>>>Memory Monitoring Write Processor now working! STATUS:["+manager.isStartProcessor()+"]");
					memPerMap = getServerInfoObj().getMemPerc();//메모리 상태 정보취득
					//향후 메모리체크하는 로직 입력해야함. 
					if(memPerMap != null) {
						totalMem = new BigDecimal((Long)memPerMap.get(DBNamingConstants.TOTAL_MEM));
						usedMem = new BigDecimal((Long)memPerMap.get(DBNamingConstants.USED_MEM));
						usedMem.divide(totalMem, 4, BigDecimal.ROUND_UP);
						memPerMap.put(DBNamingConstants.USED_PERC, usedMem.divide(totalMem, 4, BigDecimal.ROUND_UP).doubleValue());
					}
					dao.insertMemPerc(manager.getWriteSqlManager(), memPerMap);
					
				} else {
					if(log.isDebugEnabled())log.debug(">>>>>>>>>Memory Monitoring Write Processor now resting! STATUS:["+manager.isStartProcessor()+"]");
				}
				Thread.sleep(sleepTime);
			}
		} catch (Exception e) {
			if(log.isErrorEnabled()) {
				log.error("An error occurred during the Write processing of the Memory information.");
			}
			e.printStackTrace();
		}
		if(log.isInfoEnabled())log.info(">>>>>>>>>>>>>terminate Memory Monitoring Write Processor");
	}

	@Override
	public ServerInfo getServerInfoObj() {
		return manager.getServerInfo();
	}
	
	class MemInfoReadProcessor extends Thread{
		@Override
		public void run() {
			int sleepTime = manager.getCheckIntervalTime();
			List<WasInstance> wasList = null;
			ArrayList memPercList = null;
			WasInstance wasInstance = null;
			Map paramMap = null;
			Map selectMemMap = null;
			BigDecimal memPerc = null;
			try {
				/**
				 * FWK관련 Bean이 모두 올라 올때를 대기하기 위함. 
				 */
				Thread.sleep(20000);
				wasList = BaseUtils.getWasInstanceList();
				while(true) {
					if(manager.isStartProcessor()) {
						if(log.isDebugEnabled())log.debug(">>>>>>>>>Memory Monitoring Read Processor now working! STATUS:["+manager.isStartProcessor()+"]");
						if(wasList != null && wasList.size() > 0) {
							memPercList = new ArrayList(wasList.size());
							for(int i=0; i < wasList.size(); i++) {
								paramMap = new HashMap();
								wasInstance = wasList.get(i);
								paramMap.put(DBNamingConstants.WAS_INSTANCE_ID, wasInstance.getWasInstanceId());
								paramMap.put(DBNamingConstants.HISTORY_DT, DateUtils.getCurrentDate());
								selectMemMap = dao.selectMemPerc(manager.getWriteSqlManager(), paramMap);//오늘 일자로 등록된 MEM정보중 제일 늦게 등록된 1건만 취득
								if(selectMemMap == null) {
									selectMemMap = new HashMap();
								} else {
									memPerc = (BigDecimal)selectMemMap.get(DBNamingConstants.USED_PERC);//메모리 사용율 취득
									if((memPerc.doubleValue() *100) >= manager.getMemWarningPer()) {//MEM 경고 임계치를 초과하는 경우에는 메일송신
										try {
											sendMail(wasInstance.getWasInstanceId(), memPerc, "");
										}catch (Exception e) {
											if(log.isErrorEnabled()) {
												log.error("When Memory Warniing mail is sending, error was happened.");
												log.error(e.getMessage());
											}
										}
										
									}
								}
								memPercList.add(selectMemMap);
							}
							manager.setMemPercList((List)memPercList);
						}
					} else {
						if(log.isDebugEnabled())log.debug(">>>>>>>>>Memory Monitoring Read Processor now resting! STATUS:["+manager.isStartProcessor()+"]");
					}
					Thread.sleep(sleepTime);
				}
			} catch (Exception e) {
				if(log.isErrorEnabled()) {
					log.error("An error occurred during the Read processing of the Memory information.");
					log.error(e.getMessage());
				}
				e.printStackTrace();
			}
			if(log.isInfoEnabled())log.info(">>>>>>>>>>>>>terminate Memory Monitoring Read Processor");
		}
	}
	
	public void sendMail(String wasInstanceId, BigDecimal cpuPerc, String mountOnName ) {
		long sendedTimeDiff = 0L;
		final String subject = "Memory Waring";
		final String fromAddr = "administrator@ams.com";
		Map<String, String> paramMap = new HashMap<String, String>();
		StringBuilder contentSb = new StringBuilder();
		contentSb.append("["+wasInstanceId+"]");
		contentSb.append(" SERVER Memory utilization exceeds "+cpuPerc.doubleValue()*100);
		contentSb.append("%. Please check the server status.");
		
		paramMap.put("projectName", "["+wasInstanceId+"]"+"Memory Usage Warning");
		paramMap.put("mailContents",contentSb.toString());
		
		if(BaseUtils.getCurrentWasInstanceId().equals(wasInstanceId)) {//현 WAS에 대한 경고메일만 보내도록 수정. 어차피 각각의 WAS에서 수행되고 있기 때문에 각WAS의 정보는 해당 WAS에서 보냄
			if(sendedMailTime == null) {//한번도 메일을 보낸 적이 없는 경우는 메일 송신
				sendedMailTime = DateUtils.getCurrentTimeStamp();
				//메일송신
				BaseUtils.sendMail(fromAddr,  manager.getWarningMailMap().get(BaseUtils.getRuntimeMode()), null, null, subject, "UTF-8", true, paramMap, "default.html");
				if(log.isInfoEnabled())log.info("[WARNING]"+contentSb.toString());
			} else {// 메일을 보낸 적이 있는 경우에는 방금 전에 보낸 시간과 인터벌 시간을 비교에 송신여부를 결정함. 
				sendedTimeDiff =  DateUtils.getCurrentTimeStamp().getTime() - sendedMailTime.getTime();
				if(sendedTimeDiff >= manager.getWarningMailSendIntervalTime()) {//설정된 메일송신 인터벌시간보다 저장된 시간차가 클 경우는 메일 송신
					//메일송신
					BaseUtils.sendMail(fromAddr,  manager.getWarningMailMap().get(BaseUtils.getRuntimeMode()), null, null, subject, "UTF-8", true, paramMap, "default.html");
					sendedMailTime =  DateUtils.getCurrentTimeStamp();//메일전송시간으로 다시 설정.
				}
				if(log.isInfoEnabled())log.info("[WARNING]"+contentSb.toString());
			}
		} 		
	}
}
