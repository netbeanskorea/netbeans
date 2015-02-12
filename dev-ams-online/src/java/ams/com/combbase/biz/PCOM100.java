package ams.com.combbase.biz;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.logging.Log;

import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.constants.Constants;
import ams.fwk.constants.DBNamingConstants;
import ams.fwk.utils.AmsUtils;

import com.star.nexcore.foundation.util.StringUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/공통업무</li>
 * <li>단위업무명: [PU]인증관리</li>
 * <li>설 명 :</li>
 * <li>작성일 : 2013-07-09 11:17:13</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 * 
 * @author 박세일 (ParkSeIl)
 */
public class PCOM100 extends ams.fwk.base.ProcessUnit {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PCOM100() {
		super();
	}

	/**
	 * 
	 * 
	 * @author 박세일 (ParkSeIl)
	 * 
	 * @param requestData
	 *            요청정보 DataSet 객체
	 * @param onlineCtx
	 *            요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOM10001(IDataSet requestData, IOnlineContext onlineCtx) {
		Log log = getLog(onlineCtx);
		IDataSet responseData = new DataSet();
		try {
			// 이곳에 개발소스를 작성해주세요
			responseData = doLoginProcess(false, requestData, onlineCtx);
			responseData.setOkResultMessage("M3000000", null);
		} catch (BizRuntimeException e) {
			throw e;
		} catch (Exception e) {
			throw new BizRuntimeException("M1000000", new String[] { "AMS로그인" }, e);
		}
		// 처리 결과값을 responseData에 넣어서 리턴하십시오
		return responseData;
	}

	/**
	 * 
	 * 
	 * @author 박세일 (ParkSeIl)
	 * 
	 * @param requestData
	 *            요청정보 DataSet 객체
	 * @param onlineCtx
	 *            요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOM10002(IDataSet requestData, IOnlineContext onlineCtx) {
		Log log = getLog(onlineCtx);
		IDataSet responseData = new DataSet();
		try {

			// 로그아웃 할 때 처리해줘야 하는 내용이 있으면 추가
			responseData.setOkResultMessage("M3000000", null);
		} catch (BizRuntimeException e) {
			throw e;
		} catch (Exception e) {
			throw new BizRuntimeException("M1000000", e);
		}
		// 처리 결과값을 responseData에 넣어서 리턴하십시오
		return responseData;
	}

	/**
	 * 
	 * 
	 * @author 박세일 (ParkSeIl)
	 * 
	 * @param requestData
	 *            요청정보 DataSet 객체
	 * @param onlineCtx
	 *            요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOM10003(IDataSet requestData, IOnlineContext onlineCtx) {
		Log log = getLog(onlineCtx);
		IDataSet responseData = new DataSet();
		try {
			// 이곳에 개발소스를 작성해주세요
			responseData = doLoginProcess(false, requestData, onlineCtx);
			responseData.setOkResultMessage("M3000000", null);
		} catch (BizRuntimeException e) {
			throw e;
		} catch (Exception e) {
			throw new BizRuntimeException("M1000000", new String[] { "업무로그인" },
					e);
		}
		// 처리 결과값을 responseData에 넣어서 리턴하십시오
		return responseData;
	}

	/**
	 * 
	 * 
	 * @author 박세일 (ParkSeIl)
	 * 
	 * @param requestData
	 *            요청정보 DataSet 객체
	 * @param onlineCtx
	 *            요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOM10004(IDataSet requestData, IOnlineContext onlineCtx) {
		Log log = getLog(onlineCtx);
		IDataSet responseData = new DataSet();
		try {
			// 로그아웃 할 때 처리해줘야 하는 내용이 있으면 추가
			responseData.setOkResultMessage("M3000000", null);

		} catch (BizRuntimeException e) {
			throw e;
		} catch (Exception e) {
			throw new BizRuntimeException("M1000000", new String[]{"업무로그아웃"}, e);
		}
		// 처리 결과값을 responseData에 넣어서 리턴하십시오
		return responseData;
	}

	/**
	 * 자동로그인
	 * 
	 * @author 박세일 (ParkSeIl)
	 * 
	 * @param requestData
	 *            요청정보 DataSet 객체
	 * @param onlineCtx
	 *            요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOM10005(IDataSet requestData, IOnlineContext onlineCtx) {
		IDataSet responseData = new DataSet();
		SharedBizComponent usrSC = lookupSharedBizComponent("abm.USRSBase");
		try {
			// 자동 로그인 KEY를 이용한 로그인
			// 로그인 처리
			// 1. 자동 로그인 여부 확인
			IDataSet autoLoginDsReq = new DataSet();
			/**
			 * 자동로그인 시 ID와 URL만 확인할 수 있도록 해달라는 사업부의 요청에 따라 HASH_VAL, IP는 쿼리문에서
			 * 제외시킴(2013.06.10 by PSI)
			 */
			// autoLoginDsReq.putField("IP", onlineCtx.getUserInfo().getIp());
			// autoLoginDsReq.putField("HASH_VAL",
			// requestData.getField("AUTO_LOGIN_KEY"));
			autoLoginDsReq.putField("USER_ID", requestData.getField("USER_ID"));
			IDataSet autoLoginDsRes = callSharedBizComponentByDirect(usrSC,
					"selectUserForAutoLogin", autoLoginDsReq, onlineCtx);
			String userId = autoLoginDsRes.getField("USER_ID");

