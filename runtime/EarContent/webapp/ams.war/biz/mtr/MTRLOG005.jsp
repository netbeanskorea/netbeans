<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>모니터링 - 메뉴별 로그인 현황</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MTRLOG005.jsp
	 * 화면 설명  : 모니터링 - 메뉴별 로그인 현황
	 * 작성자      : 강훈기
	 * 작성일      : 2013-05-20
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * 
	 ****************************************************************************************/
	$(function() {
		$('#MTRLOG005_goSearch').ExcelExportForm({ // jsp에 선언된 form ID를 바탕으로 excel export form을 선언한다.
			//조회 영역 Enter 조회버튼 자동 클릭
			enter: '#btnSearch'
		});
		$('#dateRange').DateRange();
		$.Page({
			init: function(){
				$.Page.Search_List($.Param('page') || 1);
				
			},
			Search_List: function(page) {
				var request = $('#MTRLOG005_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = 20;
				$.Page.Data['page'] = request.fields.page;
				
				$.Service({
					transaction: 'mtr.MTRLOGB#selectContentsLoginList',
					request: request,
					response: '#CONT_LOGIN_LOG',
					success: function(ds) {
						$('#pager').RecordSet(ds.recordSets.CONT_LOGIN_LOG);
						$('#count').html('(' + ds.recordSets.CONT_LOGIN_LOG.nc_totalRecordCount + '건)');
					
					}
				});
			}
		});
		
		

		//콤보박스
		$('#DEPTH').Options([
   			{
   				value: '',
   				label: '전체선택'
   			}, {
   				value: '1',
   				label: '1'
   			}, {
   				value: '2',
   				label: '2'
   			}, {
   				value: '3',
   				label: '3'
   			}
   		]);
		
		$('#btnExcelSave').Button({
			click: function(){
				$('#MTRLOG005_goSearch').ExcelExport();
			}
		});
		
		
		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click: function() {
				if(window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#CONT_LOGIN_LOG').Clear();
					$('#count').html('(' + 0 + '건)');
				}
			}
		});
		
     	// 조회 버튼 클릭
		$('#btnSearch').Button({
			click: function() {
				$.Page.Search_List($.Param('page') || 1);
			}
		});
     	
		
		$('#CONT_LOGIN_LOG').Grid({
			columns: [
				{
					id: 'MENU_ID',
					title: '메뉴ID',
					align: 'center',
					width: 100
				}, {
					id: 'MENU_NAME',
					title: '메뉴명',
					align: 'left',
					width: 100
				}, {
					id: 'UTA',
					title: '임직원',
					align: 'right',
					formatter : 'number',
					width: 96
				}, {
					id: 'UTS',
					title: '사업장',
					align: 'right',
					formatter : 'number',
					width: 96
				}, {
					id: 'UTD',
					title: '대리점',
					align: 'right',
					formatter : 'number',
					width: 96
				}, {
					id: 'UTC',
					title: '고객사',
					align: 'right',
					formatter : 'number',
					width: 96
				}, {
					id: 'UTV',
					title: '외주업체',
					align: 'right',
					formatter : 'number',
					width: 96
				}, {
					id: 'UTE',
					title: '기타',
					align: 'right',
					formatter : 'number',
					width: 96
				} 
			],
			scrollOffset: 0,
			gridview: true,
			rownumWidth: 40,
			height: 350,
			number: false,
			shrinkToFit: false,
			loadComplete: function() {
			}
		});

		$('#pager').Pager({
			click: function(page) {
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
				<div class="contTitle">
					<h1>contents별 로그인현황</h1>
				</div>
					<div class="searchArea close">
						<form id="MTRLOG005_goSearch">
							<table class="tb_search">
								<colgroup>
									<col width="130" />
									<col width="617" />
									<col width="181" />
								</colgroup>								
								<tr class="first_row">
									<th><label for="DEPTH">Depth</label>
									</th>
									<td><select id="DEPTH"></select>
									</td>
									<td class="searchBtn" rowspan="3">
										<button id="btnSearch" class="btnSearch">
											<span class="button-text">Search</span>
										</button>
									</td>
								</tr>
								<tr>
								<th><label for="TOTAL">집계방법</label>
									</th>
									<td>
										<label><input id="TOTAL" name="TOTAL" value="0" type="radio" class="radio" checked />일평균</label> 
										<label><input id="TOTAL" name="TOTAL" value="1" type="radio" class="radio" />누계</label>
									</td>
								</tr>
								<tr>
									<th><label for="dateRange">기간</label></th>
									<td>
										<span id="dateRange"> <input id="START_DT" class="input01 date01" type="text" /> ~ <input id="END_DT" class="input01 date01" type="text" /> </span>
									</td>
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
						</button> </span> <span class="button xlsBtn"><button id="btnExcelSave">
					<span class="iconExcelSave"></span><span class="button-text">엑셀다운로드</span>
				</button> </span>
					</div>
					<div class="tb_basic">
						<table id="CONT_LOGIN_LOG"></table>
						<div id="pager" class="paging"></div>
					</div>
					<ui:excel-export transactionId="mtr.MTRLOGB#saveContentsLoginToExcel" exportFileName="Contents별 로그인현황.xls"/>
						
				</div>
			</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
