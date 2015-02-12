<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>권한관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGAUT001.jsp
	 * 화면 설명  : 권한 관리
	 * 작성자        : 강훈기
	 * 작성일        : 2013-09-11
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기		2013-09-11	화면 생성
	 ****************************************************************************************/
	 
	 
	 $(function() {
		$('#RoleList_goSearch').Form({ 
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
				$('#<%=DBNamingConstants.AMS_ROLE%>').AMSSelectBoxInit('abm.CODBBase#pCOD10006', req, 'USE_FLAG', reader);
				
				$.Page.Search_List(1);
			},

			Search_List : function(page) {
				var request = $('#RoleList_goSearch').DataSet();
				$('#<%=DBNamingConstants.AMS_ROLE%>')._clear();
				request.fields.page = page;
				request.fields.page_size = $('#pager').PageSize();
				$.Service({
					transaction : 'abm.AUTBBase#pAUT10001',
					request : request,
					response : '#<%=DBNamingConstants.AMS_ROLE%>',
					success : function(ds) {
						$('#pager').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_ROLE%>);
						$('#count').html('(' + ds.recordSets.<%=DBNamingConstants.AMS_ROLE%>.nc_recordCount + '건)');
						
						$('#<%=DBNamingConstants.AMS_ROLE%> tr').each( function(){	
							var rowid = $(this).attr('id');
							if($(this).attr('id')!==undefined) {
								$('#<%=DBNamingConstants.AMS_ROLE%>').Column(rowid, 'Flag', 'R'); //조회된 모든 행의 flag를 R로 셋팅
							}
						});
						
					}
				});
			},

			// Flag가 'C'일 경우에만 Column이 editable하게 만드는 메서드
			AMSRowEdit : function(<%=DBNamingConstants.AMS_ROLE%>, row, column) {
				if ($('#' + <%=DBNamingConstants.AMS_ROLE%>).Column(row, 'Flag') === 'C')
					$('#' + <%=DBNamingConstants.AMS_ROLE%>).ColProp(column, {
						editable : true
					});
				else
					$('#' + <%=DBNamingConstants.AMS_ROLE%>).ColProp(column, {
						editable : false
					});
				$('#' + <%=DBNamingConstants.AMS_ROLE%>).RowEdit(row, true);
				return this;
			}
		});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#<%=DBNamingConstants.AMS_ROLE%>')._clear();
					$('#RoleList_goSearch').Clear();
					$('#count').html('(' + 0 + '건)');
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
						<%=DBNamingConstants.AMS_ROLE%> : {
							nc_list : []
						}
					}
				};

				// 전체 ROW에 대해서 Save 실행
				$('#<%=DBNamingConstants.AMS_ROLE%> tr').each(function() {
					$('#<%=DBNamingConstants.AMS_ROLE%>').RowSave($(this).attr('id'));
				});

				if (window.confirm("저장하시겠습니까?")) {
					var selrow = $("#<%=DBNamingConstants.AMS_ROLE%>").RecordSet();
					// Flag가 'R'일 경우를 제외하고 ROW가 입력으로 들어감
					for ( var i = 0, j = 0; i < selrow.nc_list.length; i++) {
						if (selrow.nc_list[i].Flag !== 'R') {
							ds.recordSets.<%=DBNamingConstants.AMS_ROLE%>.nc_list[j] = selrow.nc_list[i];
							j++;
						}
					}

					if (ds.recordSets.<%=DBNamingConstants.AMS_ROLE%>.nc_list.length == '0')
						alert("저장 대상 데이터가 없습니다.");
					else {
						$.Service({
							transaction : 'abm.AUTBBase#pAUT10002',
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
				$('#<%=DBNamingConstants.AMS_ROLE%>').Add(myData);

				var addrow = $('#<%=DBNamingConstants.AMS_ROLE%> tr:last').attr('id');
				$('#<%=DBNamingConstants.AMS_ROLE%>').Select(addrow);
				$.Page.AMSRowEdit('<%=DBNamingConstants.AMS_ROLE%>', addrow, 'ROLE_ID');
			}
		});

		// grid 삭제 버튼 클릭
		$('#btnRemove').Button({
			role: 'delete',
			click : function() {
				if (lastsel === undefined) {
					alert("선택된 행이 없습니다.");
				} else {
					var rs = $('#<%=DBNamingConstants.AMS_ROLE%>').RecordSet();
					if (lastsel && lastsel !== '') {
						if ($('#<%=DBNamingConstants.AMS_ROLE%>').Column(lastsel, 'Flag') === 'C') {
							$('#<%=DBNamingConstants.AMS_ROLE%>').Remove(lastsel);
							lastsel = undefined; // 선택된 Row가 없을 때 lastsel을 초기화		
						} else {
							$('#<%=DBNamingConstants.AMS_ROLE%>').Column(lastsel, 'Flag', 'D');
						}
					}
				}
			}
		});

		// Grid생성
		$('#<%=DBNamingConstants.AMS_ROLE%>').Grid({
			columns : [ {
				id : 'Flag',
				title : 'Flag',
				align : 'center',
				width : 50
			}, {
				id : '<%=DBNamingConstants.ROLE_ID%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0025", locale, "Role ID") %>',
				align : 'center',
				sortable : true, //sortable 로 그리드에서 정렬 가능
				editoptions : {
					maxlength : "10"
				},
				editvalid : {
					required : true
				}
			}, {
				id : '<%=DBNamingConstants.ROLE_NAME%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0026", locale, "Role NM") %>',
				align : 'left',
				sortable : true,
				editable : true,
				editoptions : {
					maxlength : "20"
				},
				editvalid : {
					required : true,
					minlength : '1'
				}
			}, {
				id : '<%=DBNamingConstants.DISPLAY_INDEX%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0036", locale, "DP Index") %>',
				align : 'center',
				sorttype : 'int', //기본 sortable 값은 text, sorttype 지정으로 숫자로 정렬 가능 
				sortable : true,
				editable : true,
				editoptions : {
					maxlength : "2"
				},
				editvalid : {
					required : true,
					number : true
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
			}, {
				id : 'Mapping1',
				title : '<%=BaseUtils.getAmsLabelValue("L0062", locale, "Role-Menu") %>',
				width : 150,
				align : 'center',
				formatter : function(value, data) {
					//var a = data.values.ver;
					var span = $('<span class="button gridBtn"><button id="btnGrid1" ROLE_ID='+data.values.ROLE_ID+' ROLE_NAME='+data.values.ROLE_NAME+'><span class="button-icon ui-icon-func-approve"></span><span class="button-text"><%=BaseUtils.getAmsLabelValue("L0065", locale, "Setting") %></span></button></span>');
					var dummy = $('<div/>');
					dummy.append(span);
					return dummy.html();
				}
			}, {
				id : 'Mapping2',
				title : '<%=BaseUtils.getAmsLabelValue("L0063", locale, "Role-Group") %>',
				width : 150,
				align : 'center',
				formatter : function(value, data) {
					//var a = data.values.ver;
					var span = $('<span class="button gridBtn"><button id="btnGrid2" ROLE_ID='+data.values.ROLE_ID+' ROLE_NAME='+data.values.ROLE_NAME+'><span class="button-icon ui-icon-func-approve"></span><span class="button-text"><%=BaseUtils.getAmsLabelValue("L0065", locale, "Setting") %></span></button></span>');
					var dummy = $('<div/>');
					dummy.append(span);
					return dummy.html();
				}
			}
			
			],
			gridvew : true,
			height : 'auto',
			viewrecords : true,
			click : function(row, iRow, iCol, e) {

				if (row) {
					$('#<%=DBNamingConstants.AMS_ROLE%>').RowSave(lastsel);
					$('#<%=DBNamingConstants.AMS_ROLE%>').RowRestore(lastsel); // 이전 edit창 닫기
					$('#<%=DBNamingConstants.AMS_ROLE%>').AMSRowEdit(row, [ '<%=DBNamingConstants.ROLE_ID%>' ]);
					lastsel = row;
				}
			},
			loadComplete : function(data) {
			}
		});
		
		//[설정] 버튼 눌러서 팝업 띄우기 
		$('#<%=DBNamingConstants.AMS_ROLE%>').on('click', 'button', function() {
			var id = $(this).attr('id');
			var url;
			var width;
			if(id === 'btnGrid1'){
				url = 'MNGAUT001P01.jsp';
				width = 1020;
			}else if(id === 'btnGrid2'){
				url = 'MNGAUT001P02.jsp';
				width = 840;
			}else{}
			
			var role_id = $(this).attr('<%=DBNamingConstants.ROLE_ID%>');
			var role_name = $(this).attr('<%=DBNamingConstants.ROLE_NAME%>');
			
			$.Popup({
				url : url,
				center : true,
				width : width,
				height : 680,
				data : {
					'<%=DBNamingConstants.ROLE_ID%>' : role_id,
					'<%=DBNamingConstants.ROLE_NAME%>' : role_name,
					'schData' : $('#MNGAUT001_goSearch').DataSet()
				},
				center : true, //팝업창을 화면 가운데 출력
				modal : true, //팝업창이 띄워졌을 때 메인 화면이 동작하지 않게끔 막아줌
				close : function(data) {
					if (data) {
						$('#'+'<%=DBNamingConstants.AMS_ROLE%>').Clear();
						$('#MNGAUT001_goSearch').DataSet(data);
						$.Page.Search_List(1);
					}
				}
			});
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
					<h1><%=BaseUtils.getAmsLabelValue("L0009", locale, "Role Mgt.") %></h1>
				</div>
					<div class="searchArea">
						<form id="RoleList_goSearch">
							<table class="tb_search">
								<colgroup>
									<col width="130">
									<col width="284">
									<col width="130">
									<col width="284">
									<col width="*">
								</colgroup>
								<tr>
									<th><label for="<%=DBNamingConstants.ROLE_ID%>"><%=BaseUtils.getAmsLabelValue("L0025", locale, "Role ID") %></label></th>
									<td><input id="<%=DBNamingConstants.ROLE_ID%>" type="text" class="input01" />
									</td>
									<th><label for="<%=DBNamingConstants.ROLE_NAME%>"><%=BaseUtils.getAmsLabelValue("L0026", locale, "Role NM") %></label></th>
									<td><input id="<%=DBNamingConstants.ROLE_NAME%>" type="text" class="input01" />
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
						<table id="<%=DBNamingConstants.AMS_ROLE%>"></table>
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
