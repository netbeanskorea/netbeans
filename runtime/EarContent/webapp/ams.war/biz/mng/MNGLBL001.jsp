<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>레이블 관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGLBL001.jsp
	 * 화면 설명  : 레이블 관리
	 * 작성자        : 강훈기
	 * 작성일        : 2013-09-04
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기	2013-09-04	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGLBL001_goSearch').Form({
			enter : '#btnSearch' //검색시 엔터키 처리 
		});

		$.Page({
			init : function() {
				var page = $.Page.Data['page'];
// 				var test = $.Page.Data['page'] : 'null';
				$.Page.Search_List(page || 1);
				$.CodeHelper([{
				     divId: 'd_select', // 코드가 생성될 DIV
				     parentCode: 'C009',        // 부모 Code ID (해당 부모코드의 자식코드에 대해서 객체 생성)
				     codeId: '<%=DBNamingConstants.LOCALE_ID%>',    // 생성될 객체의 ID
				     style: 'select',           // radio, checkbox
				     blankLabel : '<%=BaseUtils.getAmsLabelValue("L0059", locale, "==전체==") %>',           // select시 초기화용
				     codeValueId : 'ATTRIBUTE_03',
				     func: function() {         // select change 시 사용되는 함수
				           $.Page.Search_List(1);
				     }
				}],
				function() {
					$('#<%=DBNamingConstants.MENU_CATEGORY%>').Value("BIZ");
					$.Page.Search_List(1);
				});
				
			},

			Search_List : function(page) {
				var request = $('#MNGLBL001_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = $('#pager').PageSize();

				$.Page.Data['page'] = request.fields.page;
				
				$.Service({
					transaction : 'abm.LBLBBase#pLBL10001',
					request : request,
					response : '#'+'<%=DBNamingConstants.AMS_LABEL%>',
					success : function(ds) {
						$('#<%=DBNamingConstants.AMS_LABEL%>').RowMerge('<%=DBNamingConstants.LABEL_ID%>');
						$('#pager').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_LABEL%>);
					}
				});
			}
		});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#'+'<%=DBNamingConstants.AMS_LABEL%>')._clear();
					$('#MNGLBL001_goSearch').Clear();
				}
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				$.Page.Search_List(1);
			}
		});

		// 등록 버튼 클릭
		$('#btnSave').Button({
			role: 'insert',
			click : function() {
				var schData = $('#MNGLBL001_goSearch').DataSet();
				schData.fields.page = $.Page.Data['page'];
				$.Popup({
					url : 'MNGLBL001P01.jsp',
					center : true,
					modal : true,
					width : 565,
					height : 550,
					data : {
						'page' : $.Page.Data['page'],
						'schData' : $('#MNGLBL001_goSearch').DataSet()
					},
					close : function(data) {
						if (data === undefined || data === null) {
							
						}else{
							$('#'+'<%=DBNamingConstants.AMS_LABEL%>').Clear();
							$('#MNGLBL001_goSearch').DataSet(data);
							var page = data.fields.page;
							$.Page.Search_List(page || 1);
						}
					}
				});
			}
		});

		$('#AMS_LABEL').Grid({
			columns : [{
				id : '<%=DBNamingConstants.LABEL_ID%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0057", locale, "Label ID") %>',
				sortable : true,
				align : 'center',
				width : 150
			}, {
				id : '<%=DBNamingConstants.LOCALE_ID%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0039", locale, "Locale") %>',
				sortable : true,
				align : 'center',
				width : 200
			}, {
				id : '<%=DBNamingConstants.LABEL_NAME%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0058", locale, "Label Name") %>',
				sortable : true,
				align : 'center',
				width : 250
			}, {
				id : '<%=DBNamingConstants.REG_USER_ID%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0041", locale, "Reg User") %>',
				align : 'center',
				width : 100
			}, {
				id : '<%=DBNamingConstants.REG_DATE%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0043", locale, "Reg Date") %>',
				align : 'center',
				width : 150
			}],
			height : 'auto',
			viewrecords : true,
			scrollOffset : 0,
			click : function(row, iRow, iCol, e) {
				if (row) {
					var data = $('#'+'<%=DBNamingConstants.AMS_LABEL%>').RecordSet().nc_list;
					var label_id = data[row-1].<%=DBNamingConstants.LABEL_ID%>;
					var schData = $('#MNGLBL001_goSearch').DataSet();
					schData.fields.page = $.Page.Data['page'];
					$.Popup({
						url : 'MNGLBL001P02.jsp',
						center : true,
						modal : true,
						width : 565,
						height : 550,
						data : {
							'<%=DBNamingConstants.LABEL_ID%>' : label_id,		
							'schData' : schData
						},
						close : function(data) {
							if (data === undefined || data === null) {
								
							}else{
								$('#'+'<%=DBNamingConstants.AMS_LABEL%>').Clear();
								$('#MNGLBL001_goSearch').DataSet(data);
								var page = data.fields.page;
								$.Page.Search_List(page || 1);
							}
						}
					});
				}
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
				<div class="contTitle">
					<h1><%=BaseUtils.getAmsLabelValue("L0060", locale, "Label Mgt.") %></h1>
				</div>
				<div class="searchArea">
					<form id="MNGLBL001_goSearch">
						<table class="tb_search">
							<colgroup>
								<col width="80" />
								<col width="160" />
								<col width="80" />
								<col width="160" />
								<col width="80" />
								<col width="80" />
								<col width="90" />
							</colgroup>
							<tr>
								<th><label for="<%=DBNamingConstants.LABEL_ID%>"><%=BaseUtils.getAmsLabelValue("L0057", locale, "Label ID") %></label></th>
								<td><input id="<%=DBNamingConstants.LABEL_ID%>" class="input01" type="text"
									maxlength="20" /></td>
								<th><label for="<%=DBNamingConstants.LABEL_NAME%>"><%=BaseUtils.getAmsLabelValue("L0058", locale, "Label Name") %></label></th>
								<td><input id="<%=DBNamingConstants.LABEL_NAME%>" class="input01" type="text"
									maxlength="20" /></td>
								<th><label for="<%=DBNamingConstants.LOCALE_ID%>"><%=BaseUtils.getAmsLabelValue("L0039", locale, "Locale") %></label></th>
								<td><div = id="d_select"></div></td>
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
								class="button-text"><%=BaseUtils.getAmsLabelValue("L0013", locale, "Init") %></span>
						</button>
					</span> 
					<span class="button iconBtn">
						<button id="btnSave">
							<span class="button-icon ui-icon-func-save"></span> <span
								class="button-text"><%=BaseUtils.getAmsLabelValue("L0014", locale, "Register") %></span>
						</button>
					</span>
				</div>
				<div class="tb_basic">
					<table id="<%=DBNamingConstants.AMS_LABEL%>"></table>
					<div id="pager" class="paging"></div>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
