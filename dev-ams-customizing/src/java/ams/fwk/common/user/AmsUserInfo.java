package ams.fwk.common.user;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import nexcore.framework.core.util.BaseUtils;
import ams.fwk.common.TrtmRsltMsg;

public class AmsUserInfo implements IAmsUserInfo, Map {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 4075090800999414944L;

	/**
	 * LOGIN_ID
	 */
	protected static final String LOGIN_ID             = "USER_ID";
	
	/**
	 * USER_NAME
	 */
	protected static final String USER_NAME            = "USER_NAME";
	
	/**
	 * PASSWORD
	 */
	protected static final String LOGIN_PASSWORD       = "USER_PASSWORD";
	
	/**
	 * SECOND_PASSWORD
	 */
	protected static final String SECOND_PASSWORD      = "SECOND_PASSWORD";
	
	/**
	 * USE_SECOND_PASSWORD
	 */
	protected static final String USE_SECOND_PASSWORD  = "USE_SECOND_PASSWORD";
	
	/**
	 * SECOND_PASSWORD
	 */
	protected static final String SECOND_PASSWORD_PASS = "SECOND_PASSWORD_PASS";
	
	/**
	 * USER_GROUP
	 */
	protected static final String USER_GROUP_LIST           = "USER_GROUP_LIST";
	
	/**
	 * USE_FLAG
	 */
	protected static final String USE_FLAG             = "USE_FLAG";
	
	/**
	 * TEL_NO
	 */
	protected static final String TEL_NO               = "TEL_NO";
	
	/**
	 * MOBILE_NO
	 */
	protected static final String MOBILE_NO            = "MOBILE_NO";
	
	/**
	 * FAX_NO
	 */
	protected static final String FAX_NO               = "FAX_NO";
	
	/**
	 * EMAIL
	 */
	protected static final String EMAIL                = "EMAIL";
	
	/**
	 * ZIP_CODE
	 */
	protected static final String ZIP_CODE             = "ZIP_CODE";
	
	/**
	 * ADDR
	 */
	protected static final String ADDR                 = "ADDR";
	
	/**
	 * ADDR_DETAIL
	 */
	protected static final String ADDR_DETAIL          = "ADDR_DETAIL";
	
	/**
	 * BRNOFC_TEAM_CD
	 */
	protected static final String TEAM_CD     = "TEAM_CD";
	
	/**
	 * EMP_ID
	 */
	protected static final String EMP_ID               = "EMP_ID";
	
	/**
	 * STATUS
	 */
	protected static final String STATUS               = "STATUS";
	
	/**
	 * FAIL_CNT
	 */
	protected static final String FAIL_CNT             = "FAIL_CNT";
	
	/**
	 * LOCALE
	 */
	protected static final String LOCALE               = "LOCALE";
	
	/**
	 * IP
	 */
	protected static final String IP                   = "IP";
	
	/**
	 * LOGIN_TIME
	 */
	protected static final String LOGIN_TIME           = "LOGIN_TIME";
    
	/**
	 *EmkMenuInfo 
	 */
	protected static final String MENU_INFO_LIST           = "MENU_INFO_LIST";
	
	/**
	 * EmkRoleInfo
	 */
	protected static final String ROLE_INFO_LIST           = "ROLE_INFO_LIST";
	
	/**
	 * MENU_TIMESTAMP
	 */
	protected static final String MENU_TIMESTAMP	= "MENU_TIMESTAMP";
	
	protected static final String CONTEXT_PATH           = "CONTEXT_PATH";
	
	protected static final String REQEUST_URI           = "REQEUST_URI";
	
	protected static final String MENU_ID           = "MENU_ID";
	
	protected static final String MSG_LIST		= "MSG_LIST";
	
	protected static final String S_MODE_TIMESTAMP	= "S_MODE_TIMESTAMP";
	
	protected static final String OS_VER = "OS_VER";
	
	protected static final String AGENT_VER = "AGENT_VER";
	
	protected static final String APPROVAL_AUTH = "APPROVAL_AUTH";
	
	protected static final String FILE_SEQ_NO = "FILE_SEQ_NO";
	
	protected static final String FILE_SEQ_NO_LIST = "FILE_SEQ_NO_LIST";
	
	protected static final String BRTHDY_DT = "BRTHDY_DT";
	
	protected static final String  IS_NEW_MENU = "IS_NEW_MENU";
	
