package ams.fwk.handler;


import java.security.MessageDigest;
import java.sql.SQLException;

import com.ibatis.sqlmap.client.extensions.ParameterSetter;
import com.ibatis.sqlmap.client.extensions.ResultGetter;
import com.ibatis.sqlmap.client.extensions.TypeHandlerCallback;

/**
 * DB 데이터 암호화를 위한 Ibatis handler
 * @author admin
 *
 */
public class CryptoTypeHandler implements TypeHandlerCallback {
	
	/*
	 * (non-Javadoc)
	 * @see com.ibatis.sqlmap.client.extensions.TypeHandlerCallback#getResult(com.ibatis.sqlmap.client.extensions.ResultGetter)
	 */
	public Object getResult(ResultGetter getter) throws SQLException {
		String value = getter.getString();
		return value;
	}
	
	/* (non-Javadoc)
	 * @see com.ibatis.sqlmap.client.extensions.TypeHandlerCallback#setParameter(com.ibatis.sqlmap.client.extensions.ParameterSetter, java.lang.Object)
	 */
	public void setParameter(ParameterSetter setter, Object obj) throws SQLException {
		Object value = obj;
		if(obj != null && obj instanceof String){
			try {
				MessageDigest md = MessageDigest.getInstance("SHA-256");
		        md.update(((String)obj).getBytes());
		 
		        byte byteData[] = md.digest();
		 
		        StringBuffer sb = new StringBuffer();
		        for (int i = 0; i < byteData.length; i++) {
		        	sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
		        }
		        
		        value = sb.toString();
			} catch (Exception ex) {
				
			}
		}
		setter.setObject(value);			
	}
	
	/* (non-Javadoc)
	 * @see com.ibatis.sqlmap.client.extensions.TypeHandlerCallback#valueOf(java.lang.String)
	 */
	public Object valueOf(String value) {
		return value;
	}
}