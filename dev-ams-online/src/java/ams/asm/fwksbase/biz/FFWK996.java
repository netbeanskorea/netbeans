package ams.asm.fwksbase.biz;

import java.util.ArrayList;
import java.util.List;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.parameter.WasInstance;

import org.apache.commons.logging.Log;

import ams.fwk.outbound.jmx.JMXConnection;
import ams.fwk.utils.BaseUtils;
import ams.fwk.utils.JMXUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/FWK업무</li>
 * <li>단위업무명: [FU]서버모니터링 스레드관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-12-13 13:44:35</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class FFWK996 extends ams.fwk.base.FunctionUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public FFWK996(){
		super();
	}

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet stopServerMonitoringProcessor(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    String jmxMethodName = "stopProcessor";
	    List<WasInstance> wasList = null;
	    Object obj = requestData.getObjectField("WAS_INSTANCE_LIST");
	    if(obj == null) {
	    	wasList = BaseUtils.getWasInstanceList();
	    } else {
	    	wasList = (List<WasInstance>)obj;
	    }
	    
	    for(WasInstance wasInstance : wasList) {
	    	_callJMXService(wasInstance, jmxMethodName, onlineCtx);
	    }
	    
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet restartServerMonitoringProcessor(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    String jmxMethodName = "restartProcessor";
	    List<WasInstance> wasList = null;
	    Object obj = requestData.getObjectField("WAS_INSTANCE_LIST");
	    if(obj == null) {
	    	wasList = BaseUtils.getWasInstanceList();
	    } else {
	    	wasList = (List<WasInstance>)obj;
	    }
	    
	    for(WasInstance wasInstance : wasList) {
	    	_callJMXService(wasInstance, jmxMethodName, onlineCtx);
	    }
	    return responseData;
	 }
	
	 
	private void _callJMXService(WasInstance wasInstance, String methodName,  IOnlineContext onlineCtx) {
		 Log log = getLog(onlineCtx);
		JMXConnection conn = null;
		try {
			if(log.isDebugEnabled()) {
				log.debug("[Call "+wasInstance.getWasInstanceId()+" JMX ]");
			}
			conn = JMXUtils.createJMXConnection(wasInstance);
			conn.invoke("Nexcore:Service=ServerMonitoringManager", methodName, new Object[] {}, new String[] {});
			
			if(log.isDebugEnabled()) {
				log.debug("[End "+wasInstance.getWasInstanceId()+" JMX ]");
			}
		} catch (Exception e) {
			if(log.isErrorEnabled()) {
				log.error(wasInstance.getWasInstanceId()+"로의 JMX을 통한 Server monitoring processor 처리 중에 오류발생");
				log.error(e.getCause().toString());
			}
			e.printStackTrace();
			
		} finally {
			JMXConnection.close(conn);
		}
	}
}
