package ams.fwk.monitoring.server.dao;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import nexcore.framework.core.util.DateUtils;
import nexcore.framework.integration.db.ISqlManager;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hyperic.sigar.CpuInfo;
import org.hyperic.sigar.CpuPerc;

import ams.fwk.constants.DBNamingConstants;
import ams.fwk.monitoring.server.ServerEnvMonitoringManager;
import ams.fwk.utils.BaseUtils;

public class MonitoringDAO {
	
	private Log log;
	
	public MonitoringDAO() {
		this.log =  LogFactory.getLog(ServerEnvMonitoringManager.MONITORING_LOG_NAME);
	}
	public void insertCpuDetailInfo(ISqlManager sm, CpuInfo cpuInfo) {
		Map cpuInfoMap = new HashMap();
		cpuInfoMap.put(DBNamingConstants.WAS_INSTANCE_ID, BaseUtils.getCurrentWasInstanceId());
		cpuInfoMap.put(DBNamingConstants.MHZ, cpuInfo.getMhz());
		cpuInfoMap.put(DBNamingConstants.VENDOR, cpuInfo.getVendor());
		cpuInfoMap.put(DBNamingConstants.CPU_CNT, cpuInfo.getTotalCores());
		sm.insert("ams.monitoring.insertCpuDetailInfo", cpuInfoMap);
	}
	
	public void insertCpuPerc(ISqlManager sm, CpuPerc cpuPerc) {
		Map cpuPercMap = new HashMap();
		setCurrentTime(cpuPercMap);
		cpuPercMap.put(DBNamingConstants.SYS_CPU_PERC, cpuPerc.getSys());
		cpuPercMap.put(DBNamingConstants.IDLE_CPU_PERC, cpuPerc.getIdle());
		cpuPercMap.put(DBNamingConstants.PROC_CPU_PERC, cpuPerc.getUser());
		cpuPercMap.put(DBNamingConstants.WAIT_CPU_PERC, cpuPerc.getWait());
		cpuPercMap.put(DBNamingConstants.NICE_CPU_PERC, cpuPerc.getNice());
		cpuPercMap.put(DBNamingConstants.COMBINE_CPU_PERC, cpuPerc.getCombined());
		
		if(log.isDebugEnabled())log.debug(">>>>>>>CPU Parameter : "+cpuPercMap);
		
		sm.insert("ams.monitoring.insertCpuPerHistory", cpuPercMap);
	}
	
	
	public void insertMemPerc(ISqlManager sm, Map memInfoMap) {
		setCurrentTime(memInfoMap);
		sm.insert("ams.monitoring.insertMemHistory", memInfoMap);
		
	}
	public void insertFsInfo(ISqlManager sm, Map fsInfoMap) {
		setCurrentTime(fsInfoMap);
		sm.insert("ams.monitoring.insertFsHistory", fsInfoMap);
	}
	
	public Map selectCpuPerc(ISqlManager sm, Map map) {
		return sm.queryForFieldMap("ams.monitoring.selectCpuPerc", map);
	}
	
	public Map selectMemPerc(ISqlManager sm, Map map) {
		return sm.queryForFieldMap("ams.monitoring.selectMemPerc", map);
	}
	
	public List selectFsPerc(ISqlManager sm, Map map) {
		return sm.queryForList("ams.monitoring.selectFsPerc", map);
	}
	
	public Map selectTranPerSec(ISqlManager sm, Map map) {
		return sm.queryForFieldMap("ams.monitoring.selectTransPerSec", map);
	}
	
	private void setCurrentTime(Map map) {
		Calendar cal = Calendar.getInstance();
		map.put(DBNamingConstants.WAS_INSTANCE_ID, BaseUtils.getCurrentWasInstanceId());
		map.put(DBNamingConstants.HISTORY_DT, DateUtils.getCurrentDate());
		map.put(DBNamingConstants.HISTORY_HOUR, cal.get(Calendar.HOUR_OF_DAY));
		map.put(DBNamingConstants.HISTORY_MIN, cal.get(Calendar.MINUTE));
		map.put(DBNamingConstants.HISTORY_SEC, cal.get(Calendar.SECOND));
	}
}
