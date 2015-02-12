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
import org.hyperic.sigar.CpuInfo;

import ams.fwk.constants.DBNamingConstants;
import ams.fwk.monitoring.server.ServerEnvMonitoringManager;
import ams.fwk.monitoring.server.dao.MonitoringDAO;
import ams.fwk.monitoring.server.processor.IMonitoringProcessor;
import ams.fwk.monitoring.server.processor.ServerInfo;
import ams.fwk.utils.BaseUtils;

/**
 * @author 08158
 *
 */
public class CPUMonitoringProcessor extends Thread  implements IMonitoringProcessor{

	private ServerEnvMonitoringManager manager;
	private Log log;
	private MonitoringDAO dao;
	private CPUInfoReadProcessor readProcessor;
	private Timestamp sendedMailTime;
	public CPUMonitoringProcessor(ServerEnvMonitoringManager manager, String threadName) {
		this.manager = manager;
		this.log = LogFactory.getLog(ServerEnvMonitoringManager.MONITORING_LOG_NAME);
		this.dao = new MonitoringDAO();
		this.readProcessor = new CPUInfoReadProcessor();//DB에 저장된 데이터를 읽어들이는 프로세서
		setName(threadName);//Thread name을 저장한다.
		/**
		 * Read Processor는 실행status와 상관없이 실행되도록 하기 위해 생성사에 정의함.   
		 */
		readProcessor.start();//read용 프로세서를 기동시킨다. 
	}
	
	@Override
	public void run() {
		int sleepTime = manager.getCheckIntervalTime();
		CpuInfo cpuInfo = getServerInfoObj().getCpuDetailInfo();//OS의 CPU정보를 취득한다.  
		if(log.isInfoEnabled())log.info(">>>>>>>>>>>>>Start CPU Monitoring Write Processor");
		try {
			dao.insertCpuDetailInfo(manager.getWriteSqlManager(), cpuInfo);//CPU의 기본정보를 DB에 입력한다. 해당 정보는 시작할 때 한번만 입력하면 된다.  
			while(true) {
				if(manager.isStartProcessor()) {
					if(log.isDebugEnabled())log.debug(">>>>>>>>>CPU Monitoring Write Processor now working! STATUS:["+manager.isStartProcessor()+"]");
					dao.insertCpuPerc(manager.getWriteSqlManager(), getServerInfoObj().getCpuPerc());//CPU의 사용%를 DB에 입력한다. 
					
				} else {
					if(log.isDebugEnabled())log.debug(">>>>>>>>>CPU Monitoring Write Processor now resting! STATUS:["+manager.isStartProcessor()+"]");
				}
				Thread.sleep(sleepTime);//interval 타임만큼 대기한다. 
			}
		} catch (Exception e) {
			if(log.isErrorEnabled()) {//에러가 발생하더라도 에러Trace만 출력하고 Tread는 계속 수행되도록 한다. 
				log.error("An error occurred during the Write processing of the CPU information.");
			}
			e.printStackTrace();
		}
		if(log.isInfoEnabled())log.info(">>>>>>>>>>>>>terminate CPU Monitoring Write Processor");
	}

	
	@Override
	public ServerInfo getServerInfoObj() {
		return manager.getServerInfo();//OS의정보를 취득한다. 
	}

	
	/**
	 * DB에 저장된 CPU정보를 주기적으로 취득하여 메모리 변수에 set한다.
	 * @author 박세일
	 */
	class CPUInfoReadProcessor extends Thread {
		@Override
		public void run() {
			int sleepTime = manager.getCheckIntervalTime();
			List<WasInstance> wasList = null;
			ArrayList cpuPercList = null;
			WasInstance wasInstance = null;
			Map paramMap = null;
			Map selectCpuMap = null;
			BigDecimal cpuPerc = null;
			try {
				/**
				 * FWK관련 Bean이 모두 올라 올때를 대기하기 위함. 
				 */
				Thread.sleep(20000);  
				wasList = BaseUtils.getWasInstanceList();//FWK에 등록된 WAS List를 가지고 온다. 
				while(true) {
					if(manager.isStartProcessor()) {
						if(log.isDebugEnabled())log.debug(">>>>>>>>>CPU Monitoring Read Processor now working! STATUS:["+manager.isStartProcessor()+"]");
						if(wasList != null && wasList.size() > 0) {
							cpuPercList = new ArrayList(wasList.size());
							for(int i=0; i < wasList.size(); i++) {
								paramMap = new HashMap();
								wasInstance = wasList.get(i);
								paramMap.put(DBNamingConstants.WAS_INSTANCE_ID, wasInstance.getWasInstanceId());
								paramMap.put(DBNamingConstants.HISTORY_DT, DateUtils.getCurrentDate());
								selectCpuMap = dao.selectCpuPerc(manager.getWriteSqlManager(), paramMap);//오늘 일자로 등록된 CPU정보중 제일 늦게 등록된 1건만 취득
								if(selectCpuMap == null) {
									selectCpuMap = new HashMap();
								} else {
									cpuPerc = (BigDecimal)selectCpuMap.get(DBNamingConstants.COMBINE_CPU_PERC);//CPU 사용률취득
									if((cpuPerc.doubleValue() *100) >= manager.getCpuWarningPer()) {//CPU 경고 임계치를 초과하는 경우에는 메일송신
										try {
											sendMail(wasInstance.getWasInstanceId(), cpuPerc, "");
										}catch (Exception e) {
											if(log.isErrorEnabled()) {
												log.error("When CPU Warniing mail is sending, error was happened.");
												log.error(e.getMessage());
											}
										}
										
									}
								}
								cpuPercList.add(selectCpuMap);
							}
							manager.setCpuPercList((List)cpuPercList);//WAS별 CPU 정보를 담은 List를 manager에 set함.
						}
					} else {
						if(log.isDebugEnabled())log.debug(">>>>>>>>>CPU Monitoring Read Processor now resting! STATUS:["+manager.isStartProcessor()+"]");
					}
					Thread.sleep(sleepTime);//DB조회 인터벌 시간만큼 대기
				}
			} catch (Exception e) {
				if(log.isErrorEnabled()) {
					log.error("An error occurred during the Read processing of the CPU information.");
					log.error(e.getMessage());
				}
				e.printStackTrace();
			}
			if(log.isInfoEnabled())log.info(">>>>>>>>>>>>>terminate CPU Monitoring Read Processor");
		}
	}
	
	public void sendMail(String wasInstanceId, BigDecimal cpuPerc, String mountOnName) {
		long sendedTimeDiff = 0L;
		final String subject = "CPU Waring";
		final String fromAddr = "administrator@ams.com";
		Map<String, String> paramMap = new HashMap<String, String>();
		StringBuilder contentSb = new StringBuilder();
		contentSb.append("["+wasInstanceId+"]");
		contentSb.append(" SERVER CPU utilization exceeds "+cpuPerc.doubleValue()*100);
		contentSb.append("%. Please check the server status.");
		
		paramMap.put("projectName", "["+wasInstanceId+"]"+"CPU Usage Warning");
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
