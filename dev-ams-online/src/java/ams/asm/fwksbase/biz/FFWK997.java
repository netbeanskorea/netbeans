package ams.asm.fwksbase.biz;

import java.util.HashMap;
import java.util.List;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.parameter.WasInstance;
import nexcore.framework.core.util.AppUtils;
import nexcore.framework.core.util.StringUtils;

import org.apache.commons.logging.Log;

import ams.fwk.constants.Constants;
import ams.fwk.outbound.jmx.JMXConnection;
import ams.fwk.utils.BaseUtils;
import ams.fwk.utils.JMXUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/FWK업무</li>
 * <li>단위업무명: [FU]캐쉬관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-11-11 17:22:15</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class FFWK997 extends ams.fwk.base.FunctionUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public FFWK997(){
		super();
	}

	/**
	 *
	 * 지정된 cacheName에 대한 WAS별 캐쉬refresh실시
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet refreshCacheByWAS(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    String cacheName = requestData.getField(Constants.CACHE_NAME);
	    if(StringUtils.isEmpty(cacheName)) {
	    	throw new BizRuntimeException("SKFS1048", new String[]{"캐쉬Name을 parameter로 받지못함", this.getClass().getName()});
	    }
	    
	    List<WasInstance> wasList = BaseUtils.getWasInstanceList();
	    String runtimeMode = "";
	    for(WasInstance wasInstance : wasList) {
//	    	if(currentWasInstanceId.equals(wasInstance.getWasInstanceId())) {//WasInstance ID가 현재 WAS와 같을 경우는 skip한다.
//	    		continue;
//	    	}
//	    	//개발 WAS가 운영WAS까지 refresh시키면 안되기 때문에 현재 WAS의 runtime모드와 동일한 WAS에 대해서만 처리함.  
//	    	runtimeMode = AppUtils.getProperty("nexcore.runtime.mode."+wasInstance.getWasInstanceId());
//	    	if(!currentRuntimeMode.equals(runtimeMode)) {
//	    		continue;
//	    	}
			JMXConnection conn = null;
			try {
				if(log.isDebugEnabled()) {
					log.debug("[Call "+wasInstance.getWasInstanceId()+" JMX ]");
				}
				conn = JMXUtils.createJMXConnection(wasInstance);
				Object returnValue = conn.invoke("Nexcore:Service=CacheManager", "refresh", new Object[] { cacheName }, new String[] { String.class.getName() });
				if(log.isDebugEnabled()) {
					log.debug("Return Value for JMX : "+returnValue);
				}
				if(log.isDebugEnabled()) {
					log.debug("[End "+wasInstance.getWasInstanceId()+" JMX ]");
				}
			} catch (Exception e) {
//				throw new BizRuntimeException("SKFS1048",new String[]{"JMX을 통한 cache refresh중에 오류발생",  this.getClass().getName()}, e);
				if(log.isErrorEnabled()) {
					log.error(wasInstance.getWasInstanceId()+"로의 JMX을 통한 cache refresh중에 오류발생");
					log.error(e.getCause().toString());
				}
				e.printStackTrace();
				
			} finally {
				JMXConnection.close(conn);
			}
	    }
	    return responseData;
	 }
  
	
}
