package ams.fwk.monitoring.server.processor.impl;

import java.math.BigDecimal;
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

public class TranMonitoringProcessor extends Thread implements IMonitoringProcessor {
	
	private ServerEnvMonitoringManager manager;
	private Log log;
	private MonitoringDAO dao;
//	private Timestamp sendedMailTime;
	
	public TranMonitoringProcessor(ServerEnvMonitoringManager manager, String threadName) {
		this.manager = manager;
		this.log = LogFactory.getLog(ServerEnvMonitoringManager.MONITORING_LOG_NAME);
		this.dao = new MonitoringDAO();
		setName(threadName);//Thread name을 저장한다.
	}
	
	@Override
	public void run() {
		int sleepTime = manager.getTransPerSecCheckIntervalTime();
		List<WasInstance> wasList = null;
		ArrayList transPercList = null;
		WasInstance wasInstance = null;
		Map paramMap = null;
		Map selectTransMap = null;
		try {
			Thread.sleep(20000);
			wasList = BaseUtils.getWasInstanceList();
			while(true) {
				if(manager.isStartProcessor()) {
					if(log.isDebugEnabled())log.debug(">>>>>>>>>Transaction Read Processor now working! STATUS:["+manager.isStartProcessor()+"]");
					if(wasList != null && wasList.size() > 0) {
						transPercList = new ArrayList(wasList.size());
						for(int i=0; i < wasList.size(); i++) {
							paramMap = new HashMap();
							wasInstance = wasList.get(i);
							paramMap.put(DBNamingConstants.WAS_INSTANCE_ID, wasInstance.getWasInstanceId());
							paramMap.put(DBNamingConstants.LOG_DT, DateUtils.getCurrentDate());
							selectTransMap = dao.selectTranPerSec(manager.getWriteSqlManager(), paramMap);
							if(selectTransMap == null) {
								selectTransMap = new HashMap();
							} else {
								//메일송신이 필요할 경우
							}
							
							transPercList.add(selectTransMap);
						}
						manager.setTransPercList(transPercList);
					}
				}
			}
		} catch (Exception e) {
			if(log.isErrorEnabled()) {
				log.error("An error occurred during the Read processing of the Transaction information.");
				log.error(e.getMessage());
			}
			e.printStackTrace();
		}
		if(log.isInfoEnabled())log.info(">>>>>>>>>>>>>terminate Transaction Monitoring Read Processor");
	}
	
	
	@Override
	public ServerInfo getServerInfoObj() {
		return null;
	}

	@Override
	public void sendMail(String wasInstanceId, BigDecimal cpuPerc,
			String mountOnName) {
		// TODO Auto-generated method stub

	}

}
