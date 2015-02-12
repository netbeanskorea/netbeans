package ams.asm.fwksbase.biz;

import java.util.List;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.util.AppUtils;
import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.core.util.DateUtils;

import org.apache.commons.logging.Log;

import ams.fwk.common.TrtmRsltMsg;
import ams.fwk.common.user.AmsUserInfo;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/FWK업무</li>
 * <li>단위업무명: [FU]거래/에러로그</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-07-09 13:21:36</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class FFWK998 extends ams.fwk.base.FunctionUnit  {
	private final String[] EXCEPT_LOG = new String[]{"mng.MNGCODB#selectCodeHelper","mng.MNGCODB#selectCodeIdCodeHelper"};
	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public FFWK998(){
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
	public IDataSet writeTrLog(IDataSet requestData, IOnlineContext onlineCtx){
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    DAMS_TRAN_LOG_00 dAMS_TRAN_LOG_00 = (DAMS_TRAN_LOG_00)lookupDataUnit(DAMS_TRAN_LOG_00 .class);
	    IDataSet trLogDS = null;
	    String trCd = onlineCtx.getTransaction().getTxId();
	    boolean flag = false;
	    try {
	    	for(String exceptLog : EXCEPT_LOG) {
	    		if(trCd.equals(exceptLog)){
	    			flag = true;
	    			break;
	    		}
	    	}
	    	if(flag){
	    		return responseData;
	    	}
	    	trLogDS = _convertOnlineCtxToDataSet(onlineCtx, (IDataSet)requestData.getObjectField("responseDataSet"), true);
	    	dAMS_TRAN_LOG_00.insertTranLog(trLogDS, onlineCtx);
	    	
	    	return responseData;
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"거래로그 입력"}, e);
		 } 
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
	public IDataSet writeErLog(IDataSet requestData, IOnlineContext onlineCtx){
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    DAMS_ERR_LOG_00 dAMS_ERR_LOG_00 = (DAMS_ERR_LOG_00)lookupDataUnit(DAMS_ERR_LOG_00 .class);
	    IDataSet erLogDS = null;
	    try {
	    	erLogDS = _convertOnlineCtxToDataSet(onlineCtx, requestData, false);
	    	dAMS_ERR_LOG_00.insertErrLog(erLogDS, onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"에러로그 입력"}, e);
		 } 
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    return responseData;
	 }
	
	/**
	 * Online Context에 담겨 있는 정보를 DataSet으로 전환
	 * @param onlineCtx
	 * @param responseData
	 * @param isTrlog
	 * @return
	 */
	private IDataSet _convertOnlineCtxToDataSet(IOnlineContext onlineCtx, IDataSet responseData, boolean isTrlog) {
		String msgCd = "";
		String[]msgParam = null;
		IDataSet ds = new DataSet();
		AmsUserInfo userInfo = (AmsUserInfo)onlineCtx.getUserInfo();
		
		ds.putField("LOG_DT", DateUtils.getCurrentDate());
		ds.putField("GLOB_ID",onlineCtx.getTransaction().getRequestId());
		ds.putField("MENU_ID", userInfo.getMenuId());
		ds.putField("IPAD", userInfo.getIp());
		ds.putField("TRN_CD", onlineCtx.getTransaction().getTxId());
		ds.putField("USER_ID", userInfo.getLoginId());
		ds.putField("SVC_STRN_DTTM", DateUtils.dateToString(onlineCtx.getTransaction().getStartTime(), "yyyyMMddHHmmssSSS"));
		ds.putField("SVC_END_DTTM", DateUtils.getCurrentDate("yyyyMMddHHmmssSSS"));
		ds.putField("OS_VER", userInfo.getOSVer());
		ds.putField("AGENT_VER", userInfo.getAgentVer());
		ds.putField("WAS_INSTANCE_ID", AppUtils.getProperty("system.id"));
		
		List<TrtmRsltMsg> msgList = null;
		if(!isTrlog) {//에러로그 일때
			msgList = userInfo.getMsgList();
			if(msgList != null) {
				for(int i=0; i<msgList.size(); i++) {
					TrtmRsltMsg msgObj = msgList.get(i);
					ds.putField("RSLT_MSG_CD"+(i+1), msgObj.getMsgCd());
					ds.putField("RSLT_MSG"+(i+1), msgObj.getMsgCntn());
					ds.putField("ERR_PRGM_NM"+(i+1), msgObj.getErorOcrnPrrmNm());
					ds.putField("ERR_PRGM_LN"+(i+1), msgObj.getErorOcrnPrrmLine());
				}
			}
		} else {//거래로그 일때
			if(responseData.getResultMessage() != null) {
				msgCd = responseData.getResultMessage().getMessageId();
				msgParam = responseData.getResultMessage().getMessageParams();
			}
			ds.putField("RSLT_MSG_CD", msgCd);
			ds.putField("RSLT_MSG", BaseUtils.getMessage(msgCd, msgParam==null?new String[]{}:msgParam)); 
		}
		return ds;
	}
  
}
