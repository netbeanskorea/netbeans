package ams.fwk.common.user;

import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import nexcore.framework.core.data.user.IUserInfo;
import ams.fwk.common.TrtmRsltMsg;

/**
 * @author 08158
 *
 */
public interface IAmsUserInfo extends IUserInfo {

	/*
	 * 지정된 key를 통해 사용자정보에 등록된 value를 취득한다. 
	 * @see java.util.Map#get(java.lang.Object)
	 */
	public Object get(Object key);

	/*
	 * Map에 저장되어 있는 Key를 Set 형식으로 취득한다.
	 * @see java.util.Map#keySet()
	 */
	public Set keySet();

	/* 
	 * Map에 대한 Value들을 Collection 타입을 반환한다.
	 * @see java.util.Map#values()
	 */
	public Collection values() ;

	public Set entrySet();
	
	
	//=============================업무사용자와  관련된 정보 시작=====================================
	
	/**
	 * 사용자의 이름을 반환한다.
	 * @return the userName
	 */
	public String getUserName();
	
	/**
	 * 사용자 정보에 등록되어 있는 2차 패스워드를 반환한다.(암호화되어 있음)
	 * @return the secondPassword
	 */
	public String getSecondPassword();
	
	/**
	 * 2차 패스워드 사용여부를 반환한다.
	 * @return the useSecondPassword
	 */
	public String getUseSecondPassword();
	
	/**
	 * 사용자의 그룹을 반환한다.
	 * @return the userGroup
	 */
	public List getUserGroupList();
	
	/**
	 * 사용여부 플래그를 반환한다.
	 * @return the useFlag
	 */
	public String getUseFlag();
	
	/**
	 * 전화번호를 반환한다.
	 * @return the telNo
	 */
	public String getTelNo();
	
	/**
	 * 모바일 번호를 반환한다,
	 * @return the mobileNo
	 */
	public String getMobileNo();
	
	/**
	 * 팩스번호를 반환한다.
	 * @return the faxNo
	 */
	public String getFaxNo();
	
	/**
	 * 이메일을 반환한다.
	 * @return the email
	 */
	public String getEmail();

	/**
	 * 우편번호를 반환한다.
	 * @return the zipCode
	 */
	public String getZipCode();
	
	/**
	 * 상세주소를 반환한다.
	 * @return the addrDetail
	 */
	public String getAddrDetail();
	
	/**
	 * 지사팀을 반환한다.
	 * @return the compBranchTeam
	 */
	public String getTeamCd();

	/**
	 * @return the status
	 */
	public String getStatus();

	/**
	 * 로그인 실패횟수를 반환한다.
	 * @return the failCnt
	 */
	public int getFailCnt();
	
	/**
	 * 로그인을 실시한 시간을 반환한다.
	 * @return the loginTime
	 */
	public String getLoginTime();

	/**
	 * 사용자별 화면메뉴리스트를 반환한다.
	 * @return AmsMenuInfo
	 */
	public List<Map<String, Object>> getAmsMenuInfo();
	
	/**
	 * 메뉴변경여부 취득
	 * @return
	 */
	public boolean getIsNewMenu();
	
	/**
	 * 사용자가 메뉴를 취득한 시간을  저장하여 UI의 메뉴refresh시 이용한다.
	 * @return
	 */
	public String getMenuTimeStamp();
	
	/**
	 * 사용자의 권한리스트를 반환한다.
	 * @return AmsRoleInfo
	 */
	public List<Map<String, Object>> getAmsRoleInfo();
	
	/**
	 * 사번반환
	 * @return
	 */
	public String getEmpId();

	/**
	 * 결제권한 반환
	 * @return
	 */
	public String getApprovalAuth();
	
	/**
	 * Map에서 생일을 취득한다. 
	 * @return
	 */
	public String getBrthdyDt();
	
	//=============================업무사용자와  관련된 정보 끝 =====================================
	
	//=============================업무처리 관련 정보 취득 시작 =======================================
	/**
	 * Context path를 반환한다. 
	 * @return
	 */
	public String getContextPath();
	
	/**
	 * HttpServletRequest로부터 취득한 URI를 return 한다.
	 * @return
	 */
	public String getRequestURI();
	/**
	 * UI로 부터 넘어온 화면ID를 return한다.
	 * @return
	 */
	public String getMenuId();
	
	/**
	 * 메시지 List 반환
	 * @return
	 */
	public List<TrtmRsltMsg> getMsgList();
	
	/**
	 * 메시지 Cnt반환
	 * @return
	 */
	public int getMsgCnt();
	
	/**
	 * 저장된 M모드 UPDATE_TIME을 반환
	 * @return
	 */
	public String getMModeTimeStamp();
	
	/**
	 * Client OS버전을 취득한다.
	 * @return
	 */
	public String getOSVer();
	
	
	/**
	 * Client 브라우저 버전을 취득한다.
	 * @return
	 */
	public String getAgentVer();
	
	/**
	 * 파일채번 반환
	 * @return
	 */
	public String getFileSeqNo();
	
	/**
	 * 파일채번 리스트 반환
	 * @return
	 */
	public List<String> getFileSeqNoList() ;
	
	
	/**
	 * 내정보 변경에서 2차 패스워드 체크를 통과 했는지 여부에 대해 설정
	 * @return 
	 */
	public boolean getSecondPasswordPass();

	public String getDeptCd() ;
	
	public String getCorpCd() ;
	
	public  String getPartCd();
	
	public List getNoticeList();
	//=============================업무처리 관련 정보 취득 끝 =======================================

	@Override
	/*
	 * IP정보를 반환한다.
	 * @see nexcore.framework.core.data.user.IUserInfo#getIp()
	 */
	
	public String getIp();

	/* 
	 * 로케일 정보를 반환한다. 
	 * @see nexcore.framework.core.data.user.IUserInfo#getLocale()
	 */
	@Override
	public Locale getLocale();

	/* 
	 * 사용자 ID를 반환한다. 
	 * @see nexcore.framework.core.data.user.IUserInfo#getLoginId()
	 */
	@Override
	public String getLoginId();

	/* 
	 * 패스워드를 반환한다.
	 * @see nexcore.framework.core.data.user.IUserInfo#getLoginPassword()
	 */
	@Override
	public String getLoginPassword();

	@Override
	public String getPasswordExpireDate();
	
	@Override
	public String toString();
	
	
	/**
	 * 프로젝트 특화 메소드인 경우는 아래에 기입하여 향후 제거를 쉽게 할 수 있도록 한다.  	
	 */
	public List<Map<String, Object>> getPrdGrdInfo();
}
