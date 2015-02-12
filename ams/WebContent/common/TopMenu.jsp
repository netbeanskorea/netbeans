<%@ page pageEncoding="utf-8"%>
<%@ page import="ams.fwk.utils.BaseUtils" %>
<%@ page import="ams.fwk.code.internal.AmsCode" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%
	List<AmsCode> localeList = BaseUtils.getAmsCodes("C009", locale);
	if(localeList==null)localeList= new ArrayList();
%>

<script>

$(function() {
	$.Page({
		init: function() {
			var post = $.PostData();
			if(post && post.FRT_LOGIN_FLAG) {
				if(post.FRT_LOGIN_FLAG=='Y') {
					alert('비밀번호를 변경해야합니다.');
					changePassword();
				}
			}
		}
	});
	
	var isTopOpened = true;
	//다른 페이지를 넘어갔다 오면 session정보가 사라져서 top, left menu가 비정상적으로 나타나게 됨.
	// 해당 경우는 menu를 재 조회 해옴.
	if($.Session('TOP_PAGE')===undefined) {
		$.MenuReloading(location.pathname.substr(9));
	}
	
	reloadLeft();
	/* //조회 필수값 체크
	$('#TCODE_goSearch').Form({
		validation: {
			CODE_ID: {
				required: true,
				rangelength:[3,5]
			}
		}
	}); */
	$('#selectLocale').Select({
		change: function(event) {
			var request = $.DataSet();
			request.fields.LOCALE_ID =$('#selectLocale').val();
			$.Service({
				transaction: 'com.COMBBase#pCOM10101',
				request: request,
				success: function(ds) {
					location.reload();
				}
			});
		}
	})
});

/* 
	//T-Code
	function TCode() {
		
		var request = {
				fields: {}
			};
		request.fields.CODEID =$('#CODE_ID').val();
		$('#TCODE_goSearch').Validate(function() {
			console.log(request.fields.CODEID);
			$.Service({
				transaction: 'Todo_save',
				request: request,
				success: function(ds) {
					ds.fields.page ='MNGUSR001.jsp';
					$.Navigate(ds.fields.page);
				}
			});
		});
		
	}
	
 */	
	//코드조회
	function CodeHelper() {
		$.Popup({
			url: 'MNGMNU002P.jsp',
			center: true,
			close: function(data) {
				if(!data) {
					// TODO:
					return;
				}
			}
		});
	}
	
	//즐겨찾기 추가
	function AddPrivate() {
		var request = {
				fields: {}
			};
		alert($.cookie('depth3_menu_id'));
		
		var depth3_menu_id = $.cookie('depth3_menu_id');
			
		request.fields.LOGINID ='admin';
		request.fields.MENUID =depth3_menu_id;
		 
		$.Service({
			transaction: 'Todo_save',
			request: request,
			success: function(ds) {
				window.alert(ds.message.messageName);
			}
		});
	}

	function SlideUpDown() {
		if (isTopOpened) {
			$("#logo").hide("slow");
			if (!$.browser.msie) {
				$("#topmenuArea").hide("slow");
			} else {
				$("#topmenuArea").hide();
			}
			$("#headerArea").animate({
				"height": 38
			}, "slow");
			$("#controlTopArea").animate({
				"top": 21
			}, "slow");
			//$("#tabs").animate({"height":$("#tabs").height() + 30},"slow" ); 

			document.slideTop.src = "<%=hostIp %>/image/ui/top/btn_controlToparea_open.gif";
			isTopOpened = false;
		} else {
			$("#logo").show(400);
			if (!$.browser.msie) {
				$("#topmenuArea").show(400);
			} else {
				$("#topmenuArea").show();
			}
			$("#headerArea").animate({
				"height": 68
			}, "slow");
			$("#controlTopArea").animate({
				"top": 51
			}, "slow");
			//$("#tabs").animate({"height":$("#tabs").height() - 30},"slow" );

			document.slideTop.src = "<%=hostIp %>/image/ui/top/btn_controlToparea.gif";
			isTopOpened = true;
		}
	}
	
	//로그아웃
	function logout() {
		if (window.confirm("로그아웃 하시겠습니까?")) {
			var ds = {
					fields: {
					},
					recordSets: {}
				};
			
			$.Logout({
				transaction: 'com.COMBBase#pCOM10002',
				request: ds,
				success: function(result) {
					$.Cookie('AUTO_LOGIN_KEY', '');
					$.Cookie('depth_menu_id', '');
					$.Cookie('depth2_menu_id', '');
					$.Cookie('depth3_menu_id', '');
					$.Cookie('depth_menu_nm', '');
					$.Cookie('depth2_menu_nm', '');
					$.Cookie('depth3_menu_nm', '');
					$.Session('TOP_PAGE', null);
					$.Session('LEFT_PAGE', null);
					$.Session('current_Role', null);
					window.location.href = '${pageContext.request.contextPath}/index.jsp';
				},
			    fail: function(ds) {
			    	//window.alert(ds.message.messageName);
			    	$.Cookie('AUTO_LOGIN_KEY', '');
					$.Cookie('depth_menu_id', '');
					$.Cookie('depth2_menu_id', '');
					$.Cookie('depth3_menu_id', '');
					$.Cookie('depth_menu_nm', '');
					$.Cookie('depth2_menu_nm', '');
					$.Cookie('depth3_menu_nm', '');
					$.Session('TOP_PAGE', null);
					$.Session('LEFT_PAGE', null);
					$.Session('current_Role', null);
					window.location.href = '${pageContext.request.contextPath}/index.jsp';
			    },
				error: function(ds) {
					$.Cookie('AUTO_LOGIN_KEY', '');
					$.Cookie('depth_menu_id', '');
					$.Cookie('depth2_menu_id', '');
					$.Cookie('depth3_menu_id', '');
					$.Cookie('depth_menu_nm', '');
					$.Cookie('depth2_menu_nm', '');
					$.Cookie('depth3_menu_nm', '');
					$.Session('TOP_PAGE', null);
					$.Session('LEFT_PAGE', null);
					$.Session('current_Role', null);
					window.location.href = '${pageContext.request.contextPath}/index.jsp';
				}
			});
		}
	}
	//my info
	function changeUserInfo() {
		$.Navigate('${pageContext.request.contextPath}/mng/MNGUSR001P04.jsp');
	}
	
	//최초 로그인시 비밀번호 변경
	function changePassword() {
		$.Popup({
			modal: true,
			center: true,
			width: 550,
			height: 310,
			url : 'changePassword.jsp',
			close: function(data) {
				if(data==null || data.change == false) {
					$.Navigate('${pageContext.request.contextPath}/index.jsp');	
				}
			}
		});
	}
	
