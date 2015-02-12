<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>모니터링 - 에러로그</title>
<%@include file="/common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MERLOG001.jsp
	 * 화면 설명  : 모니터링 - 에러로그
	 * 작성자      : 
	 * 작성일      : 2013-10-17
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * 
	 ****************************************************************************************/
	$(function() {
		$('#excelExportForm').ExcelExportForm();
		$('#MERLOG001_goSearch').Form({
			//조회 영역 Enter 조회버튼 자동 클릭
			enter: '#btnSearch'
		});
		$('#daterange').DateRange();
		$.Page({
			init: function(){
				var page = $.Page.Data['page'];
				$.Page.Search_List(page || 1);
				
			},
			Search_List: function(page) {
				var request = $('#MERLOG001_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = $('#pager').PageSize();
				$.Page.Data['page'] = request.fields.page;
				
				$.Service({
					transaction: 'asm.FWKBBase#pFWK90002',
					request: request,
					response: '#<%=DBNamingConstants.AMS_ERR_LOG%>',
					success: function(ds) {
						$('#pager').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_ERR_LOG%>);
					
					}
				});
			}
		});
		
		$('#btnExcelSave').Button({
			click: function(){
				$('#excelExportForm').ExcelExport();
			}
		});
		

		//콤보박스
		$('#schKind').Options([
   			{
   				value: '',
   				label: '전체선택'
   			}, {
   				value: 'USER_ID',
   				label: '사용자ID'
   			}, {
   				value: 'GLOB_ID',
   				label: 'GUID'
   			}, {
   				value: 'TRN_CD',
   				label: '거래ID'
   			}, {
   				value: 'RSLT_MSG1',
   				label: '결과메시지1'
   			}, {
				value: 'RSLT_MSG2',
				label: '결과메시지2'
   			}, {
				value: 'RSLT_MSG3',
				label: '결과메시지3'
   			}, {
				value: 'RSLT_MSG4',
				label: '결과메시지4'
   			}, {
				value: 'RSLT_MSG5',
				label: '결과메시지5'
			}
   		]);
		
		
		
		// 초기화 버튼 클릭
		$('#btnRefresh').Button({
			click: function() {
				if(window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#MERLOG001_goSearch').Clear();
					$('#START_DT').Date();
					$('#END_DT').Date();
				}
			}
		});
		
     	// 조회 버튼 클릭
		$('#btnSearch').Button({
			click: function() {
				// 엑셀 폼에 값 맵핑
				if( $('#excelExportForm #START_DT').length > 0 ) {
					$('#excelExportForm #START_DT').Value($('#MERLOG001_goSearch #START_DT').Value());
					$('#excelExportForm #END_DT').Value($('#MERLOG001_goSearch #END_DT').Value());
					$('#excelExportForm #schKind').Value($('#MERLOG001_goSearch #schKind').Value());
					$('#excelExportForm #schWord').Value($('#MERLOG001_goSearch #schWord').Value());
				} else {
					$('#excelExportForm').append(
							$('<input>').attr({
											    type: 'hidden',
											    id: 'START_DT',
											    name: 'START_DT',
											    value:$('#MERLOG001_goSearch #START_DT').Value()
											})
							);
					$('#excelExportForm').append(
							$('<input>').attr({
											    type: 'hidden',
											    id: 'END_DT',
											    name: 'END_DT',
											    value:$('#MERLOG001_goSearch #END_DT').Value()
											})
							);
					$('#excelExportForm').append(
							$('<input>').attr({
											    type: 'hidden',
											    id: 'schKind',
											    name: 'schKind',
											    value:$('#MERLOG001_goSearch #schKind').Value()
											})
							);
					$('#excelExportForm').append(
							$('<input>').attr({
											    type: 'hidden',
											    id: 'schWord',
											    name: 'schWord',
											    value:$('#MERLOG001_goSearch #schWord').Value()
											})
							);
				}
				// 실제 조회
				$.Page.Search_List($.Param('page') || 1);
			}
		});
     	
		
		$('#<%=DBNamingConstants.AMS_ERR_LOG%>').Grid({
			columns: [
				{
					id: 'LOG_DT',
					title: '일시',
					formatter : function(cellvalue, options, rowdata) {
						var rdate = cellvalue.substring(0,4) +'-'+ cellvalue.substring(4,6) +'-'+ cellvalue.substring(6,8); 
						/*  +' '+cellvalue.substring(8,10) +':'+ cellvalue.substring(10,12) */ 
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
					id: 'RSLT_MSG_CD1',
					title: '결과코드1',
					align: 'center',
					width: 100
				}, {
					id: 'RSLT_MSG1',
					title: '결과메시지1',
					align: 'left',
					width: 200
				}, {
					id: 'ERR_PRGM_NM1',
					title: '메소드1',
					align: 'left',
					width: 200
				}, {
					id: 'ERR_PRGM_LN1',
					title: '라인위치1',
					align: 'center',
					width: 70
				}, {
					id: 'RSLT_MSG_CD2',
					title: '결과코드2',
					align: 'center',
					width: 100
				}, {
					id: 'RSLT_MSG2',
					title: '결과메시지2',
					align: 'left',
					width: 200
				}, {
					id: 'ERR_PRGM_NM2',
					title: '메소드2',
					align: 'left',
					width: 200
				}, {
					id: 'ERR_PRGM_LN2',
					title: '라인위치2',
					align: 'center',
					width: 70
				}, {
					id: 'OS_VER',
					title: 'OS 버전',
					align: 'center',
					width: 70
				}, {
					id: 'AGENT_VER',
					title: 'AGENT 버전',
					align: 'center',
					width: 100
				}, {
					id: 'SVC_STRN_DTTM',
					title: '시작일시',
					formatter : function(cellvalue, options, rowdata) {
						var rdate = cellvalue.substring(0,4) +'-'+ cellvalue.substring(4,6) +'-'+ cellvalue.substring(6,8) +' '
									+cellvalue.substring(8,10) +':'+ cellvalue.substring(10,12) +':'+ cellvalue.substring(12,14);
					    return rdate;
					},
					align: 'center',
					hidden: true,
					width: 120
				}, {
					id: 'SVC_END_DTTM',
					title: '종료일시',
					formatter : function(cellvalue, options, rowdata) {
						var rdate = cellvalue.substring(0,4) +'-'+ cellvalue.substring(4,6) +'-'+ cellvalue.substring(6,8) +' '
									+cellvalue.substring(8,10) +':'+ cellvalue.substring(10,12) +':'+ cellvalue.substring(12,14);
					    return rdate;
					},
					align: 'center',
					hidden: true,
					width: 120
				}, {
					id: 'resp_time',
					title: '수행시간(초)',
					align: 'center',
					width : 80
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
							<h1>에러로그</h1>
						</div>
						<div id="tabsheader" class="location">
							<span class="home">Home</span> &gt; 
							<span class="depth01">모니터링</span> &gt; 
							<span class="current">에러로그</span>
						</div>
						<div id="divMain">
							<div class="searchArea">
								<form id="MERLOG001_goSearch">
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
											<th><label for="schKind">검색조건</label></th>
											<td colspan="3">
												<select id="schKind" class="selectFL"></select>
												<input id="schWord" class="input01" type="text"></input>
											</td>
											<td>
												<button id="btnSearch" class="btnSearch">
													<span class="button-text">Search</span>
												</button>
											</td>
										</tr>
									</table>
								</form>
								<form id="excelExportForm">
									<ui:excel-export transactionId="asm.FWKBBase#pFWK90004" exportFileName="에러로그.xls"/>
								</form>
							</div>
							<div class="btn_common">
								<span class="button iconBtn">
									<button id="btnRefresh">
										<span class="iconRefresh"></span>
										<span class="button-text">초기화</span>
									</button> 
								</span>
								<span class="button iconBtn">
									<button id="btnExcelSave">
										<span class="iconExcelSave"></span>
										<span class="button-text">엑셀다운로드</span>
									</button> 
								</span>
							</div>
							<div class="tb_basic">
								<table id="<%=DBNamingConstants.AMS_ERR_LOG%>"></table>
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
