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

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyTagSupport;

import nexcore.framework.core.Constants;

import org.apache.commons.lang.StringUtils;


/**
 * E-Market프로젝트에서 엑셀 Export 태그를 사용하여, excel export지원하도록 개발함
 * By PSI. 2013.04.17
 * 
 * @since 3.0
 */
public class AmsExcelExportTag extends BodyTagSupport {


	private static final long serialVersionUID = -3934230631225985317L;
	private String transactionId;
	private String exportFileName;
	private String listOpen;
	private String listClose;
	private String excelTxTag;
	private String excelResTag;
	private String exportFileInfoTag;
	protected int max = 1;


	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getExportFileName() {
		return exportFileName;
	}

	public void setExportFileName(String exportFileName) {
		this.exportFileName = exportFileName;
	}

	public void setMax(String max) throws JspException {
        this.max = Integer.parseInt(max);
    }

    public AmsExcelExportTag() {
        listOpen = "<div style=\"display:block;visibility:hidden;width:0;height:0; \">";
        excelTxTag = "<input name=\""+ Constants.TRANSACTION_ID+"\" type=\"hidden\" value=\"$transactionId$\"/>";
        excelResTag ="<input name=\""+ Constants.TARGET+"\" type=\"hidden\" value=\"excel.process.jsp.path\"/>";
        exportFileInfoTag = "<input name=\"file_name\" type=\"hidden\" value=\"$exportFileName$\"/>";
        listClose = "</div>";
    }

    /**
     * @return int
     * @throws JspException
     */
    public int doEndTag() throws JspException {
        try {
            JspWriter out = pageContext.getOut();
            out.print(listOpen);
            StringBuffer sb  = new StringBuffer();
            sb.append(StringUtils.replace(excelTxTag, "$transactionId$", transactionId));
            sb.append(excelResTag);
            sb.append(StringUtils.replace(exportFileInfoTag, "$exportFileName$", exportFileName));

            out.print(sb.toString());
                   
            out.print(listClose);

            return EVAL_PAGE;
        } catch (IOException e) {
            throw new JspException(e);
        } finally {

        }
    }

}
