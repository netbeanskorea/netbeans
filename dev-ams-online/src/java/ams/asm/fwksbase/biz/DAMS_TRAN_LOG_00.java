package ams.asm.fwksbase.biz;

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
 * <li>업무 그룹명 : AMS/FWK업무</li>
 * <li>단위업무명: [DU]거래로그 테이블</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-08-13 16:54:26</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class DAMS_TRAN_LOG_00 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DAMS_TRAN_LOG_00(){
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
	public IDataSet insertTranLog(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	dbInsert("insertTranLog", requestData.getFieldMap(), "NonXA", onlineCtx);
	    } else {
	    	dbInsert("insertTranLog_MSSQL", requestData.getFieldMap(), "NonXA", onlineCtx);
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
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet selectTranLogList(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecordSet rs = null;
	    IRecord r = null;
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	rs = dbSelect("selectTranLogList", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectTranLogListCount", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	rs = dbSelect("selectTranLogList_MSSQL", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectTranLogListCount_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    responseData.putField("totalCount", r.get("totalCount"));
	    responseData.putRecordSet(DBNamingConstants.AMS_TRAN_LOG, rs);
	    
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
	public IDataSet selectTranLogListToExcel(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecordSet rs = null;
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	rs = dbSelect("selectTranLogListToExcel", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	rs = dbSelect("selectTranLogListToExcel_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    responseData.putRecordSet(DBNamingConstants.AMS_TRAN_LOG, rs);
	    
	    return responseData;
	 }
  
}
