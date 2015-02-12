<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>권한별 사용자그룹 맵핑</title>
<%@include file="/common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGAUT001P02.jsp
	 * 화면 설명  : 권한별 사용자그룹 맵핑
	 * 작성자      : 강훈기
	 * 작성일      : 2013-10-04
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기		2013-10-04	화면 생성
	 ****************************************************************************************/
	$(function() {
		// 다국어 처리
		var group_name;
		var locale = $.Session('localeId');
		if(locale == 'ko'){
			group_name = '<%=DBNamingConstants.GROUP_NAME%>'
		}else if(locale == 'en'){
			group_name = '<%=DBNamingConstants.GROUP_NAME_EN%>'
		}else{
			group_name = '<%=DBNamingConstants.GROUP_NAME%>'
		}
		$('#MNGAUT001P02').Form({
			enter : '#btnSearch'
		});
		$.Page({
			init: function() {
				$('#<%=DBNamingConstants.ROLE_ID%>').Value($.Page.Data['<%=DBNamingConstants.ROLE_ID%>']);
				$.Page.Search_List(1);
				$.Page.Search_List2(1);
			},
			Search_List: function(page) {
				var request = $('#MNGAUT001P02').DataSet();
            	request.fields.<%=DBNamingConstants.ROLE_ID%> = $.Page.Data['<%=DBNamingConstants.ROLE_ID%>'];
				// Service 호출
				$.Service({
					transaction: 'abm.AUTBBase#pAUT30001',
					request: request,
					response: '#<%=DBNamingConstants.AMS_GROUP_ROLE_MAPPING%>',
					success: function(ds){
					}
				});
			},
			Search_List2: function(page) {
				var request2 = $('#MNGAUT001P02').DataSet();
				request2.fields.<%=DBNamingConstants.ROLE_ID%> = $.Page.Data['<%=DBNamingConstants.ROLE_ID%>'];
				request2.fields.page = page;
				request2.fields.page_size = $('#pager2').PageSize();;
				$.Service({
					transaction: 'abm.AUTBBase#pAUT30002',
					request: request2,
					response: '#<%=DBNamingConstants.AMS_GROUP%>',
					success: function(ds){
						$('#pager2').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_GROUP%>);
					}
				});
			}
		});

		$('#btnSearch').Button({
			click: function() {
				$.Page.Search_List2(1);
			}
		});
		
		$('#pager2').Pager({
			block_size : 3,
			click : function(page) {
				$.Page.Search_List2(page || 1);
			}
		});
		
		$('#<%=DBNamingConstants.AMS_GROUP_ROLE_MAPPING%>').Grid({
			columns: [
	          	{
					id: '<%=DBNamingConstants.ROLE_ID%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0025", locale, "Role ID") %>',
					align: 'left',
					hidden: true
				}, {
					id: '<%=DBNamingConstants.GROUP_ID%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0021", locale, "Group ID") %>',
					align: 'left',
					width: 150
				}, {
					id: group_name,
					title: '<%=BaseUtils.getAmsLabelValue("L0022", locale, "Group NM") %>',
					align: 'left',
					width: 150
				}
			],
			height: 350,
			viewrecords: true,
			multiselect: true,
			shrinkToFit: false,
			scrollOffset: 0,
			gridview: true
		});
		
		
		$('#<%=DBNamingConstants.AMS_GROUP%>').Grid({
			columns: [
				{
					id: '<%=DBNamingConstants.GROUP_ID%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0021", locale, "Group ID") %>',
					align: 'left',
					width: 150
				}, {
					id: group_name,
					title: '<%=BaseUtils.getAmsLabelValue("L0022", locale, "Group NM") %>',
					align: 'left',
					width: 150
				}
			],
			height: 350,
			viewrecords: true,
			multiselect: true,
			shrinkToFit: false,
			scrollOffset: 0,
			gridview: true
		});
		
		$('#btnMoveLeft').Button({
			click: function() {
				if(confirm('저장하시겠습니까?')){
					var selrow = $('#<%=DBNamingConstants.AMS_GROUP%>').SelectRowId();
					//tr id를 가지고 가지 않아 다시 checkbox 선택이 분명하지 않아 다시 RecordSet처리
					var request = {
						fields : {},
						recordSets : {
							<%=DBNamingConstants.AMS_GROUP_ROLE_MAPPING%> : {
								nc_list :[]
							}
						}
					};
					
					var len = selrow.length;
					for( var i = 0; i < len; i++) {
						var r = $('#<%=DBNamingConstants.AMS_GROUP%>').Record(selrow[i]);
						r.<%=DBNamingConstants.ROLE_ID%> = $.Page.Data['<%=DBNamingConstants.ROLE_ID%>'];
						request.recordSets.<%=DBNamingConstants.AMS_GROUP_ROLE_MAPPING%>.nc_list.push(r);
					}
					
					$.Service({
						transaction: 'abm.UGRBBase#pUGR20003',
						request: request,
						success: function(ds) {
							$.Page.Search_List(1);
							$.Page.Search_List2(1);
						}
					});
				}
			}
		});
		
		$('#btnMoveRight').Button({
			click: function() {
				if(confirm('삭제하시겠습니까?')){
					var selrow = $('#<%=DBNamingConstants.AMS_GROUP_ROLE_MAPPING%>').SelectRowId();
					//tr id를 가지고 가지 않아 다시 checkbox 선택이 분명하지 않아 다시 RecordSet처리
					var request = {
						fields : {},
						recordSets : {
							<%=DBNamingConstants.AMS_GROUP_ROLE_MAPPING%> : {
								nc_list :[]
							}
						}
					};
					
					var len = selrow.length;
					for( var i = 0; i < len; i++) {
						var r = $('#<%=DBNamingConstants.AMS_GROUP_ROLE_MAPPING%>').Record(selrow[i]);
						request.recordSets.<%=DBNamingConstants.AMS_GROUP_ROLE_MAPPING%>.nc_list.push(r);
					}
					
					$.Service({
						transaction: 'abm.UGRBBase#pUGR20004',
						request: request,
						success: function(ds) {
							$.Page.Search_List(1);
							$.Page.Search_List2(1);
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
			<div id="contentArea">
				<div class="contTitle">
					<h2>권한별 사용자그룹 맵핑</h2>
				</div>
				<div class="searchArea">
					<form id="MNGAUT001P02">
						<table class="tb_search">
							<colgroup>
								<col width="180" />
								<col width="240" />
								<col width="180" />
								<col width="240" />
								<col width="60" />
							</colgroup>
							<tr>
								<th><label><%=BaseUtils.getAmsLabelValue("L0025", locale, "Role Id") %></label></th>
								<td colspan="4">
									<input id="<%=DBNamingConstants.ROLE_ID%>" class="input01 nobd" type="text" readonly/>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.GROUP_ID%>"><%=BaseUtils.getAmsLabelValue("L0021", locale, "Group ID") %></label></th>
								<td><input id="<%=DBNamingConstants.GROUP_ID%>" class="input01" type="text" maxlength="15" /></td>
								<th><label for="<%=DBNamingConstants.GROUP_NAME%>"><%=BaseUtils.getAmsLabelValue("L0022", locale, "Group NM") %></label></th>
								<td><input id="<%=DBNamingConstants.GROUP_NAME%>" class="input01" type="text" maxlength="15" /></td>
								<td class="searchBtn">
									<button id="btnSearch" class="btnSearch">
										<span class="button-text">Search</span>
									</button>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="clearfix">
					<div class="float3_l_44">
						<div class="contSubTitle">
							<h3><%=BaseUtils.getAmsLabelValue("L0066", locale, "Select") %></h3>
						</div>
						<div class="tb_basic">
							<table id="<%=DBNamingConstants.AMS_GROUP_ROLE_MAPPING%>"></table>
						</div>
					</div>
					<div class="float3_c_10">
						 <div class="buttonArea moveRight">
			                <span class="button btnMoveRight"><button id="btnMoveRight" title="선택 삭제"></button></span>
			            </div>
			            <div class="buttonArea moveLeft">
			                <span class="button btnMoveLeft"><button id="btnMoveLeft" title="선택 추가"></button></span>
			            </div>
					</div>
					<div class="float3_r_44">
						<div class="contSubTitle">
							<h3><%=BaseUtils.getAmsLabelValue("L0067", locale, "Unselect") %></h3>
						</div>
						<div class="tb_basic">
							<table id="<%=DBNamingConstants.AMS_GROUP%>"></table>
						</div>
						<div id="pager2" class="paging"></div>
					</div>
				</div>
				<div class="btn_main">
					<span class="button iconBtn"><button id="btnCancel">
					<span class="button-icon ui-icon-func-reset""></span><span class="button-text">닫기</span>
					</button> </span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>