<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>금칙어관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGXWD001.jsp
	 * 화면 설명  : 금칙어 관리
	 * 작성자        : 강훈기
	 * 작성일        : 2014-01-03
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기		2014-01-03	화면 생성
	 ****************************************************************************************/
	 
	 
	 $(function() {
		$('#MNGXWD001_goSearch').Form({ 
			enter : '#btnSearch'
		});
		var lastsel; // 마지막으로 선택된 행 ID 
		$.Page({
			init : function() {
				var req = {
						fields : {},
						recordSets : {
							CODE_LIST : {
								nc_list : []
							}
						}
					};
				req.recordSets.CODE_LIST.nc_list.push({
					PARENT_CODE : 'C003',
					INDEX : 0,
					TYPE : 'SYS'
				});
				var reader = {rsname: 'CODE_LIST', value: 'ATTRIBUTE_02', label: 'CODE_NAME'};
				$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').AMSSelectBoxInit('abm.CODBBase#pCOD10006', req, '<%=DBNamingConstants.USE_FLAG%>', reader);
				
				$.Page.Search_List(1);
			},

			Search_List : function(page) {
				var request = $('#MNGXWD001_goSearch').DataSet();
				$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>')._clear();
				request.fields.page = page;
				request.fields.page_size = $('#pager').PageSize();
				$.Service({
					transaction : 'abm.XWDBBase#pXWD10001',
					request : request,
					response : '#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>',
					success : function(ds) {
						$('#pager').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_PROHIBIT_WORD%>);
						
						$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%> tr').each( function(){	
							var rowid = $(this).attr('id');
							if($(this).attr('id')!==undefined) {
								$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').Column(rowid, 'Flag', 'R'); //조회된 모든 행의 flag를 R로 셋팅
							}
						});
						
					}
				});
			},

			// Flag가 'C'일 경우에만 Column이 editable하게 만드는 메서드
			AMSRowEdit : function(<%=DBNamingConstants.AMS_PROHIBIT_WORD%>, row, column) {
				if ($('#' + <%=DBNamingConstants.AMS_PROHIBIT_WORD%>).Column(row, 'Flag') === 'C')
					$('#' + <%=DBNamingConstants.AMS_PROHIBIT_WORD%>).ColProp(column, {
						editable : true
					});
				else
					$('#' + <%=DBNamingConstants.AMS_PROHIBIT_WORD%>).ColProp(column, {
						editable : false
					});
				$('#' + <%=DBNamingConstants.AMS_PROHIBIT_WORD%>).RowEdit(row, true);
				return this;
			}
		});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>')._clear();
					$('#MNGXWD001_goSearch').Clear();
					lastsel = undefined; // 선택된 Row가 없을 때 lastsel을 초기화
				}
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				$.Page.Search_List(1);
				lastsel = undefined; // 선택된 Row가 없을 때 lastsel을 초기화
			}

		});

		// 저장 버튼 클릭
		$('#btnSave').Button({
			role: 'insert',
			click : function() {
				var ds = {
					fields : {},
					recordSets : {
						<%=DBNamingConstants.AMS_PROHIBIT_WORD%> : {
							nc_list : []
						}
					}
				};

				// 전체 ROW에 대해서 Save 실행
				$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%> tr').each(function() {
					$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').RowSave($(this).attr('id'));
				});

				if (window.confirm("저장하시겠습니까?")) {
					var selrow = $("#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>").RecordSet();
					// Flag가 'R'일 경우를 제외하고 ROW가 입력으로 들어감
					for ( var i = 0, j = 0; i < selrow.nc_list.length; i++) {
						if (selrow.nc_list[i].Flag !== 'R') {
							ds.recordSets.<%=DBNamingConstants.AMS_PROHIBIT_WORD%>.nc_list[j] = selrow.nc_list[i];
							j++;
						}
					}

					if (ds.recordSets.<%=DBNamingConstants.AMS_PROHIBIT_WORD%>.nc_list.length == '0')
						alert("저장 대상 데이터가 없습니다.");
					else {
						$.Service({
							transaction : 'abm.XWDBBase#pXWD10002',
							request : ds,
							success : function(page) {
								window.alert('[' + page.message.messageId + '] ' + page.message.messageName);
								$.Page.Search_List(1);
							},
							fail : function(ds) {
								window.alert('[' + ds.message.messageId + '] ' + ds.message.messageName);
								$.Page.Search_List(1);
							}
						});
					}
				}
			}
		});

		// grid 추가 버튼 클릭
		$('#btnAppend').Button({
			role: 'insert',
			click : function() {
				var myData = {
					Flag : 'C'
				};
				$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').Add(myData);

				var addrow = $('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%> tr:last').attr('id');
				$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').Select(addrow);
				$.Page.AMSRowEdit('<%=DBNamingConstants.AMS_PROHIBIT_WORD%>', addrow, '<%=DBNamingConstants.SEQ_NO%>');
			}
		});

		// grid 삭제 버튼 클릭
		$('#btnRemove').Button({
			role: 'delete',
			click : function() {
				if (lastsel === undefined) {
					alert("선택된 행이 없습니다.");
				} else {
					var rs = $('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').RecordSet();
					if (lastsel && lastsel !== '') {
						if ($('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').Column(lastsel, 'Flag') === 'C') {
							$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').Remove(lastsel);
							lastsel = undefined; // 선택된 Row가 없을 때 lastsel을 초기화		
						} else {
							$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').Column(lastsel, 'Flag', 'D');
						}
					}
				}
			}
		});

		// Grid생성
		$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').Grid({
			columns : [ {
				id : 'Flag',
				title : 'Flag',
				align : 'center',
				width : 50
			}, {
				id : '<%=DBNamingConstants.SEQ_NO%>',
				title : 'SEQ_NO',
				align : 'center',
				hidden : true,
				width : 50
			}, {
				id : '<%=DBNamingConstants.PROHIBIT_WORD%>',
				title : '금칙어',
				align : 'center',
				sortable : true, //sortable 로 그리드에서 정렬 가능
				editable : true,
				editoptions : {
					maxlength : "50"
				},
				editvalid : {
					required : true
				}
			}, {
				id : '<%=DBNamingConstants.USE_FLAG%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0037", locale, "Use") %>',
				align : 'center',
				width: 100,
				editable : true,
				edittype : 'select'
			}, {
				id : '<%=DBNamingConstants.REG_USER_ID%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0041", locale, "Reg User") %>',
				align : 'center'
			}, {
				id : '<%=DBNamingConstants.REG_DATE%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0043", locale, "Reg Date") %>',
				align : 'center'
			}],
			gridvew : true,
			height : 'auto',
			viewrecords : true,
			click : function(row, iRow, iCol, e) {
				if (row) {
					$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').RowSave(lastsel);
					$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').RowRestore(lastsel); // 이전 edit창 닫기
					$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').AMSRowEdit(row, [ '<%=DBNamingConstants.SEQ_NO%>' ]);
<%-- 					$('#<%=DBNamingConstants.AMS_PROHIBIT_WORD%>').AMSRowEdit(row, [ '<%=DBNamingConstants.PROHIBIT_WORD%>' ]); --%>
					lastsel = row;
				}
			},
			loadComplete : function(data) {
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
					<h1><%=BaseUtils.getAmsLabelValue("L0081", locale, "ProhibitWord Mgt.") %></h1>
				</div>
					<div class="searchArea">
						<form id="MNGXWD001_goSearch">
							<table class="tb_search">
								<colgroup>
									<col width="130">
									<col width="284">
									<col width="*">
								</colgroup>
								<tr>
									<th><label for="<%=DBNamingConstants.PROHIBIT_WORD%>">금칙어 검색</label></th>
									<td><input id="<%=DBNamingConstants.PROHIBIT_WORD%>" type="text" class="input01" />
									</td>
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
									class="button-text"><%=BaseUtils.getAmsLabelValue("L0054", locale, "Save") %></span>
							</button> 
						</span> 
						<span class="button iconBtn">
							<button id="btnAppend">
								<span class="iconAppend"></span><span class="button-text"><%=BaseUtils.getAmsLabelValue("L0064", locale, "Add") %></span>
							</button> 
						</span> 
						<span class="button iconBtn">
							<button id="btnRemove">
								<span class="iconRemove"></span><span class="button-text"><%=BaseUtils.getAmsLabelValue("L0061", locale, "Remove") %></span>
							</button> 
						</span>
					</div>

					<div class="tb_basic">
						<table id="<%=DBNamingConstants.AMS_PROHIBIT_WORD%>"></table>
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
