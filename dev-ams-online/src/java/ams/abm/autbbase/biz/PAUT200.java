package ams.abm.autbbase.biz;

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

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [PU]권한-메뉴 맵핑</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-09-17 14:43:55</li>
 * <li>작성자 : 강훈기 (hunkee)</li>
 * </ul>
 *
 * @author 강훈기 (hunkee)
 */
public class PAUT200 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PAUT200(){
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
	public IDataSet pAUT20001(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.AUTSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectRoleMenuMappingList", requestData, onlineCtx);
			 
	    	responseData.putRecordSet(ds.getRecordSet(DBNamingConstants.AMS_ROLE_MENU_MAPPING));
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"권한별 전체메뉴 조회"}, e);
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
	public IDataSet pAUT20002(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.AUTSBase");
		SharedBizComponent comSC = lookupSharedBizComponent("com.COMSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    try {
	    	
	    	int cnt = 0;
			
	    	IRecordSet rs = requestData.getRecordSet(DBNamingConstants.AMS_ROLE_MENU_MAPPING);
	    	
	    	if (rs != null) {
	    		cnt = rs.getRecordCount();
	    	}
	    	IDataSet req = new DataSet();
	    	
	    	// 기존에 저장되어 있는 부분을 전부 삭제
	    	callSharedBizComponentByDirect(sc, "deleteRoleMenu", requestData, onlineCtx);
	    	
	    	// 새로 등록
	    	for (int j = 0; j < cnt; j++) {
	    		IRecord r = rs.getRecord(j);
	    		req.putFieldMap(r);
	    		callSharedBizComponentByDirect(sc, "insertRoleMenu", req, onlineCtx);
	    	}
		 
	    	callSharedBizComponentByDirect(comSC, "fUpdateMenuTbActiveTime", requestData, onlineCtx);
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
