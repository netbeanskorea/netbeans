<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%--@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" --%>

<%
    Throwable cause = (Throwable) request.getAttribute("javax.servlet.error.exception");

    if (cause == null) {
        cause = (Throwable) request.getAttribute("javax.servlet.jsp.jspException");
    }

    if (cause == null) {
        cause = (Throwable) request.getAttribute("nexcore.bizlogic.exception");
    }
    
    String message =  "N/A";

    IMessageManager mm = (IMessageManager) ComponentRegistry.lookup(ServiceConstants.MESSAGE);
    if (cause instanceof IMessageCoded){
        IMessageCoded imc = ((IMessageCoded)cause);
        message = mm.getMessage(imc.getMessageId(), WebUtils.getLocale(pageContext)).getName(imc.getMessageParams());
    }
    if (cause != null) {
        if (cause instanceof javax.servlet.jsp.JspException) {
            Throwable jspCause = ((javax.servlet.jsp.JspException)cause).getRootCause();
            if (jspCause != null) {
                cause = jspCause;
            }
        }
    }

%>

<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<%@page import="nexcore.framework.core.exception.BaseRuntimeException"%>
<%@page import="nexcore.framework.core.prototype.IMessageCoded"%>
<%@page import="nexcore.framework.core.message.IMessageManager"%>
<%@page import="nexcore.framework.core.ioc.ComponentRegistry"%>
<%@page import="nexcore.framework.core.ServiceConstants"%>
<%@page import="nexcore.framework.online.channel.util.WebUtils"%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>HTTP 500</title>
<%--
<script type="text/javascript"
    src="<c:url value="/ext/script/prototype.js"/>"></script>
<style type="text/css"><!--
        body {
            font: 0.75em 굴림, Tahoma, sans-serif;
            margin: 0.5em 0 0.5em 0.2em;
            width: 70em;
        }
        
        pre {
            font-size: 1em;
        }
    --></style>
<link rel="stylesheet" type="text/css"
    href="<c:url value="/ext/style/Base.css"/>" />
--%>    
</head>

<body>

<div id="main">

<h1>HTTP 500 : Internal Server Error</h1>

</div>

<table>
    <tbody>
        <tr>
            <td><%=message%></td>
        </tr>
<% 
	if (cause != null) { 
%>
        <tr>
            <td>
            	<pre>
<%
		cause.printStackTrace(new java.io.PrintWriter(out));
%>
            	</pre>
            </td>
        </tr>
<%
		if (cause.getCause() != null) {
%>
        <tr>
            <td>
            	<pre>
<%
			cause.getCause().printStackTrace(new java.io.PrintWriter(out));
%>
				</pre>
			</td>
        </tr>
<%
		}
	}
%>
    </tbody>
</table>

<%-- 
<jsp:include page="/debug/Debug.jsp" /> 
--%>

</body>
</html>
