package ams.abm.ugrsbase.biz;

import java.util.Map;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.RecordSet;
import nexcore.framework.core.util.AppUtils;

import org.apache.commons.logging.Log;

import ams.fwk.constants.DBNamingConstants;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [DU]사용자그룹-권한 맵핑테이블</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-08-05 18:53:32</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class DAMS_GROUP_ROLE_MAPPING_00 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DAMS_GROUP_ROLE_MAPPING_00(){
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
	public IDataSet selectRoleInfoByGroup(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
    	
    	IRecordSet rs = dbSelect("selectRoleInfoByGroup", requestData.getFieldMap(), onlineCtx);
    	
    	responseData.putRecordSet(DBNamingConstants.AMS_GROUP_ROLE_MAPPING, rs);
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
	public IDataSet selectUserGroupMappingByUser(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    
	    IRecordSet rs = dbSelect("selectUserGroupMappingByUser", requestData.getFieldMap(), onlineCtx);
	    responseData.putRecordSet(DBNamingConstants.AMS_GROUP_ROLE_MAPPING, rs);
	    
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
	public IDataSet selectGroupRoleMappingList(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecordSet rs = null;
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	rs = dbSelect("selectGroupRoleMappingList", requestData.getFieldMap(), onlineCtx);
	    }else{
	    	rs = dbSelect("selectGroupRoleMappingList_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    responseData.putRecordSet(DBNamingConstants.AMS_GROUP_ROLE_MAPPING, rs);
	    
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
	public IDataSet selectRoleListByGroup(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    IRecordSet rs = null;
	    IRecord r = null;
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	rs = dbSelect("selectRoleListByGroup", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectRoleListByGroupCount", requestData.getFieldMap(), onlineCtx);
	    }else{
	    	rs = dbSelect("selectRoleListByGroup_MSSQL", requestData.getFieldMap(), onlineCtx);
	    	r = dbSelectSingle("selectRoleListByGroupCount_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    responseData.putField("totalCount", r.getInt("totalCount"));
	    responseData.putRecordSet(DBNamingConstants.AMS_ROLE, rs);
	    
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
	public IDataSet insertGroupRoleMapping(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	dbInsert("insertGroupRoleMapping", requestData.getFieldMap(), onlineCtx);
	    }else{
	    	dbInsert("insertGroupRoleMapping_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
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
	public IDataSet deleteGroupRoleMapping(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
	    	dbDelete("deleteGroupRoleMapping", requestData.getFieldMap(), onlineCtx);
	    }else{
	    	dbDelete("deleteGroupRoleMapping_MSSQL", requestData.getFieldMap(), onlineCtx);
	    }
	    
	    return responseData;
	 }
  
}
