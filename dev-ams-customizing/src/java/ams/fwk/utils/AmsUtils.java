package ams.fwk.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.RecordSet;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.ioc.ComponentRegistry;
import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.constants.Constants;
import ams.fwk.push.AmsPushManager;

import com.star.nexcore.foundation.util.StringUtils;

/**
 * AMS에서 사용하는 Util 클래스
 * 
 * @version 0.1
 * @since 2013-03-05
 *
 */
public class AmsUtils {
	private AmsUtils() {
		// 객체 생성 방지
	}
    
    /**
     * 엑셀 다운로드 시 필요한 헤더 RecordSet 생성
     * 
     */
    public static IRecordSet makeExcelHeaderRecordSet(String recordSetId, String headerInfo) {
    	IRecordSet headerRS = new RecordSet(recordSetId, new String[] { "ID", "TITLE" });
    	List<String> headerList = StringUtils.stringToList(headerInfo, ',');
    	int headerCnt = headerList.size();
    	
    	for (int i = 0; i < headerCnt; i++) {
    		IRecord r = headerRS.newRecord();
    		String[] data = StringUtils.tokenizeToStringArray(headerList.get(i), ":");
    		r.set("ID", data[0]);
    		r.set("TITLE", data[1]);
    	}
    	
    	return headerRS;
    	
    }
    
    public static String encryptPassword(String plainText) {
    	StringBuffer sb = null;
    	try {
    		if(StringUtils.isNotEmpty(plainText)){
				MessageDigest md = MessageDigest.getInstance("SHA-256");
		        md.update(plainText.getBytes());
		 
		        byte byteData[] = md.digest();
		 
		        sb = new StringBuffer();
		        for (int i = 0; i < byteData.length; i++) {
		        	sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
		        }
    		}
    	} catch (NoSuchAlgorithmException e) {
    		throw new BizRuntimeException("M1000000", new String[]{"암호화 처리"}, e);
    	}
		
		return  sb.toString();
    }
    
    /**
	 * 생성된 AmsUserInfo의 정보를 원본 AmsUserInfo에 옮겨넣는다. 
	 * @param oriUserInfo
	 * @param onlineCtxUserInfo
	 */
	public static void cloneUserInfoToOnlineCtxUserInfo(Map oriUserInfo, AmsUserInfo copyUserInfo) {
		Iterator iter = oriUserInfo.keySet().iterator();
		Object obj = null;
		String key = "";
		while(iter.hasNext()) {
			obj = iter.next();
			if(obj instanceof String) {
				key = (String)obj;
				if(oriUserInfo.get(key) != null) {
					if(oriUserInfo.get(key) instanceof String) {//String타입일 경우는 기존 값이 empty가 아닐 경우만 넣는다.
						if(StringUtils.isNotEmpty((String)oriUserInfo.get(key))) {
							copyUserInfo.put(key, oriUserInfo.get(key));
						}
					} else if(oriUserInfo.get(key) instanceof List) { // 그외의 타입이 있을 경우를 대비에 구성 
						ArrayList tempList = new ArrayList((List)oriUserInfo.get(key));
						copyUserInfo.put(key, (List)tempList.clone());
					} else {
						//현재 Map타입은 없음.
						copyUserInfo.put(key, oriUserInfo.get(key));
					}
				}
				
			}
		}
	}
	
	public static AmsPushManager getAmsPushManager() {
		return (AmsPushManager) ComponentRegistry.lookup(Constants.PUSH_MANAGER);
	}
}
