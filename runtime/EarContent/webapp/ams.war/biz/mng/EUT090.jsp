<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>이관요청목록</title>
<%@include file="../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : EUT090.jsp
	 * 화면 설명  : 이관요청에 대한 진행상태 및 개요를 목록으로 조회한다
	 * 작성자      : 문태훈
	 * 작성일      : 2013-06-24
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	문태훈	2013-06-24	화면 생성
	 ****************************************************************************************/
	 $(function() {
			$('#form').Form({
				enter : '#btnSearch'
			});
			
			$.Page({
				init: function() {
					$.CodeHelper([{
						divId: 'MODULE',
		                parentCode: 'ETSRT2',
		                codeId: 'ETSRT2',
		                style: 'select',
		                type: 'SYS',
		                func: function(){
		                }
					}]);
				},
				Search_List: function(page){
					var request = $('#form').DataSet();
					request.fields.page = page;
					request.fields.page_size = 10;
					
					$.Page.Data['page'] = request.fields.page;
					
					// Service 호출
					$.Service({
						transaction: 'mng.MNGCOMB#selectTrnsf',
						request: request,
						response: '#RS_LIST',
						success: function(ds) {
							$('#pager').RecordSet(ds.recordSets.RS_LIST);
						}
					});
				}		
			});
			
			
			$('#SEARCH_GROUP').Select({
				blank: {
					value: '',
					label: '==선택=='
				},
				options: [{
					value: '01',
					label: '요청자'
				}, {
					value: '02',
					label: '이관명'
				}]
			});
			
			$('#btnSearch').Button({
				click: function() {
					$.Page.Search_List(1);
				}
			});
	 		
			$('#btnTodo').Button({
				click: function() {
					$.Navigate('EUT091.jsp');
				}
			});
			
	 		$('#RS_LIST').Grid({
				columns: [
					{
						id: 'TRNSF_SEQ',
						title: '이관번호',
						align: 'center',
						width: 120,
						formatter : function(cellvalue, options, rowdata) {
							return options.values.TRNSF_DT + '-' + cellvalue 
						}
					}, {
						id: 'SYS_MDUL_NM',
						title: '모듈',
						align: 'center',
						width: 100
					}, {
						id: 'TRNSF_SBJTC',
						title: '이관명',
						align: 'left',
						width: 180
					}, {
						id: 'PRG_STTS_NM',
						title: '진행상태',
						align: 'center',
						width: 90
					}, {
						id: 'REQPSN_NM',
						title: '요청자',
						align: 'center',
						width: 80
					}, {
						id: 'REQPSN_DT',
						title: '요청일시',
						align: 'center',
						width: 100,
						formatter : function(cellvalue, options, rowdata) {
							var rdate = cellvalue.substring(0,10)
						    return rdate;
						}
					}, {
						id: 'QA_TRNSF_DT',
						title: 'QA이관일시',
						align: 'center',
						width: 100,
						formatter : function(cellvalue, options, rowdata) {
							var rdate = cellvalue.substring(0,10)
						    return rdate;
						}
					}, {
						id: 'TEST_CHRG_NM',
						title: '테스트담당자',
						align: 'center',
						width: 100
					}, {
						id: 'TEST_DT',
						title: '테스트일시',
						align: 'center',
						width: 100,
						formatter : function(cellvalue, options, rowdata) {
							var rdate = cellvalue.substring(0,10)
						    return rdate;
						}
					}, {
						id: 'OPER_TRNSF_DT',
						title: '운영이관일시',
						align: 'center',
						width: 100,
						formatter : function(cellvalue, options, rowdata) {
							var rdate = cellvalue.substring(0,10)
						    return rdate;
						}
					}, {
						id: 'SYS_MDUL_CD',
						title: '모듈',
						hidden: true
					}, {
						id: 'PRG_STTS_CD',
						title: '진행상태',
						hidden: true
					}, {
						id: 'CMPL_HOP_DT',
						title: '완료희망일',
						hidden: true
					}, {
						id: 'REQST_TP_CD',
						title: '요청유형',
						hidden: true
					}, {
						id: 'CHMNG_TP_CD',
						title: '변경유형',
						hidden: true
					}, {
						id: 'CUST_REQPSN_NM',
						title: '현업요청자',
						hidden: true
					}, {
						id: 'CUST_REQPSN_TEAM_NM',
						title: '현업요청부서',
						hidden: true
					}, {
						id: 'REQPSN_ID',
						title: '요청자',
						hidden: true
					}, {
						id: 'REQPSN_CTNS',
						title: '요청상세',
						hidden: true
					}
				],
				height: 310,
				viewrecords: true,
				scrollOffset: 0,
				gridview: true,
				//multiselect: true,
				loadComplete: function() {
				},
				click : function(row, iRow, iCol, e) {
					var gridData = $('#RS_LIST').Record(row);
					if(gridData.PRG_STTS_CD == 'SAV' || gridData.PRG_STTS_CD == 'RJT'){
						gridData.PRG_STTS_CD = 'SAV';
						$.Navigate('EUT091.jsp', gridData);
					}else {
						$.Navigate('EUT092.jsp', gridData);
					}
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
	<div id="container">
		<!-- //headerArea-->
		<%@include file="../common/TopMenu.jsp"%>
		<!-- //headerArea-->

		<div id="wrapper" class="clearfix">
			<!-- //leftArea-->
			<%@include file="../common/LeftMenu.jsp"%>
			<!-- //leftArea-->

			<div id="contentArea">
				<div class="contTitle">
					<h1>이관요청목록</h1>
				</div>
				<div class="location">
					<span class="home">공통</span> &gt;
					<span class="depth01">소스이관관리</span>
				</div>

				<div class="searchArea">
					<form id="form">
						<table class="tb_search">
							<colgroup>
								<col width="120" />
								<col width="680" />
							</colgroup>
							<tr class="line01">
								<th><label>모듈</label></th>
								<td class="nobd">
									<div id="MODULE"></div>
									<!-- <select id="MODULE" class="selectbox05"></select> -->
								</td>
							</tr>
							<tr>
								<th><label>검색조건</label></th>
								<td class="nobd">
									<select id="SEARCH_GROUP" class="selectbox05"></select>
									<input id="SEARCH" type="text" class="input01 codeNm" />
								</td>
							</tr>
						</table>
					</form>
				</div>

				<div class="searchLayer">
					<button id="btnSearch" class="btnSearch">
						<span class="button-text"><em>조회</em> </span>
					</button>
				</div>
				
				<div class="btn_common">
					<span class="button iconBtn"><button id="btnTodo">
							<span class="iconTodo"></span><span class="button-text">요청서작성</span>
						</button> </span>
				</div>
				
				<div class="tb_basic">
					<table id="RS_LIST"></table>
					<div id="pager" class="paging"></div>
				</div>
				
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
