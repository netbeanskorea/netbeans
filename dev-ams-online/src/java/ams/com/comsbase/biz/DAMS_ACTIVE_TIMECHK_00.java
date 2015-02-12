package ams.com.comsbase.biz;

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
import ams.fwk.utils.BaseUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/공통업무</li>
 * <li>단위업무명: [DU]Active시간체크테이블</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-09-12 10:58:30</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class DAMS_ACTIVE_TIMECHK_00 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DAMS_ACTIVE_TIMECHK_00(){
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
	public IDataSet selectActiveTimeByTableName(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecordSet rs = dbSelect("selectActiveTimeByTableName", requestData.getFieldMap(), onlineCtx);
	    if(rs != null && rs.getRecordCount() == 1) {
	    	responseData.putFieldMap(rs.getRecordMap(0));
	    }
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
	public IDataSet upddateAcvtiveTimeByTableName(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    int updateCnt =0;
	    if(BaseUtils.isOracle()){
	    	 updateCnt = dbUpdate("upddateAcvtiveTimeByTableName", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	 updateCnt = dbUpdate("upddateAcvtiveTimeByTableName_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
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
	public IDataSet insertActiveTime(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    if(BaseUtils.isOracle()){
	    	dbInsert("insertActiveTime", requestData.getFieldMap(), onlineCtx);
	    } else {
	    	dbInsert("insertActiveTime_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    return responseData;
	 }
  
}
