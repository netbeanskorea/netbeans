<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" 
%><?xml version="1.0" encoding="utf-8"?>
<%@page import="nexcore.framework.core.ioc.ComponentRegistry"
%><%@page import="nexcore.framework.core.message.IMessageManager"
%><%@page import="nexcore.framework.core.message.IMessage"
%><%@page import="nexcore.framework.core.prototype.IMessageCoded"
%><%@page import="nexcore.framework.online.channel.util.WebUtils"
%><%
    Throwable cause = (Throwable) request.getAttribute("javax.servlet.error.exception");
    
    if (cause == null) {
        cause = (Throwable) request.getAttribute("javax.servlet.jsp.jspException");
    }
    
    if (cause == null) {
        cause = (Throwable) request.getAttribute("nexcore.bizlogic.exception");
    }
    
    String messageId = "N/A";
    String messageName =  "N/A";
    String reason = "N/A";
    String remark = "N/A";
    String stackTrace = "N/A";
    
    IMessageManager mm = (IMessageManager) ComponentRegistry.lookup(ServiceConstants.MESSAGE);
    if (cause instanceof IMessageCoded){
        IMessageCoded imc = ((IMessageCoded)cause);
        messageId = imc.getMessageId();
        IMessage message = mm.getMessage(messageId, WebUtils.getLocale(pageContext));
        messageName = message.getName(imc.getMessageParams());
        reason = message.getReason();
        remark = message.getRemark();
    }
    if (cause != null) {
        if (cause instanceof javax.servlet.jsp.JspException) {
            Throwable jspCause = ((javax.servlet.jsp.JspException)cause).getRootCause();
            if (jspCause != null) {
                cause = jspCause;
            }
        }
    }
    if (cause != null){
        stackTrace = BaseUtils.getExceptionStackTrace(cause);
    }
    
    String transactionId = null;

%><%@page import="nexcore.framework.core.Constants"
%><%@page import="nexcore.framework.core.util.BaseUtils"
%><%@page import="nexcore.framework.core.ServiceConstants"
%><response>
    <transaction>
        <id><%=request.getParameter(Constants.TRANSACTION_ID) %></id>
        <startDate>N/A</startDate>
        <endDate>N/A</endDate>
    </transaction>
    <dataSet>
        <message>
            <result>FAIL</result>
            <messageId><%=messageId %></messageId>
            <messageName><%=messageName %></messageName>
            <messageReason><%=reason %></messageReason>
            <messageRemark><%=remark %></messageRemark>
            <exceptionStackTrace>
                <![CDATA[<%=stackTrace%>]]>
            </exceptionStackTrace>
        </message>         
    </dataSet>
    <pop/>
</response>