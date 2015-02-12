package ams.mtr.acrbbase.biz;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.exception.BizRuntimeException;


/**
 * <ul>
 * <li>업무 그룹명 : AMS/모니터링</li>
 * <li>단위업무명: [PU]Acra 모니터링</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2015-02-10 10:17:09</li>
 * <li>작성자 : 강훈기 (hunkee)</li>
 * </ul>
 *
 * @author 강훈기 (hunkee)
 */
public class PACR_MONITORING_00 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PACR_MONITORING_00(){
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
	public IDataSet pACR10000(IDataSet requestData, IOnlineContext onlineCtx){
	  IDataSet responseData = new DataSet();
	  DACR_MONITORING_00 acr_monitoring = (DACR_MONITORING_00)lookupDataUnit(DACR_MONITORING_00.class);
	  IDataSet ds = new DataSet();
	    try {
	    	ds = acr_monitoring.selectAcraMonitoring(requestData, onlineCtx);
	    	responseData.putRecordSet("ACRA", ds.getRecordSet("ACRA"));
	  } catch(BizRuntimeException e) {
		throw e;
	  } catch(Exception e) {
		throw new BizRuntimeException("M1000000", e);
	  }
	 // 처리 결과값을 responseData에 넣어서 리턴하십시오
	 // 메시지코드는 환경에 맞게 변경하십시오.    
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
	public IDataSet pACR10001(IDataSet requestData, IOnlineContext onlineCtx){
	  IDataSet responseData = new DataSet();
	  DACR_MONITORING_00 acr_monitoring = (DACR_MONITORING_00)lookupDataUnit(DACR_MONITORING_00.class);
	  try {
		  acr_monitoring.insertAcraMonitoring(requestData, onlineCtx);	  
	  } catch(BizRuntimeException e) {
		throw e;
	  } catch(Exception e) {
		throw new BizRuntimeException("M1000000", e);
	  }
	 // 처리 결과값을 responseData에 넣어서 리턴하십시오
	 // 메시지코드는 환경에 맞게 변경하십시오.    
	  responseData.setOkResultMessage("M3000000", null);
	
	  return responseData;
	}
  
}
