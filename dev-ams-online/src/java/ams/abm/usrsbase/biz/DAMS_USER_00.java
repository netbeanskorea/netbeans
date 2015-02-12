package ams.abm.usrsbase.biz;

import java.util.Map;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.ResultMessage;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.util.AppUtils;

import org.apache.commons.logging.Log;

import ams.fwk.constants.DBNamingConstants;
import ams.fwk.utils.BaseUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [DU]사용자테이블</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-08-14 13:18:04</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class DAMS_USER_00 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DAMS_USER_00(){
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
	public IDataSet selectUser(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    IRecordSet rs = dbSelect("selectUser", requestData.getFieldMap(), onlineCtx);
	    
	    responseData.putRecordSet(DBNamingConstants.AMS_USER, rs);
	    
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
	public IDataSet updateFailCntInit(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    
	    int cnt = dbUpdate("updateFailCntInit", requestData.getFieldMap(), onlineCtx);
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
	public IDataSet updateAutoLoginInfo(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	   
	    int cnt = 0;
	    if("oracle".equals(BaseUtils.getDbKind())){
	    	cnt = dbUpdate("updateAutoLoginInfo", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	cnt = dbUpdate("updateAutoLoginInfo_MSSQL", requestData.getFieldMap(), onlineCtx);
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
	public IDataSet selectUserForAutoLogin(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();

	    IRecordSet rs = dbSelect("selectUserForAutoLogin", requestData.getFieldMap(), onlineCtx);
	    if(rs.getRecordCount() > 0) {
	    	responseData.putFieldMap(rs.getRecordMap(0));
	    } 
		
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
	public IDataSet updateFailCntAndUserLock(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    
	    int updateCnt = 0;
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	updateCnt = dbUpdate("updateFailCntAndUserLock", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	updateCnt = dbUpdate("updateFailCntAndUserLock_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
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
	public IDataSet selectUserList(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    
	    IRecordSet rs = null;
	    IRecord r = null;
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	rs = dbSelect("selectUserList", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectUserListCount", requestData.getFieldMap(), onlineCtx);
	    }else{
	    	rs = dbSelect("selectUserList_MSSQL", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectUserListCount_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    responseData.putField("totalCount", r.getInt("totalCount"));
	    responseData.putRecordSet(DBNamingConstants.AMS_USER, rs);
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
	public IDataSet insertUserInfo(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	dbInsert("insertUserInfo", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	dbInsert("insertUserInfo_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
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
	public IDataSet updateUserInfo(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	dbUpdate("updateUserInfo", requestData.getFieldMap(), onlineCtx);
	    }else{
	    	dbUpdate("updateUserInfo_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
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
	public IDataSet selectUserSsoList(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecordSet rs = null;
	    IRecord r = null;
	    
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	rs = dbSelect("selectUserSsoList", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectUserSsoListCount", requestData.getFieldMap(), onlineCtx);
	    }else{
	    	rs = dbSelect("selectUserSsoList_MSSQL", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectUserSsoListCount_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
		responseData.putField("totalCount", r.get("totalCount"));
		responseData.putRecordSet("AMS_USER_SSO", rs);
	    
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
	public IDataSet selectUserByLogin(IDataSet requestData, IOnlineContext onlineCtx){
	     Log log = getLog(onlineCtx);
	     IDataSet responseData = new DataSet();
	     IRecordSet rs = dbSelect("selectUserByUserId", requestData.getFieldMap(), onlineCtx);
	    
	     responseData.putRecordSet(DBNamingConstants.AMS_USER, rs);	
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
	public IDataSet changePassword(IDataSet requestData, IOnlineContext onlineCtx){
	  Log log = getLog(onlineCtx);
	  IDataSet responseData = new DataSet();
	     //DM개발시에는 이 try-catch를 제거해도 무관함.
	  
	  dbUpdate("changePassword", requestData.getFieldMap(), onlineCtx);
	
	  return responseData;
	}
  
}
