<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>시스템관리- 사용자관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR001P06.jsp
	 * 화면 설명  : 사용자관리 - 2차 비밀번호 변경(임직원)
	 * 작성자        : 백지원
	 * 작성일        : 2013-05-16
	 * 변경이력   :
	 * 버전  성명  반영일자  내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1 백지원 2013-05-16 화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#CHANGEPASSWORD_FORM').Form();
		$('#BTN_CHANGE_PASSWORD').Button({
			click: function() {
				$.Service({
					transaction: 'mng.MNGCOMB#checkSecondPassword',
					request: '#CHANGEPASSWORD_FORM',
					success: function(){
						var newPassword = $('#NEW_PASSWORD').val();
						var newPasswordConfirm = $('#NEW_PASSWORD_CONFIRM').val();
						if(newPassword==newPasswordConfirm) {
								var request = $('#CHANGEPASSWORD_FORM').DataSet();
								$.FindPassword({
									transaction: 'mng.MNGUSRB#changeSecondPassword',
									request: request,
									success: function(ds) {
										alert('2차 비밀번호가 변경되었습니다.');
										$.Popup.Close();
									}
								});
						}
					}, fail: function() {
						alert('2차 비밀번호가 다릅니다.');
					}
				});
			}
		});
		$('#btnCancel').Button({
			click: function() {
				$.Popup.Close();
			}
		});
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
	<div id="content" class="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea" class="type01">
				<div class="contTitle">
					<h2>2차 비밀번호 변경</h2>
				</div>
				<div id="allcontent" class="tb_data">
					<form id="CHANGEPASSWORD_FORM">
						<table>
							<colgroup>
								<col width="130"/>
								<col width="380"/>
							</colgroup>
							<tr>
								<th>
									<label for="2_PASSWORD">현재 비밀번호</label>
								</th>
								<td class="nobd">
									<input id="2_PASSWORD" type="password" class="input01"/>
								</td>
							</tr>
							<tr>
								<th>
									<label for="NEW_PASSWORD">새 비밀번호</label>
								</th>
								<td class="nobd">
									<input id="NEW_PASSWORD" type="password" class="input01" />
									<input id="SMS_AUTH_KEY" type="hidden" class="input01" />
								</td>
							</tr>
							<tr>
								<th>
									<label for="NEW_PASSWORD_CONFIRM">새 비밀번호 확인</label>
								</th>
								<td class="nobd">
									<input id="NEW_PASSWORD_CONFIRM" type="password" class="input01" />
									<div id="check_text_div"></div>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="btn_main">
					<span class="button iconBtn">
						<button id="BTN_CHANGE_PASSWORD">
							<span class="button-icon ui-icon-func-send"></span> <span
								class="button-text">변경</span>
						</button>
					</span>
					<span class="button iconBtn">
						<button id="btnCancel">
							<span class="button-icon ui-icon-func-cancel"></span> <span
								class="button-text">취소</span>
						</button>
					</span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>




