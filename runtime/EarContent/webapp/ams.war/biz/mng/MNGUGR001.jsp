<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>사용자그룹 관리</title>
<%@include file="../../common/common.jsp"%>
<script> 
	/*****************************************************************************************
	 * 화면 이름  : MNGUGR001.jsp
	 * 화면 설명  : 사용자그룹 관리
	 * 작성자        : 강훈기
	 * 작성일        : 2013-09-26
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기		2013-09-26	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGUGR001_goSearch').Form({
			enter : '#btnSearch' //검색시 엔터키 처리 
		});

		var lastsel;
		
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
				$('#<%=DBNamingConstants.AMS_GROUP%>').AMSSelectBoxInit('abm.CODBBase#pCOD10006', req, 'USE_FLAG', reader);
				
				$.Page.Search_List(1);
			},

			Search_List : function(page) {
				var request = $('#MNGUGR001_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = $('#pager').PageSize();;
				
				$.Service({
					transaction : 'abm.UGRBBase#pUGR10001',
					request : request,
					response : '#'+'<%=DBNamingConstants.AMS_GROUP%>',
					success : function(ds) {
						$('#pager').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_GROUP%>);
						$('#<%=DBNamingConstants.AMS_GROUP%> tr').each( function(){	
							var rowid = $(this).attr('id');
							if($(this).attr('id')!==undefined) {
								$('#<%=DBNamingConstants.AMS_GROUP%>').Column(rowid, 'Flag', 'R'); //조회된 모든 행의 flag를 R로 셋팅
							}
						});
					}
				});
			},

			// Flag가 'C'일 경우에만 Column이 editable하게 만드는 메서드
			AMSRowEdit : function(AMS_GROUP, row, column) {
				if ($('#' + AMS_GROUP).Column(row, 'Flag') === 'C')
					$('#' + AMS_GROUP).ColProp(column, {
						editable : true
					});
				else
					$('#' + AMS_GROUP).ColProp(column, {
						editable : false
					});
				$('#' + AMS_GROUP).RowEdit(row, true);
				return this;
			}
		});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#'+'<%=DBNamingConstants.AMS_GROUP%>')._clear();
					$('#MNGUGR001_goSearch').Clear();
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

		// 등록 버튼 클릭
		$('#btnSave').Button({
// 			role: 'insert',
			click : function() {
				var ds = {
						fields : {},
						recordSets : {
							AMS_GROUP : {
								nc_list : []
							}
						}
					};
				// 전체 ROW에 대해서 Save 실행
				$('#<%=DBNamingConstants.AMS_GROUP%> tr').each(function() {
					$('#<%=DBNamingConstants.AMS_GROUP%>').RowSave($(this).attr('id'));
				});

				if (window.confirm("저장하시겠습니까?")) {
					var selrow = $("#<%=DBNamingConstants.AMS_GROUP%>").RecordSet();
					// Flag가 'R'일 경우를 제외하고 ROW가 입력으로 들어감
					var len = selrow.nc_list.length;
					for ( var i = 0, j = 0; i < len; i++) {
						if (selrow.nc_list[i].Flag !== 'R') {
							ds.recordSets.<%=DBNamingConstants.AMS_GROUP%>.nc_list[j] = selrow.nc_list[i];
							j++;
						}
					}

					if (ds.recordSets.<%=DBNamingConstants.AMS_GROUP%>.nc_list.length == '0')
						alert("저장 대상 데이터가 없습니다.");
					else {
						$.Service({
							transaction : 'abm.UGRBBase#pUGR10002',
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
				$('#<%=DBNamingConstants.AMS_GROUP%>').Add(myData);

				var addrow = $('#<%=DBNamingConstants.AMS_GROUP%> tr:last').attr('id');
				$('#<%=DBNamingConstants.AMS_GROUP%>').Select(addrow);
				$.Page.AMSRowEdit('<%=DBNamingConstants.AMS_GROUP%>', addrow, '<%=DBNamingConstants.GROUP_ID%>');
			}
		});

		// grid 삭제 버튼 클릭
		$('#btnRemove').Button({
			role: 'delete',
			click : function() {
				if (lastsel === undefined) {
					alert("선택된 행이 없습니다.");
				} else {
					var rs = $('#<%=DBNamingConstants.AMS_GROUP%>').RecordSet();
					if (lastsel && lastsel !== '') {
						if ($('#<%=DBNamingConstants.AMS_GROUP%>').Column(lastsel, 'Flag') === 'C') {
							$('#<%=DBNamingConstants.AMS_GROUP%>').Remove(lastsel);
							lastsel = undefined; // 선택된 Row가 없을 때 lastsel을 초기화		
						} else {
							$('#<%=DBNamingConstants.AMS_GROUP%>').Column(lastsel, 'Flag', 'D');
						}
					}
				}
			}
		});

		$('#<%=DBNamingConstants.AMS_GROUP%>').Grid({
			columns : [{
				id : 'Flag',
				title : 'Flag',
				align : 'center',
				width : 50
			}, {
				id : '<%=DBNamingConstants.GROUP_ID%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0021", locale, "Group ID") %>',
				sortable : true,
				align : 'center',
				width : 200,
				editoptions : {
					maxlength : "10"
				},
				editvalid : {
					required : true
				}
			}, {
				id : '<%=DBNamingConstants.GROUP_NAME%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0022", locale, "Group NM") %>',
				width : 175,
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
				id : '<%=DBNamingConstants.GROUP_NAME_EN%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0073", locale, "Group Name_EN") %>',
				width : 200,
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
				width : 100,
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
				width : 100,
				editable : true,
				edittype : 'select'
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
			}, {
				id : 'Mapping1',
				title : '<%=BaseUtils.getAmsLabelValue("L0070", locale, "Group-User") %>',
				width : 120,
				align : 'center',
				formatter : function(value, data) {
					//var a = data.values.ver;
					var span = $('<span class="button gridBtn"><button id="btnGrid1" GROUP_ID='+data.values.<%=DBNamingConstants.GROUP_ID%>+'><span class="button-icon ui-icon-func-approve"></span><span class="button-text"><%=BaseUtils.getAmsLabelValue("L0065", locale, "Setting") %></span></button></span>');
					var dummy = $('<div/>');
					dummy.append(span);
					return dummy.html();
				}
			}, {
				id : 'Mapping2',
				title : '<%=BaseUtils.getAmsLabelValue("L0071", locale, "Group-Role") %>',
				width : 120,
				align : 'center',
				formatter : function(value, data) {
					//var a = data.values.ver;
					var span = $('<span class="button gridBtn"><button id="btnGrid2" GROUP_ID='+data.values.<%=DBNamingConstants.GROUP_ID%>+'><span class="button-icon ui-icon-func-approve"></span><span class="button-text"><%=BaseUtils.getAmsLabelValue("L0065", locale, "Setting") %></span></button></span>');
					var dummy = $('<div/>');
					dummy.append(span);
					return dummy.html();
				}
			}],
			height : 'auto',
			viewrecords : true,
			scrollOffset : 0,
			click : function(row, iRow, iCol, e) {
				if (row) {
					$('#<%=DBNamingConstants.AMS_GROUP%>').RowSave(lastsel);
					$('#<%=DBNamingConstants.AMS_GROUP%>').RowRestore(lastsel); // 이전 edit창 닫기
					$('#<%=DBNamingConstants.AMS_GROUP%>').AMSRowEdit(row, [ '<%=DBNamingConstants.GROUP_ID%>' ]);
					lastsel = row;
				}
			}
		});

		$('#pager').Pager({
			page_size: 50,
			selectBoxLong: true,
			click : function(page) {
				$.Page.Search_List(page || 1);
			}
		});
		
		//[설정] 버튼 눌러서 팝업 띄우기 
		$('#<%=DBNamingConstants.AMS_GROUP%>').on('click', 'button', function() {
			var id = $(this).attr('id');
			var url;
			if(id === 'btnGrid1'){
				url = 'MNGUGR001P01.jsp';
			}else if(id === 'btnGrid2'){
				url = 'MNGUGR001P02.jsp'
			}else{}
			var group_id = $(this).attr('<%=DBNamingConstants.GROUP_ID%>');

			$.Popup({
				url : url,
				center : true,
				width : 800,
				height : 660,
				data : {
					'<%=DBNamingConstants.GROUP_ID%>' : group_id,
					'schData' : $('#MNGMNU001_goSearch').DataSet()
				},
				center : true, //팝업창을 화면 가운데 출력
// 				modal : true, //팝업창이 띄워졌을 때 메인 화면이 동작하지 않게끔 막아줌
				close : function(data) {
					if (data) {
						$('#'+'<%=DBNamingConstants.AMS_GROUP%>').Clear();
						$('#MNGUGR001_goSearch').DataSet(data);
						$.Page.Search_List(1);
					}
				}
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
		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="../../common/LeftMenu.jsp"%>
			<!-- //leftArea -->
			<div id="contentArea">
				<div class="contTitle">
					<h1><%=BaseUtils.getAmsLabelValue("L0006", locale, "Group Mgt.") %></h1>
				</div>
					<div class="searchArea">
						<form id="MNGUGR001_goSearch">
							<table class="tb_search">
								<colgroup>
									<col width="130">
									<col width="284">
									<col width="130">
									<col width="284">
									<col width="110">
								</colgroup>
								<tr>
									<th><label for="<%=DBNamingConstants.GROUP_ID%>"><%=BaseUtils.getAmsLabelValue("L0021", locale, "Group ID") %></label></th>
									<td><input id="<%=DBNamingConstants.GROUP_ID%>" class="input01" type="text"
										maxlength="20" /></td>
									<th><label for="<%=DBNamingConstants.GROUP_NAME%>"><%=BaseUtils.getAmsLabelValue("L0022", locale, "Group Name") %></label></th>
									<td><input id="<%=DBNamingConstants.GROUP_NAME%>" class="input01" type="text"
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
									class="button-text"><%=BaseUtils.getAmsLabelValue("L0013", locale, "Init") %></span>
							</button>
						</span> 
						<span class="button iconBtn">
							<button id="btnSave">
								<span class="button-icon ui-icon-func-save"></span> 
								<span class="button-text"><%=BaseUtils.getAmsLabelValue("L0054", locale, "Save") %></span>
							</button> 
						</span> 
						<span class="button iconBtn">
							<button id="btnAppend">
								<span class="iconAppend"></span>
								<span class="button-text"><%=BaseUtils.getAmsLabelValue("L0064", locale, "Add") %></span>
							</button>
						</span>
						<span class="button iconBtn">
							<button id="btnRemove">
								<span class="iconRemove"></span>
								<span class="button-text"><%=BaseUtils.getAmsLabelValue("L0061", locale, "Remove") %></span>
							</button> 
						</span>
					</div>
					<div class="tb_basic">
						<table id="<%=DBNamingConstants.AMS_GROUP%>"></table>
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
