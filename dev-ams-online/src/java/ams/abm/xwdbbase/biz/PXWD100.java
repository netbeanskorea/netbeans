package ams.abm.xwdbbase.biz;


import java.awt.Window;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;

import ams.fwk.biz.internal.IPrhbWord;
import ams.fwk.constants.Constants;
import ams.fwk.constants.DBNamingConstants;
import ams.fwk.utils.BaseUtils;
import ams.fwk.utils.PagenateUtils;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.ResultMessage;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;


/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [PU]금칙어관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2014-01-03 17:23:00</li>
 * <li>작성자 : 강훈기 (hunkee)</li>
 * </ul>
 *
 * @author 강훈기 (hunkee)
 */
public class PXWD100 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PXWD100(){
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
	public IDataSet pXWD10001(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.XWDSBase");
		Log log = getLog(onlineCtx);
		IDataSet responseData = new DataSet();
	     //DM개발시에는 이 try-catch를 제거해도 무관함.
		try {
			PagenateUtils.setPagenatedParamsToDataSet(requestData);
			IDataSet ds = callSharedBizComponentByDirect(sc, "selectProhibitWordList", requestData, onlineCtx);
			
			int totalCount = Integer.valueOf(ds.getField("totalCount"));
				 
			IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_PROHIBIT_WORD);
			PagenateUtils.setPagenatedParamToRecordSet(rs, requestData, totalCount);
			responseData.putRecordSet(rs);
		} catch(BizRuntimeException e) {
			throw e;
		} catch(Exception e) {
			throw new BizRuntimeException("M1000000", new String[]{"금칙어 목록조회"}, e);
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
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pXWD10002(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.XWDSBase");
		Log log = getLog(onlineCtx);
		IDataSet responseData = new DataSet();
	     //DM개발시에는 이 try-catch를 제거해도 무관함.
		try {
			
			List<IPrhbWord> list = BaseUtils.getPrhbWrdList();
			
			int cnt = 0;
			
	    	IRecordSet rs = requestData.getRecordSet(DBNamingConstants.AMS_PROHIBIT_WORD);
	    	if (rs != null) {
	    		cnt = rs.getRecordCount();
	    	}
	    	IDataSet req = new DataSet();
	    	// 저장 처리
	    	for (int i = 0; i < cnt; i++) {
	    		IRecord r = rs.getRecord(i);
	    		req.putFieldMap(r);
	    		if (Constants.INSERT_FLAG.equals(r.get("Flag"))) {
	    			callSharedBizComponentByDirect(sc, "insertProhibitWord", req, onlineCtx);
	    		} else if (Constants.UPDATE_FLAG.equals(r.get("Flag"))) {
	    			callSharedBizComponentByDirect(sc, "updateProhibitWord", req, onlineCtx);
	    		} else if (Constants.DELETE_FLAG.equals(r.get("Flag"))) {
	    			callSharedBizComponentByDirect(sc, "deleteProhibitWord", req, onlineCtx);
	    		}
	    	}
	    	_refreshCachedAmsPrhWord(onlineCtx);
	    	
	    	list = BaseUtils.getPrhbWrdList();
	    	
		} catch(BizRuntimeException e) {
			throw e;
		} catch(Exception e) {
			throw new BizRuntimeException("M1000000", new String[]{"금칙어 저장"}, e);
		}
		
		responseData.setOkResultMessage("M3000000", null);
	
		return responseData;
	}
	
	private void _refreshCachedAmsPrhWord(IOnlineContext onlineCtx) {
		Log log = getLog(onlineCtx);
		IDataSet fwkSCReq = new DataSet();
    	//이중화 WAS에 대한 코드refresh실시
    	fwkSCReq.putField(Constants.CACHE_NAME, "amsPrhbWrd");
    	try {
//    		callSharedBizComponentByRequiresNew(fwkSC, "refreshCacheByWAS", fwkSCReq, onlineCtx);
    		callServiceByAsyncXA("asm.FWKBBase#pFWK90101", fwkSCReq, onlineCtx);
    	} catch(Exception e ) {
    		if(log.isErrorEnabled()) {
    			log.error("[JMX Error]Error is occured. May not have the selected cache.");
    		}
    	}
	}
  
}
