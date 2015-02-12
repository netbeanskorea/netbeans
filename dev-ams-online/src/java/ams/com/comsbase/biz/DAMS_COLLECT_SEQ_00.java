package ams.com.comsbase.biz;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.util.AppUtils;
import nexcore.framework.core.util.DateUtils;

import org.apache.commons.logging.Log;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/공통업무</li>
 * <li>단위업무명: [DU]채번테이블</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-08-28 14:41:43</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class DAMS_COLLECT_SEQ_00 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DAMS_COLLECT_SEQ_00(){
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
	public IDataSet insertSelectSeqNo(IDataSet requestData, IOnlineContext onlineCtx) {
		IDataSet responseData = new DataSet();
		IDataSet deleteOldSeqNo = new DataSet();
		
		IRecordSet seqNo = null;
		
		if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
			seqNo = dbSelect("selectSeqNo", requestData.getFieldMap(), onlineCtx);
		}else {
			seqNo = dbSelect("insertSelectSeqNo_MSSQL", requestData.getFieldMap(), onlineCtx);
			//새로 취득한 SEQ_NO 이전 데이터는 사용자의 편의를 위해 제거한다. 
			deleteOldSeqNo.putField("SEQ_NO",  seqNo.get(0, "SEQ_NO"));
			deleteOldSeqNo.putField("TABLE_NAME", requestData.getField("TABLE_NAME"));
			dbDelete("deleteOldSeqNo", deleteOldSeqNo.getFieldMap(), onlineCtx);
		}
		
		responseData.putField("SEQ_NO", seqNo.get(0, "SEQ_NO"));// 반드시 1건은
		// 처리 결과값을 responseData에 넣어서 리턴하십시오
		
		return responseData;
	}
  
}
