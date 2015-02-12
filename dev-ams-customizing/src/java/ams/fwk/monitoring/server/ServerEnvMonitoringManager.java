package ams.fwk.monitoring.server;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import nexcore.framework.integration.db.ISqlManager;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import ams.fwk.monitoring.server.processor.ServerInfo;
import ams.fwk.monitoring.server.processor.impl.CPUMonitoringProcessor;
import ams.fwk.monitoring.server.processor.impl.FileSystemMonitoringProcessor;
import ams.fwk.monitoring.server.processor.impl.MemoryMonitoringProcessor;
import ams.fwk.monitoring.server.processor.impl.TranMonitoringProcessor;
import ams.fwk.utils.BaseUtils;


public class ServerEnvMonitoringManager {
	public static final String MONITORING_LOG_NAME = "__monitoringlog";
	private Log log;
	protected ISqlManager         	writeSqlManager;
	protected ISqlManager         	readSqlManager;
	protected int checkIntervalTime = 60000;
	protected int fsCheckIntervalTime = 1800000;
	protected int transPerSecCheckIntervalTime = 1000;
	protected int delayStartTime = 20000;
	protected int cpuWarningPer = 90;
	protected int memWarningPer = 95;
	protected int fsWarningPer = 80;
	protected boolean startProcessor = true;
	protected String cacheName;
	protected int warningMailSendIntervalTime =60;
	protected Map<String, List> warningMailMap;
	protected List monitoingFsNameList;
	protected CPUMonitoringProcessor cpuProcessor;
	protected MemoryMonitoringProcessor memProcessor;
	protected FileSystemMonitoringProcessor fsProcessor;
	protected TranMonitoringProcessor transProcessor;
	private Thread delayStarter;
	public static final String CPU_PROCESSOR_NAME = "__CPU_PROCESSOR__";
	public static final String MEM_PROCESSOR_NAME = "__MEM_PROCESSOR__";
	public static final String FS_PROCESSOR_NAME = "__FS_PROCESSOR__";
	public static final String TRAN_PROCESSOR_NAME = "__TRAN_PROCESSOR_NAME__";
	private ServerInfo serverInfo;
	private List cpuPercList = new ArrayList();
	private List memPercList = new ArrayList();
	private List transPercList = new ArrayList();
	private Map fsPercListMap = new HashMap();
	
	public void setWriteSqlManager(ISqlManager writeSqlManager) {
		this.writeSqlManager = writeSqlManager;
	}

	public void setReadSqlManager(ISqlManager readSqlManager) {
		this.readSqlManager = readSqlManager;
	}
	
	public void setFsCheckIntervalTime(int fsCheckIntervalTime) {
		this.fsCheckIntervalTime = fsCheckIntervalTime;
	}
	
	public void setTransPerSecCheckIntervalTime(int transPerSecCheckIntervalTime) {
		this.transPerSecCheckIntervalTime = transPerSecCheckIntervalTime;
	}

	public void setCheckIntervalTime(int checkIntervalTime) {
		this.checkIntervalTime = checkIntervalTime;
	}

	public void setCpuWarningPer(int cpuWarningPer) {
		this.cpuWarningPer = cpuWarningPer;
	}

	public void setMemWarningPer(int memWarningPer) {
		this.memWarningPer = memWarningPer;
	}

	public void setFsWarningPer(int fsWarningPer) {
		this.fsWarningPer = fsWarningPer;
	}

	public void setWarningMailMap(Map<String, List>warningMailMap) {
		this.warningMailMap = warningMailMap;
	}

	public void setMonitoingFsNameList(List monitoingFsNameList) {
		this.monitoingFsNameList = monitoingFsNameList;
	}

	public void setStartProcessor(boolean startProcessor) {
		this.startProcessor = startProcessor;
	}
	
	public void setCacheName(String cacheName) {
		this.cacheName = cacheName;
	}
	
	public void setDelayStartTime(int delayStartTime) {
		this.delayStartTime = delayStartTime;
	}
	
	public void setCpuPercList(List cpuPercList) {
		synchronized(this.cpuPercList) {
			this.cpuPercList = null;
			this.cpuPercList = cpuPercList;
		}
	}

	public void setMemPercList(List memPercList) {
		synchronized(this.memPercList) {
			this.memPercList = null;
			this.memPercList = memPercList;
		}
	}
	
