package ams.asm.fwkbbase.biz;

import java.util.Map;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.ResultMessage;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.logging.Log;

import ams.fwk.constants.Constants;
import ams.fwk.utils.BaseUtils;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/FWK업무</li>
 * <li>단위업무명: [PU]JMX호출</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-11-28 13:57:04</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class PFWK901 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PFWK901(){
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
	public IDataSet pFWK90101(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    SharedBizComponent fwkSC = lookupSharedBizComponent("asm.FWKSBase");
	    IDataSet responseData = new DataSet();
	    try {
	    	callSharedBizComponentByDirect(fwkSC, "refreshCacheByWAS", requestData, onlineCtx);
	    	
	    } catch(Exception e) {
	    	if(log.isErrorEnabled()) {
    			log.error("[JMX Error]Error is occured. May not have the selected cache.");
    		}
	    	throw new BizRuntimeException("SKFS1048", new String[]{"JMX을 통한 cache refresh중에 오류발생",  this.getClass().getName()}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("NO_CODE", null);
	    return responseData;
	 }
  
}
