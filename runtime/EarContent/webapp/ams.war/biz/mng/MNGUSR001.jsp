<%@ page pageEncoding="utf-8"%>
<%@ page import="ams.fwk.constants.DBNamingConstants" %>
<!doctype html>
<html>
<head>
<title>시스템관리- 사용자관리</title>
<%@include file="/common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR001.jsp
	 * 화면 설명  : 사용자관리 - 조회
	 * 작성자        : 이윤주
	 * 작성일        : 2013-01-18
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	이윤주	2013-01-18	화면 생성
	 * ver0.2	이진희	2013-02-05	화면 기능 및 IO추가.
	 * ver0.3	이진희	2013-02-05	팝업 연결
	 ****************************************************************************************/
	$(function() {
		$('#MNGUSR001_goSearch').Form({
			//조회 영역 Enter 조회버튼 자동 클릭
			enter : '#btnSearch'
		});

		$.Page({
			init : function() {
				$.Page.Search_List($.Param('page') || 1);
				
				$.CodeHelper([ {
					divId : 'd_USE_FLAG',
					parentCode : 'C003',
					codeId : 'USE_FLAG',
					codeValueId  : 'ATTRIBUTE_02',
					blankLabel : '',          
				    blankValue : '',           
					style : 'select',
					func : function() {
					},
					type : 'SYS'
				} ],
				function() {
				});
				
				$.Service({
					transaction : 'abm.UGRBBase#pUGR10001',
					request : {
						fields : {
							page_size : '10000'
						}
					},
					success : function(ds) {
						console.log("group selectbox : "+ds);
						var userGroupRs = ds.recordSets.AMS_GROUP.nc_list;
						var userGroupRecord = [{value:'', label:'==전체=='}];
						for(var i=0; i<userGroupRs.length; i++) {
							userGroupRecord.push({value:userGroupRs[i].GROUP_ID,label:userGroupRs[i].GROUP_NAME}); 
						}
						$('#'+'<%=DBNamingConstants.GROUP_ID%>').Options(userGroupRecord);
					}
				});
				
			},
			Search_List : function(page) {
				var request = $('#MNGUSR001_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = $('#pager').PageSize();
				$.Page.Data['page'] = request.fields.page;

				$.Service({
					transaction : 'abm.USRBBase#pUSR10001',
					request : request,
					response : '#<%=DBNamingConstants.AMS_USER%>',
					success : function(ds) {
						$('#pager').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_USER%>);
					}
				});
			}
		});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#container').Clear();
				}
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				$.Page.Search_List($.Param('page') || 1);
			}
		});

		// [등록]버튼으로 신규 데이터 입력
		$('#btnNew').Button({
			role: 'insert',
			click : function() {
				$.Navigate("MNGUSR001P01.jsp", {

				});
			}
		});

		$('#<%=DBNamingConstants.AMS_USER%>')
				.Grid(
						{
							columns : [
									{
										id : '<%=DBNamingConstants.USER_ID%>',
										title : '<%=BaseUtils.getAmsLabelValue("L0020", locale, "USER ID") %>',
										align : 'left',
										frozen : false,
										sortable : true,
										formatter : function(value, data) {
											console.log(value);
											var seq = data.values.USER_ID;
											return '<a href="MNGUSR001P02.jsp?<%=DBNamingConstants.USER_ID%>='
													+ $.ParamEncode(data.values.<%=DBNamingConstants.USER_ID%>)
													+ '"><span style="color: blue">'
													+ value + '</span></a>'
										}
									}, {
										id : '<%=DBNamingConstants.USER_NAME%>',
										title : '<%=BaseUtils.getAmsLabelValue("L0049", locale, "NAME") %>',
										sortable : true,
										frozen : true,
										align : 'left'
									}, {
										id : '<%=DBNamingConstants.TEAM_CD%>',
										title : '<%=BaseUtils.getAmsLabelValue("L0050", locale, "TEAM CD") %>',
										sortable : true,
										align : 'left'
									}, {
										id : '<%=DBNamingConstants.EMP_ID%>',
										title : '<%=BaseUtils.getAmsLabelValue("L0051", locale, "EMP ID") %>',
										align : 'left'
									},  {
										id : '<%=DBNamingConstants.TEL_NO%>',
										title : '<%=BaseUtils.getAmsLabelValue("L0052", locale, "TEL") %>',
										align : 'left'
									}, {
										id : '<%=DBNamingConstants.MOBILE_NO%>',
										title : '<%=BaseUtils.getAmsLabelValue("L0053", locale, "MOB") %>',
										align : 'left'
									}, {
										id : '<%=DBNamingConstants.USE_FLAG%>',
										title : '<%=BaseUtils.getAmsLabelValue("L0037", locale, "USE") %>',
										align : 'center'
									} ],
// 							scrollOffset : 0,
// 							gridview : true,
// 							rownumWidth : 40,
							height : 'auto',
// 							number : false,
// 							loadComplete : function() {
// 							}
						});

		$('#pager').Pager({
			selectBoxLong: true,
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
		<%@include file="/common/TopMenu.jsp"%>
		<!-- //headerArea-->
		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="/common/LeftMenu.jsp"%>
			<!-- //leftArea -->
			<div id="contentArea">
				<div class="contTitle">
					<h1><%=BaseUtils.getAmsLabelValue("L0005", locale, "User Mgt.") %></h1>
				</div>
				<div class="searchArea close">
					<form id="MNGUSR001_goSearch">
						<table class="tb_search">
							<colgroup>
								<col width="140" />
								<col width="284" />
								<col width="140" />
								<col width="284" />
								<col width="90" />
							</colgroup>
							<tr class="first_row">
								<th><label for="USER_GROUP"><%=BaseUtils.getAmsLabelValue("L0021", locale, "GROUP ID") %></label></th>
								<td><div id="d_USER_GROUP">
										<select id="<%=DBNamingConstants.GROUP_ID%>">
										</select>
									</div></td>
								<th><label for="USE_FLAG"><%=BaseUtils.getAmsLabelValue("L0037", locale, "GROUP ID") %></label></th>
								<td>
									<div id="d_USE_FLAG"></div>
								</td>
								<td class="searchBtn" rowspan="2">
									<button id="btnSearch" class="btnSearch">
										<span class="button-text">Search</span>
									</button>
								</td>
							</tr>
							<tr>
								<th><label for="schWord"><%=BaseUtils.getAmsLabelValue("L0020", locale, "User ID") %>/<%=BaseUtils.getAmsLabelValue("L0049", locale, "User Name") %></label></th>
								<td><input id="schWord" class="input01" type="text" /></td>
							</tr>
						</table>
					</form>
				</div>
				<div class="search_more">
					<a href="javascript:SlideDownSearch();"></a>
				</div>
				<div class="btn_common type02">
					<span class="button iconBtn">
						<button id="btnInit">
							<span class="button-icon ui-icon-search-reset"></span> <span
								class="button-text"> <%=BaseUtils.getAmsLabelValue("L0013", locale, "Init") %></span>
						</button> </span> <span class="button iconBtn">
						<button id="btnNew">
							<span class="button-icon ui-icon-func-request"></span> <span
								class="button-text"> <%=BaseUtils.getAmsLabelValue("L0014", locale, "Register") %></span>
						</button> </span>
				</div>
				<div class="tb_basic">
					<table id="<%=DBNamingConstants.AMS_USER%>"></table>
					<div id="pager" class="paging"></div>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="/common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