			if (StringUtils.isEmpty(userId)) {
				throw new BizRuntimeException("M1000009");
			}

			// 처리 결과값을 responseData에 넣어서 리턴하십시요
			autoLoginDsRes.setOkResultMessage("M3000000", null);

			AmsUtils.cloneUserInfoToOnlineCtxUserInfo(
					autoLoginDsRes.getFieldMap(),
					(AmsUserInfo) onlineCtx.getUserInfo());
		} catch (BizRuntimeException e) {
			throw e;
		} catch (Exception e) {
			throw new BizRuntimeException("M1000000",
					new String[] { "자동 로그인" }, e);
		}
		return responseData;
	}

	/**
	 * 
	 * 
	 * @author 박세일 (ParkSeIl)
	 * 
	 * @param requestData
	 *            요청정보 DataSet 객체
	 * @param onlineCtx
	 *            요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOM10006(IDataSet requestData, IOnlineContext onlineCtx) {
		Log log = getLog(onlineCtx);
	    SharedBizComponent sc = lookupSharedBizComponent("abm.USRSBase");
		IDataSet responseData = new DataSet();
		try {
			 callSharedBizComponentByDirect(sc,"changeUserPassword", requestData, onlineCtx);

		} catch (BizRuntimeException e) {
			throw e;
		} catch (Exception e) {
			throw new BizRuntimeException("message code", e);
		}
		// 처리 결과값을 responseData에 넣어서 리턴하십시오
		return responseData;
	}

	private IDataSet doLoginProcess(boolean isAdmin, IDataSet requestData,
			IOnlineContext onlineCtx) {
		IDataSet responseData = new DataSet();
		IDataSet responseDsExcludeUserInfo = new DataSet();
		SharedBizComponent ugrSC = lookupSharedBizComponent("abm.UGRSBase");
		SharedBizComponent usrSC = lookupSharedBizComponent("abm.USRSBase");
		Log log = getLog(onlineCtx);
		try {
			// 관리자 권한 확인. AMS에서 로그인했는데도 관리자 권한이 없다면 exception발생
			if (isAdmin) {
				IDataSet adminRoleDs = callSharedBizComponentByDirect(ugrSC,
						"selectUserGroupMappingByUser", requestData, onlineCtx);
				IRecordSet adminRoleRs = adminRoleDs
						.getRecordSet(DBNamingConstants.AMS_GROUP_ROLE_MAPPING);

				if (adminRoleRs.getRecordCount() < 1) {
					throw new BizRuntimeException("M1000010");
				}
			}

			// 로그인 처리
			// 1. 세션에 담을 사용자 정보 가져오기
			IDataSet userDs = callSharedBizComponentByDirect(usrSC,
					"selectUserByUserId", requestData, onlineCtx);

			String password = requestData.getField(DBNamingConstants.USER_PASSWORD);
			String encPassword ="";

			responseData = (IDataSet) userDs.clone();

			// 비밀번호 일치 여부 확인
			// SSO 실시 후 거래가 들어오면 패스워드 체크 로직에서 제외
			if (!"Y".equals(requestData.getField("isSSO"))) {
				// 일반 UI를 통해 들어오는 경우는 패스워드를 체크함. SSO가 아닌 이상은 패스워드는 무조건 들어온다. 
				encPassword =  AmsUtils.encryptPassword(password);
				if (!encPassword.equals(userDs.getField("USER_PASSWORD"))) {
					throw new BizRuntimeException("M1000011");
				}
			}

			// 3. 자동로그인DB 반영 & 로그인 실패 카운트 초기화
			IDataSet requestCloneDs = new DataSet();

			String uuid = nexcore.framework.core.util.UUID.randomUUID()
					.toString();
			requestCloneDs.putField("IP", onlineCtx.getUserInfo().getIp());
			requestCloneDs.putField("HASH_VAL", uuid);
			requestCloneDs.putField("USER_ID", requestData.getField("USER_ID"));
			callSharedBizComponentByRequiresNew(usrSC,
					"updateUserInfoWithLoginProcess", requestCloneDs, onlineCtx);


			AmsUtils.cloneUserInfoToOnlineCtxUserInfo(responseData.getFieldMap(), (AmsUserInfo) onlineCtx.getUserInfo());

			//로그인처리 뒤에 사용자 정보를 굳이 DataSet으로 return할 필요는 없음.
			//따라서 후처리에 처리할 context path 유무만을 제외하고는 모두 제외시킴
			//USER_ID만 넘겨달라는 요청에 따라 USER_ID를 response 하는 DataSet에 추가함.(2013.11.05 by PSI)
			responseDsExcludeUserInfo.putField(Constants.IS_AMS_CONTEXT, requestData.getField(Constants.IS_AMS_CONTEXT));
			responseDsExcludeUserInfo.putField(DBNamingConstants.USER_ID,  requestData.getField("USER_ID"));
			
			// 최초로그인여부 로깅
//			if (log.isInfoEnabled())
//				log.info("[" + requestData.getField("USER_ID")
//						+ "] 비밀번호 변경 후 최초 로그인");
			
			if ("Y".equals(userDs.getField(DBNamingConstants.FRT_LOGIN_FLAG))){
				log.info("[" + requestData.getField("USER_ID") + "] 비밀번호 변경 후 최초 로그인");
				responseDsExcludeUserInfo.putField("FRT_LOGIN_FLAG", "Y");
			}
		} catch (BizRuntimeException e) {
			IDataSet lockchekerDs = null;
			String failCnt = "";
			if (e != null) {// User정보가 없거나 패스워드를 틀린경우는 로그인 실패회수 증가
				if ("M1000010".equals(e.getMessageId())
						|| "M1000011".equals(e.getMessageId())) {
					lockchekerDs = callSharedBizComponentByRequiresNew(usrSC,"loginFailCountUp", responseData, onlineCtx);
				}
				failCnt = lockchekerDs.getField(DBNamingConstants.FAIL_CNT);
			}
			throw new BizRuntimeException("M1000012", new String[] { failCnt,
					Constants.LOGIN_FAIL_MAX_CNT + "" }, e);
		} catch (Exception e) {
			throw new BizRuntimeException("M1000000", new String[] { "로그인" }, e);
		}
		return responseDsExcludeUserInfo;
	}

}
