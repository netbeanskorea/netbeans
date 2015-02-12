package ams.abm.msgbbase.biz;

import java.util.Map;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.ResultMessage;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.logging.Log;

import ams.fwk.constants.Constants;
import ams.fwk.constants.DBNamingConstants;
import ams.fwk.utils.BaseUtils;
import ams.fwk.utils.PagenateUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [PU]메시지관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-07-09 11:10:03</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class PMSG100 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PMSG100(){
		super();
	}

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : MESSAGE_NAME [MESSAGE_NAME]
	 *	- field : page [필드1]
	 *	- field : page_size [필드2]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 * <pre>
	 *	- record : AMS_MESSAGE
	 *		- field : MESSAGE_ID [MESSAGE_ID]
	 *		- field : LOCALE_ID [LOCALE_ID]
	 *		- field : MESSAGE_NAME [MESSAGE_NAME]
	 *		- field : MESSAGE_TYPE [MESSAGE_TYPE]
	 *		- field : DESCRIPTION [DESCRIPTION]
	 *		- field : REG_USER_ID [REG_USER_ID]
	 *		- field : REG_DATE [REG_DATE]
	 *		- field : UPDATE_USER_ID [UPDATE_USER_ID]
	 *		- field : UPDATE_DATE [UPDATE_DATE]
	 *		- field : USE_FLAG [USE_FLAG]
	 * </pre>
	 */
	public IDataSet pMSG10001(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.MSGSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	PagenateUtils.setPagenatedParamsToDataSet(requestData);
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectMessageList", requestData, onlineCtx);
	    	
	    	int totalCount = Integer.valueOf(ds.getField("totalCount"));
	    	
	    	IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_MESSAGE);
	    	PagenateUtils.setPagenatedParamToRecordSet(rs, requestData, totalCount);
	    	responseData.putRecordSet(rs);
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"메시지목록조회"}, e);
		 }
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : MESSAGE_NAME [MESSAGE_NAME]
	 *	- field : MESSAGE_TYPE [MESSAGE_TYPE]
	 *	- field : DESCRIPTION [DESCRIPTION]
	 *	- field : REG_USER_ID [REG_USER_ID]
	 *	- field : REG_DATE [REG_DATE]
	 *	- field : UPDATE_USER_ID [UPDATE_USER_ID]
	 *	- field : UPDATE_DATE [UPDATE_DATE]
	 *	- field : USE_FLAG [USE_FLAG]
	 * </pre>
	 */
	public IDataSet pMSG10002(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.MSGSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectMessage", requestData, onlineCtx);
	    	responseData.putFieldMap(ds.getFieldMap());
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"메시지상세조회"}, e);
	    }
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : MESSAGE_NAME [MESSAGE_NAME]
	 *	- field : MESSAGE_TYPE [MESSAGE_TYPE]
	 *	- field : DESCRIPTION [DESCRIPTION]
	 *	- field : USE_FLAG [USE_FLAG]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pMSG10003(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.MSGSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	callSharedBizComponentByDirect(sc, "updateMessage", requestData, onlineCtx);
	    	_refreshCahedMessage(onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"메시지수정"}, e);
	    }
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pMSG10004(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.MSGSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	callSharedBizComponentByDirect(sc, "deleteMessage", requestData, onlineCtx);
//	    	_refreshCahedMessage(onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"메시지삭제"}, e);
		 }
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : MESSAGE_NAME [MESSAGE_NAME]
	 *	- field : MESSAGE_TYPE [MESSAGE_TYPE]
	 *	- field : DESCRIPTION [DESCRIPTION]
	 *	- field : USE_FLAG [USE_FLAG]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pMSG10005(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.MSGSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	callSharedBizComponentByDirect(sc, "insertMessage", requestData, onlineCtx);
//	    	_refreshCahedMessage(onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"메시지등록"}, e);
	    }
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }
  
	private void _refreshCahedMessage( IOnlineContext onlineCtx) {
		Log log = getLog(onlineCtx);
		IDataSet fwkSCReq = new DataSet();
    	//이중화 WAS에 대한 레이블refresh실시
    	fwkSCReq.putField(Constants.CACHE_NAME, "message");
    	try {
    		callServiceByAsyncXA("asm.FWKBBase#pFWK90101", fwkSCReq, onlineCtx);
    	} catch(Exception e ) {
    		if(log.isErrorEnabled()) {
    			log.error("[JMX Error]Error is occured. May not have the selected cache.");
    		}
    	}
	}
}