// 	function loadLeft(leftNm){
// 		var y = "";
// 		for(var i=1; i < 12; i++) {
// 			if(i < 10) {
// 				y = "0" + i;
// 			} else {
// 				y = i;
// 			}
// 			$(".menu" + y).css("display", "none");
// 		}
// 			$("."+leftNm).css("display", "block");
// 	}
</script>

	<div id="headerArea">
			<div id="globalArea">
				<div class="global">
					<a href="${pageContext.request.contextPath}/main.jsp"><span class="g_logo"><em>SK 종합화학 MSS</em></span></a>
					<ul class="global_links">
						<li><%=loginName%></b><%=BaseUtils.getAmsLabelValue("L0045", locale, "") %> <%=BaseUtils.getAmsLabelValue("L0046", locale, "Welcome") %>.</li>
						<li><a href="${pageContext.request.contextPath}/main.jsp" class="home"><em>Home</em></a></li>
						<li><a href="javascript:changeUserInfo();"><em><%=BaseUtils.getAmsLabelValue("L0047", locale, "My Info") %></em></a></li>
						<li><a href="javascript:logout();" class="logout"><em>Logout</em></a></li>
						<li><a href="#1" class="sitemap"><em>Sitemap</em></a></li>
						<li>
							<select id="selectLocale">
								<%
									AmsCode code = null;
									String lang = locale.getLanguage();
									for(int i=0; i<localeList.size();i++) { 
										code = (AmsCode)localeList.get(i);
										if(code==null)System.out.println("코드가 Null임.");
								%>
								<option value="<%=code.getAttributeValue(1)%>"  <%=lang.equals(code.getAttributeValue(1))?"selected='selected'":"" %>><%=code.getValue() %></option>
								<%} %>
							</select>
						</li>
						
					</ul>
				</div>
			</div>

			<div id="gnbArea">
				<div class="gnb">
					<div id = "topmenu" class="gnb_wrap">
						
					</div>
				</div>
			</div>
			<script>
			$(function() {
				$('#topmenu').append($.Session('TOP_PAGE'));
				reloadLeft();
			});
			</script> 
		</div>