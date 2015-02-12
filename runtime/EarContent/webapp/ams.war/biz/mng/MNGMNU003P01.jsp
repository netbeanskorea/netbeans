<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>즐겨찾기 관리 - 사용자 팝업</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGMNU004P.jsp
	 * 화면 설명  : 즐겨찾기 관리 - 사용자 팝업
	 * 작성자        : 이진희
	 * 작성일        : 2013-01-24
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	이진희	2013-01-24	화면 생성
	 * ver0.2	이진희	2013-02-01	기능 추가(선택 값 이전화면에 bind)
	 ****************************************************************************************/
	$(function() {
		$('#MNGMNU003P01').Form({
			enter : '#btnSearch'
		});
		$.Page({
			init : function() {
				$.Page.Search_List(1);
			},
			Search_List : function(page) {
				var request = $('#MNGMNU003P01').DataSet();
				if ($.Page.Data('USER_NAME')) {
					request.fields.USER_NAME = $.Page.Data('USER_NAME');
				}
				$.Service({
					transaction : 'mng.MNGMNUB#selectUserPopupList',
					request : request,
					response : '#USER_RS',
					success : function(ds) {

					}
				});
			}
		});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				window.location.reload();
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				$.Page.Search_List(1);
			}
		})

		$('#USER_RS').Grid({
			columns : [ {
				id : 'checkbox',
				title : 'check',
				type : 'checkbox',
				align : 'center',
				width : '50',
				fixed : true
			}, {
				id : 'USER_ID',
				title : '사용자ID',
				width : '250',
				align : 'left',
				fixed : true
			}, {
				id : 'USER_NAME',
				title : '사용자명',
				align : 'left',
				width : '240',
				fixed : true
			} ],
			click : function(row) {
				gridData = $('#USER_RS').Record(row);
			},
			height : 250,
			width : 'auto',
			viewrecords : true,
			loadComplete : function() {
			}
		});

		//선택버튼 클릭
		$('#btnSelect').Button({
			click : function(row) {
				if (!gridData) {
					return;
				}
				$.Popup.Close(gridData);
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
					<h2>즐겨찾기 관리 - 사용자 팝업</h2>
				</div>
				<div class="searchArea">
					<form id="MNGMNU003P01">
						<table class="tb_search">
							<col width="80">
							<col width="116">
							<col width="80">
							<col width="116">
							<col width="66">
							<tr>
								<th><label for="USER_ID">사용자ID</label></th>
								<td><input id="USER_ID" type="text" class="input01 num02"
									maxlength="20" /></td>
								<th><label for="USER_NAME">사용자명</label></th>
								<td><input id="USER_NAME" type="text" class="input01 num02"
									maxlength="30" /></td>
								<td class="searchBtn">
									<button id="btnSearch" class="btnSearch">
										<span class="button-text">Search</span>
									</button>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="btn_common">
					<span class="button iconBtn">
						<button id="btnInit">
							<span class="button-icon ui-icon-search-reset"></span> <span
								class="button-text"> 초기화</span>
						</button> </span>
				</div>
				<form id="gridForm">
					<div class="tb_basic">
						<table id="USER_RS"></table>
						<!-- <div id="pager" class="paging"></div> -->
					</div>
				</form>
				<div class="btn_main">
					<span class="button iconBtn">
						<button id="btnSelect">
							<span class="button-icon ui-icon-func-popupOk"></span> <span
								class="button-text"> 선택</span>
						</button> </span>
				</div>
			</div>
		</div>
	</div>
	<!-- </div> -->
</body>
</html>