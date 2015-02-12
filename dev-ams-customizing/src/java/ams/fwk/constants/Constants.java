/*
 * @(#) Constants.java
 * Copyright 2006 by SKC&C. All rights reserved.
 */
package ams.fwk.constants;

/**
 * 상수를 정의해놓은 클래스
 * Class for definition Constant variables
 * @system :  EMK
 *
 * @modifying developer :
 * @modifying date :
 * @modifying description :
 */
public class Constants {	
	
	/**
	 * SSO USER 아이디
	 */
	public static final String SSO_USER_VAR = "SSO_USER";
	
	/**
	 * 입력 FLAG
	 */
	public static final String INSERT_FLAG = "C";
	
	/**
	 * 수정 FLAG
	 */
	public static final String UPDATE_FLAG = "U";
	
	/**
	 * 삭제 FLAG
	 */
	public static final String DELETE_FLAG = "D";
	
	/**
	 * 조회 FLAG
	 */
	public static final String SELECT_FLAG = "R";

	/**
	 * ROLE_ID가 U1301일 경우는 메뉴 카테고리 값을 SYS로 하기 위함.
	 * USER_ID와 해당 된 ROLE_ID만 가지고는 관리자 메뉴접근 여부를 알 방법이 없어 불가피하게 추가함.  
	 */
	public static final String ADMIN_CD = "U1301";  
	
	public static final String SYS_CODE = "SYS";
	
	public static final String BIZ_CODE = "BIZ";
	
	/**
	 * COMMON AREA 관리키
	 */
	public static final String COMMONAREA_KEY = "__CA__";

	public static final String MENU_ID = "__CURR_MENU_ID__";
	
	public static final String OS_VER = "__OS_";
	
	public static final String AGENT_VER = "__AGENT_";
	
	public static final String USER_AGENT = "__USER_AGENT__";
	
	public static final String AMS_CONTEXT_PATH = "/ams";
	
	public static final String BIZ_CONTEXT_PATH = "/web";
	
	public static final int MSG_CNT = 5;
	
	public static final int LOGIN_FAIL_MAX_CNT = 5;
	
	public static final int RESET_PASSWORD_LENGTH = 8;
	
	public static final String AMS_CODE = "ams.ICodeManager";
	
	public static final String BIZ_PRHB_WRD = "ams.IAmsPrhbWrdManager";
	
	public static final String AMS_LABEL = "ams.ILabelManager";
	
	public static final String SMS_ORDER_TRNCD = "OrderSMS";
	
	public static final String ERP_ORDER_TRNCD = "ERPOrder";
	
	public static final String FILE_ID = "FILE_ID";
	
	/**
	 *UI로부터 넘어오는 파일정보를 취득하기 위한 key 
	 */
	public static final String FILE_LIST = "__FILE_LIST__";
	
	public static final String EACH_FILE_SEQ_FG = "eachSeqNoFlag";
	
	public static final String IS_NEW_MENU = "__IS_NEW_MENU__";
	
	public static final String PROGRAM_ID          = "PROGRAM_ID";
	    
	public static final String FILE_SEQ_NO          = "FILE_SEQ_NO";
	
	public static final String FILE_PATH          = "FILE_PATH";
	    
	public static final String TYPE_ID          = "typeId";
	
	public static final String LOCALE_LANG = "LOCALE_LANG";
	
	public static final String IS_AMS_CONTEXT = "IS_AMS_CONTEXT";
	/**
	 * PUSH 관리키
	 */
	public static final String PUSH_MANAGER = "nc.biz.IPushManager";
	
	public static final String CACHE_NAME  = "cacheName";
	
    private Constants()
    {
    }
}
