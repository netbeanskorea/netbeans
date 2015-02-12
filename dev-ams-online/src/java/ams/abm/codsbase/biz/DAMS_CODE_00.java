package ams.abm.codsbase.biz;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.util.AppUtils;

import org.apache.commons.logging.Log;

import ams.fwk.constants.DBNamingConstants;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [DU]코드테이블</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-08-09 15:09:28</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class DAMS_CODE_00 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DAMS_CODE_00(){
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
	public IDataSet selectSecretMode(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    
	    IRecordSet rs = dbSelect("selectSecretMode", requestData.getFieldMap(), onlineCtx);
	    if(rs.getRecordCount()!=1) {
	    	throw new BizRuntimeException("M1000000", new String[]{"Secret코드조회(1건이 아님)"});
	    }
	    responseData.putFieldMap(rs.getRecordMap(0));
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
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
	 *		- field : PATH [필드2]
	 *		- field : _level_ [필드1]
	 *		- field : _leaf_ [필드3]
	 *		- field : loaded [필드2]
	 *		- field : PARENT_SORT [필드4]
	 * </pre>
	 */
	public IDataSet selectCodeList(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    
	    IRecordSet rs = null;
	    
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	rs = dbSelect("selectCodeList", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	rs = dbSelect("selectCodeList_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    if(rs == null) {
	    	throw new BizRuntimeException("M1000000", new String[]{"공통코드 조회(DB조회 중 오류)"});
	    }
	    
	    responseData.putRecordSet(DBNamingConstants.AMS_CODE, rs);
	    
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    
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
	public IDataSet selectCode(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecord r = dbSelectSingle("selectCode", requestData.getFieldMap(), onlineCtx);

	    responseData.putFieldMap(r);
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
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
	 *	- field : REG_USER_ID [REG_USER_ID]
	 *	- field : REG_DATE [REG_DATE]
	 *	- field : UPDATE_USER_ID [UPDATE_USER_ID]
	 *	- field : UPDATE_DATE [UPDATE_DATE]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : CATEGORY [CATEGORY]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet insertCode(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	dbInsert("insertCode", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	dbInsert("insertCode_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
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
	 *	- field : UPDATE_USER_ID [UPDATE_USER_ID]
	 *	- field : UPDATE_DATE [UPDATE_DATE]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : CATEGORY [CATEGORY]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet updateCode(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	dbUpdate("updateCode", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	dbUpdate("updateCode_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
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
	 *	- field : LOCALE_ID [LOCALE_ID]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet deleteCode(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    dbDelete("deleteCode", requestData.getFieldMap(), onlineCtx);
	    
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
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
	public IDataSet selectCodeDisplayIndexCount(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecord r = null;
	    
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	r= dbSelectSingle("selectCodeDisplayIndexCount", requestData, onlineCtx);
	    } else {
	    	r= dbSelectSingle("selectCodeDisplayIndexCount_MSSQL", requestData, onlineCtx);
	    }
	    
	    responseData.putField(DBNamingConstants.DISPLAY_INDEX, r.get("maxCount"));
	    return responseData;
	 }
  
}
