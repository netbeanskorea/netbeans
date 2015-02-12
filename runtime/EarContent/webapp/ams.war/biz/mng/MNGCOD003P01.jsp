<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>코드 검색</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGCOD003P01
	 * 화면 설명  : 특화코드검색
	 * 작성자        : 성지호
	 * 작성일        : 2013-03-22
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	성지호	2013-03-22	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGCOD003P01_Search').Form().Enter('#btnSearch');

		$.Page({
			init : function() {
				var parentData = $.Page.Data();
				$('#CODE_ID').val(parentData.CODE_ID);
				$('#CODE_LIST').RecordSet(parentData.CODE_LIST);
			},
			SearchCode : function() {
				var request = $('#MNGCOD003P01_Search').DataSet();
				$.Service({
					transaction : 'mng.MNGCODB#selectCodeIdCodeHelper',
					request : request,
					response : '#CODE_LIST',
					success : function(ds) {
						if (ds.recordSets.CODE_LIST.nc_list.length == 0) {
							alert('조회 결과가 없습니다.');
						}
					}
				});
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				$.Page.SearchCode();
			}
		})

		$('#CODE_LIST').Grid({
			columns : [ {
				id : 'CODE_ID',
				title : '코드 ID',
				width : '150',
				align : 'center'
			}, {
				id : 'CODE_NAME',
				title : '코드명',
				align : 'left',
				width : '220'
			}, {
				id : 'PARENT_CODE_ID',
				title : '부모코드명',
				width : '100'
			}, {
				id : 'CODE_REMARK',
				title : 'CODE_REMARK',
				hidden : true
			}, {
				id : 'ATTRIBUTE_01',
				title : 'ATTRIBUTE_01',
				hidden : true
			}, {
				id : 'ATTRIBUTE_02',
				title : 'ATTRIBUTE_02',
				hidden : true
			}, {
				id : 'ATTRIBUTE_03',
				title : 'ATTRIBUTE_03',
				hidden : true
			}, {
				id : 'ATTRIBUTE_04',
				title : 'ATTRIBUTE_04',
				hidden : true
			}, {
				id : 'ATTRIBUTE_05',
				title : 'ATTRIBUTE_05',
				hidden : true
			}, {
				id : 'ATTRIBUTE_06',
				title : 'ATTRIBUTE_06',
				hidden : true
			}, {
				id : 'ATTRIBUTE_07',
				title : 'ATTRIBUTE_07',
				hidden : true
			}, {
				id : 'ATTRIBUTE_08',
				title : 'ATTRIBUTE_08',
				hidden : true
			}, {
				id : 'ATTRIBUTE_09',
				title : 'ATTRIBUTE_09',
				hidden : true
			}, {
				id : 'ATTRIBUTE_10',
				title : 'ATTRIBUTE_10',
				hidden : true
			} ],
			dblclick : function(rowid) {
				var code = $('#CODE_LIST').Record(rowid);
				$.Page.Close(code);
			},
			height : 250,
			width : 'auto',
			viewrecords : true,
			scrollOffset : 0,
			loadComplete : function() {
			}
		});
	});
</script>
</head>
<body>
	<!-- <div id="container" class="container_pop">  container 때문에 화면 비율이 이상하게 나와서 일단 주석처리합니다... -->
	<div id="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea" class="type01">
				<div class="contTitle">
					<h2>코드 검색</h2>
				</div>
				<div class="searchArea">
					<form id="MNGCOD003P01_Search">
						<table class="tb_search">
							<colgroup>
								<col width="120">
								<col width="244">
								<col width="94">
							</colgroup>
							<tr>
								<th><label for="CODE_ID">CODE_ID</label></th>
								<td><input id="CODE_ID" type="text" maxlength="7" class="input01" /></td>
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
					<form id="gridForm">
						<table id="CODE_LIST"></table>
					</form>
				</div>
			</div>
		</div>
	</div>
	<!-- </div> -->
</body>
</html>