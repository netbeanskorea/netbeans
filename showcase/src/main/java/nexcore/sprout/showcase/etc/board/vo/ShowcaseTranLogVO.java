package nexcore.sprout.showcase.etc.board.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties(ignoreUnknown = true)
public class ShowcaseTranLogVO {

	private String seqNo;
	private String LOG_DT;
	private String GLOB_ID;
	private String MENU_ID;
	private String IPAD;
	private String TRN_CD;
	private String USER_ID;
	private String GROUP_ID;
	private String OS_VER;
	private String AGENT_VER;
	private String SVC_STRN_DTTM;
	private String SVC_END_DTTM;
	private String RSLT_MSG;
	
	private String RSLT_MSG_CD;
	private String WAS_INSTANCE_ID;
	private String ELAPSE_TIME;
	public String getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(String seqNo) {
		this.seqNo = seqNo;
	}
	public String getLOG_DT() {
		return LOG_DT;
	}
	public void setLOG_DT(String lOG_DT) {
		LOG_DT = lOG_DT;
	}
	public String getGLOB_ID() {
		return GLOB_ID;
	}
	public void setGLOB_ID(String gLOB_ID) {
		GLOB_ID = gLOB_ID;
	}
	public String getMENU_ID() {
		return MENU_ID;
	}
	public void setMENU_ID(String mENU_ID) {
		MENU_ID = mENU_ID;
	}
	public String getIPAD() {
		return IPAD;
	}
	public void setIPAD(String iPAD) {
		IPAD = iPAD;
	}
	public String getTRN_CD() {
		return TRN_CD;
	}
	public void setTRN_CD(String tRN_CD) {
		TRN_CD = tRN_CD;
	}
	public String getUSER_ID() {
		return USER_ID;
	}
	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}
	public String getGROUP_ID() {
		return GROUP_ID;
	}
	public void setGROUP_ID(String gROUP_ID) {
		GROUP_ID = gROUP_ID;
	}
	public String getOS_VER() {
		return OS_VER;
	}
	public void setOS_VER(String oS_VER) {
		OS_VER = oS_VER;
	}
	public String getAGENT_VER() {
		return AGENT_VER;
	}
	public void setAGENT_VER(String aGENT_VER) {
		AGENT_VER = aGENT_VER;
	}
	public String getSVC_STRN_DTTM() {
		return SVC_STRN_DTTM;
	}
	public void setSVC_STRN_DTTM(String sVC_STRN_DTTM) {
		SVC_STRN_DTTM = sVC_STRN_DTTM;
	}
	public String getSVC_END_DTTM() {
		return SVC_END_DTTM;
	}
	public void setSVC_END_DTTM(String sVC_END_DTTM) {
		SVC_END_DTTM = sVC_END_DTTM;
	}
	public String getRSLT_MSG() {
		return RSLT_MSG;
	}
	public void setRSLT_MSG(String rSLT_MSG) {
		RSLT_MSG = rSLT_MSG;
	}
	public String getRSLT_MSG_CD() {
		return RSLT_MSG_CD;
	}
	public void setRSLT_MSG_CD(String rSLT_MSG_CD) {
		RSLT_MSG_CD = rSLT_MSG_CD;
	}
	public String getWAS_INSTANCE_ID() {
		return WAS_INSTANCE_ID;
	}
	public void setWAS_INSTANCE_ID(String wAS_INSTANCE_ID) {
		WAS_INSTANCE_ID = wAS_INSTANCE_ID;
	}
	public String getELAPSE_TIME() {
		return ELAPSE_TIME;
	}
	public void setELAPSE_TIME(String eLAPSE_TIME) {
		ELAPSE_TIME = eLAPSE_TIME;
	}
	
}