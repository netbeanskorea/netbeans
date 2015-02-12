
<html>
<head>
<title>ACRA</title>
<%@include file="/common/common.jsp"%>
<%@ page import="nexcore.framework.core.Constants"%>
<%@ page import="nexcore.framework.core.util.StringUtils"%>
<script>
	/*****************************************************************************************
	 
	 ****************************************************************************************/
	 $(function() {
		$.Page({
			init: function() {
				
				// http://localhost:8088/ams/acraDB.jsp?APP_VER=1&ANDROID_VER=2&PHONE_MODEL=3&ERR_MSG=4
				// http://203.235.211.83:9072/ams/acraDB.jsp?APP_VER=1&ANDROID_VER=2&PHONE_MODEL=3&ERR_MSG=4	
				var app_ver = $.Page.Data('APP_VER');
				var android_ver = $.Page.Data('ANDROID_VER');
				var phone_model = $.Page.Data('PHONE_MODEL');
				var err_msg = $.Page.Data('ERR_MSG');
				
				var request = {
						fields : {
							APP_VER : app_ver,
							ANDROID_VER : android_ver,
							PHONE_MODEL : phone_model,
							ERR_MSG : err_msg
						}
				};
				
				$.AcraMonitoring({
					transaction : 'mtr.ACRBBase#pACR10001',
					request : request,
					success : function(ds) {
						alert('success');
					}
				});
			}
		});
		
	});
</script>
</head>
<body>

</body>
</html>
