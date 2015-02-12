<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>모니터링 - 거래로그</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MTRLOG003.jsp
	 * 화면 설명  : 모니터링 - 거래로그
	 * 작성자      : 
	 * 작성일      : 2013-03-22
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * 
	 ****************************************************************************************/
	$(function() {
		$('#MTRLOG001_goSearch').ExcelExportForm({ // jsp에 선언된 form ID를 바탕으로 excel export form을 선언한다.
			//조회 영역 Enter 조회버튼 자동 클릭
			enter: '#btnSearch'
		});
		$.DateRange('#START_DT', '#END_DT');
		$.Page({
			init: function(){
				$.Page.Search_List($.Param('page') || 1);
				
			},
			Search_List: function(page) {
				var request = $('#MTRLOG001_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = 50;
				$.Page.Data['page'] = request.fields.page;
				
				$.Service({
					transaction: 'mtr.MTRLOGB#selectTrlogList',
					request: request,
					response: '#TRLOG_LIST',
					success: function(ds) {
						$('#pager').RecordSet(ds.recordSets.TRLOG_LIST);
						$('#count').html('(' + ds.recordSets.TRLOG_LIST.nc_totalRecordCount + '건)');
					}
				});
			}
		});
		
		$('#btnExcelSave').Button({
			click: function(){
				$('#MTRLOG001_goSearch').ExcelExport();
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
					//$.DateRange('#START_DT', '#END_DT');
				}	
			}
		});
		
		$('#schKind').Options([
   			{
   				value: '',
   				label: '선택'
   			}, {
   				value: 'USER_ID',
   				label: '사용자ID'
   			}, {
   				value: 'GLOB_ID',
   				label: 'GUID'
   			}, {
   				value: 'TRN_CD',
   				label: '거래ID'
   			}
   		]);
		
     	// 조회 버튼 클릭
		$('#btnSearch').Button({
			click: function() {
				$.Page.Search_List($.Param('page') || 1);
			}
		});
     	
		
		$('#TRLOG_LIST').Grid({
			columns: [
				{
					id: 'SVC_STRN_DTTM',
					title: '일시',
					formatter : function(cellvalue, options, rowdata) {
						var rdate = cellvalue.substring(0,4) +'-'+ cellvalue.substring(4,6) +'-'+ cellvalue.substring(6,8);
					    return rdate;
					},
					align: 'center',
					width: 110
				}, {
					id: 'USER_ID',
					title: '사용자ID',
					align: 'center',
					width: 100
				}, {
					id: 'IPAD',
					title: 'IP',
					align: 'center',
					width: 100,
					hidden: true
				}, {
					id: 'MENU_ID',
					title: '메뉴ID',
					align: 'center',
					width: 70,
					//hidden: true
				}, {
					id: 'GLOB_ID',
					title: 'GUID',
					align: 'left',
					width: 100
				}, {
					id: 'TRN_CD',
					title: '거래ID',
					align: 'left',
					width: 200
				}, {
					id: 'OS_VER',
					title: 'OS 버젼',
					align: 'left',
					width: 80
				}, 	{
					id: 'AGENT_VER',
					title: 'AGENT 버젼',
					align: 'left',
					width: 200
				}, 	{
					id: 'SVC_STRN_DTTM',
					title: '시작일시',
					formatter : function(cellvalue, options, rowdata) {
						var rdate = cellvalue.substring(0,4) +'-'+ cellvalue.substring(4,6) +'-'+ cellvalue.substring(6,8) +' '
									+cellvalue.substring(8,10) +':'+ cellvalue.substring(10,12);
					    return rdate;
					},
					align: 'center',
					width: 120
				}, {
					id: 'SVC_END_DTTM',
					title: '종료일시',
					formatter : function(cellvalue, options, rowdata) {
						var rdate = cellvalue.substring(0,4) +'-'+ cellvalue.substring(4,6) +'-'+ cellvalue.substring(6,8) +' '
									+cellvalue.substring(8,10) +':'+ cellvalue.substring(10,12);
					    return rdate;
					},
					align: 'center',
					width: 120
				}, {
					id: 'resp_time',
					title: '수행시간(초)',
					align: 'center',
					width : 120,
					formatter : 'number',
					formatoptions: {
						decimalSeparator: '.',
						decimalPlaces: 3
					}
					
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
				<div id="content">
				<div class="contTitle">
					<h1>거래로그</h1>
				</div>
					<div class="searchArea close">
						<form id="MTRLOG001_goSearch">
							<table class="tb_search">
								<colgroup>
									<col width="120" />
									<col width="181" />
									<col width="120" />
									<col width="378" />
								</colgroup>
								<tr class="first_row">
									<th><label for="START_DT">시작날짜</label>
									</th>
									<td><input id="START_DT" type="text" class="input01 date01" />
									</td>
									<th><label for="END_DT">종료날짜</label>
									</th>
									<td><input id="END_DT" type="text" class="input01 date01" />
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
							<!-- <span class="button iconBtn">
							<button id="btnExcelServerSave" role="button" aria-disabled="false">
								<span class="iconExcelSave"></span><span class="ui-button-text">Excel Export</span>
							</button>
						</span> -->
					</div>
					<div class="tb_basic">
						<table id="TRLOG_LIST"></table>
						<div id="pager" class="paging"></div>
					</div>
					<ui:excel-export transactionId="mtr.MTRLOGB#saveMTRLogToExcel" exportFileName="거래로그.xls"/>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
