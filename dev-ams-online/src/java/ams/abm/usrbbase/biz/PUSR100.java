package ams.abm.usrbbase.biz;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.RecordSet;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.util.DateUtils;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;

import ams.fwk.common.user.IAmsUserInfo;
import ams.fwk.constants.Constants;
import ams.fwk.constants.DBNamingConstants;
import ams.fwk.utils.AmsUtils;
import ams.fwk.utils.BaseUtils;
import ams.fwk.utils.PagenateUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [PU]사용자관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-07-09 10:17:17</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class PUSR100 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PUSR100(){
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
	public IDataSet pUSR10001(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.USRSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
			PagenateUtils.setPagenatedParamsToDataSet(requestData);
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectUserList", requestData, onlineCtx);
	    	
	    	int totalCount = Integer.parseInt(ds.getField("totalCount"));
	    	IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_USER);
	    	
	    	PagenateUtils.setPagenatedParamToRecordSet(rs, requestData, totalCount);
	    	
	    	responseData.putRecordSet(DBNamingConstants.AMS_USER, rs);
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"사용자목록조회"}, e);
		 }
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 * 사용자 상세조회
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pUSR10002(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    SharedBizComponent sc = lookupSharedBizComponent("abm.USRSBase");
	    IDataSet responseData = new DataSet();
	    String userId = requestData.getField("USER_ID");
	    IAmsUserInfo userInfo  = getAmsUserInfo(onlineCtx);
	    Locale locale = userInfo.getLocale();
	    if(StringUtils.isEmpty(userId)) {
	    	throw new BizRuntimeException("M1000002",new String[]{"USER ID"});
	    }
	    Map fileInfoMap = null;
	    try {
	    	IDataSet userInfoDs = callSharedBizComponentByDirect(sc, "selectUser", requestData, onlineCtx);
	    	IRecordSet rs = userInfoDs.getRecordSet(DBNamingConstants.AMS_USER);
	    	if(rs != null && rs.getRecordCount() > 0 ) {
	    		responseData.putFieldMap(rs.getRecordMap(0));
	    		// 사진 출력
	    		if(StringUtils.isNotEmpty(rs.get(0, "IDPIC_FILE_ID"))) {
	    			fileInfoMap = BaseUtils.getUploadedFileInfoById((String)rs.get(0, "IDPIC_FILE_ID"));
	    			if(fileInfoMap!=null) {
	    				responseData.putFieldMap(fileInfoMap);
	    			}
	    		}
	    	}
	    	
	    	// user_id에 해당하는 그룹 목록 조회 
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectUserGroupListByUser", requestData, onlineCtx);
    		IRecordSet rs2 = ds.getRecordSet(DBNamingConstants.AMS_USER_GROUP_MAPPING);
    		if(rs2 != null && rs2.getRecordCount() > 0 ) {	
	    		String group_id = rs2.getRecord(0).get(DBNamingConstants.GROUP_ID);
	    		responseData.putField(DBNamingConstants.GROUP_ID, group_id);
	    	}
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000",new String[]{"사용자상세조회"},  e);
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
	public IDataSet pUSR10003(IDataSet requestData, IOnlineContext onlineCtx){
		Log log = getLog(onlineCtx);
	    SharedBizComponent sc = lookupSharedBizComponent("abm.USRSBase");
	    IAmsUserInfo userInfo = getAmsUserInfo(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
			//이곳에 개발소스를 작성해주세요
	    	//날짜
	    	String BRTHDY_DT = requestData.getField("BRTHDY_DT").replaceAll("-", "");
	    	requestData.putField("BRTHDY_DT", BRTHDY_DT);
	    	
	    	//IP 정보 입력
			requestData.putField("IP",userInfo.getIp());
			//최종 패스워드 수정 일자
			requestData.putField("LAST_MOD_PASSWD_DT", DateUtils.getCurrentDate());
			
			//증명사진 File ID 등록
			requestData.putField("IDPIC_FILE_ID", requestData.getField("FILE_ID"));
			
			callSharedBizComponentByDirect(sc, "updateUserInfo", requestData, onlineCtx);
						
			// 파일 업로드
			IDataSet fileDS = new DataSet();
			fileDS.putField("PROGRAM_ID", requestData.getField("PROGRAM_ID"));
			
			//증명사진이 있을 수도 있고 없을 수도 있으므로 File ID가 없는 경우는 파일정보에 대한 DB저장을 하지 않는다.
			if(StringUtils.isNotEmpty(requestData.getField("FILE_ID"))) {
				IRecordSet rs = new RecordSet(Constants.FILE_LIST, new String[]{"FILE_ID","FILE_NAME","FILE_PATH","FILE_SIZE","TYPE_ID"});
				
				IRecord record = rs.newRecord();
				
				record.set("FILE_ID", requestData.getField("FILE_ID"));
				record.set("FILE_NAME", requestData.getField("FILE_NAME"));
				record.set("FILE_PATH", requestData.getField("FILE_PATH"));
				record.set("FILE_SIZE", requestData.getField("FILE_SIZE"));
				record.set("TYPE_ID", "IMG");
				fileDS.putRecordSet(Constants.FILE_LIST, rs);
				
				//파일정보를 DB에 등록하기 위해 추가(2013.03.07 by PSI)
				BaseUtils.fileUpload(fileDS, onlineCtx);
			}
			
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"Update UserInfo"}, e);
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
	public IDataSet pUSR10004(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    SharedBizComponent sc = lookupSharedBizComponent("abm.USRSBase");
	    IAmsUserInfo userInfo = getAmsUserInfo(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"Update UserInfo"}, e);
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
	public IDataSet pUSR10005(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    SharedBizComponent sc = lookupSharedBizComponent("abm.USRSBase");
	    IAmsUserInfo userInfo = getAmsUserInfo(onlineCtx);
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
			//이곳에 개발소스를 작성해주세요
	    	//날짜
	    	String BRTHDY_DT = requestData.getField("BRTHDY_DT").replaceAll("-", "");
	    	requestData.putField("BRTHDY_DT", BRTHDY_DT);
	    	
	    	//패스워드 생성
			String newPassword = BaseUtils.createPassword();
			String encPassword= AmsUtils.encryptPassword(newPassword);
			if(log.isDebugEnabled())log.debug("[New Password : "+newPassword+"]");
			requestData.putField("USER_PASSWORD", encPassword);
			
			//2차패스워드 설정
			String secondPasswdYn = requestData.getField(DBNamingConstants.SECOND_PASSWORD+"_USEYN");
			if("Y".equals(secondPasswdYn)) {
				String newPassword2 = BaseUtils.createPassword();
				String encPassword2= AmsUtils.encryptPassword(newPassword);
				requestData.putField("SECOND_PASSWORD", encPassword2);
				if(log.isDebugEnabled())log.debug("[New Second Password : "+newPassword2+"]");
			}
			
			//IP 정보 입력
			requestData.putField("IP",userInfo.getIp());
			//최종 패스워드 수정 일자
			requestData.putField("LAST_MOD_PASSWD_DT", DateUtils.getCurrentDate());
			//증명사진 File ID 등록
			requestData.putField("IDPIC_FILE_ID", requestData.getField("FILE_ID"));
			
	    	callSharedBizComponentByDirect(sc, "insertUserInfo", requestData, onlineCtx);
	    	
	    	// 파일 업로드
			IDataSet fileDS = new DataSet();
			fileDS.putField("PROGRAM_ID", requestData.getField("PROGRAM_ID"));
			
			//증명사진이 있을 수도 있고 없을 수도 있으므로 File ID가 없는 경우는 파일정보에 대한 DB저장을 하지 않는다.
			if(StringUtils.isNotEmpty(requestData.getField("FILE_ID"))) {
				IRecordSet rs = new RecordSet(Constants.FILE_LIST, new String[]{"FILE_ID","FILE_NAME","FILE_PATH","FILE_SIZE","TYPE_ID"});
				IRecord record = rs.newRecord();
				
				record.set("FILE_ID", requestData.getField("FILE_ID"));
				record.set("FILE_NAME", requestData.getField("FILE_NAME"));
				record.set("FILE_PATH", requestData.getField("FILE_PATH"));
				record.set("FILE_SIZE", requestData.getField("FILE_SIZE"));
				record.set("TYPE_ID", "IMG");
				fileDS.putRecordSet(Constants.FILE_LIST, rs);
				
				//파일정보를 DB에 등록하기 위해 추가(2013.03.07 by PSI)
				BaseUtils.fileUpload(fileDS, onlineCtx);
			}
			IDataSet ds = callSharedBizComponentByDirect(sc, "insertUserGroupMapping", requestData, onlineCtx);		
			
			// 패스워드 이메일로 보내기
			List to = new ArrayList<String>();
		    to.add(requestData.getField("EMAIL"));
		    String html = "가입정보는<br/>사용자 ID : " + requestData.getField("USER_ID") + "<br/>패스워드 : "+ newPassword + "<br/>입니다. <br/>감사합니다."; 
		    BaseUtils.sendMail("hunkee1017@sk.com", to, null, null, "[AMS]가입정보입니다", html);
			
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"Insert UserInfo"}, e);
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
	public IDataSet pUSR10006(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.USRSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	PagenateUtils.setPagenatedParamsToDataSet(requestData);
	    	
			IDataSet ds = callSharedBizComponentByDirect(sc, "selectUserSsoList", requestData, onlineCtx);
			
			IRecordSet rs = ds.getRecordSet("AMS_USER_SSO");
			
			int totalCount = Integer.parseInt(ds.getField("totalCount"));
			
			PagenateUtils.setPagenatedParamToRecordSet(rs, requestData, totalCount);
		 
			responseData.putRecordSet(rs);
			
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"SSO 직원검색"}, e);
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
	public IDataSet pUSR10007(IDataSet requestData, IOnlineContext onlineCtx){
	     Log log = getLog(onlineCtx);
	     SharedBizComponent sc = lookupSharedBizComponent("abm.USRSBase");
	     IDataSet responseData = new DataSet();
		     //DM개발시에는 이 try-catch를 제거해도 무관함.
		 try {
			 
			 	// 새로운 패스워드 생성
				String newPassword = requestData.getField("NEW_PASSWORD");
				String encPassword= AmsUtils.encryptPassword(newPassword);
			  
				if(log.isDebugEnabled())log.debug("[New Password : "+newPassword+"]");
				requestData.putField(DBNamingConstants.USER_PASSWORD, encPassword);
				
				requestData.putField(DBNamingConstants.FRT_LOGIN_FLAG, "N");
				
		    	callSharedBizComponentByDirect(sc, "changePassword", requestData, onlineCtx);
			 
		 } catch(BizRuntimeException e) {
			 throw e;
		 } catch(Exception e) {
			 throw new BizRuntimeException("M1000000", new String[]{"사용자비밀번호변경"}, e);
		 }
		 	// 처리 결과값을 responseData에 넣어서 리턴하십시오
		 	// 메시지코드는 환경에 맞게 변경하십시오.    
		 responseData.setOkResultMessage("M3000000", null);
		
		 return responseData;
	}
}
