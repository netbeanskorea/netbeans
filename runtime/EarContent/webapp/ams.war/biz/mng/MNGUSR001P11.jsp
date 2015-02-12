<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>거래처조회</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR001P11.jsp
	 * 화면 설명  : 거래처조회
	 * 작성자       : 
	 * 작성일       : 2013-01-24
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * 
	 ****************************************************************************************/
	$(function() {
		$('#MNGUSR001P11').Form({
			enter : '#btnSearch'
		});
		$.Page({
			init: function(){
				var parentData = $.Page.Data();
				$('#LOC_CD').val(parentData.LOC_CD);
				$('#schKind').val(parentData.schKind);
				$.Page.Search_List(1);
			},
			Search_List: function(page) {
				var request = $('#MNGUSR001P11').DataSet();
				$.Service({
					transaction: 'mng.MNGUSRB#selectTlocCode',
					request: request,
					response: '#LOC_LIST',
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
				}
			}
		});
		
		$('#schKind').Options([
		              			{
		              				value: '',
		              				label: '===선택==='
		              			}, {
		              				value: 'LOCATION_ID',
		              				label: 'LOCATION_ID'
		              			}, {
		              				value: 'BIZCNN_ID',
		              				label: '거래처코드'
		              			}, {
		              				value: 'AGNC_CD',
		              				label: '에이전트코드'
		              			}
		              		]);

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click: function() {
				$.Page.Search_List(1);
			}
		})

		$('#LOC_LIST').Grid({
			columns: [
				{
					id: 'checkbox',
					title: 'check',
					type: 'checkbox',
					align: 'center',
					width: '50',
					fixed: true
				}, {
					id: 'LOCATION_ID',
					title: 'Location ID',
					align: 'left',
					width: '70'
				}, {
					id: 'LOCATION_NM',
					title: 'Location명',
					align: 'left',
					width: '150'
				}, {
					id: 'LOCATION_TYP_CD',
					title: 'Location타입',
					align: 'left',
					width: '70'
				}, {
					id: 'BIZCNN_ID',
					title: '거래처코드',
					align: 'left',
					width: '70'
				},{
					id: 'AGNC_CD',
					title: '에이전트코드',
					align: 'left',
					width: '70'
				}, {
					id: 'BIZ_TYP_CD',
					title: 'BIZ타입',
					align: 'left',
					width: '70'
				}, {
					id: 'ZIPCD',
					title: '우편번호',
					align: 'center',
					width: '70'
				}, {
					id: 'ZIPADR',
					title: '주소',
					align: 'left',
					width: '200'
				}
			],
			click: function(row) {
				gridData = $('#LOC_LIST').Record(row);
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
					<h2>거래처조회</h2>
				</div>
				<div class="searchArea">
					<form id="MNGUSR001P11">
						<table class="tb_search">
							<colgroup>
								<col width="124" />
								<col width="350" />
								<col width="124" />
								<col width="224" />
								<col width="86" />
							</colgroup>
							<tr>
								<th><select id="schKind"></select>
								</th>
								<td>
									<input id="LOC_CD" type="text" maxlength="20" class="input01"/>
								</td>
								<th><label for="LOC_NM">거래처명</label>
								</th>
								<td>
									<input id="LOC_NM" type="text" maxlength="30" class="input01"/>
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
						<table id="LOC_LIST"></table>
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
</body>
</html>