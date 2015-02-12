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
import org.apache.commons.logging.Log;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/공통업무</li>
 * <li>단위업무명: [DU]PUSH메시지관리테이블</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-10-04 10:15:55</li>
 * <li>작성자 : 성지호 (SungJiHo)</li>
 * </ul>
 *
 * @author 성지호 (SungJiHo)
 */
public class DAMS_PUSH_TABLE extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public DAMS_PUSH_TABLE(){
		super();
	}

	/**
	 *
	 *
	 * @author 성지호 (SungJiHo)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * <pre>
	 *	- field : MSG [메시지]
	 * </pre>
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet insertPushMessage(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    int cnt = dbInsert("insertPushMessage", requestData.getFieldMap(), onlineCtx);
	    
	    if(cnt==1) {
	    	responseData.setOkResultMessage("M3000000", null);
	    } else {
	    	// PUSH message insert error
	    	throw new BizRuntimeException("", new String[]{});
	    }
	    
	    return responseData;
	 }
  
}
