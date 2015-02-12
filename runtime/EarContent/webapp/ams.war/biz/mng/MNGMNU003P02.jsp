<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>즐겨찾기 관리 - 메뉴 팝업</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGMNU003P02.jsp
	 * 화면 설명  : 즐겨찾기 관리 - 메뉴 팝업
	 * 작성자        : 이진희
	 * 작성일        : 2013-01-24
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	이진희	2013-01-24	화면 생성
	 * ver0.2	이진희	2013-02-01	기능 추가(선택 값 이전화면에 bind)
	 ****************************************************************************************/
	$(function() {
		$('#MNGMNU003P02').Form({
			enter : '#btnSearch'
		});

		var list = $.Page.Data('LIST'); // 전화면에서 넘어온 리스트
		$
				.Page({
					init : function() {
						var req = {
							fields : {}
						};

						// C002코드는 시스템/업무 선택
						req.fields.CODE_ID = 'C002';

						$.Service({
							transaction : 'mng.MNGCODS#selectSelector',
							request : req,
							success : function(ds) {
								$('#MENU_CATEGORY').Select({
									value : 'value',
									label : 'label',
									blank : {
										value : '',
										label : '==선택=='
									}
								});
								$('#MENU_CATEGORY').Options(
										ds.recordSets.GROUP_RS);
							}
						});

					},
					Search_List : function(page) {
						var request = $('#MNGMNU003P02').DataSet();
						request.fields.USER_ID = $.Page.Data('USER_ID');

						$
								.Service({
									transaction : 'mng.MNGMNUB#selectMenuPopupList',
									request : request,
									success : function(ds) {
										var LIST_ARR = ds.recordSets.MENU_RS.nc_list;
										var MENU_LST = {
											nc_list : []
										};
										for ( var j = 0; j < LIST_ARR.length; j++) {
											var checker = false; // 이미 등록된 메뉴 부분을 제외하는 로직
											for ( var i = 0; i < list.length; i++) {
												if (list[i].MENU_ID === LIST_ARR[j].MENU_ID
														&& list[i].MENU_CATEGORY === LIST_ARR[j].MENU_CATEGORY) {
													checker = true;
													break;
												}
											}
											if (!checker) {
												MENU_LST.nc_list
														.push(LIST_ARR[j]);
											}
										}
										$('#MENU_RS').RecordSet(MENU_LST);
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
		});

		$('#MENU_RS').Grid({
			columns : [ {
				id : 'MENU_CATEGORY',
				title : '구분',
				width : '150',
				fixed : true
			}, {
				id : 'MENU_ID',
				title : '메뉴ID',
				width : '150',
				fixed : true
			}, {
				id : 'MENU_NAME',
				title : '메뉴명',
				width : '150',
				fixed : true
			}, {
				id : 'PAGE_URL',
				title : 'URL',
				width : '150'
			} ],
			click : function(row) {

			},
			height : 231,
			viewrecords : true,
			multiselect : true,
			scrollOffset : 0,
			loadComplete : function() {
			}
		});

		//선택버튼 클릭
		$('#btnSelect').Button(
				{
					click : function(row) {
						var selrow = $("#MENU_RS").SelectRowId(); //선택된 row의ID값 조회
						var data = {
							fields : {},
							recordSets : {
								MENU_RS : {
									nc_list : []
								}
							}
						};
						// 메뉴가 다중 선택일 경우도 처리
						for ( var i = 0; i < selrow.length; i++) {
							data.recordSets.MENU_RS.nc_list[i] = $('#MENU_RS')
									.Get(selrow[i]);
						}

						if (data.length === 0) {
							alert("선택된 행이 없습니다.")
							return;
						}
						$.Popup.Close(data);
					}
				});
	});
</script>
</head>
<body>
	<!-- <div id="container" class="container_pop">  container 때문에 화면 비율이 이상하게 나와서 일단 주석처리합니다... -->
	<div id="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea" class="type02">
				<div class="contTitle">
					<div class="content">
						<h2>즐겨찾기 관리 - 메뉴 팝업</h2>
					</div>
					<div class="searchArea">
						<form id="MNGMNU003P02">
							<table class="tb_search">
								<colgroup>
									<col width="100" />
									<col width="179" />
									<col width="100" />
									<col width="179" />
									<col width="100" />
									<col width="179" />
									<col width="70" />
								</colgroup>
								<tr>
									<th><label for="MENU_CATEGORY">구분</label></th>
									<td><select id="MENU_CATEGORY">
									</select>
									</td>
									<th><label for="MENU_ID">메뉴ID</label></th>
									<td><input id="MENU_ID" class="input01" type="text"
										maxlength="30" />
									</td>
									<th><label for="MENU_NAME">메뉴명</label></th>
									<td><input id="MENU_NAME" class="input01" type="text"
										maxlength="50" />
									</td>
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
							<table id="MENU_RS"></table>
							<!--  <div id="pager" class="paging"></div>  -->
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
	</div>
	<!-- </div> -->
</body>
</html>