<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>공통코드 관리</title>
<%@include file="/common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGCOD001.jsp
	 * 화면 설명  : 공통코드 관리
	 * 작성자        : 강훈기
	 * 작성일        : 2013-09-02
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기	2013-09-02	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGCOD001_goSearch').Form({
			enter : '#btnSearch'  //검색시 엔터키 처리 
		});
		var lastsel; // 마지막으로 선택된 행 ID 
		
		$.Page({
			init : function() {
				lastsel = undefined;		// 선택된 Row가 없을 때 lastsel을 초기화
				$.Page.Search_List(1);
			},
			Search_List : function(page) {
				var request = $('#MNGCOD001_goSearch').DataSet();
				request.fields.<%=DBNamingConstants.LOCALE_ID%> = $.Session('localeId');
				var tr = $('#<%=DBNamingConstants.AMS_CODE%>').find('> tbody > tr:last');
				tr.find('.ui-icon-triangle-1-s').removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
				tr.find('.tree-minus').removeClass('tree-minus').addClass('tree-plus');
				
				//코드 리스트 출력
				$.Service({
					transaction : 'abm.CODBBase#pCOD10001',
					request : request,
					response : '#<%=DBNamingConstants.AMS_CODE%>',
					success : function(ds) {
						lastsel = undefined; 
						$('#<%=DBNamingConstants.AMS_CODE%>').get(0).addJSONData({
							rows : ds.recordSets.<%=DBNamingConstants.AMS_CODE%>.nc_list
						});
					}
				});
		  
		        }
		});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
 				lastsel = undefined;
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#<%=DBNamingConstants.AMS_CODE%>')._clear();
					$('#MNGCOD001_goSearch').Clear();
					lastsel = undefined;		// 선택된 Row가 없을 때 lastsel을 초기화
				}
			}
		});

		// 조회 버튼 클릭 
		$('#btnSearch').Button({
			click : function() {
				lastsel = undefined;
				$.Page.Search_List(1);
			}
		});
		

		// [등록] 버튼 클릭해서 팝업 띄우기 
		$('#btnSave').Button({
			role: 'insert',
			click : function() {
				// Grid에서 선택된 행의 CODE_ID를 가져옴
				var code_id = $('a[sort='+lastsel+']').attr('<%=DBNamingConstants.CODE_ID%>') || 'ROOT';
				var schData = $('#MNGCOD001_goSearch').DataSet();
				
				var parent_code_id = $('#<%=DBNamingConstants.AMS_CODE%>').getCol("<%=DBNamingConstants.PARENT_CODE_ID%>");
								
				$.Popup({
					url : 'MNGCOD001P01.jsp',
					center : true,
					modal : true, //팝업창이 띄워졌을 때 메인 화면이 동작하지 않게끔 막아줌
					width : 565,
					height : 450,
					data : {
						'<%=DBNamingConstants.PARENT_CODE_ID%>' : code_id,		// CODE_ID를 팝업창에 전달
						'schData' : schData
					},
					close : function(data) {
						if (data) {
							$('#<%=DBNamingConstants.AMS_CODE%>').Clear();
							$('#MNGCOD001_goSearch').DataSet(data);
	 						$.Page.Search_List(1);
						}
					}
				});
			}
		});

		//Grid 생성 
		$('#<%=DBNamingConstants.AMS_CODE%>').Grid(
		{
			columns : [{
						id : 'PARENT_SORT',
						title : 'PARENT_SORT',
						hidden: true	
					},{
						id : 'SORT',
						title : 'SORT',
						hidden: true	
					},{
						id : '<%=DBNamingConstants.CODE_ID%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0018", locale, "Code ID") %>',
						align : 'left',
						width : 250,
						editable : false,
						formatter : function(value, data) {
							return '<a href="#" class="popupLink link01" sort="'+$.ParamEncode(data.values.SORT)+'" <%=DBNamingConstants.CODE_ID%>="'+$.ParamEncode(value)+'" LOCALE_ID="'+$.ParamEncode(data.values.LOCALE_ID)+'">'+value+'</a>';
						}
					},{
						id : '<%=DBNamingConstants.CODE_NAME%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0019", locale, "Code NM") %>',
						align : 'left',
						width : 250
					}, {
						id : '<%=DBNamingConstants.PARENT_CODE_ID%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0035", locale, "Parent ID") %>',
						align : 'left',
						hidden : true,
						editable : false
					}, {
						id : '<%=DBNamingConstants.DISPLAY_INDEX%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0036", locale, "Index") %>',
						align : 'center',
						width : 110,
						editable : false
						
					}, {
						id : '<%=DBNamingConstants.USE_FLAG%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0037", locale, "Use") %>',
						align : 'center',
						editable : true
						
					}, {
						id : '<%=DBNamingConstants.ATTRIBUTE_01%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0038", locale, "Attr") %>1',
						align : 'left',
						width : 100,
						editable : true
					}, {
						id : '<%=DBNamingConstants.ATTRIBUTE_02%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0038", locale, "Attr") %>2',
						align : 'left',
						width : 100,
						editable : true
					}, {
						id : '<%=DBNamingConstants.ATTRIBUTE_03%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0038", locale, "Attr") %>3',
						align : 'left',
						width : 100,
						editable : true
					}, {
						id : '<%=DBNamingConstants.ATTRIBUTE_04%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0038", locale, "Attr") %>4',
						align : 'left',
						hidden : true,
						editable : true
					}, {
						id : '<%=DBNamingConstants.ATTRIBUTE_05%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0038", locale, "Attr") %>5',
						align : 'left',
						hidden : true,
						editable : true
					}, {
						id : '<%=DBNamingConstants.ATTRIBUTE_06%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0038", locale, "Attr") %>6',
						align : 'left',
						hidden : true,
						editable : true
					}, {
						id : '<%=DBNamingConstants.ATTRIBUTE_07%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0038", locale, "Attr") %>7',
						hidden : true,
						align : 'left',
						editable : true
					}, {
						id : '<%=DBNamingConstants.ATTRIBUTE_08%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0038", locale, "Attr") %>8',
						hidden : true,
						align : 'left',
						editable : true
					}, {
						id : '<%=DBNamingConstants.ATTRIBUTE_09%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0038", locale, "Attr") %>9',
						hidden : true,
						align : 'left',
						editable : true
					}, {
						id : '<%=DBNamingConstants.REG_USER_ID%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0041", locale, "Reg User") %>',
						width : 100,
						align : 'left'
					}, {
						id : '<%=DBNamingConstants.REG_DATE%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0043", locale, "Reg Date") %>',
						width : 200,
						align : 'left'
					}, {
						id : '<%=DBNamingConstants.LOCALE_ID%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0039", locale, "Locale") %>',
						width : 100,
						align : 'center'
					}, {
						id : '<%=DBNamingConstants.CATEGORY%>',
						title : '<%=BaseUtils.getAmsLabelValue("L0040", locale, "Category") %>',
						width : 100,
						align : 'center'
					}],
			height : 'auto',
			viewrecords : true,
			//number:true,
			/* gridview:true,
			loading: true,
			loading_message: true,
			loading_overlay: true, */

			// TreeGrid 사용
			treeGrid : true,
			// 확장 기호가 들어갈 Column 명
			ExpandColumn : '<%=DBNamingConstants.CODE_ID%>',
			// ?????? sortname을 안쓰면 treegrid가 작동안함..
			sortname : 'SORT',
			// 안써도 됨 
			//treedatatype: 'local',
			treeGridModel : 'adjacency',
			// adjacency Grid Model에 필요한 값을 column과 매핑한다.
			treeReader : {
				level_field : 'LEVEL_',
				parent_id_field : 'PARENT_SORT',
				leaf_field : 'LEAF_',
				expanded_field : 'EXPAND_'
			},
			// tree root level
			tree_root_level : 0,
			// local mode로 동작시 필요한 값
			localReader : {
				id : 'SORT'
			},
			click : function(row) {
				lastsel = row;
			}
		});

		//CODE_ID 클릭으로 수정 팝업창 띄우기 
		$('#<%=DBNamingConstants.AMS_CODE%>').on('click', '.popupLink', function(row) {
			var code = $(this).attr('<%=DBNamingConstants.CODE_ID%>');
			var locale = $(this).attr('<%=DBNamingConstants.LOCALE_ID%>');
			var schData = $('#MNGCOD001_goSearch').DataSet();
			
			$.Popup({
				url : 'MNGCOD001P02.jsp',
				center : true,
				modal : true, //팝업창이 띄워졌을 때 메인 화면이 동작하지 않게끔 막아줌
				width : 565,
				height : 450,
				data : {
					'<%=DBNamingConstants.CODE_ID%>' : code,
					'<%=DBNamingConstants.LOCALE_ID%>' : locale,
					'schData' : schData
				},
				center : true,
				close : function(data) {
					if (data){
						$('#<%=DBNamingConstants.AMS_CODE%>').Clear();
						$('#MNGCOD001_goSearch').DataSet(data);
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
		<%@include file="/common/TopMenu.jsp"%>
		<!-- //headerArea-->

		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="/common/LeftMenu.jsp"%>
			<!-- //leftArea -->

			<div id="contentArea">
				<div id="content">
					<div class="contTitle">
						<h1><%=BaseUtils.getAmsLabelValue("L0002", locale, "Common Code") %></h1>
					</div>
					<div id="tabsheader" class="location">
						<span class="home"><%=BaseUtils.getAmsLabelValue("L0034", locale, "HOME") %></span> &gt; 
						<span class="depth01"><%=BaseUtils.getAmsLabelValue("L0033", locale, "Biz") %></span> &gt; 
						<span class="current"><%=BaseUtils.getAmsLabelValue("L0002", locale, "Common Code") %></span>
					</div>
					<div id="divMain">
						<div class="searchArea mt10">
							<form id="MNGCOD001_goSearch">
								<table class="tb_search">
									<colgroup>
										<col width="130" />
										<col width="284" />
										<col width="130" />
										<col width="284" />
										<col width="110" />
									</colgroup>
									<tr>
										<th><label for="<%=DBNamingConstants.CODE_ID%>"><%=BaseUtils.getAmsLabelValue("L0018", locale, "CODE ID") %></label></th>
										<td><input id="<%=DBNamingConstants.CODE_ID%>" value="" type="text" class="input01" maxlength="15" /></td>
										<th><label for="<%=DBNamingConstants.CODE_NAME%>"><%=BaseUtils.getAmsLabelValue("L0019", locale, "CODE NM") %></label></th>
										<td><input id="<%=DBNamingConstants.CODE_NAME%>" value="" type="text" class="input01" maxlength="20" /></td>
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
										class="button-text"><%=BaseUtils.getAmsLabelValue("L0013", locale, "Initializing") %></span>
								</button> </span> 
								<span class="button iconBtn">
								<button id="btnSave">
									<span class="button-icon ui-icon-func-save"></span> <span
										class="button-text"><%=BaseUtils.getAmsLabelValue("L0014", locale, "Register") %></span>
								</button> </span>
						</div>
						<div class="tb_basic">
							<table id="<%=DBNamingConstants.AMS_CODE%>"></table>
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
