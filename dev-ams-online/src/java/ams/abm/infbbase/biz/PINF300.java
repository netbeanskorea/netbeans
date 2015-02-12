package ams.abm.infbbase.biz;

import java.util.Map;

import nexcore.framework.bat.test.DbSelectComponentNameMapperForOnDemand;
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

import ams.fwk.common.user.IAmsUserInfo;
import ams.fwk.constants.DBNamingConstants;
import ams.fwk.utils.BaseUtils;
import ams.fwk.utils.PagenateUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [PU]공지사항관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-10-24 17:00:07</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class PINF300 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PINF300(){
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
	public IDataSet pINF30002(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    IAmsUserInfo userInfo = (IAmsUserInfo)onlineCtx.getUserInfo();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	String file_seq_no;
	    	if(requestData.getField(DBNamingConstants.FILE_SEQ_NO) == null || "".equals(requestData.getField(DBNamingConstants.FILE_SEQ_NO))){
	    		file_seq_no = userInfo.getFileSeqNo();
	    	}else{
	    		file_seq_no = requestData.getField(DBNamingConstants.FILE_SEQ_NO);
	    	}
	    	int cnt = 0;
			
	    	IRecordSet rs = requestData.getRecordSet(DBNamingConstants.AMS_NOTICE);
	    	if (rs != null) {
	    		cnt = rs.getRecordCount();
	    	}
	    	
	    	//목록 모두 삭제 
			callSharedBizComponentByDirect(sc, "deleteNotice", requestData, onlineCtx);
			
	    	IDataSet req = new DataSet();
	    	// 저장 처리
	    	for (int i = 0; i < cnt; i++) {
	    		IRecord r = rs.getRecord(i);
	    		r.put(DBNamingConstants.NOTICE_SEQ_NO, requestData.getField(DBNamingConstants.NOTICE_SEQ_NO));
	    		r.put(DBNamingConstants.NOTICE_DT, requestData.getField(DBNamingConstants.NOTICE_DT));
	    		r.put(DBNamingConstants.TITLE, requestData.getField(DBNamingConstants.TITLE));
	    		r.put(DBNamingConstants.CONTENTS, requestData.getField(DBNamingConstants.CONTENTS));
	    		r.put(DBNamingConstants.VIEW_START_DT, requestData.getField(DBNamingConstants.VIEW_START_DT));
	    		r.put(DBNamingConstants.VIEW_END_DT, requestData.getField(DBNamingConstants.VIEW_END_DT));
	    		r.put(DBNamingConstants.NOTICE_HTML_FILE, requestData.getField(DBNamingConstants.NOTICE_HTML_FILE));
	    		r.put(DBNamingConstants.POP_UP_WSIZE, requestData.getField(DBNamingConstants.POP_UP_WSIZE));
	    		r.put(DBNamingConstants.POP_UP_HSIZE, requestData.getField(DBNamingConstants.POP_UP_HSIZE));
	    		r.put(DBNamingConstants.USE_YN, requestData.getField(DBNamingConstants.USE_YN));
	    		req.putFieldMap(r);
	    		req.putField("FILE_SEQ_NO", file_seq_no);
    			callSharedBizComponentByDirect(sc, "insertNotice", req, onlineCtx);
	    	}
	    	
	    	BaseUtils.fileUpload(file_seq_no, requestData, onlineCtx);
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"공지사항 저장"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
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
	public IDataSet pINF30004(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
			callSharedBizComponentByDirect(sc, "deleteNotice", requestData, onlineCtx);
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"공지사항 삭제"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
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
	public IDataSet pINF30001(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	PagenateUtils.setPagenatedParamsToDataSet(requestData);
	    	
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectNoticeList", requestData, onlineCtx);
	    	
	    	IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_NOTICE);
	    	
	    	int totalCount = Integer.parseInt(ds.getField("totalCount"));
	    	
	    	PagenateUtils.setPagenatedParamToRecordSet(rs, requestData, totalCount);
	    	
	    	responseData.putRecordSet(DBNamingConstants.AMS_NOTICE, rs);
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"공지사항목록조회"}, e);
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
	public IDataSet pINF30005(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
			IDataSet ds =callSharedBizComponentByDirect(sc, "selectNotice", requestData, onlineCtx);
			
			IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_NOTICE);
			IRecord r = rs.getRecord(0);
			
			responseData.putFieldMap(r);
			responseData.putRecordSet(ds.getRecordSet(DBNamingConstants.AMS_NOTICE));
			
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"공지사항 상세조회"}, e);
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
	public IDataSet pINF30006(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    try {
			IDataSet ds = callSharedBizComponentByDirect(sc, "selectNoticeSeqCount", requestData, onlineCtx);
			int notice_seq_no = Integer.parseInt(ds.getField(DBNamingConstants.NOTICE_SEQ_NO));
			responseData.putField(DBNamingConstants.NOTICE_SEQ_NO, notice_seq_no+1);
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"공지사항 번호채번"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }
  
}
