package ams.abm.infbbase.biz;

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

import ams.fwk.constants.DBNamingConstants;
import ams.fwk.utils.PagenateUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [PU]FAQ관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-10-22 16:53:44</li>
 * <li>작성자 : 강훈기 (hunkee)</li>
 * </ul>
 *
 * @author 강훈기 (hunkee)
 */
public class PINF200 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PINF200(){
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
	public IDataSet pINF20001(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	PagenateUtils.setPagenatedParamsToDataSet(requestData);
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectFAQList", requestData, onlineCtx);
	    	
	    	int totalCount = Integer.valueOf(ds.getField("totalCount"));
	    	
	    	IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_FAQ);
	    	PagenateUtils.setPagenatedParamToRecordSet(rs, requestData, totalCount);
	    	responseData.putRecordSet(rs);
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"FAQ목록조회"}, e);
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
	public IDataSet pINF20002(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectFAQ", requestData, onlineCtx);
	    	responseData.putFieldMap(ds.getFieldMap());
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"FAQ상세조회"}, e);
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
	public IDataSet pINF20003(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	callSharedBizComponentByDirect(sc, "insertFAQ", requestData, onlineCtx);
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"FAQ등록"}, e);
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
	public IDataSet pINF20004(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	callSharedBizComponentByDirect(sc, "updateFAQ", requestData, onlineCtx);
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"FAQ수정"}, e);
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
	public IDataSet pINF20005(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	callSharedBizComponentByDirect(sc, "deleteFAQ", requestData, onlineCtx);

	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"FAQ삭제"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }
  
}
