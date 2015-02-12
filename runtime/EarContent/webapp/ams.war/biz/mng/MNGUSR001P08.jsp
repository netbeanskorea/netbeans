<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>시스템관리- 사용자관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR001P06.jsp
	 * 화면 설명  : 사용자관리 - 2차 비밀번호 변경(사업장)
	 * 작성자        : 백지원
	 * 작성일        : 2013-05-16
	 * 변경이력   :
	 * 버전  성명  반영일자  내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1 백지원 2013-05-16 화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#CHANGEPASSWORD_FORM').Form();
		
		var id = undefined;
		$.Page({
			init: function() {
				id = $.Page.Data('USER_ID');
				$('#USER_ID').val(id);
			}
		});
		
		// SMS전송 버튼
		$('#BTN_SMS').Button({
			click: function() {
				id = $('#USER_ID').val();
				if(id) {
					if(confirm('SMS인증번호를 전송하시겠습니까?')) {
						var request = $('#CHANGEPASSWORD_FORM').DataSet();
						$.FindPassword({
							transaction: 'mng.MNGUSRB#sendSmsRandomNumber',
							request: request,
							response: '#CHANGEPASSWORD_FORM',
							success: function(ds) {
								alert(ds.message.messageName);
								$('#SMS_AUTH_KEY').Value(ds.recordSets.SMS_RESP.nc_list[0].tran_pr);
							}
						});
					}
				}
			}
		});
		
		
		// 확인 버튼
		$('#BTN_CHANGE_PASSWORD').Button({
			click: function() {
				id = $('#USER_ID').val();
				if(id) {
	 				//	if($('#auth_checked').Value() === '1'){
							var request = $('#CHANGEPASSWORD_FORM').DataSet();
							$.FindPassword({
								transaction: 'mng.MNGUSRB#changeSecondPassword2',
								request: request,
								success: function(ds) {
									alert("2차 비밀번호가 변경되었습니다.");
	 								$.Popup.Close(); 
								}
							});
	 					}
				}
		});
		
		/*
		// 인증번호가 입력될때마다 동작하는 함수
		$('#SMS_AUTH_INPUT').keyup(function(event) {
			// 인증 번호를 전송하면 SMS_AUTH_KEY 부분에 값이 들어간다
			if($('#SMS_AUTH_KEY').Value() !== ''){
				// 길이가 6일때만 동작
				if($('#SMS_AUTH_INPUT').Value().length == 6){
					if($('#SMS_AUTH_KEY').Value() === $('#SMS_AUTH_INPUT').Value()){
						$('#check_sms_div').html('<font color="green"><b>일치합니다.</b></font>');
						$('#auth_checked').Value('1');	// 인증번호가 일치할때만 1
					}else{
						$('#check_sms_div').html('<font color="red"><b>불일치합니다.</b></font>');
						$('#auth_checked').Value('0');
					}
				}else{
					$('#check_sms_div').html('');
					$('#auth_checked').Value('0');
				}
		 	}
		 });
		*/
		
		
		$('#btnCancel').Button({
			click : function() {
				$.Popup.Close();
			}
		});
		
		$('#NEW_PASSWORD_CONFIRM').bind('keyup', function() {
			var newPassword = $('#NEW_PASSWORD').val();
			var newPasswordConfirm = $('#NEW_PASSWORD_CONFIRM').val();

			if (newPassword == newPasswordConfirm) {
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
								<col width="130" />
								<col width="380" />
							</colgroup>
							<tr>
								<th><label for="USER_ID">사용자 ID</label>
								</th>
								<td class="nobd">
									<input id="USER_ID" type="text" disabled />
									<input id="SMS_AUTH_KEY" type="hidden"/>
								</td>
								</tr>
								<tr>
									<th><label for="SMS_AUTH_INPUT">
										인증번호
									</label>
									</th>
									<td class="nobd">
										<input id="SMS_AUTH_INPUT" type="text" maxlength="6"/>
										<!-- <div id="check_sms_div"></div> -->
										<input id="auth_checked" type="text" hidden>
											<span class="button iconBtn">
												<span class="button iconBtn">
												<button id="BTN_SMS">
													<span class="button-icon ui-icon-func-send"></span><span class="button-text">인증번호전송</span>
												</button> </span>
											</span>
										</td>
								</tr>
								<tr>
									<th><label for="NEW_PASSWORD">신규 비밀번호</label></th>
									<td class="nobd"><input id="NEW_PASSWORD" type="password" class="input01" /> 
								</tr>
								<tr>
									<th><label for="NEW_PASSWORD_CONFIRM">신규 비밀번호 확인</label></th>
									<td class="nobd"><input id="NEW_PASSWORD_CONFIRM" type="password" class="input01" />
										<div id="check_text_div" ></div>
									</td>
								</tr>
						</table>
					</form>
				</div>
				<div class="contSubTitle">
					<h3>비밀번호 초기화 절차</h3>
				</div>
				<p class="subConts">1. “인증번호전송” 단추를 클릭합니다.</p>
				<p class="subConts">2. 이마켓 사용자정보에 등록된 휴대전화번호로 인증번호가 전송됩니다.</p>
				<p class="subConts">3. 두 번째 창에 인증번호를 입력하고 새로 사용할 비밀번호를 “신규 비밀번호”와 “신규 비밀번호 확인”에 동일하게 입력합니다.</p>
				<p class="subConts">4. 확인을 누르면 2차 비밀번호가 변경됩니다.</p>
				<div class="btn_main">
					<span class="button iconBtn">
						<button id="BTN_CHANGE_PASSWORD">
							<span class="button-icon ui-icon-func-send"></span> <span
								class="button-text">확인</span>
						</button> </span> <span class="button iconBtn">
						<button id="btnCancel">
							<span class="button-icon ui-icon-func-cancel"></span> <span
								class="button-text">닫기</span>
						</button> </span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>




