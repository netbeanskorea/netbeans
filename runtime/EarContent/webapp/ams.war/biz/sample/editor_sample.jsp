<%@ page pageEncoding="utf-8"%>
<%@ page import=" ams.fwk.utils.AmsUtils" %>
<%@ page import=" ams.fwk.code.internal.AmsCode" %>
<!doctype html>
<html>
<head>
<title>Board Detail</title>
<%@include file="/common/common.jsp"%>
<%@include file="/common/editor.jsp"%>

<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGQNA001P02.jsp
	 * 화면 설명  : Q&A 상세조회
	 * 작성자        : 강훈기
	 * 작성일        : 2013-07-04
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기	2013-07-04	화면 생성
	 ****************************************************************************************/
	$(function() {
		$.Page({
			init : function() {
				$('#editor').Editor({
					image: true
				});
			}
		});
	});
</script>
</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="/common/TopMenu.jsp"%>
		<!-- //headerArea-->
		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="/common/LeftMenu.jsp"%>
			<!-- //leftArea -->
			<div id="contentArea">
		        <div>
					<form method="post" action="">
					        <p>     
				                <textarea id="editor" name="editor" cols="50" rows="15">This is some content that will be editable with TinyMCE.</textarea>
					        </p>
					        <input type="submit" value="Save" />
					</form>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="/common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
