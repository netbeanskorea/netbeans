<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>모니터링 - 로그인현황</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MTRLOG006.jsp
	 * 화면 설명  : 일자별 로그인 현황
	 * 작성자        : 정대홍
	 * 작성일        : 2013-05-23
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	정대홍	2013-05-23	화면 생성
	 ****************************************************************************************/
	 $(function() {
			$('#MTRLOG006_goSearch').ExcelExportForm({  // jsp에 선언된 form ID를 바탕으로 excel export form을 선언한다.
				//조회 영역 Enter 조회버튼 자동 클릭
				enter: '#btnSearch'
			});
			$('#dateRange').DateRange();
			$.Page({
				init: function(){
					$.Page.Search_List($.Param('page') || 1);					
				},
				Search_List: function(page) {
					var request = $('#MTRLOG006_goSearch').DataSet();
					request.fields.page = page;
					request.fields.page_size = 50;
					$.Page.Data['page'] = request.fields.page;
					
					$.Service({
						transaction: 'mtr.MTRLOGB#selectDailyLog',
						request: request,
						response: '#DAILY_LOGIN_COUNT',
						success: function(ds) {
							$('#pager').RecordSet(ds.recordSets.DAILY_LOGIN_COUNT);												
							$('#count').html('(' + ds.recordSets.DAILY_LOGIN_COUNT.nc_totalRecordCount + '건)');						
						}
					});
				}
			});	
 			  	
			

			$('#btnExcelSave').Button({
				click: function(){
					$('#MTRLOG006_goSearch').ExcelExport();
				}
			});
			
			// 초기화 버튼 클릭
			$('#btnRefresh').Button({
				click: function() {
					if(window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
						$('#container').Clear();
						$('#count').html('(' + 0 + '건)');
						$('#START_DT').Date();
						$('#END_DT').Date();
					}
				}
			});
			
	     	// 조회 버튼 클릭
			$('#btnSearch').Button({
				click: function() {
					$.Page.Search_List($.Param('page') || 1);
				}
			});
	     	
			
			$('#DAILY_LOGIN_COUNT').Grid({
				columns: [
					{
						id: 'SVC_DT',
						title: '일자',
						align: 'center',
						width: 110
					}, {
						id: 'COUNT',
						title: '계',
						align: 'center',
						width: 100
					}, {
						id: 'UTA',
						title: '임직원',
						align: 'center',
						formatter : 'number',
						width: 100
					}, {
						id: 'UTC',
						title: '사업장',
						align: 'center',
						formatter : 'number',
						width: 100
					}, {
						id: 'UTD',
						title: '대리점',
						align: 'center',
						formatter : 'number',
						width: 100
					}, {
						id: 'UTS',
						title: '고객사',
						align: 'center',
						formatter : 'number',
						width: 100
					}, {
						id: 'UTV',
						title: '외주업체',
						align: 'center',
						formatter : 'number',
						width: 100
					}, {
						id: 'UTE',
						title: '기타',
						align: 'center',
						formatter : 'number',
						width: 100
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
					<h1>일자별 로그인 현황</h1>
				</div>
					<div class="searchArea close">
						<form id="MTRLOG006_goSearch">
							<table class="tb_search">	
								<colgroup>
									<col width="130" />
									<col width="617" />
									<col width="181" />
								</colgroup>						
								<tr class="first_row">
									<th><label>구분</label></th>
									<td>
										<label><input id="LogCount" name="LogCount" type="radio" class="radio" value="0" checked="checked" />로그인 ID수</label> 
										<label><input id="LogCount" name="LogCount" type="radio" class="radio" value="1" />총로그인 횟수</label>
									</td>	
									<td class="searchBtn" rowspan="2">
										<button id="btnSearch" class="btnSearch">
											<span class="button-text">Search</span>
										</button>
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
		   			<p id="count" class="subConts" >(0건)</p> 
				 	<div class="btn_common type02">
						<span class="button iconBtn"><button id="btnRefresh">
						<span class="iconRefresh"></span><span class="button-text">초기화</span>
					</button> </span>
							 <span class="button xlsBtn"><button id="btnExcelSave">
					<span class="iconExcelSave"></span><span class="button-text">엑셀다운로드</span>
				</button> </span>
					</div>
					<div class="tb_basic">
						<table id="DAILY_LOGIN_COUNT"></table>
						<div id="pager" class="paging"></div>
					</div>
					<ui:excel-export transactionId="mtr.MTRLOGB#saveDailyLogToExcel" exportFileName="일별로그인현황.xls"/>
				</div>
			</div>	
			<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	
	</div>
</body>
</html>