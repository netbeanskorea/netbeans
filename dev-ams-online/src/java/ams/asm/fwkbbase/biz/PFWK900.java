package ams.asm.fwkbbase.biz;

import java.sql.Timestamp;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecordHeader;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.RecordHeader;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.util.DateUtils;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.logging.Log;

import ams.fwk.constants.DBNamingConstants;
import ams.fwk.utils.AmsUtils;
import ams.fwk.utils.PagenateUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/FWK업무</li>
 * <li>단위업무명: [PU]로그관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-07-09 13:39:03</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class PFWK900 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PFWK900(){
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
	public IDataSet pFWK90001(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("asm.FWKSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	requestData.putField("START_DT", requestData.getField("START_DT").replaceAll("-", ""));
	    	requestData.putField("END_DT", requestData.getField("END_DT").replaceAll("-", ""));
			
	    	//페이지 처리
			PagenateUtils.setPagenatedParamsToDataSet(requestData);
			
			//목록 조회    
			IDataSet ds = callSharedBizComponentByDirect(sc, "selectTranLogList", requestData, onlineCtx);
			
			int totalCount = Integer.parseInt(ds.getField("totalCount"));

			IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_TRAN_LOG);
			PagenateUtils.setPagenatedParamToRecordSet(rs, requestData, totalCount);
			
			//헤더 추가
			IRecordHeader header = new RecordHeader("resp_time", "resp_time", 13);
			rs.addHeader(header);
			
			// 수행시간 계산 후 입력
			int count = rs.getRecordCount();
			for(int i = 0; i < count; i++){
				String SVC_STRN_DTTM = rs.getRecord(i).get("SVC_STRN_DTTM");
				String SVC_END_DTTM = rs.getRecord(i).get("SVC_END_DTTM");
				Timestamp startTime = DateUtils.stringToDate(SVC_STRN_DTTM, "yyyyMMddHHmmssSSS");
				Timestamp endTime = DateUtils.stringToDate(SVC_END_DTTM, "yyyyMMddHHmmssSSS");
				long diff = endTime.getTime() - startTime.getTime();
				rs.getRecord(i).put("resp_time", diff/1000.0);
			}
			
			responseData.putRecordSet(rs);
			
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    throw new BizRuntimeException("M1000000", new String[]{"거래로그 목록조회"},e);
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
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pFWK90002(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("asm.FWKSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	requestData.putField("START_DT", requestData.getField("START_DT").replaceAll("-", ""));
	    	requestData.putField("END_DT", requestData.getField("END_DT").replaceAll("-", ""));
			
	    	//페이지 처리
			PagenateUtils.setPagenatedParamsToDataSet(requestData);
			
			//목록 조회    
			IDataSet ds = callSharedBizComponentByDirect(sc, "selectErrLogList", requestData, onlineCtx);
			
			int totalCount = Integer.parseInt(ds.getField("totalCount"));

			IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_ERR_LOG);
			PagenateUtils.setPagenatedParamToRecordSet(rs, requestData, totalCount);
			
			//헤더 추가
			IRecordHeader header = new RecordHeader("resp_time", "resp_time", 35);
			rs.addHeader(header);
			
			// 수행시간 계산 후 입력
			int count = rs.getRecordCount();
			for(int i = 0; i < count; i++){
				String SVC_STRN_DTTM = rs.getRecord(i).get(DBNamingConstants.SVC_STRN_DTTM);
				String SVC_END_DTTM = rs.getRecord(i).get(DBNamingConstants.SVC_END_DTTM);
				Timestamp startTime = DateUtils.stringToDate(SVC_STRN_DTTM, "yyyyMMddHHmmssSSS");
				Timestamp endTime = DateUtils.stringToDate(SVC_END_DTTM, "yyyyMMddHHmmssSSS");
				long diff = endTime.getTime() - startTime.getTime();
				rs.getRecord(i).put("resp_time", diff/1000.0);
			}
			
			responseData.putRecordSet(rs);
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"에러로그 목록조회"}, e);
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
	public IDataSet pFWK90003(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("asm.FWKSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
			requestData.putField("START_DT", requestData.getField("START_DT").replaceAll("-", ""));
	    	requestData.putField("END_DT", requestData.getField("END_DT").replaceAll("-", ""));
		 
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectTranLogListToExcel", requestData, onlineCtx);
	    	
	    	IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_TRAN_LOG);
			
	    	//헤더 추가
			IRecordHeader header = new RecordHeader("resp_time", "resp_time", 31);
			rs.addHeader(header);
			
			// 수행시간 계산 후 입력
			for(int i = 0; i < rs.getRecordCount(); i++){
				String SVC_STRN_DTTM = rs.getRecord(i).get("SVC_STRN_DTTM");
				String SVC_END_DTTM = rs.getRecord(i).get("SVC_END_DTTM");
				Timestamp startTime = DateUtils.stringToDate(SVC_STRN_DTTM, "yyyyMMddHHmmssSSS");
				Timestamp endTime = DateUtils.stringToDate(SVC_END_DTTM, "yyyyMMddHHmmssSSS");
				long diff = endTime.getTime() - startTime.getTime();
				rs.getRecord(i).put("resp_time", diff/1000.0);
			}
	    	
	    	//************************************ 엑셀 EXPORT **************************************************************
			
			// 엑셀 헤더 자료 생성
			IRecordSet MTRLogHeaderRS = AmsUtils.makeExcelHeaderRecordSet("MTRLOG_LIST_DATA_HEADER", "LOG_DT:일시,USER_ID:사용자ID,MENU_ID:메뉴ID,GLOB_ID:GUID,IPAD:IP,TRN_CD:거래ID,SVC_STRN_DTTM:시작일시,SVC_END_DTTM:종료일시,RSLT_MSG_CD:결과코드,RSLT_MSG:결과메시지,OS_VER:버젼,AGENT_VER:AGENT버젼,resp_time:수행시간(초)");
			
			// 다중 엑셀시트 구성을 하기 위한 샘플
			responseData.putRecordSet("MTRLOG_LIST_DATA", rs);
			responseData.putRecordSet("MTRLOG_LIST_DATA_HEADER", MTRLogHeaderRS);
			
			//************************************ 엑셀 EXPORT 끝**************************************************************
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"거래로그 엑셀저장"}, e);
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
	public IDataSet pFWK90004(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("asm.FWKSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	requestData.putField("START_DT", requestData.getField("START_DT").replaceAll("-", ""));
	    	requestData.putField("END_DT", requestData.getField("END_DT").replaceAll("-", ""));
			//페이지 처리
	    	
			//목록 조회    
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectErrLogListToExcel", requestData, onlineCtx);
	    	IRecordSet rs = ds.getRecordSet(DBNamingConstants.AMS_ERR_LOG);
	    	
	    	//헤더 추가
			IRecordHeader header = new RecordHeader("resp_time", "resp_time", 35);
			rs.addHeader(header);
	    	
			// 수행시간 계산 후 입력
			for(int i = 0; i < rs.getRecordCount(); i++){
				String SVC_STRN_DTTM = rs.getRecord(i).get("SVC_STRN_DTTM");
				String SVC_END_DTTM = rs.getRecord(i).get("SVC_END_DTTM");
				Timestamp startTime = DateUtils.stringToDate(SVC_STRN_DTTM, "yyyyMMddHHmmssSSS");
				Timestamp endTime = DateUtils.stringToDate(SVC_END_DTTM, "yyyyMMddHHmmssSSS");
				long diff = endTime.getTime() - startTime.getTime();
				rs.getRecord(i).put("resp_time", diff/1000.0);
			}
			
			//************************************ 엑셀 EXPORT **************************************************************
			
			// 엑셀 헤더 자료 생성
			IRecordSet MERLogHeaderRS = AmsUtils.makeExcelHeaderRecordSet("MERLOG_LIST_DATA_HEADER","LOG_DT:일시,USER_ID:사용자ID,MENU_ID:메뉴ID,GLOB_ID:GUID,IPAD:IP,TRN_CD:거래ID,SVC_STRN_DTTM:시작일시,SVC_END_DTTM:종료일시,RSLT_MSG_CD1:결과코드,RSLT_MSG1:결과메시지,ERR_PRGM_NM1:결과메소드1,ERR_PRGM_LN1:라인위치1,RSLT_MSG_CD2:결과코드2,RSLT_MSG2:결과메시지2,ERR_PRGM_NM2:결과메소드2,ERR_PRGM_LN2:라인위치2,RSLT_MSG_CD3:결과코드3,RSLT_MSG3:결과메시지3,ERR_PRGM_NM3:결과메소드3,ERR_PRGM_LN3:라인위치3,RSLT_MSG_CD4:결과코드4,RSLT_MSG4:결과메시지4,ERR_PRGM_NM4:결과메소드4,ERR_PRGM_LN4:라인위치4,RSLT_MSG_CD5:결과코드5,RSLT_MSG5:결과메시지5,ERR_PRGM_NM5:결과메소드5,ERR_PRGM_LN5:라인위치5,OS_VER:버젼,AGENT_VER:AGENT버젼,WAS_INSTANCE_ID:WAS이름,resp_time:수행시간(초)");
			
			// 다중 엑셀시트 구성을 하기 위한 샘플
			responseData.putRecordSet("MERLOG_LIST_DATA", rs);
			responseData.putRecordSet("MERLOG_LIST_DATA_HEADER", MERLogHeaderRS);
			
			//************************************ 엑셀 EXPORT 끝**************************************************************
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"에러로그 엑셀저장"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }
  
}
