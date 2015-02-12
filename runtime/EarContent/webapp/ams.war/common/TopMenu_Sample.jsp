<%@ page pageEncoding="utf-8"%>

<script>
$(function() {
	var isTopOpened = true;
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
					<a href="./MainTrader.jsp"><span class="g_logo"><em>SK 종합화학 MSS</em> </span>
					</a>
					<ul class="global_links">
						<li><a href="./MainTrader.jsp" class="home"><em>Home</em></a></li>
						<li><a href="#1" class="myinfo"><em>My Info</em></a></li>
						<li><a href="#1" class="logout"><em>Logout</em></a></li>
						<li><a href="#1" class="sitemap"><em>Sitemap</em></a></li>
					</ul>
				</div>
			</div>

			<div id="gnbArea">
				<div class="gnb">
					<div class="gnb_wrap">
						<ul class="gnb_menus">
							<!-- <li><a href="#1" class="gnb01"><em>Main</em> </a></li> -->
							<!-- <li id="depth1_li_M001"><a href="javascript:depth1_click('M001', '시장분석');" class="gnb02"><em>시장분석</em> </a></li> -->
							<li id="depth1_li_M002"><a href="./CustomerDetail_tab1.jsp" class="gnb03"><em>기준정보관리</em> </a></li>
							<li id="depth1_li_M003"><a href="./DDRList.jsp" class="gnb04"><em>거래관리</em> </a></li>
							<!-- <li id="depth1_li_M004"><a href="javascript:depth1_click('M004', 'MTM관리');" class="gnb05"><em>MTM 관리</em> </a></li> -->
							<li id="depth1_li_M005"><a href="./DeclarationList.jsp" class="gnb06"><em>수급표</em> </a></li>
							<!-- <li id="depth1_li_M006"><a href="javascript:depth1_click('M006', '판구매정보');" class="gnb07"><em>판구매정보</em> </a></li> -->
							<li class="rightend" id="depth1_li_M007"><a href="./DemurrageList.jsp" class="gnb08"><em>용선관리</em> </a></li>
							<li id="depth1_li_M008"><a href="./CustomsRefundList.jsp" class="gnb09"><em>대관신고</em> </a></li>
							<!-- <li><a href="#1" class="gnb10"><em>실적관리</em> </a></li>
							<li><a href="#1" class="gnb11"><em>정산</em> </a></li>
							<li><a href="#1" class="gnb12"><em>RM</em> </a></li>
							<li class="rightend"><a href="#1" class="gnb13"><em>Report</em> </a></li> -->
						</ul>
					</div>
				</div>
			</div>
			<script>
			$(function() {
				reloadLeft();
			});
			</script> 
		</div>