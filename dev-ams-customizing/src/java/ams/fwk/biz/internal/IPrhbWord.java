package ams.fwk.biz.internal;

import java.sql.Timestamp;


public interface IPrhbWord {

	public int getSeqNo();
	public String getProhibitWord();
	public String getRegUserId();
	public Timestamp getRegDate();
	public String getUpdateUserId();
	public Timestamp getUpdateDate();
	public String getUseFlag();
}
