<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>이관요청등록</title>
<%@include file="../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : EUT092.jsp
	 * 화면 설명  : 이관요청서를 작성한다
	 * 작성자      : 문태훈
	 * 작성일      : 2013-06-21
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	문태훈	2013-06-21	화면 생성
	 ****************************************************************************************/
	$(function() {
		var lastsel;
		var loginId = '<%=loginId%>' ;
		
		$('#tab1').Tab(0);
		$('#form').Form();
		
		$.Page({
			init: function() {
				$.Page.Search_List();
				
				var request = {
					fields : {
						CD_CLAS : 'ETSRT2',
						CD : $.Page.Data("SYS_MDUL_CD")
					}
				};
				
				$.Service({
					transaction: 'mng.MNGCODB#selectCCDList',
					request: request,
					success: function(ds) {
						var dsc1 = ds.recordSets.CCD_RS.nc_list[0].DSC_1;
						var dsc2 = ds.recordSets.CCD_RS.nc_list[0].DSC_2;
						if(dsc1 === 'SN50003839'){
							$('#tab1').Active(0);
							$('#tab1').Disable(1);
							$('#status3').Hide();
						}
						if(dsc2 === loginId){
							$('#tab1').Active(1);
							$('#tab1').Disable(2);
							$('#status4').Hide();
						}
						console.log("dsc1 : " + dsc1);
						console.log("dsc2 : " + dsc2);
					}
				});
				
			},
			Search_List: function(){
				 var obj = {
					 fields: {
						 TRNSF_DT: $.Page.Data("TRNSF_SEQ").substring(0, 8),
						 TRNSF_SEQ: $.Page.Data("TRNSF_SEQ").substring(9)
					 }
				 }
				 $('#TRNSF_DT').Value($.Page.Data("TRNSF_SEQ").substring(0, 8))
				 $('#TRNSF_SEQ').Value($.Page.Data("TRNSF_SEQ").substring(9))
				 $.Service({
					transaction: 'mng.MNGCOMB#selectTrnsfDetail',
					request: obj,
					response: '#form',
					success: function(ds) {
						$('#TRNSF_NO').Value(ds.fields.TRNSF_DT + '-' + ds.fields.TRNSF_SEQ);

						var cDate = $.datepicker.formatDate('yy-mm-dd', new Date());
						var now = new Date();
						var cOutStr = ' '+now.getHours()+':'+now.getMinutes();
						if($.Page.Data("PRG_STTS_CD") === 'REQ') {
							$('#tab1').Active(1);
							$('#tab1').Disable(2);
							$('#tab1').Disable(3);
							$('#status4').Hide();
							$('#status5').Hide();
							$('#QA_CHRG_ID').Value('<%=loginId%>');
							$('#QA_CHRG_NM').Value('<%=loginName%>');
							$('#QA_TRNSF_DT').Value(cDate+cOutStr);
						}else if($.Page.Data("PRG_STTS_CD") === 'QAM') {
							$('#tab1').Active(2);
							$('#tab1').Disable(3);
							$('#status3').Hide();
							$('#status5').Hide();
							$('#TEST_CHRG_ID').Value('<%=loginId%>');
							$('#TEST_CHRG_NM').Value('<%=loginName%>');
							$('#TEST_DT').Value(cDate+cOutStr);
						}else if($.Page.Data("PRG_STTS_CD") === 'TST') {
							$('#tab1').Active(3);
							$('#status3').Hide();
							$('#status4').Hide();
							$('#OPER_TRNSF_CHRG_ID').Value('<%=loginId%>');
							$('#OPER_TRNSF_CHRG_NM').Value('<%=loginName%>');
							$('#OPER_TRNSF_DT').Value(cDate+cOutStr);
						}else if($.Page.Data("PRG_STTS_CD") === 'OPR') {
							$('#tab1').Active(3);
							$('#status1').Hide();
							$('#status2').Hide();
							$('#status3').Hide();
							$('#status4').Hide();
							$('#status5').Hide();
							$('#form').DisableAll();
						}else if($.Page.Data("PRG_STTS_CD") === 'CCL'){
							$('#status1').Hide();
							$('#status2').Hide();
							$('#status3').Hide();
							$('#status4').Hide();
							$('#status5').Hide();
							$('#tab1').Disable(1);
							$('#tab1').Disable(2);
							$('#tab1').Disable(3);
							$('#tab1').Disable(4);
							$('#form').DisableAll();
						}
					}
				 });

				 $.Service({
					transaction: 'mng.MNGCOMB#selectTbl',
					request: obj,
					response: '#RS_LIST',
					success: function(ds){
					}
				});
			}		
		});
		
		$('#btnFind').Button({
			click: function() {
				
			}
		});
		
		$('#btnFind2').Button({
			click: function() {
				
			}
		});
		
 		$('#RS_LIST').Grid({
			columns: [
				{
					id: 'PROJECT_NM',
					title: '프로젝트',
					align: 'left',
					width: 150
				}, {
					id: 'FILE_NM',
					title: '파일유형',
					align: 'center',
					width: 150
				}, {
					id: 'FILE_PATH_CTNS',
					title: '경로/이름',
					align: 'left',
					width: 300
				}
			],
			height: 100,
			viewrecords: true,
			//scrollOffset: 0,
			gridview: true,
			multiselect: false,
			loadComplete: function() {
			}
		});
 		
		//반려
		$('#btnRJT').Button({
			click: function() {
				var request = $('#form').DataSet();
				request.fields.PRG_STTS_CD = 'RJT'
				$.Service({
					transaction: 'mng.MNGCOMB#saveTrnsfDetail',
					request: request,
					success: function(ds) {
						$.Navigate('EUT090.jsp');
					}
				});
			}
		});

		//이관취소
		$('#btnCCL').Button({
			click: function() {
				var request = $('#form').DataSet();
				request.fields.PRG_STTS_CD = 'CCL'
				$.Service({
					transaction: 'mng.MNGCOMB#saveTrnsfDetail',
					request: request,
					success: function(ds) {
						$.Navigate('EUT090.jsp');
					}
				});
			}
		});
 		
		//QA이관완료
		$('#btnQAM').Button({
			click: function() {
				var request = $('#form').DataSet();
				request.fields.PRG_STTS_CD = 'QAM'
				$.Service({
					transaction: 'mng.MNGCOMB#saveTrnsfDetail',
					request: request,
					success: function(ds) {
						$.Navigate('EUT090.jsp');
					}
				});
			}
		});
 		
		//테스트완료
		$('#btnTST').Button({
			click: function() {
				var request = $('#form').DataSet();
				request.fields.PRG_STTS_CD = 'TST'
				$.Service({
					transaction: 'mng.MNGCOMB#saveTrnsfDetail',
					request: request,
					success: function(ds) {
						$.Navigate('EUT090.jsp');
					}
				});
			}
		});
 		
		//운영이관완료
		$('#btnOPR').Button({
			click: function() {
				var request = $('#form').DataSet();
				request.fields.PRG_STTS_CD = 'OPR'
				$.Service({
					transaction: 'mng.MNGCOMB#saveTrnsfDetail',
					request: request,
					success: function(ds) {
						$.Navigate('EUT090.jsp');
					}
				});
			}
		});
		
		//뒤로가기
		$('#btnBack').Button({
			click: function() {
				$.Page.Back();
			}
		})
		
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
					<h1>이관요청등록</h1>
				</div>
				<div class="location">
					<span class="home">공통</span> &gt;
					<span class="depth01">소스이관관리</span>
				</div>
				
				<div class="tb_data">
					<form id ='form'>
						<input id="TRNSF_DT" type="hidden">
						<input id="TRNSF_SEQ" type="hidden">
						<table>
							<colgroup>
								<col width="90" />
								<col width="220" />
								<col width="110" />
								<col width="180" />
								<col width="90" />
								<col width="140" />
							</colgroup>
							<tr>
								<th><label>이관번호</label></th>
								<td colspan="5" class="nobd">
									<input id="TRNSF_NO" type="text" class="input01" readonly="readonly" />
								</td>
							</tr>
							<tr>
								<th><label>요청자</label></th>
								<td>
									<input id="RGSTER_NM" type="text" class="input01" readonly />
								</td>
								<th><label>요청일시</label></th>
								<td>
									<input id="RGST_DTIM" type="text" class="input01" readonly />
								</td>
								<th><label>완료희망일</label></th>
								<td class="nobd">
									<input id="CMPL_HOP_DT" type="text" class="input01 date01" readonly />
								</td>
							</tr>
							<tr>
								<th><label>현업요청자</label></th>
								<td>
									<input id="CUST_REQPSN_NM" type="text" class="input01" readonly="readonly" />
									<!-- <span class="button gridBtn">
										<button id="btnFind">
											<span class="iconFind"></span><span class="button-text">찾기</span>
										</button>
									</span> -->
								</td>
								<th><label>현업요청부서</label></th>
								<td colspan="3" class="nobd">
									<input id="CUST_REQPSN_TEAM_NM" type="text" class="input01" readonly="readonly" />
									<!-- <span class="button gridBtn">
										<button id="btnFind2">
											<span class="iconFind"></span><span class="button-text">찾기</span>
										</button>
									</span> -->
								</td>
							</tr>
							<tr>
								<th><label>모듈</label></th>
								<td>
									<input id="SYS_MDUL_NM" type="text" class="input01" readonly="readonly" />
									<!-- <select id="selTodo1"></select> -->
								</td>
								<th><label>요청유형</label></th>
								<td>
									<input id="REQST_TP_NM" type="text" class="input01" readonly="readonly" />
									<!-- <select id="selTodo2"></select> -->
								</td>
								<th><label>변경유형</label></th>
								<td class="nobd">
									<input id="CHMNG_TP_NM" type="text" class="input01" readonly="readonly" />
									<!-- <select id="selTodo3"></select> -->
								</td>
							</tr>
							<tr>
								<th><label>이관제목</label></th>
								<td colspan="5" class="nobd">
									<input id="TRNSF_SBJTC" type="text" class="input01 num02" readonly="readonly" />
								</td>
							</tr>
							<tr>
								<th><label>이관대상</label></th>
								<td colspan="5" class="nobd">
									<div class="tb_basic">
										<table id="RS_LIST" class="mgt00"></table>
									</div>
								</td>
							</tr>
							<tr>
								<th><label>진행상태</label></th>
								<td colspan="5" class="nobd">
									<div id="tab1">
										<ul>
											<li class="on"><a href="#tab1Active">요청</a></li>
											<li><a href="#tab2Active">QA</a></li>
											<li><a href="#tab3Active">테스트</a></li>
											<li><a href="#tab4Active">운영이관</a></li>
										</ul>
										<div  class="tabContents">
											<div id="tab1Active">
												<div class="tb_data">
													<table class="nobdrtop">
														<tr>
															<th><label>담당자</label></th>
															<td>
																<input id="REQPSN_ID" type="hidden" />
																<input id="REQPSN_NM" type="text" class="input01" readonly="readonly" />
															</td>
															<th><label>처리일시</label></th>
															<td class="nobd">
																<input id="REQPSN_DT" type="text" class="input01 date03" readonly="readonly" />
															</td>
														</tr>
														<tr>
															<td colspan="4" class="nobd">
																<textarea id="REQPSN_CTNS" class="textarea04"></textarea>
															</td>
														</tr>
													</table>
												</div>
											</div>
											<div id="tab2Active">
												<div class="tb_data">
													<table class="nobdrtop">
														<tr>
															<th><label>담당자</label></th>
															<td>
																<input id="QA_CHRG_ID" type="hidden" />
																<input id="QA_CHRG_NM" type="text" class="input01" readonly="readonly" />
															</td>
															<th><label>처리일시</label></th>
															<td class="nobd">
																<input id="QA_TRNSF_DT" type="text" class="input01 date03" readonly="readonly" />
															</td>
														</tr>
														<tr>
															<td colspan="4" class="nobd">
																<textarea id="QA_TRNSF_CTNS" class="textarea04"></textarea>
															</td>
														</tr>
													</table>
												</div>
											</div>
											<div id="tab3Active">
												<div class="tb_data">
													<table class="nobdrtop">
														<tr>
															<th><label>담당자</label></th>
															<td>
																<input id="TEST_CHRG_ID" type="hidden" />
																<input id="TEST_CHRG_NM" type="text" class="input01" readonly="readonly" />
															</td>
															<th><label>처리일시</label></th>
															<td class="nobd">
																<input id="TEST_DT" type="text" class="input01 date03" readonly="readonly" />
															</td>
														</tr>
														<tr>
															<td colspan="4" class="nobd">
																<textarea id="TEST_CTNS" class="textarea04"></textarea>
															</td>
														</tr>
													</table>
												</div>
											</div>
											<div id="tab4Active">
												<div class="tb_data">
													<table class="nobdrtop">
														<tr>
															<th><label>담당자</label></th>
															<td>
																<input id="OPER_TRNSF_CHRG_ID" type="hidden" />
																<input id="OPER_TRNSF_CHRG_NM" type="text" class="input01" readonly="readonly" />
															</td>
															<th><label>처리일시</label></th>
															<td class="nobd">
																<input id="OPER_TRNSF_DT" type="text" class="input01 date03" readonly="readonly" />
															</td>
														</tr>
														<tr>
															<td colspan="4" class="nobd">
																<textarea id="OPER_TRNSF_CTNS" class="textarea04"></textarea>
															</td>
														</tr>
													</table>
												</div>
											</div>
										</div>
									</div>
								</td>
							</tr>
						</table>
					</form>
				</div>
				
				<div class="btn_main">
					<span id="status1" class="button iconBtn"><button id="btnRJT">
							<span class="iconTodo"></span><span class="button-text">반려</span>
						</button> </span>
					<span id="status2" class="button iconBtn"><button id="btnCCL">
							<span class="iconTodo"></span><span class="button-text">이관취소</span>
						</button> </span>
					<span id="status3" class="button iconBtn"><button id="btnQAM">
							<span class="iconTodo"></span><span class="button-text">QA이관완료</span>
						</button> </span>
					<span id="status4" class="button iconBtn"><button id="btnTST">
							<span class="iconTodo"></span><span class="button-text">테스트완료</span>
						</button> </span>
					<span id="status5" class="button iconBtn"><button id="btnOPR">
							<span class="iconTodo"></span><span class="button-text">운영이관완료</span>
						</button> </span>
					<span class="button iconBtn"><button id="btnBack">
						<span class="iconBack"></span><span class="button-text">목록</span>
					</button> </span>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