	public void setTransPercList(List transPercList) {
		synchronized(this.transPercList) {
			this.transPercList = null;
			this.transPercList = transPercList;
		}
	}
	
	public void setFsPercListMap(Map fsPercListMap) {
		synchronized(this.fsPercListMap) {
			this.fsPercListMap = null;
			this.fsPercListMap = fsPercListMap;
		}
	}
	
	public void setWarningMailSendIntervalTime(int warningMailSendIntervalTime) {
		this.warningMailSendIntervalTime = warningMailSendIntervalTime;
	}

	public boolean isStartProcessor() {
		return startProcessor;
	}
	
	public int getCheckIntervalTime() {
		return checkIntervalTime;
	}

	public int getCpuWarningPer() {
		return cpuWarningPer;
	}

	public int getMemWarningPer() {
		return memWarningPer;
	}

	public int getFsWarningPer() {
		return fsWarningPer;
	}

	public String getCacheName() {
		return cacheName;
	}

	public int getFsCheckIntervalTime() {
		return fsCheckIntervalTime;
	}

	public int getTransPerSecCheckIntervalTime() {
		return transPerSecCheckIntervalTime;
	}
	
	public int getWarningMailSendIntervalTime() {
		return warningMailSendIntervalTime;
	}
	
	public List getCpuPercList() {
		return cpuPercList;
	}
	
	public List getMemPercList() {
		return memPercList;
	}
	
	public List getTransPerList() {
		return transPercList;
	}
	
	public Map getFsPercListMap() {
		return fsPercListMap;
	}

	public Map<String, List> getWarningMailMap() {
		return warningMailMap;
	}
	
	public List getMonitoingFsNameList() {
		return monitoingFsNameList;
	}

	public ISqlManager getReadSqlManager() {
		return readSqlManager;
	}
	
	public ISqlManager getWriteSqlManager() {
		return writeSqlManager;
	}

	public ServerInfo getServerInfo() {
		if(this.serverInfo == null) {
			this.serverInfo = new ServerInfo();
		}
		return serverInfo;
	}
	public void init() {
		log =  LogFactory.getLog(MONITORING_LOG_NAME);
		
		cpuProcessor = new CPUMonitoringProcessor(this, CPU_PROCESSOR_NAME);
		memProcessor = new MemoryMonitoringProcessor(this, MEM_PROCESSOR_NAME);
		fsProcessor = new FileSystemMonitoringProcessor(this, FS_PROCESSOR_NAME);
		transProcessor = new TranMonitoringProcessor(this, TRAN_PROCESSOR_NAME);
		delayStarter = new Thread() {
			public void run() {
				try {
					sleep(delayStartTime);//안정적인 환경을 위해 delay시간을 가진다. 
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				startProcessor();//각 프로세서들을 기동시킨다. 
			}
		};
		if(startProcessor && !"L".equals(BaseUtils.getRuntimeMode())) {//Cache를 통해 startProcessor를 false로 변경하면 각 Processor들도 startProcessor를 상태를 체크하여 멈추도록 한다. 
//		if(startProcessor) {
			delayStarter.start();
		}
	}
	
	public void startProcessor() {
		cpuProcessor.start();
		fsProcessor.start();
		memProcessor.start();
//		transProcessor.start();
	}
	
	/**
	 * JMX를 통해 모니터링 프로세서를 종료시킨다.
	 */
	public void stopProcessor() {
		if(log.isDebugEnabled())log.debug(">>>>>>>>>Monitoring Processor is stopping");
		setStartProcessor(false);
		if(log.isDebugEnabled())log.debug(">>>>>>>>>Monitoring Processor is stopped");
	}
	
	/**
	 * JMX를 통해  모니터링 프로세서를 재기동한다.
	 */
	public synchronized void restartProcessor() {
		if(!isStartProcessor() &&  !"L".equals(BaseUtils.getRuntimeMode())) {
//		if(!isStartProcessor()) {
			if(log.isDebugEnabled())log.debug(">>>>>>>>>Monitoring Processor will be started");
			setStartProcessor(true);
			if(!delayStarter.isAlive()) {//처음부터 실시여부가 false로 되어 있을 경우에는 Thread가 start되어 있지 않을 수 있다. 
				delayStarter.start();
			}
			if(log.isDebugEnabled())log.debug(">>>>>>>>>Monitoring Processor was started");
		}
	}
}
