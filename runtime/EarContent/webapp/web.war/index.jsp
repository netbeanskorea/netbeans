<%@ page pageEncoding="utf-8"%>
<!doctype html>
<%@ page import="com.nets.sso.agent.*" %>
<%@ page import="java.util.ResourceBundle" %>
<%@ page import="java.net.URLEncoder" %>
<script>
	/*****************************************************************************************
	 * 화면 이름  : index.jsp
	 * 화면 설명  : 로그인
	 * 작성자        : 문태훈
	 * 작성일        : 2012-11-12
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	문태훈	2012-11-12	화면 생성(CSS 제외함)
	 ****************************************************************************************/

</script>
<%
	boolean isSSO = true;
	if(isSSO){
		String navigateUrl = "";
	    try
	    {
	        SSOConfig.request = request;
	        AuthCheck auth = new AuthCheck(request, response);
			String thisUrl = auth.thisURL();
	        String siteDNS = SSOConfig.siteDomain();
	        String ssositeValue = "&" + SSOConfig.REQUESTSSOSITEPARAM + "=" + siteDNS;
	        navigateUrl = "http://sso.skglobalchemical.com/GateLogon/RedirectGPLogon.aspx?returnURL=" + Util.uRLEncode("http://mss.skglobalchemical.com", "UTF8");
	        AuthStatus status = auth.checkLogon(AuthCheckLevel.Medium);

	        if(status == AuthStatus.SSOFirstAccess)
	        {
	            auth.trySSO();
	        }
	        else if(status == AuthStatus.SSOSuccess)
	        {
	            // 인증 성공
				String sEmpNo = auth.getSSODomainCookieValue("empNo");
				request.setAttribute("ID", sEmpNo);

	        }
	        else if(status == AuthStatus.SSOFail)
	        {
				response.getWriter().print(" / STATUS : " + status);
				response.getWriter().print(" / errorNumber : " + auth.errorNumber());
				response.getWriter().print(" / ErrorCode : " + ErrorCode.NO_ERR);
	            if ( auth.errorNumber() != ErrorCode.NO_ERR)
	            {
	                response.getWriter().print("오류코드 : " + auth.errorNumber());                
	            }
	            else
	            {
	                String ret = request.getParameter("errorCode");
	                if (ret != null && !ret.equals(""))
	                {
	                    // 인증받지 않음
	                }
	                else
	                {
	                    response.getWriter().print("오류코드 : errorCode=" + ret);
	                }
	            }
				
				response.sendRedirect(navigateUrl);
				return;
				
	        }
	        else if (status == AuthStatus.SSOAccessDenied)
	        {
				ResourceBundle res = ResourceBundle.getBundle("sso");
				Object value = res.getString("SITE_ACCESS_DENIED_PAGE");
				String denyUrl = value.toString();
				if (denyUrl != null && !denyUrl.equals("")){
					response.sendRedirect(denyUrl);
				} else {
					response.getWriter().print("Access Denied!");	            
				}
	        }
	        else
	        {            
	            response.getWriter().print("인증서버를 이용할 수 없습니다.");

	        }
	    }
	    catch(Exception ex)
	    {
	        response.getWriter().print(ex.getMessage());
	    }
	}else{
		
	}
    
%>

<html>
<head>
<title>로그인</title>

</head>
<body>
	<div id="container">
		<form name='main'>
 	
		<jsp:forward page = "/home.jsp" />
	
		</form>
	</div>

</body>
</html>

