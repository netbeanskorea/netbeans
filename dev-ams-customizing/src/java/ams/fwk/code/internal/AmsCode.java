package ams.fwk.code.internal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import ams.fwk.utils.BaseUtils;

import nexcore.framework.core.code.internal.Code;

public class AmsCode extends Code {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5428728609963863720L;

	public Locale locale;
	public String value;
	public List attributeList;
	
	public Locale getLocale() {
		return locale;
	}


	public void setLocale(Locale locale) {
		this.locale = locale;
	}


	public String getValue() {
		return value;
	}


	public void setValue(String value) {
		this.value = value;
	}


	public void setValue(Locale locale, String value) {
		setLocale(locale);
		setValue(value);
	}

	
    public String getAttributeValue(int no) {
        if (attributeList == null) {
            return null;
        }
        if(attributeList.size() <= no) {
        	return null;
        }
        return (String)attributeList.get(no);
    }
    
    public void setAttributes(String attribute) {
    	if(attributeList == null) {
    		attributeList = new ArrayList();
    	}
    	attributeList.add(attribute);
    }
}
