<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>사용자그룹별 사용자 맵핑</title>
<%@include file="/common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUGR001P01.jsp
	 * 화면 설명  : 사용자그룹별 사용자 맵핑
	 * 작성자      : 강훈기
	 * 작성일      : 2013-09-13
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기		2013-09-13	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGUGR001P01').Form({
			enter : '#btnSearch'
		});
		$.Page({
			init: function() {
				$.Service({
					transaction : 'abm.UGRBBase#pUGR10001',
					success : function(ds) {
						console.log("group selectbox : "+ds);
						var userGroupRs = ds.recordSets.<%=DBNamingConstants.AMS_GROUP%>.nc_list;
						var userGroupRecord;
						if($.Session('localeId') == 'ko'){
							userGroupRecord = [{value:'', label:'==전체=='}];
						}else if($.Session('localeId') == 'en'){
							userGroupRecord = [{value:'', label:'==ALL=='}];
						}
						
						for(var i=0; i<userGroupRs.length; i++) {
							if($.Session('localeId') == 'ko'){
								userGroupRecord.push({value:userGroupRs[i].<%=DBNamingConstants.GROUP_ID%>,label:userGroupRs[i].<%=DBNamingConstants.GROUP_NAME%>}); 
							}else if($.Session('localeId') == 'en'){
								userGroupRecord.push({value:userGroupRs[i].<%=DBNamingConstants.GROUP_ID%>,label:userGroupRs[i].<%=DBNamingConstants.GROUP_NAME_EN%>}); 
							}
						}
						$('#'+'<%=DBNamingConstants.GROUP_ID%>').Options(userGroupRecord);
						$('#'+'<%=DBNamingConstants.GROUP_ID%>').Value($.Page.Data['<%=DBNamingConstants.GROUP_ID%>']);
					}
				});
				
				$.Page.Search_List(1);
				$.Page.Search_List2(1);
			},
			Search_List: function(page) {
				var request = $('#MNGUGR001P01').DataSet();
            	request.fields.<%=DBNamingConstants.GROUP_ID%> = $.Page.Data['<%=DBNamingConstants.GROUP_ID%>'];
				// Service 호출
				$.Service({
					transaction: 'abm.USRBBase#pUSR20001',
					request: request,
					response: '#<%=DBNamingConstants.AMS_USER_GROUP_MAPPING%>',
					success: function(ds){
					}
				});
			},
			Search_List2: function(page) {
				var request2 = $('#MNGUGR001P01').DataSet();
				request2.fields.<%=DBNamingConstants.GROUP_ID%> = $.Page.Data['<%=DBNamingConstants.GROUP_ID%>'];
				request2.fields.page = page;
				request2.fields.page_size = $('#pager2').PageSize();
				$.Service({
					transaction: 'abm.USRBBase#pUSR20002',
					request: request2,
					response: '#<%=DBNamingConstants.AMS_USER%>',
					success: function(ds){
						$('#pager2').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_USER%>);
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
			page_size : 100,
			block_size : 3,
			selectBoxLong : true,
			click : function(page) {
				$.Page.Search_List2(page || 1);
			}
		});
		
		$('#<%=DBNamingConstants.AMS_USER_GROUP_MAPPING%>').Grid({
			columns: [
	          	{
					id: '<%=DBNamingConstants.GROUP_ID%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0021", locale, "Group ID") %>',
					align: 'left',
					width: 110,
					hidden: true
				}, {
					id: '<%=DBNamingConstants.USER_ID%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0020", locale, "User ID") %>',
					align: 'left',
					width: 150
				}, {
					id: '<%=DBNamingConstants.USER_NAME%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0049", locale, "NAME") %>',
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
		
		
		$('#<%=DBNamingConstants.AMS_USER%>').Grid({
			columns: [
				{
					id: '<%=DBNamingConstants.USER_ID%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0020", locale, "User ID") %>',
					align: 'left',
					width: 150
				}, {
					id: '<%=DBNamingConstants.USER_NAME%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0049", locale, "NAME") %>',
					align: 'left',
					width: 150
				}
			],
			height: 350,
			viewrecords: true,
			multiselect: true,
			multiboxonly: true,
			shrinkToFit: false,
			scrollOffset: 0,
			gridview: true
		});
		
		$('#btnMoveLeft').Button({
			click: function() {
				if(confirm('저장하시겠습니까?')){
					var selrow = $('#<%=DBNamingConstants.AMS_USER%>').SelectRowId();
					//tr id를 가지고 가지 않아 다시 checkbox 선택이 분명하지 않아 다시 RecordSet처리
					var request = {
						fields : {},
						recordSets : {
							<%=DBNamingConstants.AMS_USER_GROUP_MAPPING%> : {
								nc_list :[]
							}
						}
					};
					
					var len = selrow.length;
					for( var i = 0; i < len; i++) {
						var r = $('#<%=DBNamingConstants.AMS_USER%>').Record(selrow[i]);
						r.<%=DBNamingConstants.GROUP_ID%> = $.Page.Data['<%=DBNamingConstants.GROUP_ID%>'];
						request.recordSets.<%=DBNamingConstants.AMS_USER_GROUP_MAPPING%>.nc_list.push(r);
					}
					
					$.Service({
						transaction: 'abm.USRBBase#pUSR20003',
						request: request,
						success: function(ds) {
							alert(ds.message.messageName);
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
					var selrow = $('#<%=DBNamingConstants.AMS_USER_GROUP_MAPPING%>').SelectRowId();
					//tr id를 가지고 가지 않아 다시 checkbox 선택이 분명하지 않아 다시 RecordSet처리
					var request = {
						fields : {},
						recordSets : {
							<%=DBNamingConstants.AMS_USER_GROUP_MAPPING%> : {
								nc_list :[]
							}
						}
					};
					
					var len = selrow.length;
					for( var i = 0; i < len; i++) {
						var r = $('#<%=DBNamingConstants.AMS_USER_GROUP_MAPPING%>').Record(selrow[i]);
						request.recordSets.<%=DBNamingConstants.AMS_USER_GROUP_MAPPING%>.nc_list.push(r);
					}
					
					$.Service({
						transaction: 'abm.USRBBase#pUSR20004',
						request: request,
						success: function(ds) {
							alert(ds.message.messageName);
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
					<h2><%=BaseUtils.getAmsLabelValue("L0070", locale, "Group-User")%></h2>
				</div>
				<div class="searchArea">
					<form id="MNGUGR001P01">
						<table class="tb_search">
							<colgroup>
								<col width="150" />
								<col width="200" />
								<col width="150" />
								<col width="200" />
								<col width="108" />
							</colgroup>
							<tr>
								<th><label for="<%=DBNamingConstants.GROUP_ID%>"><%=BaseUtils.getAmsLabelValue("L0021", locale, "Group ID") %></label></th>
								<td><select id="<%=DBNamingConstants.GROUP_ID%>" disabled></select></td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.USER_ID%>"><%=BaseUtils.getAmsLabelValue("L0020", locale, "User ID") %></label></th>
								<td><input id="<%=DBNamingConstants.USER_ID%>" class="input01" type="text" maxlength="15" /></td>
								<th><label for="<%=DBNamingConstants.USER_NAME%>"><%=BaseUtils.getAmsLabelValue("L0049", locale, "NAME") %></label></th>
								<td><input id="<%=DBNamingConstants.USER_NAME%>" class="input01" type="text" maxlength="15" /></td>
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
							<table id="<%=DBNamingConstants.AMS_USER_GROUP_MAPPING%>"></table>
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
							<table id="<%=DBNamingConstants.AMS_USER%>"></table>
						</div>
						<div id="pager2" class="paging"></div>
					</div>
				</div>
				<div class="btn_main">
					<span class="button iconBtn"><button id="btnCancel">
					<span class="button-icon ui-icon-func-reset""></span><span class="button-text"><%=BaseUtils.getAmsLabelValue("L0072", locale, "Close") %></span>
					</button> </span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>