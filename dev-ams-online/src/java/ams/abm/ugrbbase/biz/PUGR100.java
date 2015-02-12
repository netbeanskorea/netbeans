package ams.abm.ugrbbase.biz;

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
import ams.fwk.utils.PagenateUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [PU]사용자그룹 관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-09-09 17:56:25</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class PUGR100 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PUGR100(){
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
	public IDataSet pUGR10001(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.UGRSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	PagenateUtils.setPagenatedParamsToDataSet(requestData);
			IDataSet ds = callSharedBizComponentByDirect(sc, "selectUserGroupList", requestData, onlineCtx);
		 
	    	int totalCount = Integer.valueOf(ds.getField("totalCount"));
			
	    	IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_GROUP);
	    	PagenateUtils.setPagenatedParamToRecordSet(rs, requestData, totalCount);
			responseData.putRecordSet(rs);
			
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"사용자그룹목록조회"}, e);
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
	public IDataSet pUGR10002(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.UGRSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	int cnt = 0;
			
	    	IRecordSet rs = requestData.getRecordSet(DBNamingConstants.AMS_GROUP);
	    	if (rs != null) {
	    		cnt = rs.getRecordCount();
	    	}
	    	IDataSet req = new DataSet();
	    	// 저장 처리
	    	for (int i = 0; i < cnt; i++) {
	    		IRecord r = rs.getRecord(i);
	    		req.putFieldMap(r);
	    		if (Constants.INSERT_FLAG.equals(r.get("Flag"))) {
	    			callSharedBizComponentByDirect(sc, "insertUserGroup", req, onlineCtx);
	    		} else if (Constants.UPDATE_FLAG.equals(r.get("Flag"))) {
	    			callSharedBizComponentByDirect(sc, "updateUserGroup", req, onlineCtx);
	    		} else if (Constants.DELETE_FLAG.equals(r.get("Flag"))) {
	    			callSharedBizComponentByDirect(sc, "deleteUserGroup", req, onlineCtx);
	    		}
	    	}
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"사용자그룹 저장"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

  
}
