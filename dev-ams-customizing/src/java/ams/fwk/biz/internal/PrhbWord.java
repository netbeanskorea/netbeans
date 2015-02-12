package ams.fwk.biz.internal;

import java.sql.Timestamp;


public class PrhbWord implements IPrhbWord {
	private int seqNo;
	private String prohibitWord;
	private String regUserId;
	private Timestamp regDate;
	private String updateUserId;
	private Timestamp updateDate;
	private String useFlag;
	
	@Override
	public int getSeqNo() {
		return seqNo;
	}

	@Override
	public String getProhibitWord() {
		return prohibitWord;
	}

	@Override
	public String getRegUserId() {
		return regUserId;
	}

	@Override
	public Timestamp getRegDate() {
		return regDate;
	}

	@Override
	public String getUpdateUserId() {
		return updateUserId;
	}

	@Override
	public Timestamp getUpdateDate() {
		return updateDate;
	}

	@Override
	public String getUseFlag() {
		return useFlag;
	}

	public void setseqNo(int seqNo) {
		this.seqNo = seqNo;
	}

	public void setProhibitWord(String prohibitWord) {
		this.prohibitWord = prohibitWord;
	}

	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}

	public void setRegDate(Timestamp regDate) {
		this.regDate = regDate;
	}

	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
	}

	public void setUpdateDate(Timestamp updateDate) {
		this.updateDate = updateDate;
	}

	public void setUseFlag(String useFlag) {
		this.useFlag = useFlag;
	}
}
