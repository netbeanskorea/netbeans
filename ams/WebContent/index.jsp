<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>로그인</title>
<%@include file="/common/common.jsp"%> 
<%-- <%@ page import="nexcore.framework.core.Constants"%>
<%@ page import="nexcore.framework.core.util.StringUtils"%> --%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : index.jsp
	 * 화면 설명  : 로그인
	 * 작성자        : 문태훈
	 * 작성일        : 2012-11-12
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	문태훈	2012-11-12	화면 생성(CSS 제외함)
	 ****************************************************************************************/
	 $(function() {
		$.Page({
			init: function() {
			}
		});
		
		var form = $('#form');

        // Input Clear  
//         var i_label = $('.item>.i_label');
//         var i_text = $('.item>.i_label').next('.i_text');  
//         $('.item>.i_label').css('position','absolute');
        
/*      	 i_label
            .click(function(){
                $(this).css('visibility','hidden');
                $(this).next('.i_text').focus();
            }); 
        i_text  
            .focus(function(){
                $(this).prev('.i_label').css('visibility','hidden');
            })  
            .blur(function(){
                if($(this).val() == ''){  
                    $(this).prev('.i_label').css('visibility','visible');  
                } else {  
                    $(this).prev('.i_label').css('visibility','hidden');  
                }  
            })  
            .change(function(){
                if($(this).val() == ''){  
                    $(this).prev('.i_label').css('visibility','visible');  
                } else {  
                    $(this).prev('.i_label').css('visibility','hidden');  
                }  
            })  
            .blur();*/ 
        //end input Clear
		
		$('#login').Button({
			click: function(){
				var ds = {
						fields : {},
						recordSets : {
							ROLE_RS : {
								nc_list : []
							}
						}
					};
				ds.fields.USER_ID = $('#USER_ID').Value();
				ds.fields.USER_PASSWORD=$('#USER_PASSWORD').Value();
				ds.fields.IS_AMS_CONTEXT='Y';
				form.Validate(function() {
					$.Login({
						transaction: 'com.COMBBase#pCOM10001',
						request:ds,
						success: function(result) {
							$.Cookie('AUTO_LOGIN_KEY', result.fields.AUTO_LOGIN_KEY, 30);
// 							$.EMKMenuLoading('main.jsp');
							//$.''''.... FRT_LOGIN = 'Y'???
							if(result.fields.FRT_LOGIN_FLAG=='Y') {
								$.NavigatePost(contextPath + '/main.jsp', {FRT_LOGIN_FLAG: 'Y'});
							}
							$.Navigate(contextPath + '/main.jsp');
						},
					    fail: function(ds) {
					    	window.alert(ds.message.messageName);
					    }
					});
				});
			}
		});
		
		//Login 필수값체크
        form.Form({
               validation: {
            	      USER_ID: {
                            required: true,
                            name: '아이디'
                      },
                      USER_PASSWORD: {
                            required: true,
                            name: '비밀번호'
                            
                      }
               }
        });
		
		$('#btnPassword').Button({
			click: function() {
				findPassword();
			}
		});
		
	});
	
	function findPassword() {
		$.Popup({
			modal: true,
			center: true,
			width: 550,
			height: 310,
			url : 'findPassword.jsp',
			data: {
				id : $('#form').DataSet().fields.USER_ID
			}
		});
	}
</script>
</head>
<body>
	<div id="container">
		<div id="wrap" class="login_area">
			<div id="container_login" class="login_box">
				
				<form method="post" id="form">
					<fieldset>
	                	<legend><span class="login_logo"><em>AMS</em></span></legend>
						<ul class="clearfix">
							<li class="input_field">
								<span class="item">
									<label class="i_label uid" for="USER_ID"><em>로그인</em></label>
									<input id="USER_ID" name="USER_ID" class="i_text uid" type="text"  maxlength="20"/>
								</span>
								<span class="item">
									<label class="i_label pwd" for="USER_PASSWORD"><em>비밀번호</em></label>
									<input id="USER_PASSWORD" name="USER_PASSWORD" class="i_text pwd" type="password"  maxlength="50"/>
								</span>
							</li>
							<li>
								<span id="login" class="btn_login">
									<input type="submit" name="loginBtn" value="" title="Login" />
								</span>
							</li>
						</ul>
						<div class="login_btns">
		                    <!-- <button id="btnBrowser" class="btnBrowser">
								<span class="button-text"><em>브라우저 업그레이드 안내</em> </span>
							</button>  -->
		                    <button id="btnPassword" class="btnPassword">
								<span class="button-text"><em>비밀번호 찾기</em> </span>
							</button>
						</div>
					</fieldset>
					<span class="login_visual01"></span>
					<span class="login_visual02"></span>
					<p class="login_msg01">
						<em>타 사용자의 계정을 도용 시 민형사상 책임을 물을 수 있습니다.</em>
					</p>
				</form>
			</div>
		</div>
	</div>

</body>
</html>
