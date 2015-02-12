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
import java.math.BigDecimal;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.BodyTagSupport;

import nexcore.framework.core.ServiceConstants;
import nexcore.framework.core.ioc.ComponentRegistry;
import nexcore.framework.core.util.BaseUtils;

import org.apache.commons.lang.StringUtils;

import ams.fwk.file.IAmsFileUploadManager;



/**
 * 첨부 파일 다운로드 리스트를 화면에 출력하는 JSP Custom tag 클래스.
 * 
 * @since 3.0
 */
public class AmsDownloadTag extends BodyTagSupport {

    private static final long serialVersionUID = -4973124311609768503L;

    protected String programId;

    protected String fileSeqNo;
    
    protected String typeId = "N/A";
    
    protected String id;
    
    protected String deleteOption;

    IAmsFileUploadManager fum = (IAmsFileUploadManager) ComponentRegistry
                                                                      .lookup(ServiceConstants.FILEUPLOAD);

    protected String imgTag;
    protected String urlTag;
    protected String listOpen;
    protected String listItem;
    protected String deleteImgTag;
    protected String listClose;
    
    /**
     * URL 인코딩 종류.
     */
    protected String encoding;

    {
        encoding = BaseUtils.getDefaultEncoding();
    }
    
    public void setFileSeqNo(String fileSeqNo) {
    	this.fileSeqNo = (fileSeqNo == null) ? "" : fileSeqNo;
    }

    public void setProgramId(String programId) {
        this.programId = (programId == null) ? "" : programId;
    }

    public void setTypeId(String typeId) {
    	this.typeId = typeId;
    }

    public void setDeleteOption(String deleteOption) {
    	this.deleteOption = deleteOption;
    }
    public void setId(String id) {
    	this.id = id;
    }
    
    public AmsDownloadTag(){

        imgTag = "<img src='$context$/filedownload.cmd?programId=$programId$&docId=$docId$&fileId=$fileId$&fileSeqNo=$fileSeqNo$'/>";
        urlTag = "$context$/filedownload.cmd?programId=$programId$&fileId=$fileId$&fileSeqNo=$fileSeqNo$";
        listOpen = "<ul class=\"download\">";
        listItem = "<li><span id='$fileId$'><a href=\"$context$/filedownload.cmd?programId=$programId$&fileId=$fileId$&fileSeqNo=$fileSeqNo$\">"
            + "$filename$ ($filesize$ Bytes)</a>$deleteImgTag$</span></li>";
        deleteImgTag = " &nbsp;<img alt='Delete File' src='$context$/Resource/images/icon/ico_comment_del.png' onclick='$.FileDelete(\"$fileId$\", \"$programId$\")' />";
        listClose = "</ul>";
    }
    
    protected String getEncoding(){
        if(fum != null && fum.getDefaultEncoding() != null){
            return fum.getDefaultEncoding();
        }
        return BaseUtils.getDefaultEncoding();
    }
    
    /**
     * @return int
     * @throws JspException
     */
    public int doEndTag() throws JspException {
        String context = getContextPath(pageContext);
        try {
            List uploads = getUploads();
            JspWriter out = pageContext.getOut();
            out.print(listOpen);

            for (Iterator all = uploads.iterator(); all.hasNext();) {
                Map each = (Map) all.next();
                if ("IMG".equals(typeId)) {
                    String temp = StringUtils.replace(imgTag, "$context$", context);
                    
                    temp = StringUtils.replace(temp, "$programId$", (String)each.get("PROGRAM_ID"));
                    temp = StringUtils.replace(temp, "$fileSeqNo$", fileSeqNo);
                    temp = StringUtils.replace(temp, "$fileId$", (String) each.get("FILE_ID"));

                    out.print(temp);
                   
                }else if ("URL".equals(typeId)) {
                    String temp = StringUtils.replace(urlTag, "$context$", context);
                    temp = StringUtils.replace(temp, "$programId$", (String)each.get("PROGRAM_ID"));
                    temp = StringUtils.replace(temp, "$fileSeqNo$", fileSeqNo);
                    temp = StringUtils.replace(temp, "$fileId$", (String) each.get("FILE_ID"));

                    out.print(temp);
                }else {
//                	("N/A".equals(typeId) || typeId.equals(each.get("TYPE_ID"))) {
                	String temp = "";
                	if("N".equals(deleteOption)) {
                		temp = StringUtils.replace(listItem, "$deleteImgTag$", "");                    
                	} else {
                		temp = StringUtils.replace(listItem, "$deleteImgTag$", deleteImgTag);                    
                	}
                    temp = StringUtils.replace(temp, "$context$", context);                    
                    temp = StringUtils.replace(temp, "$programId$", (String)each.get("PROGRAM_ID"));
                    temp = StringUtils.replace(temp, "$fileSeqNo$", fileSeqNo);
                    temp = StringUtils.replace(temp, "$fileId$", (String) each.get("FILE_ID"));
                    temp = StringUtils.replace(temp, "$filename$", (String) each.get("FILE_NAME"));
                    temp = StringUtils.replace(temp, "$filesize$", nexcore.framework.core.util.StringUtils.formatNumber(((BigDecimal) each.get("FILE_SIZE")).toString(), "FINT"));
                    out.print(temp);
                }
            }
            out.print(listClose);
            
            return EVAL_PAGE;
        } catch (IOException e) {
            e.printStackTrace();
            throw new JspException(e);
        } finally {
        	typeId = "N/A";
        }
    }

    protected List getUploads() {
        List result = null;
        if (!"N/A".equals(typeId)) {
            result = (List) pageContext.getAttribute("j_files_" + programId + "_"
                    + fileSeqNo, PageContext.REQUEST_SCOPE);
            if (result == null) {

   
                result = fum.getUploads(fileSeqNo, null, null);
                pageContext.setAttribute("j_files_" + programId + "_" + fileSeqNo,
                        result, PageContext.REQUEST_SCOPE);
            }
        } else {
            result = fum.getUploads(fileSeqNo, null, null);
        }
        return result;
    }

    /**
     * context의 경로를 반환한다.
     * 
     * @param page
     * @return String
     */
    private String getContextPath(PageContext page) {
        return ((HttpServletRequest) page.getRequest()).getContextPath();
    }

}
