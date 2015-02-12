package ams.abm.lblbbase.biz;

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
 * <li>단위업무명: [PU]레이블관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-10-14 14:03:15</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class PLBL100 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PLBL100(){
		super();
	}

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pLBL10001(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.LBLSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	PagenateUtils.setPagenatedParamsToDataSet(requestData);
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectLabelList", requestData, onlineCtx);
		 
	    	int totalCount = Integer.valueOf(ds.getField("totalCount"));
	    	
	    	IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_LABEL);
	    	PagenateUtils.setPagenatedParamToRecordSet(rs, requestData, totalCount);
			responseData.putRecordSet(rs);
			
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"레이블 목록조회"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pLBL10002(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.LBLSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectLabel", requestData, onlineCtx);
		 
	    	IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_LABEL);
	    	
	    	if(rs != null && rs.getRecordCount() > 0 ) {
	    		responseData.putRecordSet(rs);
	    	}
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"레이블 상세조회"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pLBL10003(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.LBLSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	int cnt = 0;
	    	IRecordSet rs = requestData.getRecordSet(DBNamingConstants.AMS_LABEL);
	    	if (rs != null) {
	    		cnt = rs.getRecordCount();
	    	}
	    	
	    	//목록 모두 삭제 
			callSharedBizComponentByDirect(sc, "deleteLabel", requestData, onlineCtx);
		 
	    	IDataSet req = new DataSet();
	    	// 저장 처리
	    	for (int i = 0; i < cnt; i++) {
	    		IRecord r = rs.getRecord(i);
	    		req.putFieldMap(r);
    			callSharedBizComponentByDirect(sc, "insertLabel", req, onlineCtx);
	    	}
	    	_refreshCachedAmsLabel(onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"레이블 저장"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pLBL10004(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.LBLSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
			//이곳에 레이블수정 로직이 들어가야 함. 
		 
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
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pLBL10005(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.LBLSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
			//목록 모두 삭제 
			callSharedBizComponentByDirect(sc, "deleteLabel", requestData, onlineCtx);
			_refreshCachedAmsLabel(onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"레이블 삭제"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }
  
	private void _refreshCachedAmsLabel(IOnlineContext onlineCtx) {
		Log log = getLog(onlineCtx);
		IDataSet fwkSCReq = new DataSet();
		//현재 WAS에 대한 레이블refresh실시
    	//이중화 WAS에 대한 레이블refresh실시
    	fwkSCReq.putField(Constants.CACHE_NAME, "amsLabel");
    	SharedBizComponent sc = lookupSharedBizComponent("com.COMSBase");
    	
    	try {
    		callSharedBizComponentByDirect(sc, "fUpdateMenuTbActiveTime", fwkSCReq, onlineCtx);
    		callServiceByAsyncXA("asm.FWKBBase#pFWK90101", fwkSCReq, onlineCtx);
    	} catch(Exception e ) {
    		if(log.isErrorEnabled()) {
    			log.error("[JMX Error]Error is occured. May not have the selected cache.");
    		}
    	}
	}
}
