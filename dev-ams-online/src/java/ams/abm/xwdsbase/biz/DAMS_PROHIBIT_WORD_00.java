package ams.abm.xwdsbase.biz;

import java.util.Map;

import org.apache.commons.logging.Log;

import ams.fwk.constants.Constants;
import ams.fwk.constants.DBNamingConstants;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.ResultMessage;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.util.AppUtils;


/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [DU]금칙어 테이블</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2014-01-03 15:37:50</li>
 * <li>작성자 : 강훈기 (hunkee)</li>
 * </ul>
 *
 * @author 강훈기 (hunkee)
 */
public class DAMS_PROHIBIT_WORD_00 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DAMS_PROHIBIT_WORD_00(){
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
	public IDataSet selectProhibitWordList(IDataSet requestData, IOnlineContext onlineCtx){
	  Log log = getLog(onlineCtx);
	  IDataSet responseData = new DataSet();
	  
	  IRecordSet rs = null;
	  
	  if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
		  rs = dbSelect("selectProhibitWordList", requestData.getFieldMap(), onlineCtx);
	  } else {
		  rs = dbSelect("selectProhibitWordList_MSSQL", requestData.getFieldMap(), onlineCtx);
	  }
	  
	  IRecord r = dbSelectSingle("selectProhibitWordListCount", requestData.getFieldMap(), onlineCtx);
	  
	  responseData.putField("totalCount",r.get("totalCount"));

	  responseData.putRecordSet(DBNamingConstants.AMS_PROHIBIT_WORD, rs);
	
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
	public IDataSet insertProhibitWord(IDataSet requestData, IOnlineContext onlineCtx){
	  Log log = getLog(onlineCtx);
	  IDataSet responseData = new DataSet();
	  
	  if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
		  dbInsert("insertProhibitWord", requestData.getFieldMap(), onlineCtx);
	  } else {
		  dbInsert("insertProhibitWord_MSSQL", requestData.getFieldMap(), onlineCtx);
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
	public IDataSet updateProhibitWord(IDataSet requestData, IOnlineContext onlineCtx){
	  Log log = getLog(onlineCtx);
	  IDataSet responseData = new DataSet();
	  
	  if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
		  dbUpdate("updateProhibitWord", requestData.getFieldMap(), onlineCtx);
	  } else {
		  dbUpdate("updateProhibitWord_MSSQL", requestData.getFieldMap(), onlineCtx);
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
	public IDataSet deleteProhibitWord(IDataSet requestData, IOnlineContext onlineCtx){
	  Log log = getLog(onlineCtx);
	  IDataSet responseData = new DataSet();
	  
	  dbDelete("deleteProhibitWord", requestData.getFieldMap(), onlineCtx);
	
	  return responseData;
	}
  
}
