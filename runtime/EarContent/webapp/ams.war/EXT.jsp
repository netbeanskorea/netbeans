<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>AMS</title>
<%@include file="/common/common.jsp"%>
<script>
	$(function() {
		$.Page({
			init: function() {
				var url = $.PostData();
				$('#extPage').attr('src', url);	
				$('#extPage').height($('#extPage').contents().find('body')[0].scrollHeight);
			}
		});
	});
</script>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="/common/TopMenu.jsp"%>
		<!-- //headerArea-->
		
		<div id="wrapper" class="clearfix">
			<!-- //leftArea-->
			<%@include file="/common/LeftMenu.jsp"%>
			<!-- //leftArea-->
			<div id="contentArea" class="type01">
				<iframe src="" id="extPage" style="width: 100%; height: 1600px;" ></iframe>
			</div>
			
			<!-- quick link -->
			<%@include file="/common/Quick.jsp"%>
			<!-- quick link -->
		</div>

		<!-- //footerArea -->
		<%@include file="/common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
