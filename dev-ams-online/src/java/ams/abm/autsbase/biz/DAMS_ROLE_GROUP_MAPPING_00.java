package ams.abm.autsbase.biz;

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
 * <li>단위업무명: [DU]권한-사용자그룹 맵핑테이블</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-10-04 13:15:07</li>
 * <li>작성자 : 강훈기 (hunkee)</li>
 * </ul>
 *
 * @author 강훈기 (hunkee)
 */
public class DAMS_ROLE_GROUP_MAPPING_00 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DAMS_ROLE_GROUP_MAPPING_00(){
		super();
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
	public IDataSet selectGroupListByRole(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    
	    IRecordSet rs = null;
	    IRecord r = null;
	    
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	rs = dbSelect("selectGroupListByRole", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectGroupListByRoleCount", requestData.getFieldMap(), onlineCtx);
	    }else{
	    	rs = dbSelect("selectGroupListByRole_MSSQL", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectGroupListByRoleCount", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    responseData.putField("totalCount", r.getInt("totalCount"));
	    responseData.putRecordSet(DBNamingConstants.AMS_GROUP, rs);

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
	public IDataSet selectRoleGroupMappingList(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecordSet rs = null;
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	rs = dbSelect("selectRoleGroupMappingList", requestData.getFieldMap(), onlineCtx);
	    }else{
	    	rs = dbSelect("selectRoleGroupMappingList_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    responseData.putRecordSet(DBNamingConstants.AMS_GROUP_ROLE_MAPPING, rs);
	    
	    return responseData;
	 }
  
}
