package ams.fwk.push;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import ams.fwk.code.internal.AmsCode;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.RecordSet;
import nexcore.framework.core.prototype.AbsFwkService;
import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.integration.db.ISqlManager;

public class AmsPushManager extends AbsFwkService implements Runnable {
	
	/**
	 * Thread Sleep Time
	 */
	private long sleep;
	/**
	 * 테이블에서 마지막까지 ㅇ릭은 Timestamp 값
	 */
	private int timestamp;
	/**
	 * PUSH Message 캐쉬 
	 */
	private IRecordSet pushMessage;
	/**
	 * 최대 Message를 가지고 있느느 수
	 */
	private int maxMsgCount;
	/**
     * ISqlManager component.
     */
    protected ISqlManager sqlManager;
    
    /**
     * Set ISqlManager
     * @param sm  the SqlManager to set
     */
    public void setSqlManager(ISqlManager sm) {
        this.sqlManager = sm;
    }
    public void setMaxMsgCount(int maxMsgCount) {
		this.maxMsgCount = maxMsgCount;
	}
    public void setSleep(long sleep) {
    	this.sleep = sleep;
    }
    
    /**
     * Thread Object
     */
    private Thread thread = null;
    public void init() {
    	if(thread==null) {
    		thread = new Thread(this, "thread name");
    		pushMessage = new RecordSet("PUSH_MESSAGE", new String[]{"MSG", "timestamp", "DATE"});
    		newPushParam = new HashMap<String, String>();
    		timestamp = 0;
    		
    		thread.start();
    	}
    }
    
    public IRecordSet getPushMessage() {
		return pushMessage;
	}
	
	public IRecordSet getPushMessage(int timestamp) {
		IRecordSet rs = new RecordSet("PUSH_MESSAGE", new String[]{"MSG", "timestamp", "DATE"});
		
		for(int i = 0; i < pushMessage.getRecordCount(); i++) {
			IRecord r = pushMessage.getRecord(i);
			int ts = r.getInt("timestamp");
			if(ts > timestamp) {
				rs.addRecord(r);
			}
		}
		return rs;
	}
	
	@Override
	public void run() {
		try {
			while(true) {
				IRecordSet newRs = getNewPushMessage(timestamp);
				
				int recordCnt = newRs.getRecordCount();
				if(recordCnt!=0) {
					timestamp = Integer.parseInt(newRs.getRecord(newRs.getRecordCount() - 1).get("timestamp"));
					
					pushMesageFullCheck();
					
					for(int i = 0; i < recordCnt; i++ ) {
						pushMessage.addRecord(newRs.getRecord(i));
					}
				}
				
				thread.sleep(sleep);
			}
		} catch(Exception e) {
			
		}
	}
	
	private Map<String, String> newPushParam;
	private IRecordSet getNewPushMessage(int timestamp) {
		IRecordSet rs = new RecordSet("PUSH_MESSAGE", new String[]{"MSG", "timestamp", "DATE"});
		
		newPushParam.put("timestamp", "" + timestamp);
		
		List<HashMap<String, Object>> pushMsgList = sqlManager.queryForList("ams.push.selectPushMessage", newPushParam);
		Map<String, Object> each = null;
		for(Iterator iter = pushMsgList.iterator(); iter.hasNext(); ) {
			IRecord r = rs.newRecord();
			
			each = (Map<String, Object>) iter.next();
			
			r.put("MSG", each.get("MSG"));
			r.put("timestamp", each.get("timestamp"));
			r.put("DATE", each.get("DATE"));
		}
		
		return rs;
	}
	
	private void pushMesageFullCheck() {
		int pushMessageCount = pushMessage.getRecordCount(); 
		if(pushMessageCount > maxMsgCount) {
			for(int i = 0; i < (pushMessageCount - maxMsgCount); i++) {
				pushMessage.removeRecord(0);
			}
		}
		// TODO
		// pushMessage에서 오늘이 아닌 다른날, 아니면 오래된거 삭제 로직
		// timestamp 값이 날이 변하면 0으로 변경해야함.
	}

}