	protected static final String DEPT_CD = "DEPT_CD";
	protected static final String CORP_CD = "CORP_CD";
	protected static final String PART_CD = "PART_CD";
	protected static final String NOTICE_LIST = "NOTICE_LIST";
	
	
	
    /** 
     * info holder
     */
    protected Map<String, Object> map = null;
    
    public AmsUserInfo () {
    	map = new HashMap<String, Object>();
//    	map.put(LOGIN_ID, "anonymous");
//    	map.put(USER_NAME, "anonymous");
//    	map.put(LOCALE, BaseUtils.getDefaultLocale());
//    	map.put(LOGIN_TIME, System.currentTimeMillis());
	}
	
	public AmsUserInfo (Map<String, Object> map) {
		this.map = map;
	}
	
	/**
     * return internal <code>CastingMap</code>.
     * 
     * @return
     */
    public Map<String, Object> getMap(){
        return map;
    }

	@Override
	public int size() {
		// TODO Auto-generated method stub
		return this.map.size();
	}

	@Override
	public boolean isEmpty() {
		// TODO Auto-generated method stub
		return this.map.isEmpty();
	}

	@Override
	public boolean containsKey(Object key) {
		// TODO Auto-generated method stub
		return this.map.containsKey(key);
	}

	@Override
	public boolean containsValue(Object value) {
		// TODO Auto-generated method stub
		return this.map.containsValue(value);
	}

	@Override
	public Object get(Object key) {
		// TODO Auto-generated method stub
		return this.map.get(key);
	}

	@Override
	public Object put(Object key, Object value) {
		// TODO Auto-generated method stub
		return this.map.put((String)key, value);
	}

	@Override
	public Object remove(Object key) {
		// TODO Auto-generated method stub
		return this.map.remove(key);
	}

	@Override
	public void putAll(Map m) {
		// TODO Auto-generated method stub
		this.map.putAll(m);
	}

	@Override
	public void clear() {
		// TODO Auto-generated method stub
		this.map.clear();
	}

	@Override
	public Set keySet() {
		// TODO Auto-generated method stub
		return this.map.keySet();
	}

	@Override
	public Collection values() {
		// TODO Auto-generated method stub
		return this.map.values();
	}

	@Override
	public Set entrySet() {
		// TODO Auto-generated method stub
		return this.map.entrySet();
	}
	
	/**
	 * @return the userName
	 */
	public String getUserName() {
		return getMap().get(USER_NAME) == null ? "" : (String) getMap().get(USER_NAME);
	}
	
	/**
	 * @return the secondPassword
	 */
	public String getSecondPassword() {
		return getMap().get(SECOND_PASSWORD) == null ? "" : (String) getMap().get(SECOND_PASSWORD);
	}
	
	/**
	 * @return the useSecondPassword
	 */
	public String getUseSecondPassword() {
		return getMap().get(USE_SECOND_PASSWORD) == null ? "" : (String) getMap().get(USE_SECOND_PASSWORD);
	}
	
	/**
	 * @return the userGroup
	 */
	public List getUserGroupList() {
		if(getMap().get(USER_GROUP_LIST) == null) {
			return new ArrayList();
		} else {
			return (List)getMap().get(USER_GROUP_LIST);
		}
	}
	
	/**
	 * @return the useFlag
	 */
	public String getUseFlag() {
		return getMap().get(USE_FLAG) == null ? "" : (String) getMap().get(USE_FLAG);
	}
	
	/**
	 * @return the telNo
	 */
	public String getTelNo() {
		return getMap().get(TEL_NO) == null ? "" : (String) getMap().get(TEL_NO);
	}
	
	/**
	 * @return the mobileNo
	 */
	public String getMobileNo() {
		return getMap().get(MOBILE_NO) == null ? "" : (String) getMap().get(MOBILE_NO);
	}
	
	/**
	 * @return the faxNo
	 */
	public String getFaxNo() {
		return getMap().get(FAX_NO) == null ? "" : (String) getMap().get(FAX_NO);
	}
	
	/**
	 * @return the email
	 */
	public String getEmail() {
		return getMap().get(EMAIL) == null ? "" : (String) getMap().get(EMAIL);
	}

	/**
	 * @return the zipCode
	 */
	public String getZipCode() {
		return getMap().get(ZIP_CODE) == null ? "" : (String) getMap().get(ZIP_CODE);
	}
	
