package ams.abm.usrsbase.biz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.logging.Log;

import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.constants.Constants;
import ams.fwk.constants.DBNamingConstants;
import ams.fwk.utils.AmsUtils;
import ams.fwk.utils.BaseUtils;

import com.star.nexcore.foundation.util.StringUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [FU]사용자관련 처리함수</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-08-14 13:14:09</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class FUSR100 extends ams.fwk.base.FunctionUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public FUSR100(){
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
	public IDataSet selectUserByUserId(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    IDataSet userDs = new DataSet();
	    
	    DAMS_USER_00 dAMS_USER_00 = (DAMS_USER_00)lookupDataUnit(DAMS_USER_00.class);
	    try {
	    	userDs = dAMS_USER_00.selectUserByLogin(requestData, onlineCtx);
	    	IRecordSet rs = userDs.getRecordSet(DBNamingConstants.AMS_USER);
	    	if(rs.getRecordCount() != 1) {
	 	    	throw new BizRuntimeException("M1000009");
	 	    }
	 	    responseData.putFieldMap(rs.getRecordMap(0));
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"사용자 조회중"}, e);
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
	public IDataSet updateUserInfoWithLoginProcess(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    DAMS_USER_00  dAMS_USER_00 = (DAMS_USER_00)lookupDataUnit(DAMS_USER_00.class);
	    try {
	    	dAMS_USER_00.updateFailCntInit(requestData, onlineCtx);//사용자 로그인횟수 초기화
	    	dAMS_USER_00.updateAutoLoginInfo(requestData, onlineCtx);//자동로그인 정보 업데이트
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("message code", e);
		 }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    return responseData;
	 }

	/**
	 * 사용자 계정 잠금 처리 및 로그인실패회수 증가
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet loginFailCountUp(IDataSet requestData, IOnlineContext onlineCtx){
		Log log = getLog(onlineCtx);
		IDataSet updateFailCntDs = new DataSet();
	    IDataSet responseData = new DataSet();
	    DAMS_USER_00 dAMS_USER_00 = (DAMS_USER_00)lookupDataUnit(DAMS_USER_00.class);
	    try {
			String failCntStr = requestData.getField("FAIL_CNT");
			int failCnt = 0;
			if(StringUtils.isEmpty(failCntStr)) {
				failCnt = 0;
			} else {
				failCnt = Integer.parseInt(failCntStr);
			}			
			
			if(log.isDebugEnabled()) {
				log.debug("Login Fail Cnt : " + (failCnt));
			}
			updateFailCntDs.putField(DBNamingConstants.FAIL_CNT, failCnt+1);
			if((failCnt+1) >= Constants.LOGIN_FAIL_MAX_CNT) {
				updateFailCntDs.putField(DBNamingConstants.LOCK_YN, "Y");
			} else {
				updateFailCntDs.putField(DBNamingConstants.LOCK_YN, "N");
			}
			updateFailCntDs.putField(DBNamingConstants.USER_ID, requestData.getField(DBNamingConstants.USER_ID));
			dAMS_USER_00.updateFailCntAndUserLock(updateFailCntDs, onlineCtx);
			
			responseData.putField(DBNamingConstants.FAIL_CNT, failCnt+1);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"계정잠금처리"},  e);
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
	public IDataSet changeUserPassword(IDataSet requestData, IOnlineContext onlineCtx){
		Log log = getLog(onlineCtx);
	   // SharedBizComponent sc = lookupSharedBizComponent("abm.USRSBase");//같은 컴포넌트에 있을 때는 call서비스 할 필요없음.
	    DAMS_USER_00 dAMS_USER_00  = (DAMS_USER_00)lookupDataUnit(DAMS_USER_00.class);
	    IDataSet userDataSet = new DataSet();
		IDataSet responseData = new DataSet();
		List to = new ArrayList<String>();
		try {
		
			// 새로운 패스워드 생성
			String newPassword = BaseUtils.createPassword();
			String encPassword= AmsUtils.encryptPassword(newPassword);
		  
			if(log.isDebugEnabled())log.debug("[New Password : "+newPassword+"]");
			requestData.putField(DBNamingConstants.USER_PASSWORD, encPassword);
			
			requestData.putField(DBNamingConstants.FRT_LOGIN_FLAG, "Y");
			dAMS_USER_00.changePassword(requestData, onlineCtx);
	    	//callSharedBizComponentByDirect(sc, "changePassword", requestData, onlineCtx); //같은 컴포넌트에 있을 때는 call서비스 할 필요없음.
			userDataSet = dAMS_USER_00.selectUser(requestData, onlineCtx);
			IRecordSet rs = userDataSet.getRecordSet(DBNamingConstants.AMS_USER);
			String email = "";
			if(rs!=null && rs.getRecordCount() == 1) {
				email = rs.get(0, DBNamingConstants.EMAIL);
				if(StringUtils.isNotEmpty(email)) {
					to.add(email);
				} else {
					 to.add("hunkee1017@sk.com");
				     to.add("psi728@sk.com");
				}
				
			} else {
				throw new BizRuntimeException("M1000000", new String[]{"사용자 비밀번호변경(사용자정보취득이 불가) "});
			}
			
			// 패스워드 이메일로 보내기
		    String html = "가입정보는<br/>사용자 ID : " + requestData.getField(DBNamingConstants.USER_ID) + "<br/>패스워드 : "+ newPassword + "<br/>입니다. <br/>감사합니다."; 
		    BaseUtils.sendMail("hunkee1017@sk.com", to, null, null, "[AMS]가입정보입니다", html);
			
		} catch(BizRuntimeException e) {
			throw e;
		} catch(Exception e) {
			throw new BizRuntimeException("M1000000", new String[]{"사용자 비밀번호변경"}, e);
		}
	
		return responseData;
	}
  
}
