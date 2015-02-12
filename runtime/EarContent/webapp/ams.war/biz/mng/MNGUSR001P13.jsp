<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>사용자정보조회</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR001P13.jsp
	 * 화면 설명  : 사용자정보조회
	 * 작성자       : 
	 * 작성일       : 2013-01-24
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * 
	 ****************************************************************************************/
	$(function() {
		$('#MNGUSR001P13').Form({
			enter : '#btnSearch'
		});
		
		var list = $.Page.Data('LIST');		
		$.Page({
			init: function(){
				//var parentData = $.Page.Data();
				//$('#TEAM_CD').val(parentData.TEAM_CD);
				//$.Page.Search_List(1);
				$.Page.Search_List($.Param('page') || 1);
			},
			Search_List: function(page) {
				var request = $('#MNGUSR001P13').DataSet();
				request.fields.page = page;
				request.fields.page_size = 10;
				// UT코드는 임직원/사업장/대리점/고객사/벤더/기타/고객 선택
				request.fields.CODE_ID = 'UT';
				$.Page.Data['page'] = request.fields.page;
				
				$.Service({
					transaction: 'mng.MNGUSRB#selectUserList',
					request: request,
					response: '#user',   // =============> RS ID 변경할수 있는지 확인
					success: function(ds) {
						$('#pager').RecordSet(ds.recordSets.user);
						$('#count').html('(' + ds.recordSets.user.nc_totalRecordCount + '건)');

						var USER_LIST = ds.recordSets.user.nc_list;
						//var USER_LST = {
						//		nc_list : []
						//};

						for(var j = 0; j < USER_LIST.length; j++) {
							//var checker = false;		// 이미 등록된 메뉴 부분을 제외하는 로직
							for(var i = 0; i < list.length; i++) {
								if(list[i].USER_ID === USER_LIST[j].USER_ID && list[i].USER_NAME === USER_LIST[j].USER_NAME) {
									$('#user').setSelection(j+1);
									break;
								}
							}
							/*
							if(!checker){
								USER_LST.nc_list.push(USER_LIST[j]);
							}*/
						}
						
						//$('#user').RecordSet(USER_LST);
						
						$('#USER_GROUP').Select({
							options : ds.recordSets.GROUP_RS,
							blank : {
								value : '',
								label : '==선택=='
							}
						});	
					}
				});
			}
		});

		// 초기화 버튼 클릭
		$('#btnRefresh').Button({
			click: function() {
				if(window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('.container').Clear();
				}
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click: function() {
				$.Page.Search_List(1);
			}
		})

		$('#user').Grid({
			columns: [
				{
					id: 'USER_ID',
					title: '사용자ID',
					align: 'left',
					width: '100'
				}, {
					id: 'USER_NAME',
					title: '사용자이름',
					align: 'left',
					width: '100'
				}, {
					id: 'USER_GROUP',
					title: '사용자그룹',
					align: 'center',
					width: '100'
				}, {
					id: 'USER_CATEGORY_01',
					title: '사용자분류1',
					align: 'center',
					width: '100'
				}, {
					id: 'USER_CATEGORY_02',
					title: '사용자분류2',
					align: 'center',
					width: '100'
				}
			],
			click: function(row) {
			},
			height : 310,
			width : 'auto',
			viewrecords: true,
			multiselect:true,
			loadComplete: function() {
			}
		});

		//선택버튼 클릭
		$('#btnSelect').Button({
			click: function(row) {
				var selrow = $("#user").SelectRowId(); //선택된 row의ID값 조회
				var data = {
						fields: {},
						recordSets: {
							user: {
								nc_list: []
							}
						}
					};
				// 메뉴가 다중 선택일 경우도 처리
				for( var i = 0; i < selrow.length; i++) {
					data.recordSets.user.nc_list[i] = $('#user').Get(selrow[i]);
				}
					
				if(data.length === 0) {
					alert("선택된 행이 없습니다.")
					return;
				}
				$.Popup.Close(data);
			}
		});
		
		$('#pager').Pager({
			click: function(page) {
				$.Page.Search_List(page || 1);
			}
		});

	});
</script>
</head>
<body>
	<!-- <div id="container" class="container_pop">  container 때문에 화면 비율이 이상하게 나와서 일단 주석처리합니다... -->
	<div class="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea" class="type02">
				<div class="contTitle">
					<h2>사용자정보조회</h2>
				</div>
				<div class="searchArea">
					<form id="MNGUSR001P13">
						<table class="tb_search">
							<colgroup>
								<col width="130" />
								<col width="250" />
								<col width="130" />
								<col width="250" />
								<col width="148" />
							</colgroup>
							<tr>
								<th><label for="USER_GROUP">사용자그룹</label>
								</th>
								<td><select id="USER_GROUP" name="USER_GROUP" class="selectFL">
								</select></td>
								<th><label for="">사용자ID/이름</label>
								</th>
								<td><input id="schWord" value="" type="text" class="input01" />
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
					<span class="button iconBtn"><button id="btnRefresh">
						<span class="iconRefresh"></span><span class="button-text">초기화</span>
					</button> </span>
				</div>
				<div class="tb_basic">
					<form id="gridForm">
						<table id="user"></table>
						<div id="pager" class="paging"></div>
					</form>
				</div>
				<div class="btn_main">
					<span class="button iconBtn">
						<button id="btnSelect">
							<span class="button-icon ui-icon-func-popupOk"></span> <span class="button-text"> 선택</span>
						</button> </span>
				</div>
			</div>
		</div>
	</div>
	<!-- </div> -->
</body>
</html>