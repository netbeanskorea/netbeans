package ams.wsdl.controller;

import java.util.HashMap;
import java.util.Map;

import nexcore.framework.core.ioc.ComponentRegistry;
import ams.wsdl.internal.EmkWsdlLogManager;

import com.star.nexcore.foundation.util.DateUtils;

/**
 * 해당 Controller는 BizTok 과의 연동정보를 DB에 저장하기 위한 Controller로서, 
 * 사업부 담당자의 요청으로 작성하게 되었음. 해당 파일은 FWK과는 전혀 무관하며, 
 * 개발팀의 업무부하를 줄여주기 위해 개발해준 것으로서 차후 해당 소스의 관리주체는
 * 개발팀이 되어야 하며, 해당 소스와 관련된 이슈는 FWK이 처리해줄 수 없음을 명시합니다. 
 * @author 박세일
 *
 */
public class WsdlLogController{
	private int seqNo;
	private String tpCd;
	private String appNm;
	private String reqsDesc;
	private String rspnseDesc;
	private String userId;
	private String rsltCd;
	private String msg;
	public static final String TP_CD_BTC = "BTC";//BIZ Talk Client
	public static final String TP_CD_BTS = "BTS";//BIZ Talk Server
	public static final String TP_CD_BAT = "BAT";//Batch

	
	/**
	 * 
	 * @param tpCd 클래스에 ststic으로 선언되어 있는 변수를 사용하면 됨 ex)WsdlLogController.TP_CD_BTC
	 * @param appNm 호출프로그램명
	 * @param reqsDesc IF요청전문
	 * @param userId 사용자 ID
	 */
	public WsdlLogController(String tpCd, String appNm, String reqsDesc, String userId) {
    	this.tpCd = tpCd;
    	this.appNm = appNm;
    	this.reqsDesc = reqsDesc;
    	this.userId = userId;
    }
		
	/**
	 * BizTok 전송 전, 요청항목에 대한 정보를 DB에 저장한다.
	 * @return
	 */
	public  String writeReqIFLog() {
		Map<String, String> queryParam = makeParamMap();
		Map responseMap = getWsdlLogManager().insertIFLog(queryParam);
		int seqNo = (Integer)responseMap.get("IF_SEQ");
		this.seqNo = seqNo;
		return seqNo+"";
	}
	
	/**
	 * BizTok 수신 완료 정보를 DB에 저장한다.
	 * @param seqNo
	 * @param rspnseDesc
	 * @param rsltCd
	 * @param msg
	 */
	public void writeResIFLog(String seqNo, String rspnseDesc, String rsltCd, String msg ) {
		this.rsltCd = rsltCd;
		this.msg = msg;
		this.rspnseDesc = rspnseDesc;
		Map<String, String> queryParam = new HashMap<String, String>();
		queryParam.put("IF_SEQ", seqNo);
		queryParam.put("IF_DT", DateUtils.getCurrentDate());
		queryParam.put("IF_RSPNSE_DESC", rspnseDesc);
		queryParam.put("IF_RSLT_CD", rsltCd);
		queryParam.put("IF_MSG", msg);
		queryParam.put("IF_END_DTTM", DateUtils.getCurrentDate("yyyyMMddHHmmssSSS"));
		getWsdlLogManager().updateIFLog(queryParam);
	}
	
	/**
	 * BizTok 수신 완료 정보를 DB에 저장한다.
	 * @param rspnseDesc
	 * @param rsltCd
	 * @param msg
	 */
	public void writeResIFLog(String rspnseDesc, String rsltCd, String msg ) {
		writeResIFLog(seqNo+"", rspnseDesc, rsltCd, msg );
	}
	
	private  EmkWsdlLogManager getWsdlLogManager() {
		 return (EmkWsdlLogManager)ComponentRegistry.lookup("emk.IEmkWsdlLogManager");
	}
	
	private Map makeParamMap() {
		Map<String, String> queryParam = new HashMap<String, String>();
		queryParam.put("IF_DT", DateUtils.getCurrentDate());
		queryParam.put("IF_TP_CD", tpCd);
		queryParam.put("IF_APP_NM", appNm);
		queryParam.put("IF_STRN_DTTM", DateUtils.getCurrentDate("yyyyMMddHHmmssSSS"));
		queryParam.put("IF_END_DTTM", "");
		queryParam.put("IF_RSLT_CD", "");
		queryParam.put("IF_MSG", "");
		queryParam.put("IF_REQS_DESC", reqsDesc);
		queryParam.put("IF_RSPNSE_DESC",rspnseDesc);
		queryParam.put("RGSTER_ID", userId);
		queryParam.put("UPDUSR_ID", userId);
		return queryParam;
	}

	public String getTpCd() {
		return tpCd;
	}

	public void setTpCd(String tpCd) {
		this.tpCd = tpCd;
	}

	public String getAppNm() {
		return appNm;
	}

	public void setAppNm(String appNm) {
		this.appNm = appNm;
	}

	public String getReqsDesc() {
		return reqsDesc;
	}

	public void setReqsDesc(String reqsDesc) {
		this.reqsDesc = reqsDesc;
	}

	public String getRspnseDesc() {
		return rspnseDesc;
	}

	public void setRspnseDesc(String rspnseDesc) {
		this.rspnseDesc = rspnseDesc;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRsltCd() {
		return rsltCd;
	}

	public void setRsltCd(String rsltCd) {
		this.rsltCd = rsltCd;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	
}
