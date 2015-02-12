<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>공지사항 관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGNTC001.jsp
	 * 화면 설명  : 공지사항 관리
	 * 작성자        : 강훈기
	 * 작성일        : 2013-11-01
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기		2013-11-01	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGNTC001_goSearch').Form({
			enter : '#btnSearch' //검색시 엔터키 처리 
		});
		
		$('#dateRange').DateRange();

		$.Page({
			init : function() {
				var page = $.Page.Data['page'];
				$.Page.Search_List(page || 1);
			},

			Search_List : function(page) {
				var request = $('#MNGNTC001_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = $('#pager').PageSize();

				$.Page.Data['page'] = request.fields.page;
				
				$.Service({
					transaction : 'abm.INFBBase#pINF30001',
					request : request,
					response : '#'+'<%=DBNamingConstants.AMS_NOTICE%>',
					success : function(ds) {
						$('#pager').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_NOTICE%>);
					}
				});
			}
		});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#'+'<%=DBNamingConstants.AMS_NOTICE%>')._clear();
					$('#MNGNTC001_goSearch').Clear();
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
				var schData = $('#MNGNTC001_goSearch').DataSet();
				schData.fields.page = $.Page.Data['page'];
				$.Popup({
					url : 'MNGNTC001P01.jsp',
					center : true,
					modal : true,
					width : 770,
					height : 790,
					scroll : true,
					data : {
						'page' : $.Page.Data['page'],
						'schData' : $('#MNGNTC001_goSearch').DataSet()
					},
					close : function(data) {
						if (data === undefined || data === null) {
							
						}else{
							$('#'+'<%=DBNamingConstants.AMS_NOTICE%>').Clear();
							$('#MNGNTC001_goSearch').DataSet(data);
							var page = data.fields.page;
							$.Page.Search_List(page || 1);
						}
					}
				});
			}
		});

		$('#<%=DBNamingConstants.AMS_NOTICE%>').Grid({
			columns : [{
				id : '<%=DBNamingConstants.NOTICE_SEQ_NO%>',
				title : 'NO',
				align : 'center',
				width : 40
			}, {
				id : '<%=DBNamingConstants.NOTICE_DT%>',
				title : '공지사항<br/>날짜',
				align : 'center',
				width : 80
			}, {
				id : '<%=DBNamingConstants.TITLE%>',
				title : '제목',
				sortable : true,
				align : 'center',
				width : 250
			}, {
				id : '<%=DBNamingConstants.VIEW_START_DT%>',
				title : '공지시작일',
				align : 'center',
				width : 80
			}, {
				id : '<%=DBNamingConstants.VIEW_END_DT%>',
				title : '공지종료일',
				align : 'center',
				width : 80
			}, {
				id : '<%=DBNamingConstants.NOTICE_HTML_FILE%>',
				title : '연결URI',
				sortable : true,
				align : 'center',
				width : 250
			}, {
				id : '<%=DBNamingConstants.POP_UP_WSIZE%>',
				title : '팝업<br/>가로사이즈',
				sortable : true,
				align : 'center',
				width : 70
			}, {
				id : '<%=DBNamingConstants.POP_UP_HSIZE%>',
				title : '팝업<br/>세로사이즈',
				sortable : true,
				align : 'center',
				width : 70
			}, {
				id : '<%=DBNamingConstants.CONTENTS%>',
				title : '내용',
				sortable : true,
				hidden : true
			}],
			height : 'auto',
			viewrecords : true,
			scrollOffset : 0,
			click : function(row, iRow, iCol, e) {
				if (row) {
					var record = $('#'+'<%=DBNamingConstants.AMS_NOTICE%>').Records();
					var data = record[row-1];
					var schData = $('#MNGNTC001_goSearch').DataSet();
					schData.fields.page = $.Page.Data['page'];
					$.Popup({
						url : 'MNGNTC001P02.jsp',
						center : true,
						modal : true,
						width : 770,
						height : 790,
						scroll : true,
						data : {
							'data' : data,
							'schData' : schData
						},
						close : function(data) {
							if (data === undefined || data === null) {
								
							}else{
								$('#'+'<%=DBNamingConstants.AMS_NOTICE%>').Clear();
								$('#MNGNTC001_goSearch').DataSet(data);
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
					<h1>공지사항 관리</h1>
				</div>
				<div class="searchArea">
					<form id="MNGNTC001_goSearch">
						<table class="tb_search">
							<colgroup>
								<col width="80" />
								<col width="284" />
<!-- 								<col width="80" /> -->
<!-- 								<col width="284" /> -->
								<col width="*" />
							</colgroup>
							<tr>
								<th><label for="schKind">검색</label></th>
								<td>
									<select id="schKind">
										<option value="ALL">전체</option>
										<option value="TITLE">제목</option>
										<option value="CONTENTS">내용</option>
									</select>
									<input id="schWord" type="text" class="input01"/>
								</td>
<!-- 								<th><label for="dateRange">공지기간</label></th> -->
<!-- 								<td> -->
<!-- 									<span id="dateRange"> -->
<!-- 										<input id="START_DT" type="text" class="date01" /> ~ <input id="END_DT" type="text" class="date01" /> -->
<!-- 									</span> -->
<!-- 								</td> -->
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
					<table id="<%=DBNamingConstants.AMS_NOTICE%>"></table>
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
