package ams.mtr.acrbbase.biz;

import java.util.Map;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.ResultMessage;
import nexcore.framework.core.exception.BizRuntimeException;


/**
 * <ul>
 * <li>업무 그룹명 : AMS/모니터링</li>
 * <li>단위업무명: [DU]Acra 모니터링</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2015-02-09 21:36:43</li>
 * <li>작성자 : 강훈기 (hunkee)</li>
 * </ul>
 *
 * @author 강훈기 (hunkee)
 */
public class DACR_MONITORING_00 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DACR_MONITORING_00(){
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
	public IDataSet selectAcraMonitoring(IDataSet requestData, IOnlineContext onlineCtx){
		
	  IDataSet responseData = new DataSet();
	  
	  IRecordSet rs = dbSelect("selectAcraMonitoring", requestData.getFieldMap(), onlineCtx);
		
      responseData.putRecordSet("ACRA", rs);
	
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
	public IDataSet insertAcraMonitoring(IDataSet requestData, IOnlineContext onlineCtx){
		
	  IDataSet responseData = new DataSet();
	  
	  dbInsert("insertAcraMonitoring", requestData.getFieldMap(), onlineCtx);
	
	  return responseData;
	}
  
}
