<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>BTS I/F Log 관리</title>
<%@include file="../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : EUT028.jsp
	 * 화면 설명  : BTS I/F Log 관리
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
			$('#daterange').DateRange();
			
			$.Page({
				init: function() {
				},
				Search_List: function(page){
					var request = $('#form').DataSet();
					request.fields.page = page;
					request.fields.page_size = 10;
					$.Page.Data['page'] = request.fields.page;
					
					// Service 호출
					$.Service({
						transaction: 'mtr.MTRLOGB#selectBTSLogList',
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
					label: '===전체==='
				},
				options: [{
					value: '01',
					label: 'I/F Name'
				}, {
					value: '02',
					label: '결과메시지'
				}, {
					value: '03',
					label: 'Request'
				}, {
					value: '04',
					label: 'Response'
				}]
			});
			
			$('#IF_RSLT_CD').Select({
				blank: {
					value: '',
					label: '===전체==='
				},
				options: [{
					value: 'Y',
					label: 'Y'
				}, {
					value: 'N',
					label: 'N'
				}]
			});
			
			$('#btnSearch').Button({
				click: function() {
					$.Page.Search_List($.Param('page') || 1);
				}
			});
			
	 		$('#RS_LIST').Grid({
				columns: [
				    {
				    	id: 'IF_DT',
						title: '기준일',
						hidden: true
				    }, {
						id: 'IF_SEQ',
						title: 'I/F 번호',
						align: 'center',
						width: 120,
						formatter: function(value, data){
							return '<a href="#" class="popupLink link01" SEQ="' + $.ParamEncode(value) + '">'+ data.values.IF_DT + '_' + value +'</a>'
						}
					}, {
						id: 'IF_TP_CD',
						title: 'I/F CD',
						align: 'center',
						width: 80
					}, {
						id: 'IF_APP_NM',
						title: 'I/F Name',
						align: 'left',
						width: 160
					}, {
						id: 'IF_STRN_DTTM',
						title: '호출일시',
						align: 'center',
						width: 150
					}, {
						id: 'IF_END_DTTM',
						title: '응답일시',
						align: 'center',
						width: 150
					}, {
						id: 'IF_RSLT_CD',
						title: '정상여부',
						align: 'center',
						width: 70
					}, {
						id: 'IF_MSG',
						title: '결과메시지',
						align: 'left',
						width: 160
					}
				],
			height: 'auto',
			viewrecords: true,
			//scrollOffset: 0,
			gridview: true,
			loadComplete: function() {
			}
		});
	 		
	 	$('#RS_LIST').on('click','.popupLink', function(row){
	 		var seq = $(this).attr('SEQ');
	 		
			$.Popup({
				url : 'EUT030.jsp',
				center : true,
				width : 770,
				height : 500,
				data : {
					'SEQ' : seq
				},
				center : true,
				close : function(data) {
					if (data === undefined || data===null) {
						
					}else{
						$.Page.Search_List(1);
					}
				}
			});
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
					<h1>BTS I/F Log 관리</h1>
				</div>
				<div class="location">
					<span class="home">모니터링</span> &gt;
					<span class="depth01">I/F 로그</span>
				</div>

				<div class="searchArea">
					<form id="form">
						<table class="tb_search">
							<colgroup>
								<col width="120" />
								<col width="680" />
							</colgroup>
							<tr class="line01">
								<th><label>검색조건</label></th>
								<td>
									<select id="SEARCH_GROUP" class="selectbox05"></select>
									<input id="SEARCH" type="text" class="input01 codeNm" />
								</td>
							</tr>
							<tr class="line01">
								<th><label>호출일</label></th>
								<td>
									<span id="daterange">
										<input id="START_DT" type="text" class="input01 date01" /> ~
										<input id="END_DT" type="text" class="input01 date01" />
									</span>
								</td>
							</tr>
							<tr>
								<th><label>정상여부</label></th>
								<td>
									<select id="IF_RSLT_CD"></select>
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
