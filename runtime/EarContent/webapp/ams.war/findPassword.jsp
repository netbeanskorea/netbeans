<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>비밀번호 찾기</title>
<%@include file="./common/common.jsp"%>
<script>
/*****************************************************************************************
 * 화면 이름  : MNGMNU004P01
 * 화면 설명  : TCODE - 메뉴 검색
 * 작성자        : 성지호
 * 작성일        : 2013-03-18
 * 변경이력   :
 * 버전		성명		반영일자		내용                  
 *----------------------------------------------------------------------------------------
 * ver0.1	성지호	2013-03-18	화면 생성
 ****************************************************************************************/
$(function() {
	$('#FINDPASSWORD_FORM').Form();
	$('#auth_checked').hide();
	var id = undefined;
	$.Page({
		init: function() {
			id = $.Page.Data('id');
			$('#USER_ID').val(id);
		}
	});
	
	/*	이 함수는 인증키를 화면에 갖고있어야 함으로 삭제 */
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
	
	
	// SMS전송 버튼
	$('#BTN_SMS').Button({
		click: function() {
			id = $('#USER_ID').val();
			if(id) {
				if(confirm('SMS인증번호를 전송하시겠습니까?')) {
					var request = $('#FINDPASSWORD_FORM').DataSet();
					$.FindPassword({
						transaction: 'mng.MNGUSRB#sendSmsRandomNumber',
						request: request,
						response: '#FINDPASSWORD_FORM',
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
	$('#BTN_RESET_PASSWORD').Button({
		click: function() {
			id = $('#USER_ID').val();
			if(id) {
				if(confirm('비밀번호를 초기화 하시겠습니까?')) {
// 					if($('#auth_checked').Value() === '1'){
						var request = $.DataSet();
						request.fields.USER_ID = id;
						$.FindPassword({
							transaction: 'com.COMBBase#pCOM10006',
							request: request,
							success: function(ds) {
								console.log(ds);
								alert('새로운 비밀번호가 Email로 전송되었습니다.');
// 								$('#tempPassword').html('<h1>' + ds.fields.PASSWORD + '</h1>');
								$.Popup.Close(); // 이부분은 임시로 패스워드를 알려주기 위해 주석처리 
							}
						});
// 					}else{
// 						alert('인증번호를 확인해주십시오.');
// 					}
				}	
			}
			else
				alert('ID를 입력하셔야 합니다.');
		}
	});
	
	// 닫기 버튼
	$('#BTN_CLOSE').Button({
		click: function() {
			if(confirm('창을 닫으시겠습니까?')) {
				$.Popup.Close();
			}
		}
	});
	
	
});
</script>
</head>
<body>
<!-- <div id="container" class="container_pop">  container 때문에 화면 비율이 이상하게 나와서 일단 주석처리합니다... -->
	<div id="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea" class="type01">
				<div class="content">
					<div class="contTitle">
						<h2>비밀번호 찾기</h2>
					</div>
					<div class="tb_data">
						<form id="FINDPASSWORD_FORM">
							<table>
								<colgroup>
									<col width="150" />
									<col width="359" />
								</colgroup>
								<tr>
									<th><label for="USER_ID">사용자 ID</label>
									</th>
									<td>
										<input id="USER_ID" type="text" class="input01" />
										<input id="SMS_AUTH_KEY" type="hidden"/>
										<span class="button iconBtn">
											<span class="button iconBtn">
											<button id="BTN_SMS">
												<span class="button-icon ui-icon-func-send"></span><span class="button-text">SMS전송</span>
											</button> </span>
										</span>
									</td>
								</tr>
								<tr>
									<th><label for="SMS_AUTH_INPUT">
										인증번호
									</label>
									</th>
									<td>
										<input id="SMS_AUTH_INPUT" type="text" class="input01" maxlength="6"/>
										<div id="check_sms_div"></div>
										<input id="auth_checked" type="text">
									</td>
								</tr>
							</table>
						</form>
					</div>
					<div class="contSubTitle">
						<h3>비밀번호 초기화 절차</h3>
						<p class="subConts">1. 사용자ID를 입력 후 "SMS전송" 단추를 클릭합니다.</p>
						<p class="subConts">2. 이마켓 사용자정보에 등록된 휴대전화번호로 인증번호가 전송됩니다.</p>
						<p class="subConts">3. 두 번째 창에 인증번호를 입력 후 "확인" 버튼을 클릭합니다.</p>
						<p class="subConts">4. 초기화된 임시패스워드가 SMS로 전송됩니다.</p>
						<p class="subConts">5. 로그인 후 정상적인 패스워드로 변경합니다.</p>
					</div>
					<div class="btn_main">
						<span class="button iconBtn">
							<span class="button iconBtn">
							<button id="BTN_RESET_PASSWORD">
								<span class="button-icon ui-icon-func-popupOk"></span> <span class="button-text">확인</span>
							</button> </span>
						</span>
						<span class="button iconBtn">
							<span class="button iconBtn">
							<button id="BTN_CLOSE">
								<span class="button-icon ui-icon-func-popupCancel"></span> <span class="button-text">닫기</span>
							</button> </span>
						</span>
					</div>
					<div id="tempPassword"></div>
				</div>
			</div>
		</div>
	</div>
<!-- </div> -->
</body>
</html>