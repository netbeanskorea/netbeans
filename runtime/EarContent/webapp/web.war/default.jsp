<%@ page pageEncoding="utf-8"%>
<%@ page import="com.nets.sso.agent.*" %>
<%@ page import="java.util.ResourceBundle" %>
<%@ page language="java" contentType="text/html; charset=EUC-KR" %>
<html>
<head><title>SSO 통합인증 테스트 사이트</title></head>
<%
    String navigateUrl = "";
    try
    {
        SSOConfig.request = request;
        
        AuthCheck auth = new AuthCheck(request, response);
        String siteDNS = SSOConfig.siteDomain();
        String ssositeValue = "&" + SSOConfig.REQUESTSSOSITEPARAM + "=" + siteDNS;
        navigateUrl = SSOConfig.logoffPage() + "?" + SSOConfig.returnURLTagName() + "=" + Util.uRLEncode(auth.thisURL(), "UTF8") + ssositeValue;
        AuthStatus status = auth.checkLogon(AuthCheckLevel.Medium);

        if(status == AuthStatus.SSOFirstAccess)
        {
            auth.trySSO();
        }
        else if(status == AuthStatus.SSOSuccess)
        {
            // 인증 성공

            // 사번
            response.getWriter().write("empNo=" + auth.getSSODomainCookieValue("empNo"));
            
        }
        else if(status == AuthStatus.SSOFail)
        {
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
%>

<body>
</body>
</html>
