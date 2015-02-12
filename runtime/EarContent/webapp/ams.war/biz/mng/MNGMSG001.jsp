<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>메시지 관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGMSG001.jsp
	 * 화면 설명  : 메시지 관리
	 * 작성자        : 강훈기
	 * 작성일        : 2013-09-04
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기	2013-09-04	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGMSG001_goSearch').Form({
			enter : '#btnSearch' //검색시 엔터키 처리 
		});

		$.Page({
			init : function() {
				var page = $.Page.Data['page'];
				
				$.Page.Search_List(page || 1);
			},

			Search_List : function(page) {
				var request = $('#MNGMSG001_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = $('#pager').PageSize();

				$.Page.Data['page'] = request.fields.page;
				
				$.Service({
					transaction : 'abm.MSGBBase#pMSG10001',
					request : request,
					response : '#'+'<%=DBNamingConstants.AMS_MESSAGE%>',
					success : function(ds) {
						console.log(ds);
						$('#pager').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_MESSAGE%>);
					}
				});
			}
		});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#'+'<%=DBNamingConstants.AMS_MESSAGE%>')._clear();
					$('#MNGMSG001_goSearch').Clear();
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
				var schData = $('#MNGMSG001_goSearch').DataSet();
				schData.fields.page = $.Page.Data['page'];
				$.Popup({
					url : 'MNGMSG001P02.jsp',
					center : true,
					modal : true,
					width : 565,
					height : 400,
					data : {
						'page' : $.Page.Data['page'],
						'schData' : $('#MNGMSG001_goSearch').DataSet()
					},
					close : function(data) {
						if (data === undefined || data === null) {
							
						}else{
							$('#'+'<%=DBNamingConstants.AMS_MESSAGE%>').Clear();
							$('#MNGMSG001_goSearch').DataSet(data);
							var page = data.fields.page;
							$.Page.Search_List(page || 1);
						}
					}
				});
			}
		});

		$('#AMS_MESSAGE').Grid({
			columns : [{
				id : '<%=DBNamingConstants.MESSAGE_ID%>',
				title : '메시지ID',
				sortable : true,
				align : 'center',
				width : 80
			}, {
				id : '<%=DBNamingConstants.MESSAGE_NAME%>',
				title : '메시지명',
				width : 250,
				sortable : true
			}, {
				id : '<%=DBNamingConstants.MESSAGE_TYPE%>',
				title : '유형',
				sortable : true,
				align : 'center',
				width : 50
			}, {
				id : '<%=DBNamingConstants.REG_USER_ID%>',
				title : '등록자',
				align : 'center',
				width : 100
			}, {
				id : '<%=DBNamingConstants.REG_DATE%>',
				title : '등록일',
				align : 'center',
				width : 150
			}, {
				id : '<%=DBNamingConstants.USE_FLAG%>',
				title : '사용여부',
				align : 'center',
				width : 100
			}, {
				id : '<%=DBNamingConstants.LOCALE_ID%>',
				title : '언어',
				align : 'center',
				hidden : true
			}],
			height : 'auto',
			viewrecords : true,
			scrollOffset : 0,
			click : function(row, iRow, iCol, e) {
				if (row) {
					var data = $('#'+'<%=DBNamingConstants.AMS_MESSAGE%>').getRowData(row);
					var schData = $('#MNGMSG001_goSearch').DataSet();
					schData.fields.page = $.Page.Data['page'];
					$.Popup({
						url : 'MNGMSG001P01.jsp',
						center : true,
						modal : true,
						width : 565,
						height : 400,
						data : {
							'<%=DBNamingConstants.MESSAGE_ID%>' : data.<%=DBNamingConstants.MESSAGE_ID%>,		
							'<%=DBNamingConstants.LOCALE_ID%>' : data.<%=DBNamingConstants.LOCALE_ID%>,
							'schData' : schData
						},
						close : function(data) {
							if (data === undefined || data === null) {
								
							}else{
								$('#'+'<%=DBNamingConstants.AMS_MESSAGE%>').Clear();
								$('#MNGMSG001_goSearch').DataSet(data);
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
					<h1>메시지 관리</h1>
				</div>
				<div class="searchArea">
					<form id="MNGMSG001_goSearch">
						<table class="tb_search">
							<colgroup>
								<col width="130" />
								<col width="284" />
								<col width="130" />
								<col width="284" />
								<col width="110" />
							</colgroup>
							<tr>
								<th><label for="<%=DBNamingConstants.MESSAGE_ID%>">메시지ID</label></th>
								<td><input id="<%=DBNamingConstants.MESSAGE_ID%>" class="input01" type="text"
									maxlength="20" /></td>
								<th><label for="<%=DBNamingConstants.MESSAGE_NAME%>">메시지명</label></th>
								<td><input id="<%=DBNamingConstants.MESSAGE_NAME%>" class="input01" type="text"
									maxlength="20" /></td>
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
								class="button-text">초기화</span>
						</button>
					</span> 
					<span class="button iconBtn">
						<button id="btnSave">
							<span class="button-icon ui-icon-func-save"></span> <span
								class="button-text">등록</span>
						</button>
					</span>
				</div>
				<div class="tb_basic">
					<table id="<%=DBNamingConstants.AMS_MESSAGE%>"></table>
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
