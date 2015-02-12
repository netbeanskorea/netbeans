<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>시스템관리- 사용자관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR001P04.jsp
	 * 화면 설명  : 사용자관리 - 2차 비밀번호 체크
	 * 작성자        : 이진희
	 * 작성일        : 2013-01-24
	 * 변경이력   :
	 * 버전  성명  반영일자  내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1 이진희 2013-01-24 화면 생성
	 * ver0.2 이진희 2012-02-04 IO 및 기능 추가
	 ****************************************************************************************/
	$(function() {
		$('#1_PASSWORD').Password();
		$('#allcontents').Form({});
		$('#btn').Button({
			click: function() {
				$.Service({
					transaction: 'mng.MNGCOMB#checkPassword',
					request: '#allcontents',
					success: function(){
						$.Navigate('MNGUSR001P05.jsp');
					}, fail: function() {
						alert('비밀번호가 다릅니다.');
					}
				});
			}
		});
	});

	</script>
</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="../../common/TopMenu.jsp"%>
		<!-- //headerArea-->
		<div id="wrapper"  class="clearfix">
			<!-- //leftArea -->
			<%@include file="../../common/LeftMenu.jsp"%>
			<!-- //leftArea -->
			<div id="contentArea">
				<div class="contTitle">
					<h1>사용자 관리</h1>
				</div>
				<div class="contSubTitle">
					<p class="subConts">본인 확인을 위하여 1차 비밀번호를 입력해야 합니다.</p>
				</div>
				<div id="allcontent" class="tb_data">
					<form id="allcontents">
						<table>
							<colgroup>
								<col width="200" />
								<col width="631" />
							</colgroup>
							<tr>
								<th>
									<label for="1_PASSWORD"></label>
									1차 비밀번호
								</th>
								<td class="nobd">
									<input id="1_PASSWORD" type="password" class="input01" />
									<span class="button gridBtn">
										<button id="btn">
											<span class="button-icon ui-icon-func-send"></span> <span
												class="button-text"> 입력</span>
										</button>
									</span>
								</td>
							</tr>
						</table>
					</form>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>




