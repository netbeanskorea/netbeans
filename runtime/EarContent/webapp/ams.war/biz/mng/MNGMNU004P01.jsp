<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>메뉴 검색</title>
<%@include file="../../common/common.jsp"%>
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
		$('#MNGMNU004P01_Search').Form().Enter('#btnSearch');

		$.Page({
			init : function() {
				var parentData = $.Page.Data();
				$('#MENU_CODE').val(parentData.MENU_CODE);
				$.Page.SearchMenu();
			},
			SearchMenu : function() {
				var request = $('#MNGMNU004P01_Search').DataSet();
				$.Service({
					transaction : 'mng.MNGMNUB#selectTCodeMenuPopup',
					request : request,
					response : '#MENU_LIST',
					success : function(ds) {
						if (ds.recordSets.MENU_LIST.nc_list.length == 0) {
							alert('조회 결과가 없습니다.');
						}
					}
				});
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				$.Page.SearchMenu();
			}
		})

		$('#MENU_LIST').Grid({
			columns : [ {
				id : 'MENU_CODE',
				title : '메뉴 ID',
				width : '150',
				align : 'center'
			}, {
				id : 'MENU_NAME',
				title : '메뉴명',
				align : 'left',
				width : '250'
			}, {
				id : 'URL',
				title : 'URL',
				hidden : true
			} ],
			dblclick : function(rowid) {
				var url = $('#MENU_LIST').Column(rowid, 'URL');
				$.Page.Close({
					URL : url
				});
			},
			height : 250,
			width : 'auto',
			viewrecords : true,
			scrollOffset : 0,
			loadComplete : function() {
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
				<div class="contTitle">
					<h2>즐겨찾기 관리 - 메뉴 검색</h2>
				</div>
				<div class="searchArea">
					<form id="MNGMNU004P01_Search">
						<table class="tb_search">
							<colgroup>
								<col width="120">
								<col width="244">
								<col width="94">
							</colgroup>
							<tr>
								<th><label for="MENU_CODE">MENU_CODE</label></th>
								<td><input id="MENU_CODE" type="text" class="input01"
									maxlength="7" /></td>
								<td class="searchBtn">
									<button id="btnSearch" class="btnSearch">
										<span class="button-text">Search</span>
									</button>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="tb_basic">
					<form id="gridForm">
						<table id="MENU_LIST"></table>
					</form>
				</div>
			</div>
		</div>
	</div>
	<!-- </div> -->
</body>
</html>