package ams.asm.fwksbase.biz;

import java.util.List;
import java.util.Map;

import net.sf.uadetector.UserAgent;
import net.sf.uadetector.UserAgentStringParser;
import net.sf.uadetector.service.UADetectorServiceFactory;
import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.RecordSet;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.util.DateUtils;
import nexcore.framework.core.util.StringUtils;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.logging.Log;

import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.common.user.IAmsUserInfo;
import ams.fwk.constants.Constants;
import ams.fwk.constants.DBNamingConstants;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/FWK업무</li>
 * <li>단위업무명: 전후처리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-07-09 13:13:45</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
/**
 * @author 08158
 *
 */
/**
 * @author 08158
 *
 */
public class FFWK999 extends ams.fwk.base.FunctionUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */
	private static final String[] EXCLUDE_PRE_PROCESSOR_ARR = new String[]{"com.COMBBase#pCOM10001", "com.COMBBase#pCOM10002", "com.COMBBase#pCOM10003", "com.COMBBase#pCOM10004", "com.COMBBase#pCOM10006", "com.COMBBase#pCOM10005", "com.COMBBase#pCOM10101", "veh.VEHBBase#pSSO00101", "abm.MNUBBase#pMNU10007", "abm.USRBBase#pUSR10007","mtr.ACRBBase#pACR10001"};
	private static final String[] INCLUDE_POST_PROCESSOR_ARR = new String[]{"com.COMBBase#pCOM10001", "com.COMBBase#pCOM10003", "com.COMBBase#pCOM10005", "com.COMBBase#pCOM10101", "abm.MNUBBase#pMNU10007","mtr.ACRBBase#pACR10001"};
	private static final String POST_PROCESSOR = "POST";
	private static final String PRE_PROCESSOR = "PRE";
	private static final UserAgentStringParser parser = UADetectorServiceFactory.getResourceModuleParser();
	/**
	 * Default Constructor
	 */
	public FFWK999(){
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
	public IDataSet preProcessor99(IDataSet requestData, IOnlineContext onlineCtx){
		Log log = getLog(onlineCtx);
		IDataSet responseData = new DataSet();
		if(log.isDebugEnabled())log.debug(">>>>>>>>>>>>>>>>전처리 시작 <<<<<<<<<<<<<<<<<<<<<<");

		SharedBizComponent codSC = lookupSharedBizComponent("abm.CODSBase");
		AmsUserInfo userInfo =  (AmsUserInfo)onlineCtx.getUserInfo();
		IDataSet selectSecretCdDSRes = new DataSet();
		String txId = onlineCtx.getTransaction().getTxId();
		String mModeUpdateTime = "";
		String mModeAttribute = "";

		//트랜젝션ID를 가지고 전처리를 skip해야하는 경우에는 바로 종료( 로그인, 로그아웃)
		if(_checkProcess(PRE_PROCESSOR, txId)) {
			if(log.isDebugEnabled())log.debug(">>>>>>>>>>>>>>>>전처리 비대상 거래임. 전처리 종료 <<<<<<<<<<<<<<<<<<<<<<");
			return responseData;
		}

		try {
			_getFileSeqNo(requestData, onlineCtx);
			_checkSecretMode(onlineCtx, requestData);

			if(log.isDebugEnabled())log.debug(">>>>>>>>>>>>>>>>전처리 정상 종료 <<<<<<<<<<<<<<<<<<<<<<");
		} catch(BizRuntimeException e) {
			throw e;
		} catch(Exception e) {
			throw new BizRuntimeException("M1000000", new String[]{"전처리 프로세서"}, e);
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
	public IDataSet postProcessor99(IDataSet requestData, IOnlineContext onlineCtx){
		Log log = getLog(onlineCtx);
		IDataSet responseData = new DataSet();
		String txId = onlineCtx.getTransaction().getTxId();
		IAmsUserInfo userInfo = getAmsUserInfo(onlineCtx);
		if(!_checkProcess(POST_PROCESSOR, txId)) {//후처리 거래가 아닐경우는 skip
			return responseData;
		}
		if(log.isDebugEnabled())log.debug(">>>>>>>>>>>>>>>>후처리 실시 <<<<<<<<<<<<<<<<<<<<<<");
		
		_checkSecretMode(onlineCtx, requestData);
		_getNoticeList(onlineCtx);
		
		/**
		 * 개발자의 요청에 따라, 로그인하고 UI로 response해줄 때 USER_GROUP정보를 json타입으로 받을 수 있도록 
		 * DataSet에 USER_GROUP 정보 Put 실시함. 
		 */
		List<Map<String, String>> userGrpList = (List<Map<String, String>>)userInfo.getUserGroupList();
		IRecordSet rs = new RecordSet(DBNamingConstants.AMS_USER_GROUP_MAPPING, new String[]{DBNamingConstants.GROUP_ID});
		//후처리이므로 업무에서 return받은 DataSet을 requestData로 전달한 것임. 그러므로 requestData에 필요한 데이터를 넣어야 함. 
		requestData.putRecordSet(DBNamingConstants.AMS_GROUP, rs);  
		IRecord record = null;
		for(Map userGrpMap : userGrpList) {
			record = rs.newRecord();
			record.set(DBNamingConstants.GROUP_ID, userGrpMap.get(DBNamingConstants.GROUP_ID));
		}
		if(log.isDebugEnabled())log.debug(">>>>>>>>>>>>>>>>후처리 정상 종료 <<<<<<<<<<<<<<<<<<<<<<");
		// 처리 결과값을 responseData에 넣어서 리턴하십시오
		return responseData;
	 }
  
	/**
	 * Secret모드를체크한 뒤 메뉴와 권한 취득하는 메소드를 호출한다.  
	 * @param onlineCtx
	 * @param requestData
	 * @return
	 */
	private IDataSet _checkSecretMode(IOnlineContext onlineCtx, IDataSet requestData) {
		IDataSet responseData = new DataSet();
//		SharedBizComponent codSC = lookupSharedBizComponent("abm.CODSBase");
		SharedBizComponent comSC = lookupSharedBizComponent("com.COMSBase");
		AmsUserInfo userInfo =  (AmsUserInfo)onlineCtx.getUserInfo();
		IDataSet selectSecretCdDSReq = new DataSet();
		IDataSet selectSecretCdDSRes = new DataSet();
//		String txId = onlineCtx.getTransaction().getTxId();
		String sModeUpdateTime = "";
		String mModeAttribute = "";
		/**
		 * M모드 여부를 조회하여 UPDATE_DATE가 변경되어 있으면 메뉴조회실시
		 * M모드 속성1이 'Y'이면서 사용자 메뉴중 M_MODE가 Y로 되어있는 메뉴는 제외시킴  
		 * 매거래마다 메뉴정보를 취득하는 부하를 줄이기 위한 조치임.
		 */
		selectSecretCdDSReq.putField("TABLE_NAME", DBNamingConstants.AMS_MENU);
		selectSecretCdDSRes = callSharedBizComponentByDirect(comSC, "selectActiveTimeByTableName", selectSecretCdDSReq, onlineCtx);
		sModeUpdateTime = selectSecretCdDSRes.getField(DBNamingConstants.UPDATE_DATE);
		mModeAttribute = selectSecretCdDSRes.getField(DBNamingConstants.ATTRIBUTE_01);
		if(sModeUpdateTime.equals(userInfo.getMModeTimeStamp())) {//M모드의 UPDATE_DATE가 변경이 없으면 성능이슈를 위해 메뉴 refresh하지 않음
			if(userInfo.getAmsMenuInfo() != null) {
				/**
				 * 메뉴가 갱신되지 않아더라도 필요한 정보들은 취득하도록 한다.
				 */
				onlineCtx.setAttribute(Constants.IS_NEW_MENU, false);//메뉴갱신여부
				_inputMenuIdToUserInfo(userInfo, requestData);//화면UI에서 넘어온 Menu ID취득 
				_inputOSVerAndAgentVerToUserInfo(userInfo, requestData);//화면UI에서 넘어온 OS Ver과 Agent Ver을 UserInfo에 설정
				return responseData;
			} //메뉴리스트가 null일 경우는 하단의 _selectMenuListProcess() 에서 처리한다.
		}  else {//변경된 타임으로 변경
			userInfo.setMModeTimeStamp(sModeUpdateTime);//여기는 M모드 timestamp
		}
		onlineCtx.setAttribute(Constants.IS_NEW_MENU, true);;//메뉴갱신여부
		
		//메뉴리스트와 롤리스트를 UserInfo에 담는 메소드
		_selectMenuListProcess(mModeAttribute, requestData, onlineCtx);
		return responseData;
	}
	
	/**
	 * 전처리 제외거래가 있는 경우는 TRUE return
	 * @param txId
	 * @return
	 */
	private boolean _checkProcess(String kind, String txId) {
		boolean checkFlag = false;
		for(String exceptTxId : (PRE_PROCESSOR.equals(kind)?EXCLUDE_PRE_PROCESSOR_ARR:INCLUDE_POST_PROCESSOR_ARR)) {
			if(txId.indexOf(exceptTxId) != -1) {
				checkFlag =  true;
			}
		}
		return checkFlag;
	}
	
	/**
	 * 전처리나 후처리에서 실시하는 사용자별 권한리스트와 메뉴리스트를 조회하여 EmkUserInfo에 넣는다.  
	 * @param requestData
	 * @param onlineCtx
	 */
	private void _selectMenuListProcess(String secretMode, IDataSet requestData, IOnlineContext onlineCtx) {
		Log log = getLog(onlineCtx);
		SharedBizComponent userSC = lookupSharedBizComponent("abm.USRSBase");
		SharedBizComponent ugrSC = lookupSharedBizComponent("abm.UGRSBase");
		SharedBizComponent autSC = lookupSharedBizComponent("abm.AUTSBase");
		SharedBizComponent mnuSC = lookupSharedBizComponent("abm.MNUSBase");

		IDataSet userInfoDS = new DataSet();
		IDataSet groupInfoDS = new DataSet();
		IDataSet roleInfoDS = new DataSet();
		IDataSet selectUserGroupListDSRes = new DataSet();
		IDataSet selectGroupRoleListDSRes = new DataSet();
		IDataSet selectMenuListDSRes = new DataSet();
		IDataSet selectPrdGrdListDSRes = new DataSet();

		IRecordSet roleRS = null;

		AmsUserInfo userInfo =  (AmsUserInfo)onlineCtx.getUserInfo();

		if(log.isDebugEnabled())log.debug(">>>>>>>>>>>>>>>>>>>>>사용자 메뉴조회실시<<<<<<<<<<<<<<<<<<");
		/**
		 * 사용자 ID를 통해 사용자 그룹 취득
		 */
		userInfoDS.putField(DBNamingConstants.USER_ID, userInfo.getLoginId());
		userInfoDS.putField("S_MODE", secretMode);
		selectUserGroupListDSRes = callSharedBizComponentByDirect(userSC, "selectUserGroupListByUser", userInfoDS, onlineCtx);//사용자와 맵핑되어 있는 그룹취득
		IRecordSet groupIdlistRs = selectUserGroupListDSRes.getRecordSet(DBNamingConstants.AMS_USER_GROUP_MAPPING);
		userInfo.setUserGroupList(groupIdlistRs.getRecordMaps());//사용자그룹리스트를 UserInfo에 put한다.
		
		/**
		 * 사용자그룹ID들을 통해 권한 리스트 취득
		 */
		groupInfoDS.putField("GROUP_ID_LIST",groupIdlistRs.getRecordMaps());
		selectGroupRoleListDSRes = callSharedBizComponentByDirect(ugrSC, "selectRoleInfoByGroup", groupInfoDS, onlineCtx);//그룹과 맵핑되어 있는 권한 취득
		IRecordSet roleIdListRs = selectGroupRoleListDSRes.getRecordSet(DBNamingConstants.AMS_GROUP_ROLE_MAPPING);
		userInfo.setAmsRoleInfo(roleIdListRs.getRecordMaps());//권한리스트를 userInfo에 put한다.
		
		
		/**
		 * 권한 리스트를 통해 메뉴리스트를 취득
		 */
		
		//로컬일 경우에는 상관없으나, 운영 및 개발환경에서 WAS서버의 IP와 Context Path를 DNS서버에 등록할 경우에는 
		//HttpServletRequest에서 Context path를 취득할 수 없다. 따라서 /ams/index.jsp에서 AMS인지 Biz업무인지 구분할 수 있는 구분자를 두어 
		//Context path의 역할을 대신할 수 있도록 한다. 
		if(log.isDebugEnabled())log.debug("[Context Path : "+userInfo.getContextPath()+"]");
		String isAmsContext = "";
		if(StringUtils.isEmpty(userInfo.getContextPath())) {
			isAmsContext = requestData.getField(Constants.IS_AMS_CONTEXT);
			if(log.isDebugEnabled())log.debug("[Is AMS Context : "+isAmsContext+"]");
			if("Y".equals(isAmsContext)) {
				userInfo.setContextPath(Constants.AMS_CONTEXT_PATH);
			}
		}
		roleInfoDS.putField("ROLE_ID_LIST", roleIdListRs.getRecordMaps());
		roleInfoDS.putField(DBNamingConstants.USER_ID, userInfo.getLoginId());
		roleInfoDS.putField(DBNamingConstants.MENU_CATEGORY, Constants.AMS_CONTEXT_PATH.equals(userInfo.getContextPath())?Constants.SYS_CODE:Constants.BIZ_CODE);
		roleInfoDS.putField(Constants.LOCALE_LANG, userInfo.getLocale().getLanguage());
		selectMenuListDSRes = callSharedBizComponentByDirect(autSC, "selectMenuListByRole",roleInfoDS, onlineCtx);//권한과 맵핑되어 있는 메뉴 취득
		IRecordSet menuIdListRs = selectMenuListDSRes.getRecordSet(DBNamingConstants.AMS_ROLE_MENU_MAPPING);
		userInfo.setAmsMenuInfo(menuIdListRs.getRecordMaps());//메뉴리스트를 userinfo에 put한다.
		userInfo.setMenuTimeStamp(DateUtils.getCurrentDate("yyyyMMddHHmmssSSS"));//UI화면에서 해당 시간이 변경되었을 경우는 메뉴 refresh를 할 수 있도록 하기 위함. 
		
		if(log.isDebugEnabled())log.debug(">>>>>>>MenuList 출력<<<<<<<<<<" + menuIdListRs);
		if(log.isDebugEnabled())log.debug(">>>>>>>RoleList 출력<<<<<<<<<<" + roleIdListRs);


		/**
		 *사용자 ID를 통해 상품등급 리스트를 취득 
		 *만약 사용자별 상품등급 정보가 실시간으로 변경될 수 있고, 그 변경사항이 준실시간으로 UI에 반영되어야 한다고 하면
		 *사용자별 상품등급 테이블의 update시간을 저장하여 별도의 체크로직을 구성해야 한다. 
		 */
//		selectPrdGrdListDSRes = callSharedBizComponentByDirect(userSC, "selectUserGradeMapping",userInfoDS, onlineCtx);//사용자별 상품등급 맵핑조회
//		IRecordSet prdGrdRs = selectPrdGrdListDSRes.getRecordSet("PRD_GRD_LIST");
//		userInfo.setPrdGrdInfo(prdGrdRs.getRecordMaps());//사용자별 상풍등급리스트를 userInfo에 put한다.
		
		
		/**
		 * 업무처리에 필요한 데이터를 취득하여 AmsUserInfo에 넣는 작업실시
		 */
		_inputMenuIdToUserInfo(userInfo, requestData);//화면UI에서 넘어온 Menu ID UserInfo에 설정
		_inputOSVerAndAgentVerToUserInfo(userInfo, requestData); //화면UI에서 넘어온 OS Ver과 Agent Ver을 UserInfo에 설정
	}
	
	/**
	 * 화면에서 넘어온 Menu ID를 취득하여 AmsUserInfo에 넣고 DataSet에 존재하는 해당 파라미터 value는 삭제한다.
	 * @param userInfo
	 * @param requestData
	 */
	private void _inputMenuIdToUserInfo(AmsUserInfo userInfo, IDataSet requestData) {
		userInfo.setMenuId(requestData.getField(Constants.MENU_ID));
		/**
		 * 화면UI에서 Menu ID를 넘겨줄 때, field에 담아서 넘겨주고 해당 field들은 모두 DataSet으로 변경되므로 
		 * Menu ID는 업무APP에서 사용될 일이 없음. 그러므로 remove실시함. 
		 */
		requestData.removeField(Constants.MENU_ID);
	}
	
	/**
	 * 화면에서 넘어온 OS ver과 Agent ver을 취득하여 EmkUserInfo에 넣고 DataSet에 존재하는 해당 파라미터 value는 삭제한다.
	 * @param userInfo
	 * @param requestData
	 */
	private void _inputOSVerAndAgentVerToUserInfo(AmsUserInfo userInfo, IDataSet requestData) {
		String userAgent = requestData.getField(Constants.USER_AGENT);
		if(userAgent==null) userAgent = "";
		UserAgent agent = parser.parse(userAgent);
		userInfo.setOSVer(agent.getOperatingSystem().getName());
		userInfo.setAgentVer(agent.getName() + " " + agent.getVersionNumber().getGroups().get(0));
		requestData.removeField(Constants.USER_AGENT);
	}
	
	/**
	 * 파일업로드용 SEQ_NO를 채번하기 위한 메소드
	 * @param requestData
	 * @param onlineCtx
	 */
	private void _getFileSeqNo(IDataSet requestData, IOnlineContext onlineCtx) {
		/**
		 * Upload파일 정보가 존재할 경우에는 File들에 대한 SEQ_NO를 취득할 수 있도록 한다.
		 */
		Log log = getLog(onlineCtx);
		AmsUserInfo userInfo = (AmsUserInfo)onlineCtx.getUserInfo();
		String tempFileId = requestData.getField(Constants.FILE_ID);
		IRecordSet fileRs = requestData.getRecordSet(Constants.FILE_LIST);
		String eachSeqNoFlag = requestData.getField(Constants.EACH_FILE_SEQ_FG);
		
		if(StringUtils.isNotEmpty(tempFileId) || (fileRs != null && fileRs.getRecordCount() > 0)) { //File 정보가 있다면 채번을 하도록 한다.
			if(log.isDebugEnabled())log.debug("		=============파일채번실시=============");
			
			if("Y".equals(eachSeqNoFlag)) {
				if(fileRs != null) {
					IDataSet fileSeqNoReqDs = null;
					for(int i=0; i < fileRs.getRecordCount(); i++) {
						fileSeqNoReqDs = _callGetFileSeqNoComponent(requestData, onlineCtx);
						userInfo.addFileSeqNoToList(fileSeqNoReqDs.getField("SEQ_NO"));
					}
					if(log.isDebugEnabled())log.debug("		=============파일 다중 채번완료[SEQ_NO List : "+userInfo.getFileSeqNoList()+"]=============");
				}
			} else {
				IDataSet fileSeqNoReqDs = _callGetFileSeqNoComponent(requestData, onlineCtx);
				userInfo.setFileSeqNo(fileSeqNoReqDs.getField("SEQ_NO"));
				if(log.isDebugEnabled())log.debug("		=============파일채번완료[SEQ_NO : "+fileSeqNoReqDs.getField("SEQ_NO")+"]=============");
			}
		}
	}
	
	/**
	 * 채번을 하기 위한 메소드를 호출
	 * @param requestData
	 * @param onlineCtx
	 * @return
	 */
	private IDataSet _callGetFileSeqNoComponent(IDataSet requestData, IOnlineContext onlineCtx) {
		SharedBizComponent sc = lookupSharedBizComponent("com.COMSBase");
		IDataSet ds = new DataSet();
		String currentDate = DateUtils.getCurrentDate();
		
		ds.putField("TX_DT", currentDate);
		ds.putField("TABLE_NAME", DBNamingConstants.AMS_UPLOADED_FILE);
		ds.putField("SEQ_NAME", DBNamingConstants.SEQ_AMS_UPLOADED_FILE_00);
		IDataSet responseDs = callSharedBizComponentByDirect(sc, "insertSelectSeqNo", ds, onlineCtx);
		responseDs.putField("TX_DT", currentDate);
		return responseDs;
	}
	
	private void _getNoticeList(IOnlineContext onlineCtx) {
		SharedBizComponent sc = lookupSharedBizComponent("abm.INFSBase");
		AmsUserInfo userInfo = (AmsUserInfo)getAmsUserInfo(onlineCtx);
		List userGroupList =userInfo.getUserGroupList();
		String currentDt = DateUtils.getCurrentDate();
		Object[]userGroupArray =userGroupList.toArray();
		
		IDataSet requestData = new DataSet();
		requestData.putField("CURRENT_DT", currentDt);
		requestData.putField("GROUP_ID_LIST", userGroupArray);
		IDataSet responseData = callSharedBizComponentByDirect(sc, "selectNoticeListByUserGroup", requestData, onlineCtx);
		IRecordSet rs = responseData.getRecordSet(DBNamingConstants.AMS_NOTICE);
		
		if(rs == null) return;//RecordSet이 null이라면 return
		
		userInfo.setNoticeList(rs.getRecordMaps());
	}
}
