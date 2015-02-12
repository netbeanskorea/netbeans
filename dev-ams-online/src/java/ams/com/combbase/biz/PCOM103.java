package ams.com.combbase.biz;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.logging.Log;

import ams.fwk.push.AmsPushManager;
import ams.fwk.utils.AmsUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/공통업무</li>
 * <li>단위업무명: [PU]PUSH 관리</li>
 * <li>설  명 : PUSH 기능</li>
 * <li>작성일 : 2013-10-04 09:50:04</li>
 * <li>작성자 : 성지호 (SungJiHo)</li>
 * </ul>
 *
 * @author 성지호 (SungJiHo)
 */
public class PCOM103 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PCOM103(){
		super();
	}

	/**
	 *
	 *
	 * @author 성지호 (SungJiHo)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : timestamp [타임스탬프]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOM10301(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	int timestamp = requestData.getIntField("timestamp");
	    	
	    	AmsPushManager pm = AmsUtils.getAmsPushManager();
	    	
	    	long startTime = System.currentTimeMillis();
	    	long tenMin = 1000 * 60 * 10;
	    	while(true) {
	    		IRecordSet rs = pm.getPushMessage(timestamp);
	    		
	    		if(rs!=null && rs.getRecordCount()!=0) {
	    			responseData.putRecordSet("PUSH_LIST", rs);
					responseData.putField("timestamp", 
							rs.getRecord(rs.getRecordCount() - 1).get("timestamp"));
					break;
	    		} else {
	    			responseData.putField("timestamp", timestamp);
	    			
	    			long currentTime = System.currentTimeMillis();
	    			
	    			if((currentTime - startTime) > tenMin) {
	    				break;
	    			}
	    			Thread.sleep(1000 * 60);
	    		}
	    	}
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 성지호 (SungJiHo)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MSG [필드1]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOM10302(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    SharedBizComponent comSC = lookupSharedBizComponent("com.COMSBase");
	    
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	callSharedBizComponentByDirect(comSC, "insertPushMessage", requestData, onlineCtx);
    		
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }
  
}
