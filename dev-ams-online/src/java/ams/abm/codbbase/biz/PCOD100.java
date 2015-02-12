package ams.abm.codbbase.biz;

import java.util.List;
import java.util.Locale;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.RecordSet;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.logging.Log;

import ams.fwk.code.internal.AmsCode;
import ams.fwk.common.user.IAmsUserInfo;
import ams.fwk.constants.Constants;
import ams.fwk.constants.DBNamingConstants;
import ams.fwk.utils.BaseUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [PU]코드관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-07-09 11:02:04</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class PCOD100 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PCOD100(){
		super();
	}

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : CODE_ID [필드1]
	 *	- field : CODE_NAME [필드2]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 * <pre>
	 *	- record : AMS_CODE
	 *		- field : CODE_ID [CODE_ID]
	 *		- field : CODE_NAME [CODE_NAME]
	 *		- field : DISPLAY_INDEX [DISPLAY_INDEX]
	 *		- field : SORT [필드1]
	 *		- field : _expand_ [필드1]
	 *		- field : PATH [필드2]
	 *		- field : _level_ [필드1]
	 *		- field : _leaf_ [필드3]
	 *		- field : loaded [필드2]
	 *		- field : PARENT_SORT [필드4]
	 *		- field : USE_FLAG [USE_FLAG]
	 *		- field : PARENT_CODE_ID [PARENT_CODE_ID]
	 *		- field : ATTRIBUTE_01 [ATTRIBUTE_01]
	 *		- field : ATTRIBUTE_02 [ATTRIBUTE_02]
	 *		- field : ATTRIBUTE_03 [ATTRIBUTE_03]
	 *		- field : ATTRIBUTE_04 [ATTRIBUTE_04]
	 *		- field : ATTRIBUTE_05 [ATTRIBUTE_05]
	 *		- field : ATTRIBUTE_06 [ATTRIBUTE_06]
	 *		- field : ATTRIBUTE_07 [ATTRIBUTE_07]
	 *		- field : ATTRIBUTE_08 [ATTRIBUTE_08]
	 *		- field : ATTRIBUTE_09 [ATTRIBUTE_09]
	 *		- field : ATTRIBUTE_10 [ATTRIBUTE_10]
	 *		- field : REG_USER_ID [REG_USER_ID]
	 *		- field : REG_DATE [REG_DATE]
	 *		- field : UPDATE_USER_ID [UPDATE_USER_ID]
	 *		- field : UPDATE_DATE [UPDATE_DATE]
	 *		- field : LOCALE_ID [LOCALE_ID]
	 *		- field : CATEGORY [CATEGORY]
	 * </pre>
	 */
	public IDataSet pCOD10001(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.CODSBase"); 
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectCodeList", requestData, onlineCtx);
	    	responseData.putRecordSet(ds.getRecordSet(DBNamingConstants.AMS_CODE));
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"코드목록조회"}, e);
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
	 * <pre>
	 *	- field : CODE_ID [CODE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 * <pre>
	 *	- field : CODE_ID [CODE_ID]
	 *	- field : CODE_NAME [CODE_NAME]
	 *	- field : DISPLAY_INDEX [DISPLAY_INDEX]
	 *	- field : USE_FLAG [USE_FLAG]
	 *	- field : PARENT_CODE_ID [PARENT_CODE_ID]
	 *	- field : ATTRIBUTE_01 [ATTRIBUTE_01]
	 *	- field : ATTRIBUTE_02 [ATTRIBUTE_02]
	 *	- field : ATTRIBUTE_03 [ATTRIBUTE_03]
	 *	- field : ATTRIBUTE_04 [ATTRIBUTE_04]
	 *	- field : ATTRIBUTE_05 [ATTRIBUTE_05]
	 *	- field : ATTRIBUTE_06 [ATTRIBUTE_06]
	 *	- field : ATTRIBUTE_07 [ATTRIBUTE_07]
	 *	- field : ATTRIBUTE_08 [ATTRIBUTE_08]
	 *	- field : ATTRIBUTE_09 [ATTRIBUTE_09]
	 *	- field : ATTRIBUTE_10 [ATTRIBUTE_10]
	 *	- field : REG_USER_ID [REG_USER_ID]
	 *	- field : REG_DATE [REG_DATE]
	 *	- field : UPDATE_USER_ID [UPDATE_USER_ID]
	 *	- field : UPDATE_DATE [UPDATE_DATE]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : CATEGORY [CATEGORY]
	 * </pre>
	 */
	public IDataSet pCOD10002(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.CODSBase"); 
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectCode", requestData, onlineCtx);
		 
	    	responseData.putFieldMap(ds.getFieldMap());

	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"코드상세조회"}, e);
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
	 * <pre>
	 *	- field : CODE_ID [CODE_ID]
	 *	- field : CODE_NAME [CODE_NAME]
	 *	- field : DISPLAY_INDEX [DISPLAY_INDEX]
	 *	- field : USE_FLAG [USE_FLAG]
	 *	- field : PARENT_CODE_ID [PARENT_CODE_ID]
	 *	- field : ATTRIBUTE_01 [ATTRIBUTE_01]
	 *	- field : ATTRIBUTE_02 [ATTRIBUTE_02]
	 *	- field : ATTRIBUTE_03 [ATTRIBUTE_03]
	 *	- field : ATTRIBUTE_04 [ATTRIBUTE_04]
	 *	- field : ATTRIBUTE_05 [ATTRIBUTE_05]
	 *	- field : ATTRIBUTE_06 [ATTRIBUTE_06]
	 *	- field : ATTRIBUTE_07 [ATTRIBUTE_07]
	 *	- field : ATTRIBUTE_08 [ATTRIBUTE_08]
	 *	- field : ATTRIBUTE_09 [ATTRIBUTE_09]
	 *	- field : ATTRIBUTE_10 [ATTRIBUTE_10]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : CATEGORY [CATEGORY]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOD10003(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent codSC = lookupSharedBizComponent("abm.CODSBase"); 
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	//코드업데이트 실시
	    	callSharedBizComponentByDirect(codSC, "updateCode", requestData, onlineCtx);
	    	_refreshCachedAmsCode(onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"코드수정"}, e);
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
	 * <pre>
	 *	- field : CODE_ID [CODE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOD10004(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.CODSBase"); 
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	callSharedBizComponentByDirect(sc, "deleteCode", requestData, onlineCtx);
	    	_refreshCachedAmsCode(onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"코드삭제"}, e);
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
	 * <pre>
	 *	- field : CODE_ID [CODE_ID]
	 *	- field : CODE_NAME [CODE_NAME]
	 *	- field : DISPLAY_INDEX [DISPLAY_INDEX]
	 *	- field : USE_FLAG [USE_FLAG]
	 *	- field : PARENT_CODE_ID [PARENT_CODE_ID]
	 *	- field : ATTRIBUTE_01 [ATTRIBUTE_01]
	 *	- field : ATTRIBUTE_02 [ATTRIBUTE_02]
	 *	- field : ATTRIBUTE_03 [ATTRIBUTE_03]
	 *	- field : ATTRIBUTE_04 [ATTRIBUTE_04]
	 *	- field : ATTRIBUTE_05 [ATTRIBUTE_05]
	 *	- field : ATTRIBUTE_06 [ATTRIBUTE_06]
	 *	- field : ATTRIBUTE_07 [ATTRIBUTE_07]
	 *	- field : ATTRIBUTE_08 [ATTRIBUTE_08]
	 *	- field : ATTRIBUTE_09 [ATTRIBUTE_09]
	 *	- field : ATTRIBUTE_10 [ATTRIBUTE_10]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : CATEGORY [CATEGORY]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOD10005(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.CODSBase"); 
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    
	    try {
	    	callSharedBizComponentByDirect(sc, "insertCode", requestData, onlineCtx);
	    	_refreshCachedAmsCode(onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"코드등록"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 성지호 (SungJiHo)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- record : CODE_LIST
	 *		- field : PARENT_CODE [부모 코드]
	 *		- field : INDEX [구분 인덱스]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 * <pre>
	 *	- record : CODE_LIST
	 *		- field : CODE_ID [코드 아이디]
	 *		- field : CODE_NAME [코드명]
	 *		- field : PARENT_CD [부모 코드]
	 *		- field : PARENT_CDNAME [부모 코드명]
	 *		- field : DISPLAY_INDEX [표시 순서]
	 *		- field : USE_YN [사용여부]
	 *		- field : ATTRIBUTE_01 [추가1]
	 *		- field : ATTRIBUTE_02 [추가2]
	 *		- field : ATTRIBUTE_03 [추가3]
	 *		- field : PARENT_ATTRIBUTE_01 [부모 추가1]
	 *		- field : PARENT_ATTRIBUTE_02 [부모 추가2]
	 *		- field : INDEX [구분 인덱스]
	 * </pre>
	 */
	public IDataSet pCOD10006(IDataSet requestData, IOnlineContext onlineCtx){
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    try {
			if(log.isDebugEnabled())
				log.debug("CodeHelper 코드 조회");
			
		    // List<Map> mssParentCdList = MssUtils.getMssParentCodeIdList();
			// MssCode code = MssUtils.getMssCode("BOOK", "A2");
			// List<AmsCode> BaseUtils.getAmsCodes(String parentCdId) SYS로 넘겨줄 떄 이쪽 호출하도록 해주삼 쌩유 
			IRecordSet rs = new RecordSet("CODE_LIST", new String[]{"CODE_ID", "CODE_NAME", "PARENT_CD", "PARENT_CDNAME", "DISPLAY_INDEX", "USE_YN", "ATTRIBUTE_01", "ATTRIBUTE_02", "ATTRIBUTE_03", "PARENT_ATTRIBUTE_01", "PARENT_ATTRIBUTE_02", "INDEX"});
			
			IRecordSet reqCodeList = requestData.getRecordSet("CODE_LIST");
			IAmsUserInfo userInfo = getAmsUserInfo(onlineCtx);
			Locale locale = userInfo.getLocale();
			for(int i = 0; i < reqCodeList.getRecordCount(); i++) {
				IRecord record = reqCodeList.getRecord(i);
				
				if("BIZ".equals(record.get("TYPE"))) {
//					List<MssCode> mssCdList = MssUtils.getMssCodes(record.get("PARENT_CODE"));
//					
//					for(MssCode code : mssCdList) {
//						IRecord r = rs.newRecord();
//						r.set("CODE_ID", code.getCodeId());
//						r.set("CODE_NAME", code.getCodeNm());
//						r.set("PARENT_CD", code.getParentCd());
//						r.set("PARENT_CDNAME", code.getParentCdNm());
//						r.set("DISPLAY_INDEX", code.getDispIdx());
//						r.set("USE_YN", code.getUseYn());
//						r.set("ATTRIBUTE_01", code.getAttr01());
//						r.set("ATTRIBUTE_02", code.getAttr02());
//						r.set("ATTRIBUTE_03", code.getAttr03());
//						r.set("PARENT_ATTRIBUTE_01", code.getParentAttr01());
//						r.set("PARENT_ATTRIBUTE_02", code.getParentAttr02());
//						r.set("INDEX", record.get("INDEX"));
//					}
				} else if("SYS".equals(record.get("TYPE"))){
					List<AmsCode> amsCdList = BaseUtils.getAmsCodes(record.get("PARENT_CODE"));
					String currentLang = locale.getLanguage();
					Locale savedLocale = null;
					for(AmsCode code : amsCdList) {
						savedLocale = code.getLocale();
						if(savedLocale != null && currentLang.equals(savedLocale.getLanguage())) {
							IRecord r = rs.newRecord();
							r.set("CODE_ID", code.getId());
							r.set("CODE_NAME", code.getValue());
							r.set("DISPLAY_INDEX", code.getDisplayIndex());
							r.set("ATTRIBUTE_01", code.getAttributeValue(1));
							r.set("ATTRIBUTE_02", code.getAttributeValue(2));
							r.set("ATTRIBUTE_03", code.getAttributeValue(3));
							r.set("INDEX", record.get("INDEX"));
						}
					}
				}
			}
		
			responseData.putRecordSet("CODE_LIST", rs);
			responseData.setOkResultMessage("M3000000", new String[]{});
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"코드조회(코드헬퍼용)"}, e);
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
	public IDataSet pCOD10007(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.CODSBase"); 
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectCodeDisplayIndexCount", requestData, onlineCtx);
		 
	    	int disp_index = Integer.valueOf(ds.getField(DBNamingConstants.DISPLAY_INDEX));
	    	
	    	responseData.putField(DBNamingConstants.DISPLAY_INDEX, disp_index + 1);
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"코드 정렬순서취득"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }
  
	private void _refreshCachedAmsCode(IOnlineContext onlineCtx) {
		Log log = getLog(onlineCtx);
		IDataSet fwkSCReq = new DataSet();
    	//이중화 WAS에 대한 코드refresh실시
    	fwkSCReq.putField(Constants.CACHE_NAME, "amsCode");
    	try {
//    		callSharedBizComponentByRequiresNew(fwkSC, "refreshCacheByWAS", fwkSCReq, onlineCtx);
    		callServiceByAsyncXA("asm.FWKBBase#pFWK90101", fwkSCReq, onlineCtx);
    	} catch(Exception e ) {
    		if(log.isErrorEnabled()) {
    			log.error("[JMX Error]Error is occured. May not have the selected cache.");
    		}
    	}
	}
}
