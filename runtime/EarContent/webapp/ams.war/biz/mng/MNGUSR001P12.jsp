<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>조직정보조회</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR001P12.jsp
	 * 화면 설명  : 조직정보조회
	 * 작성자       : 
	 * 작성일       : 2013-01-24
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * 
	 ****************************************************************************************/
	$(function() {
		$('#MNGUSR001P12').Form({
			enter : '#btnSearch'
		});
		$.Page({
			init: function(){
				var parentData = $.Page.Data();
				$('#TEAM_CD').val(parentData.TEAM_CD);
				$.Page.Search_List(1);
			},
			Search_List: function(page) {
				var request = $('#MNGUSR001P12').DataSet();
				//if($.Page.Data('TEAM_CD')){
				//	request.fields.TEAM_CD = $.Page.Data('TEAM_CD');
				//}
				$.Service({
					transaction: 'mng.MNGUSRB#selectOrgCode',
					request: request,
					response: '#ORG_LIST',
					success: function(ds) {
						
					}
				});
			}
		});

		// 초기화 버튼 클릭
		$('#btnRefresh').Button({
			click: function() {
				if(window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#.container').Clear();
				}
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click: function() {
				$.Page.Search_List(1);
			}
		})

		$('#ORG_LIST').Grid({
			columns: [
				{
					id: 'checkbox',
					title: 'check',
					type: 'checkbox',
					align: 'center',
					width: '50',
					fixed: true
				}, {
					id: 'HDQT_NM',
					title: '부문',
					align: 'left',
					width: '100'
				}, {
					id: 'SECTN_NM',
					title: '본부',
					align: 'left',
					width: '120'
				}, 
				/* {
					id: 'HDQT_TEAM_CD',
					title: '본부/팀코드',
					align: 'left',
					width: '70',
					fixed: true
				}, */
				{
					id: 'BRNOFC_TEAM_CD',
					title: '지사/팀코드',
					align: 'left',
					width: '70'
				}, {
					id: 'BRNOFC_TEAM_NM',
					title: '지사/팀명',
					align: 'left',
					width: '100'
				}, {
					id: 'SALESOFFICE',
					title: 'SALESOFFICE',
					align: 'left',
					width: '70'
				}, {
					id: 'SALESGROUP',
					title: 'SALESGROUP',
					align: 'left',
					width: '70'
				}, {
					id: 'PLANT',
					title: 'PLANT',
					align: 'left',
					width: '50'
				}, {
					id: 'BUSINESSAREA',
					title: '지역',
					align: 'left',
					width: '50'
				}
			],
			click: function(row) {
				gridData = $('#ORG_LIST').Record(row);
			},
			height : 250,
			width : 'auto',
			viewrecords: true,
			loadComplete: function() {
			}
		});

		//선택버튼 클릭
		$('#btnSelect').Button({
			click: function(row) {
				if(!gridData) {
					return;
				}
				$.Popup.Close(gridData);
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
					<h2>조직정보조회</h2>
				</div>
				<div class="searchArea">
					<form id="MNGUSR001P12">
						<table class="tb_search">
							<colgroup>
								<col width="110" />
								<col width="250" />
								<col width="110" />
								<col width="448" />
							</colgroup>
							<tr>
								<th><label for="TEAM_CD">지사/팀코드</label>
								</th>
								<td>
									<input id="TEAM_CD" type="text" maxlength="20" class="input01"/>
								</td>
								<th><label for="TEAM_NM">지사/팀명</label>
								</th>
								<td>
									<input id="TEAM_NM" type="text" maxlength="30" class="input01"/>
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
						<table id="ORG_LIST"></table>
						<!-- <div id="pager" class="paging"></div> -->
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