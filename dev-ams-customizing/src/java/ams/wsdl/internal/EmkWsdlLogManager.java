package ams.wsdl.internal;

import java.util.Map;

import org.apache.commons.logging.Log;

import nexcore.framework.core.exception.FwkRuntimeException;
import nexcore.framework.core.log.LogManager;
import nexcore.framework.core.prototype.AbsFwkService;
import nexcore.framework.integration.db.ISqlManager;

public class EmkWsdlLogManager {
	protected final Log log       = LogManager.getFwkLog();
	private ISqlManager sm;
	
	public void setSqlManager(ISqlManager sm) {
		this.sm = sm;
	}
	
	public Map insertIFLog(Map<String, String> queryParam) {
		if(sm == null) {
			if(log.isInfoEnabled())log.info("SqlManager is NULL.");
			throw new FwkRuntimeException("SKFE2101");
		}
		Map insertedLogInfo = (Map)sm.queryForObject ("emk.wsdl.insertWsdlLog", queryParam);
		return insertedLogInfo;
	}
	
	public void updateIFLog(Map<String, String> queryParam) {
		if(sm == null) {
			if(log.isInfoEnabled())log.info("SqlManager is NULL.");
			throw new FwkRuntimeException("SKFE2101");
		}
		sm.update("emk.wsdl.updateWsdlLog", queryParam);
	}
	
}
