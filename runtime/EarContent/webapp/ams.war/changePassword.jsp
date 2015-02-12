<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>비밀번호 변경</title>
<%@include file="./common/common.jsp"%>
<script>
/*****************************************************************************************
 * 화면 이름  : chagnePassword.jsp
 * 화면 설명  : 비밀번호 변경
 * 작성자        : 성지호
 * 작성일        : 2013-03-27
 * 변경이력   :
 * 버전		성명		반영일자		내용                  
 *----------------------------------------------------------------------------------------
 * ver0.1	성지호	2013-03-27	화면 생성
 ****************************************************************************************/
$(function() {
	$('#CHANGEPASSWORD_FORM').Form();
	$.Page({
		init: function() {
			$('#CHANGEPASSWORD_FORM').Clear();
			$('#LOGIN_ID').Value(loginId);
		}
	})
	
	var loginId = '<%= loginId %>'; // 로그인 된 아이디
	
	$('#BTN_CHANGE_PASSWORD').Button({
		click: function() {
			var newPassword = $('#NEW_PASSWORD').val();
			var newPasswordConfirm = $('#NEW_PASSWORD_CONFIRM').val();
			if(newPassword==newPasswordConfirm) {
				if(confirm('비밀번호를 변경하시겠습니까?')) {
					var request = $.DataSet();
					request.fields.USER_ID = loginId;
					request.fields.NEW_PASSWORD = newPassword;
					$.FindPassword({
						transaction: 'abm.USRBBase#pUSR10007',
						request: request,
						success: function(ds) {
							alert('비밀번호가 변경되었습니다.');
							$.Close({
								change: true
							});
						}
					});
				}	
			}
		}
	});
	
	$('#CHANGEPASSWORD_FORM').Form();
	
	$('#NEW_PASSWORD_CONFIRM').bind('keyup', function() {
		var newPassword = $('#NEW_PASSWORD').val();
		var newPasswordConfirm = $('#NEW_PASSWORD_CONFIRM').val();
		
		if(newPassword==newPasswordConfirm) {
			$('#check_text_div').html('<font color="green">일치합니다.</font>');
		} else {
			$('#check_text_div').html('<font color="red">불일치합니다.</font>');
		}
			
		
	});
});
</script>
</head>
<body>
<!-- <div id="container" class="container_pop">  container 때문에 화면 비율이 이상하게 나와서 일단 주석처리합니다... -->
<div class="container">
	<div id="wrapper" class="popup clearfix">
		<div id="contentArea" class="type01">
			<div class="content">
				<div class="contTitle">
					<h2>비밀번호 변경</h2>
				</div>
				<div class="tb_data">
					<form id="CHANGEPASSWORD_FORM">
						<table>
							<colgroup>
								<col width="150" />
								<col width="359" />
							</colgroup>
							<tr>
								<th><label for="LOGIN_ID">사용자 ID</label>
								<td>										
									<input id="LOGIN_ID" type="text" class="input01" disabled/>
								</td>
							</tr>
							<tr>
								<th><label for="NEW_PASSWORD">
									비밀번호
								</label>
								</th>
								<td>
									<input id="NEW_PASSWORD" type="password" class="input01"/>
									<input id="SMS_AUTH_KEY" type="hidden" class="input01"/>
								</td>
							</tr>
							<tr>
								<th>
								<label for="NEW_PASSWORD_CONFIRM">
									확인
								</label>
								</th>
								<td>
									<input id="NEW_PASSWORD_CONFIRM" type="password" class="input01"/><div id="check_text_div"></div>
								</td>
							</tr>
						</table>
					</form>
					<div class="btn_main">
						<span class="button iconBtn">
							<span class="button iconBtn">
							<button id="BTN_CHANGE_PASSWORD">
								<span class="button-icon ui-icon-func-send"></span><span class="button-text">비밀번호 변경</span>
							</button> </span>
						</span>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div>
<!-- </div> -->
</body>
</html>