<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>우편번호조회</title>
<%@include file="/common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR001P10.jsp
	 * 화면 설명  : 우편번호조회
	 * 작성자       : 
	 * 작성일       : 2013-01-24
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * 
	 ****************************************************************************************/
	$(function() {
		var lastsel;
		$('#MNGUSR001P10').Form({
			enter : '#btnSearch'
		});
		$.Page({
			init: function(){
				lastsel = undefined;
				//$.Page.Search_List(1);
			},
			Search_List: function(page) {
				lastsel = undefined;
				var request = $('#MNGUSR001P10').DataSet();
				if($.Page.Data('ZIPCODE')){
					request.fields.schWord = $.Page.Data('ZIPCODE');
				}
				$.Service({
					transaction: 'com.COMBBase#pCOM10401',
					request: request,
					response: '#<%=DBNamingConstants.AMS_ZIP_ZIBUN%>',
					success: function(ds) {
						
					}
				});
			}
		});

		// 초기화 버튼 클릭
		$('#btnRefresh').Button({
			click: function() {
				if(window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('.container').Clear();
					lastsel = undefined;
				}
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click: function() {
				$.Page.Search_List(1);
			}
		})

		$('#<%=DBNamingConstants.AMS_ZIP_ZIBUN%>').Grid({
			columns: [
				{
					id: 'ZIPCODE',
					title: '우편번호',
					width: '80',
					align: 'center'
				}, {
					id: 'ADDR',
					title: '주소',
					align: 'left',
					width: '220'
				}
			],
			dblclick: function(row) {
				lastsel = row;
				gridData = $('#<%=DBNamingConstants.AMS_ZIP_ZIBUN%>').Record(row);
				$.Popup.Close(gridData);
			},
			height : 250,
			width : 'auto',
			viewrecords: true,
			loadComplete: function() {
			}
		});

		//선택버튼 클릭
// 		$('#btnSelect').Button({
// 			click: function(row) {
<%-- 				gridData = $('#<%=DBNamingConstants.AMS_ZIP_ZIBUN%>').Record(row); --%>
// 				$.Popup.Close(gridData);
// 			}
// 		});

	});
</script>
</head>
<body>
	<!-- <div id="container" class="container_pop">  container 때문에 화면 비율이 이상하게 나와서 일단 주석처리합니다... -->
	<div class="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea" class="type01">
				<div class="contTitle">
					<h2>우편번호조회</h2>
				</div>
				<div class="searchArea">
					<form id="MNGUSR001P10">
						<table class="tb_search">
							<colgroup>
								<col width="140" />
								<col width="229" />
								<col width="89" />
							</colgroup>
							<tr>
							<!-- 
								<th><label for="USER_ID">사용자ID</label>
								</th>
								<td>
									<input id="USER_ID" type="text" maxlength="20"/>
								</td>
							 -->
								<th><label for="DONGRI">동/읍/면/리 이름</label>
								</th>
								<td>
									<input id="DONGRI" type="text" maxlength="30" class="input01"/>
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
						<table id="<%=DBNamingConstants.AMS_ZIP_ZIBUN%>"></table>
						<!-- <div id="pager" class="paging"></div> -->
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>