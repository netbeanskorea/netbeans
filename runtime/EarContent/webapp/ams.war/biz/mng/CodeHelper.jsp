<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>즐겨찾기 관리</title>
<%@include file="../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : CodeHelper.jsp
	 * 화면 설명  : 즐겨찾기 관리
	 * 작성자        : 이진희
	 * 작성일        : 2013-01-24
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	이진희	2013-01-24	화면 생성
	 * ver0.2	이진희	2013-02-01	기능 추가(flag 행추가 행삭제 및 기타기능)
	 * ver0.3	이진희	2013-02-02	validation 생성 (validation 문구 type 조정 필요)
	 * 2번째 팝업 적용 필요
	 ****************************************************************************************/
	$(function() {
		$.CodeHelper([{
			divId: 'codehelper1',
			parentCode: 'C001',
			codeId: 'C001',
			style: 'select',
			func: function() {
				alert($(this).Field());
			},
			type: 'SYS'
		}, {
			divId: 'codehelper2',
			parentCode: 'C002',
			codeId: 'C002',
			style: 'radio',
			func: function() {
				alert($(this).Field());
			},
			type: 'SYS'
		}, {
			divId: 'codehelper3',
			parentCode: 'C003',
			codeId: 'C003',
			upperCode: '111',
			style: 'checkbox',
			func: function() {
				alert($(this).Field());
			},
			type: 'SYS'
		}
		],
		function() {
			console.log('done!');
		});
		
		$.Page({
			init: function() {
				
			},
			a: function() {
				var jCodeList1 = $.CodeHelper('codehelper1');
				var jCodeList2 = $.CodeHelper('codehelper2');
				var jCodeList3 = $.CodeHelper('codehelper3');
				console.log(jCodeList1);
				console.log(jCodeList2);
				console.log(jCodeList3);
			}
		});

		$('#btn1').Button({
			click : function() {
				$('#codehelper6').CodeHelperPopup(
					function(code) {
						console.log(code);
					},
					function(code) {
						console.log(code);
					}
				);
			}
		});
		
		$('#btn2').Button({
			click : function() {
				$('#codehelper6').CodeHelperPopup(
					function(code) {
						console.log(code);
					}
				);
			}
		});

		$('#codehelper6').Text();
	});
</script>
</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="../common/TopMenu.jsp"%>
		<!-- //headerArea-->

		<div id="wrapper" style="height: 808px;">
			<!-- //leftArea -->
			<%@include file="../common/LeftMenu.jsp"%>
			<!-- //leftArea -->

			<div id="contents">
				<div id="content">
					<div id="codehelper1" onclick="javascript:$.Page.a();"></div>
					<DIV id="codehelper2"></div>
					<DIV id="codehelper3"></DIV>
					<div id="codehelper4"></div>
					<table id="codehelper5"></table>
					<input type="text" id="codehelper6"/>
					<button id="btn1">특화코드</button>
					<button id="btn2">특화코드</button>
				</div>
			</div>
			<!-- //leftArea -->
			<%@include file="../common/Footer.jsp"%>
			<!-- //leftArea -->
		</div>
	</div>
</body>
</html>
