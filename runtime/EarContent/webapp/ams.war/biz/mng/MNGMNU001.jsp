<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>메뉴 관리</title>
<%@include file="/common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGMNU001.jsp
	 * 화면 설명  : 메뉴 관리
	 * 작성자        : 강훈기
	 * 작성일        : 2013-09-06
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	이진희	2013-09-06	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGMNU001_goSearch').Form({
			enter : '#btnSearch'  //검색시 엔터키 처리 
		});
		var lastsel; // 마지막으로 선택된 행 ID 
		
		// 다국어 처리
		var menu_name;
		var locale = $.Session('localeId');
		if(locale == 'ko'){
			menu_name = '<%=DBNamingConstants.MENU_NAME%>'
		}else if(locale == 'en'){
			menu_name = '<%=DBNamingConstants.MENU_NAME_EN%>'
		}else{
			menu_name = '<%=DBNamingConstants.MENU_NAME%>'
		}
		
		$.Page({
			init : function() {
				lastsel = undefined;		// 선택된 Row가 없을 때 lastsel을 초기화
				
				$.CodeHelper([{
				     divId: 'div01', // 코드가 생성될 DIV
				     parentCode: 'C002',        // 부모 Code ID (해당 부모코드의 자식코드에 대해서 객체 생성)
				     codeId: '<%=DBNamingConstants.MENU_CATEGORY%>',    // 생성될 객체의 ID
				     style: 'select',           // radio, checkbox
				     blank : false,           // select시 초기화용
				     codeValueId : 'ATTRIBUTE_02',
				     func: function() {  
				           $.Page.Search_List(1);
				     }
				}],
				function(){
					$('#<%=DBNamingConstants.MENU_CATEGORY%>').Value($.Page.Data['schData']||"BIZ");
					$.Page.Search_List(1);	
				});
			},
			Search_List : function(page) {
				var request = $('#MNGMNU001_goSearch').DataSet();

				var tr = $('#'+'<%=DBNamingConstants.AMS_MENU%>').find('> tbody > tr:last');
						tr.find('.ui-icon-triangle-1-s').removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
						tr.find('.tree-minus').removeClass('tree-minus').addClass('tree-plus');

				//메뉴리스트 조회
				$.Service({
					transaction : 'abm.MNUBBase#pMNU10001',
					request : request,
					response : '#<%=DBNamingConstants.AMS_MENU%>',
					success : function(ds) {
						lastsel = undefined; // 선택된 Row가 없을 때 lastsel을 초기화
						$('#<%=DBNamingConstants.AMS_MENU%>').get(0).addJSONData({
							rows : ds.recordSets.<%=DBNamingConstants.AMS_MENU%>.nc_list
						});
					}
				});
				
			}
		});
				
		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				if (window.confirm('작업중이던 데이터가 없어집니다.\n 초기화 하시겠습니까?')) {
					$('#<%=DBNamingConstants.AMS_MENU%>')._clear();
					$('#MNGMNU001_goSearch').Clear();
					lastsel = undefined; // 선택된 Row가 없을 때 lastsel을 초기화
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
				var menu_id =  $('a[sort='+lastsel+']').attr('data-id') || 'ROOT';
				var menu_category =  $('#<%=DBNamingConstants.MENU_CATEGORY%>').Value() || 'SYS';
				var menu_depth_no = $('#<%=DBNamingConstants.AMS_MENU%>').getRowData(lastsel, 'SORT').MENU_DEPTH_NO || 0;
				
				$.Popup({
					url : 'MNGMNU001P01.jsp',
					center : true,
					modal : true, //팝업창이 띄워졌을 때 메인 화면이 동작하지 않게끔 막아줌
					width : 565,
					height : 640,
					data : {
						'<%=DBNamingConstants.PARENT_MENU_ID%>' : menu_id,
						'<%=DBNamingConstants.MENU_CATEGORY%>' : menu_category,
						'<%=DBNamingConstants.MENU_DEPTH_NO%>' : menu_depth_no,
						'schData' : $('#MNGMNU001_goSearch').DataSet()
					},

					close : function(data) {
						if (data) {
							$('#'+'<%=DBNamingConstants.AMS_MENU%>').Clear();
							$('#MNGMNU001_goSearch').DataSet(data);
							$.Page.Search_List(1);
						}
					}
				});
			}
		});

		//Grid 생성 
		$('#<%=DBNamingConstants.AMS_MENU%>').Grid(
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
				id : '<%=DBNamingConstants.MENU_ID%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0027", locale, "Menu ID") %>',
				align : 'left',
				width : 150,
				editable : false,
				frozen : true,
				formatter : function(value, data) {
					return '<a href="#" class="popupLink" sort="'+ $.ParamEncode(data.values.SORT) +'"data-id="' + $.ParamEncode(value)	+ '"><span class="blue">' + value + '</span></a>'
				}
			}, {
				id : '<%=DBNamingConstants.MENU_CATEGORY%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0040", locale, "Category") %>',
				align : 'center',
				width : 50,
				hidden : true,
				frozen : true
				//edittype : 'select'
			}, {
				id : menu_name,
				title : '<%=BaseUtils.getAmsLabelValue("L0028", locale, "Menu NM") %>',
				align : 'left',
				width : 120,
				editable : false
			}, {
				id : '<%=DBNamingConstants.DISPLAY_INDEX%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0036", locale, "DP Index") %>',
				align : 'center',
				width : 65,
				editable : false,
				editvalid : {
					number : true,
					maxlength : 2
				}
			}, {
				id : '<%=DBNamingConstants.PARENT_MENU_ID%>', //row onclick으로 값 들어가는 것 적용해볼 것!!
				title : '<%=BaseUtils.getAmsLabelValue("L0035", locale, "Parent ID") %>',
				align : 'left',
				width : 90,
				editable : false
			}, {
				id : '<%=DBNamingConstants.PAGE_URI%>',
				title : 'URI',
				align : 'left',
				width : 170,
				editable : false
			},
			{
				id : '<%=DBNamingConstants.USE_FLAG%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0037", locale, "Use YN") %>',
				align : 'center',
				width : 70,
				editable : false
			//edittype : 'select'
			}, {
				id : '<%=DBNamingConstants.SCREEN_DISPLAY%>',
				title : '<%=BaseUtils.getAmsLabelValue("L0056", locale, "Scr Disp") %>',
				align : 'center',
				width : 70,
				editable : false
			//edittype : 'select'
			}, {
				id : '<%=DBNamingConstants.MENU_DEPTH_NO%>',
				title : 'MENU_DEPTH_NO',
				align : 'center',
				width : 70,
				hidden : true,
				editable : false
			//edittype : 'select'
			}],
			height : 'auto',
			scrollOffset : 0,
			viewrecords : true,
			//number:true,
			/* gridview:true,
			loading: true,
			loading_message: true,
			loading_overlay: true, */

			// TreeGrid 사용
			treeGrid : true,
			// 확장 기호가 들어갈 Column 명
			ExpandColumn : '<%=DBNamingConstants.MENU_ID%>',
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
			click : function(row, icol, attr1, attr2) {
				lastsel = row;
			}
		});

		//MENU_ID 클릭으로 수정 팝업창 띄우기 
		$('#<%=DBNamingConstants.AMS_MENU%>').on('click', '.popupLink', function(row) {
			var menu_id = $(this).attr('data-id');
			$.Popup({
				url : 'MNGMNU001P02.jsp',
				center : true,
				modal : true, //팝업창이 띄워졌을 때 메인 화면이 동작하지 않게끔 막아줌
				width : 565,
				height : 640,
				data : {
					'<%=DBNamingConstants.MENU_ID%>' : menu_id,
					'schData' : $('#MNGMNU001_goSearch').DataSet()
				},
				center : true,
				close : function(data) {
					if (data) {
						$('#'+'<%=DBNamingConstants.AMS_MENU%>').Clear();
						$('#MNGMNU001_goSearch').DataSet(data);
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
				<div class="contTitle">
					<h1><%=BaseUtils.getAmsLabelValue("L0011", locale, "Menu Mgt.") %></h1>
				</div>
					<div class="searchArea close">
						<form id="MNGMNU001_goSearch">
							<table class="tb_search">
								<colgroup>
									<col width="130">
									<col width="284">
									<col width="130">
									<col width="284">
									<col width="110">
								</colgroup>
								<tr class="first_row">
									<th><label for="<%=DBNamingConstants.MENU_CATEGORY%>"><%=BaseUtils.getAmsLabelValue("L0040", locale, "Category") %></label></th>
									<td colspan="3"><div id="div01"></div>
									</td>
									<td class="searchBtn" rowspan="2">
										<button id="btnSearch" class="btnSearch">
											<span class="button-text">Search</span>
										</button>
									</td>
								</tr>
								<tr>
									<th><label for="<%=DBNamingConstants.MENU_ID%>"><%=BaseUtils.getAmsLabelValue("L0027", locale, "Menu ID") %></label></th>
									<td><input id="<%=DBNamingConstants.MENU_ID%>" class="input01" type="text"
										maxlength="15" /></td>
									<th><label for="<%=DBNamingConstants.MENU_NAME%>"><%=BaseUtils.getAmsLabelValue("L0028", locale, "Menu NM") %></label></th>
									<td><input id="<%=DBNamingConstants.MENU_NAME%>" class="input01" type="text"
										maxlength="20" /></td>
								</tr>
							</table>
						</form>
					</div>
					<div class="search_more">
						<a href="javascript:SlideDownSearch();"></a>
					</div>
					<div class="btn_common">
						<span class="button iconBtn">
							<button id="btnInit">
								<span class="button-icon ui-icon-search-reset"></span> <span
									class="button-text"><%=BaseUtils.getAmsLabelValue("L0013", locale, "Init") %></span>
							</button> </span> <span class="button iconBtn">
							<button id="btnSave">
								<span class="button-icon ui-icon-func-save"></span> <span
									class="button-text"><%=BaseUtils.getAmsLabelValue("L0014", locale, "Register") %></span>
							</button> </span>
					</div>
					<div class="tb_basic">
						<table id="<%=DBNamingConstants.AMS_MENU%>"></table>
					</div>
				</div>
			</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
