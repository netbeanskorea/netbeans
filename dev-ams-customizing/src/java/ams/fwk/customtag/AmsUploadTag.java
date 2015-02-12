/*
 * Copyright (c) 2007 SK C&C. All rights reserved.
 * 
 * This software is the confidential and proprietary information of SK C&C. You
 * shall not disclose such Confidential Information and shall use it only in
 * accordance wih the terms of the license agreement you entered into with SK
 * C&C.
 */

package ams.fwk.customtag;

import java.io.IOException;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;


/**
 * 첨부 파일 업로드 기능을 화면에 출력하는 JSP Custom tag 클래스.
 * 
 * @since 3.0
 */
public class AmsUploadTag extends AmsDownloadTag {

    private static final long serialVersionUID = -4983984758600528315L;

    protected int max = 1;
    protected String eachSeqNoFlag;
    protected String isRequired;
    protected String requiredMsg;
    

    public void setMax(String max) throws JspException {
        this.max = Integer.parseInt(max);
    }
    
    public void setEachSeqNoFlag(String eachSeqNoFlag) {
    	this.eachSeqNoFlag = eachSeqNoFlag;
    }
    
    public void setIsRequired(String isRequired) {
    	this.isRequired = isRequired;
    }

    public void setRequiredMsg(String requiredMsg) {
    	this.requiredMsg = requiredMsg;
    }
    
    protected String fileItem;
    protected String requiredTag;

    protected final String hiddenTag = "<input type=\"hidden\" id=\"$id$\" name=\"$name$\" value=\"$value$\"/>";

    public AmsUploadTag() {
        /* imgTag, urlTag 은 UploadTag에서는 비사용 */
        listOpen = "<ul class=\"upload\">";
        listItem = "<li><span>$filename$ <a onclick=\""
                + "deleteUpload(this, $max$, '$typeId$', '$fileId$', '$filepath$')"
                + "\"><img src=\"/ams/Resource/image/ui/button/btn_replydel.gif\" valign=\"middle\" style=\"cursor: pointer;\">"
                + "</a></span></li>";
        fileItem = "<li><input type=\"file\" id=\"j_file\" name=\"j_file\" $requiredTag$/></li>";
        requiredTag = "required=\"required\" message=\"$requiredMsg$\" ";
        listClose = "</ul>";
    }

    /**
     * @return int
     * @throws JspException
     */
    public int doEndTag() throws JspException {
        try {
            List uploads = Collections.EMPTY_LIST;
            if (fileSeqNo != null && fileSeqNo.trim().length() > 0) {
                uploads = getUploads();
            }

            JspWriter out = pageContext.getOut();
            out.print(listOpen);
            int count = 0;
            for (Iterator all = uploads.iterator(); all.hasNext();) {

                Map each = (Map) all.next();
                if ("N/A".equals(typeId) || typeId.equals(each.get("TYPE_ID"))) {
                    String temp = StringUtils.replace(listItem, "$filename$",
                            (String) each.get("FILE_NAME"));
                    temp = StringUtils.replace(temp, "$max$", "" + max);
                    temp = StringUtils.replace(temp, "$typeId$", typeId);
                    temp = StringUtils.replace(temp, "$fileId$",
                           (String) each.get("FILE_ID"));
                    temp = StringUtils.replace(temp, "$filepath$",
                    		StringEscapeUtils.escapeJavaScript((String) each.get("FILE_PATH")));

                    out.print(temp);
                    count++;
                    
                }
            }
            if (max > count) {
            	String requiredTemp = "";
            	String temp = "";
            	if("Y".equals(isRequired)) {
            		requiredTemp = StringUtils.replace(requiredTag, "$requiredMsg$", StringUtils.isEmpty(requiredMsg)?"":requiredMsg);
            		temp = StringUtils.replace(fileItem, "$requiredTag$", "" + requiredTemp);
            	} else {
            		temp = StringUtils.replace(fileItem, "$requiredTag$", "" + "");
            	}
                temp = StringUtils.replace(temp, "$max$", "" + max);
                temp = StringUtils.replace(temp, "$typeId$", typeId);
                if("Y".equals(eachSeqNoFlag)) {
                	temp += StringUtils.replace(hiddenTag, "$id$", "eachSeqNoFlag");
                    temp = StringUtils.replace(temp, "$name$", "eachSeqNoFlag");
                    temp = StringUtils.replace(temp, "$value$", "" + "Y");
                }
                out.print(temp);
            }
            out.print(listClose);

            return EVAL_PAGE;
        } catch (IOException e) {
            throw new JspException(e);
        } finally {
        	fileSeqNo = null;
            typeId = "N/A";
            max = 1;
        }
    }

}
