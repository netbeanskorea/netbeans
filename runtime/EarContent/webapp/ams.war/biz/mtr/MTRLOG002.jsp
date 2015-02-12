<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>모니터링 - 메뉴사용현황</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MTRLOG002.jsp
	 * 화면 설명  : 모니터링 - 메뉴사용현황
	 * 작성자      : 
	 * 작성일      : 2013-03-22
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * 
	 ****************************************************************************************/
	$(function() {
		$('#MMNUACC001_goSearch').Form({
			//조회 영역 Enter 조회버튼 자동 클릭
			enter : '#btnSearch'
		});
		$.DateRange('#START_DT', '#END_DT');
		$.Page({
			init : function() {
				$.Page.Search_List($.Param('page') || 1);

			},
			Search_List : function(page) {
				var request = $('#MMNUACC001_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = 50;
				$.Page.Data['page'] = request.fields.page;

				// UT코드는 임직원/사업장/대리점/고객사/벤더/기타/고객 선택
				request.fields.CODE_ID = 'UT';

				$.Service({
							transaction : 'mtr.MTRLOGB#selectMenuAccess',
							request : request,
							response : '#MNUACC_LIST',
							success : function(ds) {
								//$('#pager').RecordSet(ds.recordSets.MNUACC_LIST);
								$('#count').html(
												'('+ ds.recordSets.MNUACC_LIST.nc_recordCount
														+ '건)');

					}
				});
			}
		});

		// 초기화 버튼 클릭
		$('#btnRefresh').Button({
			click : function() {
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#container').Clear();
					$('#count').html('(' + 0 + '건)');
					$('#START_DT').Date();
					$('#END_DT').Date();
				}
			}
		});

		$('#schKind').Options([
		              			{
		              				value: '',
		              				label: '===선택==='
		              			}, {
		              				value: 'MENU_ID',
		              				label: '메뉴ID'
		              			}, {
		              				value: 'USER_ID',
		              				label: '사용자ID'
		              			}
		              		]);
		
		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				$.Page.Search_List($.Param('page') || 1);
			}
		});

		$('#MNUACC_LIST').Grid(
				{
					columns : [
							{
								id : 'SVC_DT',
								title : '일자',
								formatter : function(cellvalue, options,
										rowdata) {
									var rdate = cellvalue.substring(0, 4) + '-'
											+ cellvalue.substring(4, 6) + '-'
											+ cellvalue.substring(6, 8);
									return rdate;
								},
								align : 'center',
								width : 120
							}, {
								id : 'MENU_ID',
								title : '메뉴ID',
								align : 'left',
								width : 100
							}, {
								id : 'MENU_CNT',
								title : '사용회수',
								align : 'right',
								width : 100
							}, {
								id : 'MENU_NAME',
								title : '메뉴이름',
								align : 'left',
								width : 200
							}, {
								id : 'MENU_CATEGORY',
								title : '메뉴구분',
								align : 'left',
								width : 100
							}, {
								id : 'PAGE_URL',
								title : '페이지 URL',
								align : 'left',
								width : 300
							}, {
								id : 'PARENT_MENU_ID',
								title : '상위메뉴ID',
								align : 'left',
								width : 100
							} ],
					scrollOffset : 0,
					gridview : true,
					rownumWidth : 40,
					height : 'auto',
					number : false,
					//shrinkToFit: false,
					loadComplete : function() {
					}
				});

		$('#pager').Pager({
			click : function(page) {
				$.Page.Search_List(page || 1);
			}
		});
	});
</script>
</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="../../common/TopMenu.jsp"%>
		<!-- //headerArea-->

		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="../../common/LeftMenu.jsp"%>
			<!-- //leftArea -->

			<div id="contentArea">
				<div id="content">
					<div class="contTitle">
						<h1>메뉴사용현황</h1>
					</div>
						<div class="searchArea close">
							<form id="MMNUACC001_goSearch">
								<table class="tb_search">
									<colgroup>
										<col width="130">
										<col width="284">
										<col width="130">
										<col width="284">
										<col width="110">
									</colgroup>
									<tr class="first_row">
										<th><label for="START_DT">시작날짜</label>
										</th>
										<td><input id="START_DT" value="" type="text" class="input01 date01" />
										</td>
										<th><label for="END_DT">종료날짜</label>
										</th>
										<td><input id="END_DT" value="" type="text" class="input01 date01" />
										</td>
										<td class="searchBtn" rowspan="2">
										<button id="btnSearch" class="btnSearch">
											<span class="button-text">Search</span>
										</button>
									</td>
									</tr>
									<tr>
										<th><label for="schWord">검색조건</label></th>
										<td colspan="3">
											<select id="schKind" class="selectFL"></select>
											<input id="schWord" type="text" class="input01"></input>
										</td>
										<!-- 
										<th><label for="USER_GROUP">사용자그룹</label>
										</th>
										<td><select id="USER_GROUP" name="USER_GROUP" style="width:100px;">
										</select></td>
										 -->
									</tr>
								</table>
							</form>
						</div>
						<div class="search_more">
							<a href="javascript:SlideDownSearch();"></a>
						</div>
						<p id="count" class="subConts">(0건)</p>
						<div class="btn_common type02">
							<span class="button iconBtn"><button id="btnRefresh">
								<span class="iconRefresh"></span><span class="button-text">초기화</span>
							</button> </span>
						</div>
						<div class="tb_basic">
							<table id="MNUACC_LIST"></table>
							<!-- <div id="pager" class="paging"></div>  -->
						</div>
					</div>
				</div>
			</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