	/**
	 * @return the addrDetail
	 */
	public String getAddrDetail() {
		return getMap().get(ADDR_DETAIL) == null ? "" : (String) getMap().get(ADDR_DETAIL);
	}
	
	/**
	 * @return the compBranchTeam
	 */
	public String getTeamCd() {
		return getMap().get(TEAM_CD) == null ? "" : (String) getMap().get(TEAM_CD);
	}
	
	/**
	 * @return the empId
	 */
	public String getEmpId() {
		return getMap().get(EMP_ID) == null ? "" : (String) getMap().get(EMP_ID);
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return getMap().get(STATUS) == null ? "" : (String) getMap().get(STATUS);
	}	

	/**
	 * @return the failCnt
	 */
	public int getFailCnt() {
		return getMap().get(FAIL_CNT) == null ? 0 : ((BigDecimal) getMap().get(FAIL_CNT)).intValue();
	}
	
	/**
	 * @return the loginTime
	 */
	@Deprecated
	public String getLoginTime() {
		return getMap().get(LOGIN_TIME) == null ? "" : (String) getMap().get(LOGIN_TIME);
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		getMap().put(USER_NAME, userName);
	}
	
	/**
	 * @param secondPassword the secondPassword to set
	 */
	public void setSecondPassword(String secondPassword) {
		getMap().put(SECOND_PASSWORD, secondPassword);
	}
	
	/**
	 * @param useSecondPassword the useSecondPassword to set
	 */
	public void setUseSecondPassword(String useSecondPassword) {
		getMap().put(USE_SECOND_PASSWORD, useSecondPassword);
	}
	
	/**
	 * @param userGroup the userGroup to set
	 */
	public void setUserGroupList(List userGroupList) {
		getMap().put(USER_GROUP_LIST, userGroupList);
	}

	/**
	 * @param useFlag the useFlag to set
	 */
	public void setUseFlag(String useFlag) {
		getMap().put(USE_FLAG, useFlag);
	}
	
	/**
	 * @param telNo the telNo to set
	 */
	public void setTelNo(String telNo) {
		getMap().put(TEL_NO, telNo);
	}
	
	/**
	 * @param mobileNo the mobileNo to set
	 */
	public void setMobileNo(String mobileNo) {
		getMap().put(MOBILE_NO, mobileNo);
	}
	
