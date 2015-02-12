<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>시스템관리 - SSO조회</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR001P03
	 * 화면 설명  : 시스템관리 - SSO조회
	 * 작성자        : 강훈기
	 * 작성일        : 2013-10-25
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기		2013-10-25	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGUSR001P03_geSearch').Form({
			enter : '#btnSearch'
		});
		$.Page({
			init : function() {
				$.Page.Search_List(1);
			},
			Search_List : function(page) {
				var request = $('#MNGUSR001P03_geSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = $('#pager').PageSize();
				$.Service({
					transaction : 'abm.USRBBase#pUSR10006',
					request : request,
					response : '#AMS_USER_SSO',
					success : function(ds) {
						$('#pager').RecordSet(ds.recordSets.AMS_USER_SSO);
					}
				});
			}
		});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				window.location.reload();
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				$.Page.Search_List(1);
			}
		});

		$('#AMS_USER_SSO').Grid({
			columns : [ {
				id : 'HIOK_ID',
				title : 'HIOK_ID',
				align : 'center',
				width : '150'
			}, {
				id : 'EMPNO',
				title : 'EMPNO',
				hidden : true
			}, {
				id : 'NAME',
				title : '이름',
				align : 'left',
				width : '150'
			}, {
				id : 'DEPT',
				title : 'DEPT',
				hidden : true
			}, {
				id : 'DEPTNAME',
				title : '부서',
				align : 'left',
				width : '240'
			}, {
				id : 'POSITION',
				title : 'POSITION',
				hidden : true
			}, {
				id : 'POSITIONNAME',
				title : '직급',
				align : 'left',
				width : '100'
			}, {
				id : 'EMAIL',
				title : 'E-Mail',
				align : 'left',
				width : '240'
			}, {
				id : 'CELLPHONE',
				title : 'Phone Num',
				align : 'left',
				width : '240'
			} ],
			click : function(row) {
				gridData = $('#AMS_USER_SSO').Record(row);
				
			},
			dblclick : function(row) {
				gridData = $('#AMS_USER_SSO').Record(row);
				$.Popup.Close(gridData);
			},
			height : 250,
			width : 'auto',
			viewrecords : true,
			loadComplete : function() {
			}
		});

		//선택버튼 클릭
		$('#btnSelect').Button({
			click : function(row) {
				if (!gridData) {
					return;
				}
				$.Popup.Close(gridData);
			}
		});
		
		$('#pager').Pager({
			page_size : 100,
			selectBoxLong : true,
			click : function(page) {
				$.Page.Search_List(page || 1);
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
					<h2>사용자 관리 - SSO조회</h2>
				</div>
				<div class="searchArea">
					<form id="MNGUSR001P03_geSearch">
						<table class="tb_search">
							<col width="80">
							<col width="250">
							<col width="80">
							<col width="250">
							<col width="80">
							<tr>
								<th><label for="HIOK_ID">ID</label></th>
								<td><input id="HIOK_ID" type="text" class="input01"
									maxlength="20" /></td>
								<th><label for="NAME">이름</label></th>
								<td><input id="NAME" type="text" class="input01"
									maxlength="30" /></td>
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
							<span class="button-icon ui-icon-search-reset"></span>
							<span class="button-text">초기화</span>
						</button> </span>
				</div>
				<div class="tb_basic">
					<table id="AMS_USER_SSO"></table>
					<div id="pager" class="paging"></div>
				</div>
				<div class="btn_main">
					<span class="button iconBtn"><button id="btnSelect">
					<span class="button-icon ui-icon-func-save"></span><span class="button-text">선택</span>
					</button>
					</span> 
				</div>
			</div>
		</div>
	</div>
</body>
</html>