<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>모니터링 - 거래로그</title>
<%@include file="/common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MTRLOG001.jsp
	 * 화면 설명  : 모니터링 - 거래로그
	 * 작성자      : 강훈기
	 * 작성일      : 2013-10-17
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * 
	 ****************************************************************************************/
	$(function() {
		$('#excelExportForm').ExcelExportForm();
		$('#MTRLOG001_goSearch').Form();
		$('#daterange').DateRange();
		$.Page({
			init: function(){
				$.Page.Search_List(1);
			},
			Search_List: function(page) {
				var request = $('#MTRLOG001_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = $('#pager').PageSize();
				
				$.Service({
					transaction: 'asm.FWKBBase#pFWK90001',
					request: request,
					response: '#<%=DBNamingConstants.AMS_TRAN_LOG%>',
					success: function(ds) {
						$('#pager').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_TRAN_LOG%>);
					}
				});
			}
		});
		
		$('#btnExcelSave').Button({
			click: function(){
				if( $('#excelExportForm #START_DT').length > 0 ) {
					$('#excelExportForm #START_DT').Value($('#MTRLOG001_goSearch #START_DT').Value());
					$('#excelExportForm #END_DT').Value($('#MTRLOG001_goSearch #END_DT').Value());
					$('#excelExportForm #schKind').Value($('#MTRLOG001_goSearch #schKind').Value());
					$('#excelExportForm #schWord').Value($('#MTRLOG001_goSearch #schWord').Value());
				} else {
					$('#excelExportForm').append(
							$('<input>').attr({
														    type: 'hidden',
														    id: 'START_DT',
														    name: 'START_DT',
														    value:$('#MTRLOG001_goSearch #START_DT').Value()
														})
							);
					$('#excelExportForm').append(
							$('<input>').attr({
														    type: 'hidden',
														    id: 'END_DT',
														    name: 'END_DT',
														    value:$('#MTRLOG001_goSearch #END_DT').Value()
														})
							);
					$('#excelExportForm').append(
							$('<input>').attr({
											    type: 'hidden',
											    id: 'schKind',
											    name: 'schKind',
											    value:$('#MTRLOG001_goSearch #schKind').Value()
											})
							);
					$('#excelExportForm').append(
							$('<input>').attr({
											    type: 'hidden',
											    id: 'schWord',
											    name: 'schWord',
											    value:$('#MTRLOG001_goSearch #schWord').Value()
											})
							);
				}
				
				$('#excelExportForm').ExcelExport();
			}
		});
		

		// 초기화 버튼 클릭
		$('#btnRefresh').Button({
			click: function() {
				if(window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#<%=DBNamingConstants.AMS_TRAN_LOG%>').Clear();
					$('#START_DT').Date();
					$('#END_DT').Date();
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
				$.Page.Search_List(1);
			}
		});
     	
		
		$('#<%=DBNamingConstants.AMS_TRAN_LOG%>').Grid({
			columns: [
				{
					id: 'LOG_DT',
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
					width: 250
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
					width: 80
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
			height: 'auto',
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
		<%@include file="/common/TopMenu.jsp"%>
		<!-- //headerArea-->

		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="/common/LeftMenu.jsp"%>
			<!-- //leftArea -->

			<div id="contentArea">
				<div id="content">
					<div id="tabs">
						<div class="contTitle">
							<h1>거래로그</h1>
						</div>
						<div id="tabsheader" class="location">
							<span class="home">Home</span> &gt; 
							<span class="depth01">모니터링</span> &gt; 
							<span class="current">거래로그</span>
						</div>
						<div id="divMain">
							<div class="searchArea">
								<form id="MTRLOG001_goSearch">
									<table class="tb_search">
										<colgroup>
											<col width="120" />
											<col width="250" />
											<col width="120" />
											<col width="250" />
											<col width="120" />
										</colgroup>
										<tr>
											<th><label for="daterange">기간</label>
											</th>
											<td>
												<span id="daterange"><input id="START_DT" type="text" class="date01" /> ~ <input id="END_DT" type="text" class="date01" /> </span>
											</td>
											<th><label for="schWord">검색조건</label></th>
											<td colspan="3">
												<select id="schKind" class="selectFL"></select>
												<input id="schWord" type="text" class="input01"></input>
											</td>
											<td class="searchBtn">
												<button id="btnSearch" class="btnSearch">
													<span class="button-text">Search</span>
												</button>
											</td>
										</tr>
									</table>
								</form>
								<form id="excelExportForm">
									<ui:excel-export transactionId="asm.FWKBBase#pFWK90003" exportFileName="거래로그.xls"/>
								</form>
							</div>
							<div class="btn_common">
								<span class="button iconBtn">
									<button id="btnRefresh">
									<span class="iconRefresh"></span>
									<span class="button-text">초기화</span>
								</button> </span> <span class="button iconBtn"><button id="btnExcelSave">
										<span class="iconExcelSave"></span><span class="button-text">엑셀다운로드</span>
									</button> </span>
							</div>
							<div class="tb_basic">
								<table id="<%=DBNamingConstants.AMS_TRAN_LOG %>"></table>
								<div id="pager" class="paging"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="/common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