	/**
	 * @param faxNo the faxNo to set
	 */
	public void setFaxNo(String faxNo) {
		getMap().put(FAX_NO, faxNo);
	}
	
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		getMap().put(EMAIL, email);
	}
	
	/**
	 * @param zipCode the zipCode to set
	 */
	public void setZipCode(String zipCode) {
		getMap().put(ZIP_CODE, zipCode);
	}
	
	/**
	 * @param addr the addr to set
	 */
	public void setAddr(String addr) {
		getMap().put(ADDR, addr);
	}
	
	/**
	 * @param addrDetail the addrDetail to set
	 */
	public void setAddrDetail(String addrDetail) {
		getMap().put(ADDR_DETAIL, addrDetail);
	}
	
	/**
	 * @param compBranchTeam the compBranchTeam to set
	 */
	public void setTeamCd(String teamCd) {
		getMap().put(TEAM_CD, teamCd);
	}
	
	/**
	 * @param empId the empId to set
	 */
	public void setEmpId(String empId) {
		getMap().put(EMP_ID, empId);
	}
	
	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		getMap().put(STATUS, status);
	}

	/**
	 * @param failCnt the failCnt to set
	 */
	public void setFailCnt(int failCnt) {
		getMap().put(FAIL_CNT, failCnt);
	}
	
	/**
	 * @param AmsMenuInfo
	 */
	public void setAmsMenuInfo(List<Map<String, Object>> amsMenuInfoList) {
		getMap().put(MENU_INFO_LIST, amsMenuInfoList);
	}
	
	/**
	 * @return AmsMenuInfo
	 */
	public List<Map<String, Object>> getAmsMenuInfo() {
		return (List<Map<String, Object>>)getMap().get(MENU_INFO_LIST);
	}
	
	/**
	 * 메뉴변경여부 입력
	 * @param isNewMenu
	 */
	public void setIsNewMenu(boolean isNewMenu) {
		getMap().put(IS_NEW_MENU, isNewMenu);
	}
	
	/**
	 * 메뉴변경여부 취득
	 * @return
	 */
	public boolean getIsNewMenu() {
		return (Boolean)getMap().get(IS_NEW_MENU);
	}
	
	/**
	 * @param yyyyMMddHHmmssSSS
	 */
	public void setMenuTimeStamp(String yyyyMMddHHmmssSSS) {
		getMap().put(MENU_TIMESTAMP, yyyyMMddHHmmssSSS);
	}
	
	/**
	 * @return
	 */
	public String getMenuTimeStamp() {
		return (String)getMap().get(MENU_TIMESTAMP);
	}
	/**
	 * @param emkRoleInfo
	 */
	public void setAmsRoleInfo(List<Map<String, Object>>amsRoleInfoList) {
		getMap().put(ROLE_INFO_LIST, amsRoleInfoList);
	}
	
	/**
	 * @return EmkRoleInfo
	 */
	public List<Map<String, Object>> getAmsRoleInfo() {
		return (List<Map<String, Object>>)getMap().get(ROLE_INFO_LIST);
	}
	
	/**
	 * @param contextPath
	 */
	public void setContextPath(String contextPath) {
		getMap().put(CONTEXT_PATH, contextPath);
	}
	
	/**
	 * @return
	 */
	public String getContextPath() {
		return (String)getMap().get(CONTEXT_PATH);
	}
	
	/**
	 * HttpServletRequest로부터 취득한 URI를 return 한다.
	 * @return
	 */
	public String getRequestURI() {
		return (String)getMap().get(REQEUST_URI);
	}
	
	/**
	 * HttpServletRequest로부터 취득한 URI를 넣는다.
	 * @param requestURI
	 */
	public void setRequestURI(String requestURI) {
		getMap().put(REQEUST_URI, requestURI);
	}
	/**
	 * UI에서 보낸 화면ID를 셋팅한다
	 * @param menuId
	 */
	public void setMenuId(String menuId) {
		getMap().put(MENU_ID, menuId);
	}
	
	/**
	 * 저장된 화면ID를 return한다.
	 * @return
	 */
	public String getMenuId() {
		return (String)getMap().get(MENU_ID);
	}
	
	/**
	 * 메시지 추가
	 * @param msg
	 */
	public void addMsgList(TrtmRsltMsg msg) {
		List<TrtmRsltMsg>msgList = getMsgList();
		if(msgList == null) {
			msgList = new ArrayList<TrtmRsltMsg>();
		}
		msgList.add(msg);
	}
	
	/**
	 * 메시지 List 반환
	 * @return
	 */
	public List<TrtmRsltMsg> getMsgList() {
		return (List<TrtmRsltMsg>)getMap().get(MSG_LIST);
	}
	
	/**
	 * 메시지 List 입력
	 * @param msgList
	 */
	public void setMsgList(List<TrtmRsltMsg> msgList) {
		getMap().put(MSG_LIST, msgList);
	}
	/**
	 * 메시지 Cnt반환
	 * @return
	 */
	public int getMsgCnt() {
		List<TrtmRsltMsg> msgList = getMsgList();
		if(msgList != null) {
			return msgList.size();
		} else {
			return 0;
		}
	}
	
	/**
	 * 메시지를 초기화한다.
	 */
	public void refreshMsg() {
		List<TrtmRsltMsg> msgList = getMsgList();
		if(msgList != null) {
			msgList.clear();
		}
	}
	
	/**
	 * M모드 UPDATE_TIME 저장
	 * @param yyyyMMddHHmmssSSS
	 */
	public void setMModeTimeStamp(String yyyyMMddHHmmssSSS) {
		getMap().put(S_MODE_TIMESTAMP, yyyyMMddHHmmssSSS);
	}
	
	/**
	 * 저장된 M모드 UPDATE_TIME을 반환
	 * @return
	 */
	public String getMModeTimeStamp() {
		return (String)getMap().get(S_MODE_TIMESTAMP);
	}

	/**
	 * Client OS 버전을 설정한다. 
	 * @param osVer
	 */
	public void setOSVer(String osVer) {
		getMap().put(OS_VER, osVer);
	}
	
	/**
	 * Client OS버전을 취득한다.
	 * @return
	 */
	public String getOSVer() {
		return (String)getMap().get(OS_VER);
	}

	/**
	 * Client의 브라우저 버전을 설정한다.
	 * @param agentVer
	 */
	public void setAgentVer(String agentVer) {
		getMap().put(AGENT_VER, agentVer);
	}
	
	/**
	 * Client의 브라우저 버전을 취득한다. 
	 * @return
	 */
	public String getAgentVer() {
		return (String)getMap().get(AGENT_VER);
	}
	
	
	/**
	 * 결제권한 반환
	 * @return
	 */
	public String getApprovalAuth() {
		return (String)getMap().get(APPROVAL_AUTH);
	}
	
	/**
	 * 결제권한 입력
	 * @param approvalAuth
	 */
	public void setApprovalAuth(String approvalAuth) {
		getMap().put(APPROVAL_AUTH, approvalAuth);
	}
	
	/**
	 * 파일정보 Insert시를 위한 채번 취득
	 */
	public String getFileSeqNo() {
		return (String)getMap().get(FILE_SEQ_NO);
	}
	
	/**
	 * 파일정보 insert시 필요한 채번을 설정한다.
	 * @param fileSeqNo
	 */
	public void setFileSeqNo(String fileSeqNo) {
		getMap().put(FILE_SEQ_NO, fileSeqNo);
	}
	
	/**
	 * 파일 SeqNo를 Map에서 remove한다.
	 */
	public void removeFileSeqNo() {
		getMap().remove(FILE_SEQ_NO);
	}
	
	/**
	 * 파일SEQ LIST를 반환한다.
	 * @return
	 */
	public List<String> getFileSeqNoList() {
		return (List<String>)getMap().get(FILE_SEQ_NO_LIST);
	}
	
	/**
	 * 파일 SEQ List를 Map에 Put한다
	 * @param fileSeqNoList
	 */
	public void setFileSeqNoList(List<String> fileSeqNoList	) {
		getMap().put(FILE_SEQ_NO_LIST, fileSeqNoList);
	}
	
	/**
	 * 파일 SEQ List에 FILE_SEQ_NO를 add한다.
	 * @param fileSeqNo
	 */
	public void addFileSeqNoToList(String fileSeqNo) {
		List<String>fileSeqNoList = getFileSeqNoList();
		if(fileSeqNoList == null) {
			fileSeqNoList = new ArrayList<String>();
			setFileSeqNoList(fileSeqNoList);
		}
		fileSeqNoList.add(fileSeqNo);
	}
	
	/**
	 * Map 저장되어 있던 FILE SEQ NO Lis를 삭제한다. 
	 */
	public void removeFileSeqNoList() {
		getMap().remove(FILE_SEQ_NO_LIST);
	}
	
	
	/**
	 * Map에서 생일을 취득한다. 
	 * @return
	 */
	public String getBrthdyDt() {
		return (String)getMap().get(BRTHDY_DT);
	}
	
	/**
	 * Map에 생일을 저장한다.
	 * @param brthdyDt
	 */
	public void setBrthdyDt(String brthdyDt) {
		getMap().put(BRTHDY_DT, brthdyDt);
	}
	
	/**
	 * 내정보 변경에서 2차 패스워드 체크를 통과 했는지 여부에 대해 설정
	 * @return 
	 */
	public boolean getSecondPasswordPass() {
		Object pass = getMap().get(SECOND_PASSWORD_PASS);
		if(pass==null) return false;
		return (Boolean)pass;
	}
	
	/**
	 * 내정보 변경에서 2차 패스워드 체크를 통과 했는지 여부에 대해 설정
	 * @param pass 
	 */
	public void setSecondPasswordPass(boolean pass) {
		getMap().put(SECOND_PASSWORD_PASS, pass);
	}
	
	/**
	 * 공지사항을 취득한다.
	 * @return
	 */
	public List getNoticeList() {
		return (List)getMap().get(NOTICE_LIST);
	}
	
	/**
	 * 공지사항을 넣는다.
	 * @param noticeList
	 */
	public void setNoticeList(List noticeList) {
		getMap().put(NOTICE_LIST, noticeList);
	}
	
	/**
	 * 공지사항을 삭제한다.
	 */
	public void removeNoticeList() {
		getMap().remove(NOTICE_LIST);
	}
	
	public String getDeptCd() {
		return (String) getMap().get(DEPT_CD);
	}

	public void setDeptCd(String deptCd) {
		getMap().put(DEPT_CD, deptCd);
	}
	
	public String getCorpCd() {
		return (String) getMap().get(CORP_CD);
	}

	public void setCorpCd(String corpCd) {
		getMap().put(CORP_CD, corpCd);
	}
	
	public  String getPartCd() {
		return (String) getMap().get(PART_CD);
	}

	public void setPartCd(String partCd) {
		getMap().put(PART_CD, partCd);
	}
	
	@Override
	public String getIp() {
		return getMap().get(IP) == null ? "" : (String) getMap().get(IP);
	}

	@Override
	public Locale getLocale() {
		Locale locale;
		if (getMap().get(LOCALE) == null) {
			locale = BaseUtils.getDefaultLocale();
		} else {
			locale = (Locale) getMap().get(LOCALE);
		}
		return locale;
	}

	@Override
	public String getLoginId() {
		return getMap().get(LOGIN_ID) == null ? "" : (String) getMap().get(LOGIN_ID);
	}

	@Override
	public String getLoginPassword() {
		return getMap().get(LOGIN_PASSWORD) == null ? "" : (String) getMap().get(LOGIN_PASSWORD);
	}

	@Override
	public String getPasswordExpireDate() {
		return null;
	}

	@Override
	public void setIp(String ip) {
		getMap().put(IP, ip);
	}

	@Override
	public void setLocale(Locale locale) {
		getMap().put(LOCALE, locale);
	}

	@Override
	@Deprecated
	public void setLoginTime(Date loginTime) {
		getMap().put(LOGIN_TIME, loginTime);
	}

	
	@Override
	public String toString() {
		return "AmsUserInfo ["
				+ "getUserName()=" + getUserName() + ", getSecondPassword()="
				+ getSecondPassword() + ", getUseSecondPassword()="
				+ getUseSecondPassword()
				+ ", getUseFlag()=" + getUseFlag() + ", getTelNo()="
				+ getTelNo() + ", getMobileNo()=" + getMobileNo()
				+ ", getFaxNo()=" + getFaxNo() + ", getEmail()=" + getEmail()
				+ ", getZipCode()=" + getZipCode() + ", getAddrDetail()="
				+ getAddrDetail() + ", getTeamCd()=" + getTeamCd()
				+ ", getEmpId()=" + getEmpId() + ", getStatus()=" + getStatus()
				+ ", getFailCnt()=" + getFailCnt() + ", getLoginTime()="
				+ getLoginTime() + ", getEmkMenuInfo()=" + getAmsMenuInfo()
				+ ", getMenuTimeStamp()=" + getMenuTimeStamp()
				+ ", getEmkRoleInfo()=" + getAmsRoleInfo()
				+ ", getContextPath()=" + getContextPath()
				+ ", getRequestURI()=" + getRequestURI() + ", getMenuId()="
				+ getMenuId() + ", getMsgList()=" + getMsgList()
				+ ", getMsgCnt()=" + getMsgCnt() + ", getMModeTimeStamp()="
				+ getMModeTimeStamp() + ", getOSVer()=" + getOSVer()
				+ ", getAgentVer()=" + getAgentVer() + ", getApprovalAuth()="
				+ getApprovalAuth() + ", getFileSeqNo()=" + getFileSeqNo()
				+ ", getFileSeqNoList()=" + getFileSeqNoList()
				+ ", getBrthdyDt()=" + getBrthdyDt()
				+ ", getSecondPasswordPass()=" + getSecondPasswordPass()
				+ ", getIp()=" + getIp() + ", getLocale()=" + getLocale()
				+ ", getLoginId()=" + getLoginId() + ", getLoginPassword()="
				+ getLoginPassword() + ", getPasswordExpireDate()="
				+ getPasswordExpireDate() + "]";
	}
	
	
	/**
	 * 프로젝트 특화 메소드인 경우는 아래에 기입하여 향후 제거를 쉽게 할 수 있도록 한다.  	
	 */
		protected static final String PRD_GRD_LIST		= "PRD_GRD_LIST";
		
		/**
		 * @param prdGraList
		 */
		public void setPrdGrdInfo(List<Map<String, Object>> prdGraList) {
			getMap().put(PRD_GRD_LIST, prdGraList);
		}
		
		/**
		 * @return PRD_GRD_LIST
		 */
		public List<Map<String, Object>> getPrdGrdInfo() {
			return (List<Map<String, Object>>)getMap().get(PRD_GRD_LIST);
		}

}
