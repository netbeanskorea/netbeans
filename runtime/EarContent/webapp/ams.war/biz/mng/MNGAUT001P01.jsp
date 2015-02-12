<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>권한별 메뉴 설정 팝업</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGAUT001P01.jsp
	 * 화면 설명  : 권한별 할당된 메뉴를 관리
	 * 작성자      : 강훈기
	 * 작성일      : 2013-09-13
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기		2013-09-13	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGAUT001P01').Form();
		
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
			init: function() {
				$('#<%=DBNamingConstants.ROLE_ID%>').Value($.Page.Data['<%=DBNamingConstants.ROLE_ID%>']);
				$('#<%=DBNamingConstants.ROLE_NAME%>').Value($.Page.Data['<%=DBNamingConstants.ROLE_NAME%>']);

				
				$.CodeHelper([{
				     divId: 'div01', // 코드가 생성될 DIV
				     parentCode: 'C002',        // 부모 Code ID (해당 부모코드의 자식코드에 대해서 객체 생성)
				     codeId: '<%=DBNamingConstants.MENU_CATEGORY%>',    // 생성될 객체의 ID
				     style: 'select',           // radio, checkbox
				     blank: false,
				     blankLabel : '',           // select시 초기화용
				     codeValueId : 'ATTRIBUTE_02',
				     func: function() {         // select change 시 사용되는 함수
				           $.Page.Search_List(1);
				     }
				}],
				function() {
					$('#<%=DBNamingConstants.MENU_CATEGORY%>').Value("BIZ");
					$.Page.Search_List(1);
				});
				
// 				$.Service({
// 					transaction : 'abm.UGRBBase#pUGR10001',
// 					success : function(ds) {
// 						var userGroupRs = ds.recordSets.AMS_GROUP.nc_list;
// 						var userGroupRecord = [{value:'', label:'==전체=='}];
// 						for(var i=0; i<userGroupRs.length; i++) {
// 							userGroupRecord.push({value:userGroupRs[i].GROUP_ID,label:userGroupRs[i].GROUP_NAME}); 
// 						}
<%-- 						$('#'+'<%=DBNamingConstants.GROUP_ID%>').Options(userGroupRecord); --%>
// 					}
// 				});
				
			},
			Search_List: function(page) {
				var request = $('#MNGAUT001P01').DataSet();
            	request.fields.<%=DBNamingConstants.ROLE_ID%> = $.Page.Data['<%=DBNamingConstants.ROLE_ID%>'];
				// Service 호출
				$.Service({
					transaction: 'abm.AUTBBase#pAUT20001',
					request: request,
					response: '#<%=DBNamingConstants.AMS_ROLE_MENU_MAPPING%>',
					success: function(ds){
						$('#<%=DBNamingConstants.AMS_ROLE_MENU_MAPPING%>').get(0).addJSONData({
							rows : ds.recordSets.<%=DBNamingConstants.AMS_ROLE_MENU_MAPPING%>.nc_list
						});
					}
				});
			}
		});

		$('#btnSearch').Button({
			click: function() {
				$.Page.Search_List(1);
			}
		});
		
		$('#<%=DBNamingConstants.AMS_ROLE_MENU_MAPPING%>').Grid({
			columns: [{
					id : 'PARENT_SORT',
					title : 'PARENT_SORT',
					hidden: true	
				}, {
					id : 'SORT',
					title : 'SORT',
					hidden: true	
				}, {
					id: '<%=DBNamingConstants.MENU_ID%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0027", locale, "Menu ID") %>',
					align: 'left',
					width: 150,
					fixed: true
				}, {
					id: menu_name,
					title: '<%=BaseUtils.getAmsLabelValue("L0028", locale, "Menu NM") %>',
					align: 'left',
					width: 150,
					fixed: true
				}, {
					id: 'ROLE_ALL',
					title: '<%=BaseUtils.getAmsLabelValue("L0059", locale, "==전체==") %>',
					align: 'center',
					width: 70,
					formatter: function(value, data){
						if (value == 'Y')
							return '<input type="checkbox" data-role="ROLE_ALL" id="ROLE_ALL_' + data.row + '" checked/>';
						else
							return '<input type="checkbox" data-role="ROLE_ALL" id="ROLE_ALL_' + data.row + '"/>';
					},
					unformatter: function (value, data) {
						var val = $(value.find('[type="checkbox"]')).Value();
						if (val == 'on')
							val = 'Y';
						return val;
					}
				}, {
					id: 'ROLE_SELECT',
					title: 'SELECT',
					align: 'center',
					width: 70,
					formatter: function(value, data){
						if (value == 'Y')
							return '<input type="checkbox" data-role="ROLE_SELECT" id="ROLE_SELECT_' + data.row + '" checked/>';
						else
							return '<input type="checkbox" data-role="ROLE_SELECT" id="ROLE_SELECT_' + data.row + '"/>';
					},
					unformatter: function (value, data) {
						var val = $(value.find('[type="checkbox"]')).Value();
						if (val == 'on')
							val = 'Y';
						return val;
					}
				}, {
					id: 'ROLE_INSERT',
					title: 'INSERT',
					align: 'center',
					width: 70,
					formatter: function(value, data){
						if (value == 'Y')
							return '<input type="checkbox" data-role="ROLE_INSERT" id="ROLE_INSERT_' + data.row + '" checked/>';
						else
							return '<input type="checkbox" data-role="ROLE_INSERT" id="ROLE_INSERT_' + data.row + '" />';
					},
					unformatter: function (value, data) {
						var val = $(value.find('[type="checkbox"]')).Value();
						if (val == 'on')
							val = 'Y';
						return val;
					}
				},  {
					id: 'ROLE_UPDATE',
					title: 'UPDATE',
					align: 'center',
					width: 70,
					formatter: function(value, data){
						if (value == 'Y')
							return '<input type="checkbox" data-role="ROLE_UPDATE" id="ROLE_UPDATE_' + data.row + '" checked/>';
						else
							return '<input type="checkbox" data-role="ROLE_UPDATE" id="ROLE_UPDATE_' + data.row + '" />';
					},
					unformatter: function (value, data) {
						var val = $(value.find('[type="checkbox"]')).Value();
						if (val == 'on')
							val = 'Y';
						return val;
					}
				},  {
					id: 'ROLE_DELETE',
					title: 'DELETE',
					align: 'center',
					width: 70,
					formatter: function(value, data){
						if (value == 'Y')
							return '<input type="checkbox" data-role="ROLE_DELETE" id="ROLE_DELETE_' + data.row + '" checked/>';
						else
							return '<input type="checkbox" data-role="ROLE_DELETE" id="ROLE_DELETE_' + data.row + '" />';
					},
					unformatter: function (value, data) {
						var val = $(value.find('[type="checkbox"]')).Value();
						if (val == 'on')
							val = 'Y';
						return val;
					}
				},  {
					id: '<%=DBNamingConstants.ROLE_ID%>',
					title : 'ROLE_ID',
					hidden : true
				},  {
					id: '<%=DBNamingConstants.PARENT_MENU_ID%>',
					title : 'PARENT_MENU_ID',
					hidden : true
				},  {
					id: '<%=DBNamingConstants.MENU_DEPTH_NO%>',
					title : 'MENU_DEPTH_NO',
					hidden : true
				}  
			],
			height: 430,
			scrollOffset: 0,
			viewrecords: true,
			
			// TreeGrid 사용
			treeGrid : true,
			// 확장 기호가 들어갈 Column 명
			ExpandColumn : '<%=DBNamingConstants.MENU_ID%>',
			// ?????? sortname을 안쓰면 treegrid가 작동안함..
			sortname : 'SORT',
			// 안써도 됨 
			treedatatype: 'local',
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
			
			click: function() {
				var $target = $(event.target);
				
				$target.find('input:checkbox').click();
			}
		}).on('click', 'input:checkbox[data-role="ROLE_ALL"]', function(e) {
			var $this = $(e.target);
			var $tr = $this.closest('tr');
			var id = $tr.attr('id');
			var flag = '';
			
			var eventHandler = function(target, tr) {
				var notAll = $tr.find('[type=checkbox]').not('[data-role=ROLE_ALL]');
				if(target.Value() == 'on'){
					for (var i = 0; i < notAll.length; i++) {
						$(notAll[i]).Value('on');
					}
				} else {
					for (var i = 0; i < notAll.length; i++) {
						$(notAll[i]).Value('N');
					}
				}
			};
			
			eventHandler($this, $tr);	// 클릭된 행
			while($tr.length!==0) {
				flag = $tr.find('[data-role=ROLE_ALL]').Value();
				$tr = $tr.next();
				var currentId = $tr.attr('id');
				
				if(currentId.indexOf(id) === 0) {
					console.log(currentId);
					
					$tr.find('[data-role=ROLE_ALL]').Value(flag);
					eventHandler($this, $tr);	// 자식 행					
				} else {
					break;
				}
			}
			
		});
		
		//저장
		$('#btnSave').Button({
			click: function() {
				if(confirm('저장하시겠습니까?')){
					
					var addTemp = $('#<%=DBNamingConstants.AMS_ROLE_MENU_MAPPING%>').RecordSet();
					
					var request = $.DataSet();
					
					request.fields.<%=DBNamingConstants.ROLE_ID%> = $.Page.Data['<%=DBNamingConstants.ROLE_ID%>'];
					request.fields.<%=DBNamingConstants.MENU_CATEGORY%> = $('#<%=DBNamingConstants.MENU_CATEGORY%>').Value();
					request.recordSets.<%=DBNamingConstants.AMS_ROLE_MENU_MAPPING%> = { nc_list: []};
					var len = addTemp.nc_list.length;
					for(var i = 0; i < len; i++) {
						if( addTemp.nc_list[i].ROLE_SELECT != 'N' || 
							addTemp.nc_list[i].ROLE_INSERT != 'N' ||	
							addTemp.nc_list[i].ROLE_UPDATE != 'N' ||
							addTemp.nc_list[i].ROLE_DELETE != 'N')
						{
							request.recordSets.<%=DBNamingConstants.AMS_ROLE_MENU_MAPPING%>.nc_list.push(addTemp.nc_list[i]);
						}
					}
					
					$.Service({
						transaction: 'abm.AUTBBase#pAUT20002',
						request: request,
						success: function(ds) {
							$.Page.Close();
						}
					});
				}
			}
		});

		//취소
		$('#btnCancel').Button({
			click: function() {
				if(confirm('닫으시겠습니까?'))
					$.Page.Close();
			}
		});
	});
