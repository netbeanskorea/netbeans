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
import ams.fwk.monitoring.server.processor.impl.CPUMonitoringProcessor.CPUInfoReadProcessor;
import ams.fwk.utils.BaseUtils;

public class FileSystemMonitoringProcessor extends Thread implements IMonitoringProcessor {

	private ServerEnvMonitoringManager manager;
	private MonitoringDAO dao;
	private Log log;
	private FsInfoReadProcessor readProcessor;
	private Timestamp sendedMailTime;
	
	public FileSystemMonitoringProcessor(ServerEnvMonitoringManager manager, String threadName) {
		this.manager = manager;
		this.log = LogFactory.getLog(ServerEnvMonitoringManager.MONITORING_LOG_NAME);
		this.dao = new MonitoringDAO();
		this.readProcessor = new FsInfoReadProcessor();
		setName(threadName);
		/**
		 * Read Processor는 실행status와 상관없이 실행되도록 하기 위해 생성사에 정의함.   
		 */
		readProcessor.start();
	}
	@Override
	public void run() {
		int sleepTime = manager.getFsCheckIntervalTime();
		if(log.isInfoEnabled())log.info(">>>>>>>>>>>>>Start File System Monitoring Processor");
		List fileSystemList = null;
		try {
			while(true) {
				if(manager.isStartProcessor()) {
					if(log.isDebugEnabled())log.debug(">>>>>>>>>now workingSTATUS:["+manager.isStartProcessor()+"]");
					fileSystemList = getServerInfoObj().getFileSystemInfo();//현재 서버에 있는 여러 파일시스템의 정보를 list로 취득함.
					if(fileSystemList != null) {
						for(int i=0; i < fileSystemList.size(); i++) {
							dao.insertFsInfo(manager.getWriteSqlManager(), (Map)fileSystemList.get(i));
						}
					}
				} else {
					if(log.isDebugEnabled())log.debug(">>>>>>>>>now resting. STATUS:["+manager.isStartProcessor()+"]");
				}
				Thread.sleep(sleepTime);
			}
		} catch (Exception e) {
			if(log.isErrorEnabled()) {
				log.error("An error occurred during the processing of the File System information.");
			}
			e.printStackTrace();
		}
		if(log.isInfoEnabled())log.info(">>>>>>>>>>>>>terminate File System Monitoring Processor");

	}
	@Override
	public ServerInfo getServerInfoObj() {
		return manager.getServerInfo();
	}

	class FsInfoReadProcessor extends Thread {
		@Override
		public void run() {
			int sleepTime = manager.getFsCheckIntervalTime();
			List<WasInstance> wasList = null;
			Map fsPercListMap = null;
			List<Map> seletedFsList = null;
			WasInstance wasInstance = null;
			Map paramMap = null;
			BigDecimal fsUsedPer = null;
			try {
				/**
				 * FWK관련 Bean이 모두 올라 올때를 대기하기 위함. 
				 */
				Thread.sleep(20000);
				wasList = BaseUtils.getWasInstanceList();
				while(true) {
					if(manager.isStartProcessor()) {
						if(log.isDebugEnabled())log.debug(">>>>>>>>>File System Monitoring Read Processor now working! STATUS:["+manager.isStartProcessor()+"]");
						if(wasList != null && wasList.size() > 0) {
							fsPercListMap = new HashMap();
							for(int i=0; i < wasList.size(); i++) {
								paramMap = new HashMap();
								wasInstance = wasList.get(i);
								paramMap.put(DBNamingConstants.WAS_INSTANCE_ID, wasInstance.getWasInstanceId());
								paramMap.put(DBNamingConstants.HISTORY_DT, DateUtils.getCurrentDate());
								seletedFsList = dao.selectFsPerc(manager.getWriteSqlManager(), paramMap);
								for(Map fsMap : seletedFsList) {//조회된 여러 파일시스템중에 
									fsUsedPer = (BigDecimal)fsMap.get(DBNamingConstants.USED_PERC);
									for(Object monitoringFsNm : manager.getMonitoingFsNameList()) {//모니터링 원하는 파일시스템의 이름과
										if(monitoringFsNm.equals(fsMap.get(DBNamingConstants.MOUNT_ON)) &&//일치하면서 지정된 사용량을 넘는 경우 메일전송 
												(fsUsedPer.doubleValue()*100 >= manager.getFsWarningPer()) ) {
											try {
												sendMail(wasInstance.getWasInstanceId(), fsUsedPer, (String)fsMap.get(DBNamingConstants.MOUNT_ON));
											}catch (Exception e) {
												if(log.isErrorEnabled()) {
													log.error("When Filesystem Warniing mail is sending, error was happened.");
													log.error(e.getMessage());
												}
											}
										}
									}
								}
								fsPercListMap.put(wasInstance.getWasInstanceId(), seletedFsList);
							}
							manager.setFsPercListMap(fsPercListMap);
						}
					} else {
						if(log.isDebugEnabled())log.debug(">>>>>>>>>File System Monitoring Read Processor now resting! STATUS:["+manager.isStartProcessor()+"]");
					}
					Thread.sleep(sleepTime);
				}
			} catch (Exception e) {
				if(log.isErrorEnabled()) {
					log.error("An error occurred during the Read processing of the File System information.");
					log.error(e.getMessage());
				}
				e.printStackTrace();
			}
			if(log.isInfoEnabled())log.info(">>>>>>>>>>>>>terminate File System Monitoring Read Processor");
		}
	}
	
	public void sendMail(String wasInstanceId, BigDecimal fsPerc, String mountOnName) {
		long sendedTimeDiff = 0L;
		final String subject = "FileSystem Waring";
		final String fromAddr = "administrator@ams.com";
		Map<String, String> paramMap = new HashMap<String, String>();
		StringBuilder contentSb = new StringBuilder();
		contentSb.append("["+wasInstanceId+"]");
		contentSb.append(" SERVER Filesytem utilization("+mountOnName+")exceeds ");
		contentSb.append(fsPerc.doubleValue()*100);
		contentSb.append("%. Please check the server status.");
		
		paramMap.put("projectName", "["+wasInstanceId+"]"+"FileSystem Usage Warning");
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
