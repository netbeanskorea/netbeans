<%@ page pageEncoding="utf-8"%>
<%-- 
<%@ page import="nexcore.framework.core.util.InetUtils" %>
<%@ page import="nexcore.framework.core.Constants"%>
<%@ page import="nexcore.framework.core.Constants"%>
<%@ page import="ams.fwk.constants.DBNamingConstants"%>
<%@ page import="ams.fwk.common.user.AmsUserInfo"%>
<%@ page import="nexcore.framework.core.util.StringUtils"%>
<%@ page import="ams.fwk.utils.BaseUtils"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="mvc" uri="http://nexcore.skcc.com/ctl/mvc"%>
<%@ taglib prefix="ui" uri="http://nexcore.skcc.com/ctl/ui"%>
 --%>
 <%-- <%
	boolean isMobile = false;
	String ua=request.getHeader("User-Agent").toLowerCase();
	
	if(ua.matches("(?i).*(android|(bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino).*")||ua.substring(0,4).matches("(?i)1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-")) {
		isMobile = true;
	}
	String hostIp = "";
	if("R".equals(BaseUtils.getRuntimeMode())) {
		hostIp = "http://mss.skglobalchemical.com/Resource";
	} else if("D".equals(BaseUtils.getRuntimeMode())){
		hostIp = "http://203.235.211.83:9072/Resource";
	}else {
		hostIp = "http://"+InetUtils.getLocalHostAddr()+":8088/Resource";
	}
	
%> --%>
<%
     String hostIp = "http://localhost:8080/Resource";
%>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet" href="<%=hostIp %>/lib/ext/jquery-ui-1.9.1.custom/css/smoothness/jquery-ui-1.9.2.custom.min.css" />
<link rel="stylesheet" href="<%=hostIp %>/lib/ext/jquery.jqGrid-4.4.1/css/ui.jqgrid.css" />
<link rel="stylesheet" href="<%=hostIp %>/lib/ext/jquery.qtip/jquery.qtip.min.css" />
<link rel="stylesheet" href="<%=hostIp %>/lib/ext/jquery-loadmask-0.4/jquery.loadmask.css"/>
<%-- <link rel="stylesheet" href="<%=hostIp %>/css/project_ams.css" /> --%>
<link rel="stylesheet" href="<%=hostIp %>/css/common_ams.css" />
<script src="<%=hostIp %>/lib/ext/json2.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery-1.8.2.min.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery-ui-1.9.1.custom/js/jquery-ui-1.9.1.custom.min.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery.form.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery.ui.monthpicker/jquery.ui.monthpicker.js"></script>
<script src="<%=hostIp %>/lib/ext/autoNumeric-1.7.5.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery-validation-1.9.0/jquery.validate.min.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery.qtip/jquery.qtip.min.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery.jqGrid-4.4.1/js/jquery.jqGrid.min.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery.maskedinput-1.3.min.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery.cookie.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery.blockUI.js"></script>
<script src="<%=hostIp %>/lib/ext/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>
<script src="<%=hostIp %>/lib/ext/richtext.js"></script>
<%-- <script src="<%=hostIp %>/lib/ext/tiny_mce/tiny_mce.js"></script> --%>
<%-- <script src="<%=hostIp %>/lib/ext/tiny_mce/jquery.tinymce.js"></script> --%>
<script src="<%=hostIp %>/lib/star.js"></script>
<%-- <script src="<%=hostIp %>/lib/star.min.js"></script> --%>

<script>
var hostIp='<%=hostIp %>';  
<%-- var runtimeMode='<%=BaseUtils.getRuntimeMode()%>'; --%>
</script>

<script src="<%=hostIp %>/lib/AMS.js"></script>
<script src="${pageContext.request.contextPath}/common/comm.js"></script>
<script src="<%=hostIp %>/ext/script/JUpload.js"></script>

<%@ page import="java.util.Locale"%>
<%
//    AmsUserInfo userInfo = (AmsUserInfo) session.getAttribute(Constants.USER);
	Locale locale = null;
    String loginId = null;
    String loginName = null;
    
    /* if (userInfo != null) {
	    loginId = userInfo.getLoginId();
	    loginName = userInfo.getUserName();
	    locale = userInfo.getLocale();
    } */
%>
<%if(locale != null)  {%>
<script>
if($.Session('localeId') != '<%=locale.getLanguage()%>')
$.Session('localeId', '<%=locale.getLanguage()%>');
</script>
<%} %>