</script>
</head>
<body>
	<div id="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea" class="type02">
				<div class="contTitle">
					<h2>권한 별 메뉴관리</h2>
				</div>
				<div class="searchArea">
					<form id="MNGAUT001P01">
						<table class="tb_search">
							<colgroup>
								<col width="100" />
								<col width="240" />
								<col width="100" />
								<col width="240" />
								<col width="60" />
							</colgroup>
							<tr>
								<th><label><%=BaseUtils.getAmsLabelValue("L0025", locale, "Role ID") %></label></th>
								<td>
									<input id="<%=DBNamingConstants.ROLE_ID%>" class="input01 nobd" type="text" readonly/>
								</td>
								<th><label><%=BaseUtils.getAmsLabelValue("L0026", locale, "Role NM") %></label></th>
								<td colspan="2">
									<input id="<%=DBNamingConstants.ROLE_NAME%>" class="input01 nobd" type="text" readonly/>
								</td>
							</tr>
							<tr>
								<th><label><%=BaseUtils.getAmsLabelValue("L0040", locale, "Category") %></label></th>
								<td colspan="3">
									<div id="div01"></div>
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
				<div class="tb_basic">
					<table id="<%=DBNamingConstants.AMS_ROLE_MENU_MAPPING%>"></table>
				</div>
				<div class="btn_main">
					<span class="button iconBtn"><button id="btnSave">
					<span class="button-icon ui-icon-func-save"></span><span class="button-text"><%=BaseUtils.getAmsLabelValue("L0054", locale, "Save") %></span>
					</button>
					</span> <span class="button iconBtn"><button id="btnCancel">
					<span class="button-icon ui-icon-func-reset""></span><span class="button-text"><%=BaseUtils.getAmsLabelValue("L0055", locale, "Cancel") %></span>
					</button> </span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>