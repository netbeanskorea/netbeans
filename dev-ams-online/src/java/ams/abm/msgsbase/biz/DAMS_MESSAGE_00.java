package ams.abm.msgsbase.biz;

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

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [DU]메시지테이블</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-09-04 09:42:07</li>
 * <li>작성자 : 강훈기 (hunkee)</li>
 * </ul>
 *
 * @author 강훈기 (hunkee)
 */
public class DAMS_MESSAGE_00 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DAMS_MESSAGE_00(){
		super();
	}

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : MESSAGE_NAME [MESSAGE_NAME]
	 *	- field : nc_firstRowIndex [필드1]
	 *	- field : nc_lastRowIndex [필드2]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 * <pre>
	 *	- record : AMS_MESSAGE
	 *		- field : MESSAGE_ID [MESSAGE_ID]
	 *		- field : LOCALE_ID [LOCALE_ID]
	 *		- field : MESSAGE_NAME [MESSAGE_NAME]
	 *		- field : MESSAGE_TYPE [MESSAGE_TYPE]
	 *		- field : DESCRIPTION [DESCRIPTION]
	 *		- field : REG_USER_ID [REG_USER_ID]
	 *		- field : REG_DATE [REG_DATE]
	 *		- field : UPDATE_USER_ID [UPDATE_USER_ID]
	 *		- field : UPDATE_DATE [UPDATE_DATE]
	 *		- field : USE_FLAG [USE_FLAG]
	 *	- field : totalCount [필드1]
	 * </pre>
	 */
	public IDataSet selectMessageList(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecordSet rs = null;
	    IRecord r = null;
	    
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	rs = dbSelect("selectMessageList", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectMessageListCount", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	rs = dbSelect("selectMessageList_MSSQL", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectMessageListCount_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    responseData.putField("totalCount",r.get("totalCount"));
	    responseData.putRecordSet(DBNamingConstants.AMS_MESSAGE,rs);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : nc_firstRowIndex [필드1]
	 *	- field : nc_lastRowIndex [필드2]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : MESSAGE_NAME [MESSAGE_NAME]
	 *	- field : MESSAGE_TYPE [MESSAGE_TYPE]
	 *	- field : DESCRIPTION [DESCRIPTION]
	 *	- field : REG_USER_ID [REG_USER_ID]
	 *	- field : REG_DATE [REG_DATE]
	 *	- field : UPDATE_USER_ID [UPDATE_USER_ID]
	 *	- field : UPDATE_DATE [UPDATE_DATE]
	 *	- field : USE_FLAG [USE_FLAG]
	 * </pre>
	 */
	public IDataSet selectMessage(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecord r = dbSelectSingle("selectMessage", requestData.getFieldMap(), onlineCtx);
	    
	    responseData.putFieldMap(r);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : MESSAGE_NAME [MESSAGE_NAME]
	 *	- field : MESSAGE_TYPE [MESSAGE_TYPE]
	 *	- field : DESCRIPTION [DESCRIPTION]
	 *	- field : USE_FLAG [USE_FLAG]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet insertMessage(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	dbInsert("insertMessage", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	dbInsert("insertMessage_MSSQL", requestData.getFieldMap(), onlineCtx);
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
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 *	- field : MESSAGE_NAME [MESSAGE_NAME]
	 *	- field : MESSAGE_TYPE [MESSAGE_TYPE]
	 *	- field : DESCRIPTION [DESCRIPTION]
	 *	- field : USE_FLAG [USE_FLAG]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet updateMessage(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	dbUpdate("updateMessage", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	dbUpdate("updateMessage_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MESSAGE_ID [MESSAGE_ID]
	 *	- field : LOCALE_ID [LOCALE_ID]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet deleteMessage(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    dbDelete("deleteMessage", requestData.getFieldMap(), onlineCtx);
	    
	    return responseData;
	 }
  
}
