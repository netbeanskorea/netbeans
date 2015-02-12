<%@ page import="com.nets.sso.agent.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<%
SSOConfig.request = request;

AuthCheck auth = new AuthCheck(request, response);
String siteDNS = SSOConfig.siteDomain();
String ssositeValue = "&" + SSOConfig.REQUESTSSOSITEPARAM + "=" + siteDNS;
String navigateUrl = SSOConfig.logoffPage() + "?" + SSOConfig.returnURLTagName() + "=" + Util.uRLEncode("http://jsp330.agent.com:9090/jsso-agent/default.jsp", "UTF8") + ssositeValue;
%>

<html>
<head>
<title>Access Denied</title>
<script language="javascript" type="text/javascript">
    function OnLogoff()
    {
        document.location.href="<%=navigateUrl%>";
    }
</script>
</head>
<body>
Access Denied.<br><a href="javascript:OnLogoff();">로그아웃</a>
</body>
</html>
