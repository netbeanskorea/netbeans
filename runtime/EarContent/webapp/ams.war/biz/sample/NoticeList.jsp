<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<title>공지사항</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : NoticeList.jsp
	 * 화면 설명  : Notice
	 * 작성자        : 이진희
	 * 작성일        : 2012-11-12
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	이진희	2012-11-12	화면 생성(CSS 제외함)
	 ****************************************************************************************/
	$(function() {
		$('#BOARD_LIST').Grid({
			columns: [
				{
					id: 'SEQ_NO',
					title: '번호',
					sortable: true,
					align: 'center',
					width: 100,
				    formatter: function(value,data) {
				    	return '<a href="NoticeDetail.jsp?SEQ_NO='+$.ParamEncode(data.values.SEQ_NO) + '&schKind='+$.ParamEncode($.Page.Data['schKind']) + '&schWord='+$.ParamEncode($.Page.Data['schWord']) + '&page='+$.ParamEncode($.Page.Data['page']) +'">'+value+'</a>';
				    }
			
				}, {
					id: 'TITLE',
					title: '제목',
					width: 438,
				    formatter: function(value,data) {
				    	return '<a href="NoticeDetail.jsp?SEQ_NO='+$.ParamEncode(data.values.SEQ_NO) + '&schKind='+$.ParamEncode($.Page.Data['schKind']) + '&schWord='+$.ParamEncode($.Page.Data['schWord']) + '&page='+$.ParamEncode($.Page.Data['page']) +'">'+value+'</a>';
				    }

				}, {
					id: 'REG_USER_ID',
					title: '작성자',
					width: 100
				}, {
					id: 'REG_DATE',
					title: '작성일',
					width: 150
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
		$.Page({
			init: function() {
				if($.Param('schKind'))
					$('#schKind').Value($.Param('schKind'));
				if($.Param('schWord'))
					$('#schWord').Value($.Param('schWord'));
				$.Page.Search($.Param('page') || 1, true);
			},
			Search: function(p, v) {
				var func = function() {
					var request = $('#searchForm').DataSet();
					request.fields.page = p;
					request.fields.page_size = 10;

					$.Page.Data['schKind'] = request.fields.schKind;
					$.Page.Data['schWord'] = request.fields.schWord;
					$.Page.Data['page'] = request.fields.page;

					$.Service({
						transaction: 'brd.BRDBBase#pBRD10001',
						request: request,
						response: '#BOARD_LIST',
						success: function(ds) {
							console.log(ds);
							$('#pager').RecordSet(ds.recordSets.BOARD_LIST);
						}
					});
				};

				if(!v)
					$('#searchForm').Validate(func);
				else
					func();
			}
		});

		$('#btnSearch').Button({
			click: function() {
				$.Page.Search(1);
			}
		});

 		$('#searchForm').Form({
			validation: {
				/* schKind: {
					required: true
				}, 
				schWord: {
					required:true
				}*/
			}
		});
		
		
		
		$('#pager').Pager({
			click: function(page) {
				$.Page.Search(page);
			}
		});

		$('#btnSave').Button({
			click: function() {
				$.Navigate('NoticeIns.jsp', {
					schKind: $.Page.Data['schKind'],
					schWord: $.Page.Data['schWord'],
					page: $.Page.Data['page']
				});
			}
		});
		
		//엑셀 Export를 하는 경우에는 반드시 form을 하나 생성하여 아래와 같이 정의해주어야 한다. 
		$('#export-form').ExcelExportForm();
		$('#btnExcelExport').Button({
			click:function() {
				$('#export-form').ExcelExport();
			}
		});
		$('#import-form').ExcelImportForm();
		$('#btnExcelImport').Button({
			click:function() {
				$('#j_file').click();
			}
		});
		$('#j_file').bind('change', function(e, d) {
			if (!$('#j_file').val()) {
				return;
			}

			$('#import-form').Service(function(data) {
				var req_ds = {fields: {}, recordSets: {EXCEL_LIST: {nc_list: data}}};//nc_list변수명은 절대변경금지
				
				$.Service({
					transaction: 'api.APIBBase#pAPI00102',
					request: req_ds, // $('#form').DataSet()
					success: function(ds) {
					    window.alert(ds.message.messageName);
					}
				});
			});
		});
	});
</script>
</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="../../common/TopMenu.jsp"%>
		<!-- //headerArea-->

		<div id="wrapper"  class="clearfix">
			<!-- //leftArea -->
			<%@include file="../../common/LeftMenu.jsp"%>
			<!-- //leftArea -->

			<div id="contentArea">
				<div class="contTitle">
					<h1>Notice</h1>
				</div>
				<form id="searchForm">
					<input id="page" value="1" type="hidden" /> <input id="page_size" value="10" type="hidden" />
				</form>
				
				<!-- Form태그 안에 ui:excel-export태그를 이용하여 정의하도록 한다.  -->
				<form id="export-form">
					<ui:excel-export exportFileName="게시판목록.xls" transactionId="api.APIBBase#pAPI00101"/>
				</form>
				
				<!-- Form태그 안에 ui:upload를 이용하여 정의하도록 한다 -->
				<form id="import-form">
					<ui:upload/>
				</form>
				
				<div class="tb_basic">
					<table id="BOARD_LIST"></table>
					<div id="pager" class="paging"></div>
				</div>
				<div class="btn_common">
					<span class="button iconBtn">
					<button id="btnSave">
						<span class="button-icon ui-icon-func-save"></span> <span
							class="button-text">등록</span>
					</button> 
					<button id="btnExcelExport">
						<span class="button-icon ui-icon-func-save"></span> <span
							class="button-text">엑셀Export</span>
					</button> 
					<button id="btnExcelImport">
						<span class="button-icon ui-icon-func-save"></span> <span
							class="button-text">엑셀Import</span>
					</button> </span>
				</div>
			</div>

		</div>
		<!-- //leftArea -->
			<%@include file="/common/Footer.jsp"%>
			<!-- //leftArea -->
	</div>
</body>
</html>