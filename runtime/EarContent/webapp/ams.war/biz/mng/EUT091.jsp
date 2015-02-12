<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>이관요청등록</title>
<%@include file="../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : EUT091.jsp
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
		var seq
		var TRNSF_DT = $.datepicker.formatDate('yymmdd', new Date());;
		
		$('#tab1').Tab(0);
		$('#tab1').Disable(1);
		$('#tab1').Disable(2);
		$('#tab1').Disable(3);
		
		$('#form').Form({
			validation : { 
				ETSRT6 : {
					required : true,
					name : '프로젝트'
				}, 
				ETSRT4 : {
					required : true,
					name : '파일유형'
				},
				FILE_PATH_CTNS : {
					required : true,
					name : '경로/이름'
				}
			}
		});
		
		$('#CMPL_HOP_DT').Date();
		
		$.Page({
			init: function() {

				$.CodeHelper([{
					divId: 'SYS_MDUL_CD',
	                parentCode: 'ETSRT2',
	                codeId: 'ETSRT2',
	                style: 'select',
	                type: 'SYS',
	                func: function(){
	                }
				}, {
					divId: 'REQST_TP_CD',
	                parentCode: 'ETSRT1',
	                codeId: 'ETSRT1',
	                style: 'select',
	                type: 'SYS',
	                func: function(){
	                }
				}, {
					divId: 'CHMNG_TP_CD',
	                parentCode: 'ETSRT3',
	                codeId: 'ETSRT3',
	                style: 'select',
	                type: 'SYS',
	                func: function(){
	                }
				}, {
					divId: 'PRJ_CD',
	                parentCode: 'ETSRT6',
	                codeId: 'ETSRT6',
	                style: 'select',
	                type: 'SYS',
	                mwidth: '100px',
	                func: function(){
	                }
				}, {
					divId: 'FILE_TP_CD',
	                parentCode: 'ETSRT4',
	                codeId: 'ETSRT4',
	                style: 'select',
	                type: 'SYS',
	                func: function(){
	                }
				}], function() {
					$('#form').Form({
						validation : {
							ETSRT6 : {
								required : true,
								name : '프로젝트'
							}, 
							ETSRT4 : {
								required : true,
								name : '파일유형'
							}
						}
					});
				});
				
				var req = {
					fields : {}
				};

				req.fields.CODE_ID = 'ETSRT6';
				$('#RS_LIST').EMKSelectBoxInit(
						'mng.MNGCODS#selectSelector', req,
						'PROJECT_NM');

				req.fields.CODE_ID = 'ETSRT4';
				$('#RS_LIST').EMKSelectBoxInit(
						'mng.MNGCODS#selectSelector', req,
						'FILE_NM'); 
				
				if($.Page.Data("PRG_STTS_CD") == 'SAV'){
					seq = $.Page.Data("TRNSF_SEQ").substring(9);
					var obj = {
						fields: {
							TRNSF_SEQ: seq
						}
					}
					$.Page.Search_List(obj)
				}else {
					seq = 0;
					var cDate = $.datepicker.formatDate('yy-mm-dd', new Date());
					var now = new Date();
					var cOutStr = ' '+now.getHours()+':'+now.getMinutes();
					$('#REQPSN_DT').Value(cDate+cOutStr); //요청일시
					$('#DATE').Value(cDate+cOutStr); //진행상태
					$('#REQPSN_NM').Value('<%=loginName%>');
					$('#REQPSN_ID').Value('<%=loginId%>');
					$('#NAME').Value('<%=loginName%>');
					$('#TRNSF_DT').Value(TRNSF_DT); //이관일자
				}
			},
			Search_List: function(obj){
				$('#RS_LIST')._clear();
				 $.Service({
					transaction: 'mng.MNGCOMB#selectTbl',
					request: obj,
					//response: '#RS_LIST',
					success: function(ds) {
						if($.Page.Data("PRG_STTS_CD") == 'SAV'){
							$('#TRNSF_DT').Value($.Page.Data("TRNSF_SEQ").substring(0,8));
							$('#TRNSF_SEQ').Value($.Page.Data("TRNSF_SEQ").substring(9));
							$('#REQPSN_DT').Value($.Page.Data("REQPSN_DT"));
							$('#TRNSF_SBJTC').Value($.Page.Data("TRNSF_SBJTC"));
							$('#CMPL_HOP_DT').Value($.Page.Data("CMPL_HOP_DT"));
							$('#REQPSN_ID').Value($.Page.Data("REQPSN_ID"));
							$('#REQPSN_NM').Value($.Page.Data("REQPSN_NM"));
							$('#CUST_REQPSN_NM').Value($.Page.Data("CUST_REQPSN_NM"));
							$('#CUST_REQPSN_TEAM_NM').Value($.Page.Data("CUST_REQPSN_TEAM_NM"));
							$('#NAME').Value($.Page.Data("REQPSN_NM"));
							$('#DATE').Value($.Page.Data("REQPSN_DT"));
							$('#ETSRT2').Value($.Page.Data("SYS_MDUL_CD"));
							$('#ETSRT1').Value($.Page.Data("REQST_TP_CD"));
							$('#ETSRT3').Value($.Page.Data("CHMNG_TP_CD"));
							$('#REQPSN_CTNS').text($.Page.Data("REQPSN_CTNS"));
							$('#RS_LIST').RecordSet(ds.recordSets.RS_LIST);
						}
						
						/* if(ds.recordSets.RS_LIST.nc_list.length !== 0){
							seq = ds.recordSets.RS_LIST.nc_list[ds.recordSets.RS_LIST.nc_list.length-1].TRNSF_SEQ
						} */
					}
				});
			}		
		});
		
		$('#btnFind').Button({
			click: function() {
				$.Popup({
					url: '../../web/jsp/EUT/EUT085.jsp',
					center: true,
					width: 550,
					height: 590,
					data: {
					},
					close: function(data) {
						if(!data) {
							return;
						} else {
							$('#CUST_REQPSN_NM').Value(data.USER_NAME);
							$('#CUST_REQPSN_TEAM_NM').Value(data.BRNOFC_TEAM_NM);
						}
					}
				});
			}
		});
		
		$('#btnNew').Button({
			click: function() {
				$('#form').Validate(function() {
					var project =  $('#ETSRT6 :selected').text();
					var file =  $('#ETSRT4 :selected').text();
					if(project === '==선택=='){
						project = '';
					}
					if(file === '==선택=='){
						file = '';
					}
					$('#RS_LIST').Add({
						Flag: 'C',
						PROJECT_NM: project,
						PROJECT_CD: $('#ETSRT6').Value(),
						FILE_NM: file,
						FILE_TP_CD: $('#ETSRT4').Value(),
						FILE_PATH_CTNS: $('#FILE_PATH_CTNS').Value(),
						TRNSF_SEQ: seq
					});
				});
			}
		});
		
		$('#btnSave').Button({
			click: function() {
				var ds = {
					fields : {},
					recordSets : {
						RS_LIST : {
							nc_list : []
						}
					}
				};
				
				$('#RS_LIST tr').each(function() {
					$('#RS_LIST').RowSave($(this).attr('id'));
				});

				if (window.confirm("저장하시겠습니까?")) {
					var selrow = $("#RS_LIST").RecordSet();
	
					for ( var i = 0, j = 0; i < selrow.nc_list.length; i++) {
						if($('#RS_LIST').Column(selrow.nc_list[i], 'Flag') !== 'R') {
							selrow.nc_list[i].TRNSF_DT = $('#TRNSF_DT').Value();
							ds.recordSets.RS_LIST.nc_list[j] = selrow.nc_list[i];
							j++;
						}
					}
					
					if (ds.recordSets.RS_LIST.nc_list.length == '0')
						alert("저장 대상 데이터가 없습니다.");
					else {
						 $.Service({
							transaction: 'mng.MNGCOMB#saveTbl',
							request: ds,
							success: function(ds) {
								seq = ds.fields.TRNSF_SEQ;
								$.Page.Search_List(ds);
							}
						});
					}
				}
				
			}
		});
		
		$('#btnDelete').Button({
			click: function() {
				if (lastsel !== '') {
					if ($('#RS_LIST').Column(lastsel, 'Flag') === 'C') {
						$('#RS_LIST').Remove(lastsel);
					} else {
						$('#RS_LIST').Column(lastsel, 'Flag', 'D');
					}
				}
			}
		});
		
 		$('#RS_LIST').Grid({
			columns: [
			    {
					id: 'Flag',
					title: 'Flag',
					align: 'center',
					width: 50,
					fixed: true
			    }, {
					id: 'PROJECT_NM',
					title: '프로젝트',
					align: 'left',
					width: 150,
					editable : true,
					edittype : 'select',
					editvalid : {
						required : true
					}
				}, {
					id: 'FILE_NM',
					title: '파일유형',
					align: 'center',
					width: 150 ,
					editable : true,
					edittype : 'select',
					editvalid : {
						required : true
					}
				}, {
					id: 'FILE_PATH_CTNS',
					title: '경로/이름',
					align: 'left',
					width: 300,
					editable : true
				}, {
					id: 'PROJECT_CD',
					title: '프로젝트 CD',
					hidden: true
				}, {
					id: 'FILE_TP_CD',
					title: '파일유형 코드',
					hidden: true
				}, {
					id: 'TRNSF_SEQ',
					title: '이관번호',
					hidden: true
				}, {
					id: 'OBJ_SEQ',
					title: '객체번호',
					hidden: true
				}
			],
			height: 100,
			viewrecords: true,
			//scrollOffset: 0,
			gridview: true,
			//multiselect: true,
			click : function(row, iRow, iCol, e) {
				if (row) {
					$('#RS_LIST').RowSave(lastsel);
					$('#RS_LIST').RowRestore(lastsel); // 이전 edit창 닫기
					$('#RS_LIST').EMKRowEdit(row, [ 'OBJ_SEQ' ]);
					lastsel = row;
				}
			}, 
			loadComplete: function(data) {
			}
		});
 		
 		//임시저장
		$('#btnSaveTem').Button({
			click: function() {
				if($('#ETSRT2').Value() === ''){
					$('#ETSRT2').focus();
					return alert('모듈: 반드시 입력해야 합니다.');	
				}else if ($('#ETSRT1').Value() === ''){
					$('#ETSRT1').focus();
					return alert('요청유형: 반드시 입력해야 합니다.');	
 				}else if($('#ETSRT3').Value() === ''){
					$('#ETSRT3').focus();
					return alert('변경유형: 반드시 입력해야 합니다.');	
	 			}else if($('#TRNSF_SBJTC').Value() === ''){
					$('#TRNSF_SBJTC').focus();
					return alert('이관제목: 반드시 입력해야 합니다.');	
	 			}
				
				for(var i = 1; i < $('#RS_LIST').Length()+1; i++){
					if($('#RS_LIST').Column(i, 'Flag') === 'D' ||
					   $('#RS_LIST').Column(i, 'Flag') === 'U' ||
					   $('#RS_LIST').Column($('#RS_LIST tr:last').closest('tr').attr('id'), 'Flag') === 'C'){
						return alert('이관대상을 저장해 주세요');
					}
				}
				
				var request = $('#form').DataSet();
				if($.Page.Data("PRG_STTS_CD") == 'SAV'){
					request.fields.PRG_STTS_CD_S = 'SAV_UPDATE'
				}
				request.fields.PRG_STTS_CD = 'SAV'
				$.Service({
					transaction: 'mng.MNGCOMB#saveTrn',
					request: request,
					success: function(ds) {
						$.Navigate('EUT090.jsp');
					}
				});
			}
		});
 		
 		//요청
		$('#btnRequest').Button({
			click: function() {
				if($('#ETSRT2').Value() === ''){
					$('#ETSRT2').focus();
					return alert('모듈: 반드시 입력해야 합니다.');	
				}else if ($('#ETSRT1').Value() === ''){
					$('#ETSRT1').focus();
					return alert('요청유형: 반드시 입력해야 합니다.');	
 				}else if($('#ETSRT3').Value() === ''){
					$('#ETSRT3').focus();
					return alert('변경유형: 반드시 입력해야 합니다.');	
	 			}else if($('#TRNSF_SBJTC').Value() === ''){
					$('#TRNSF_SBJTC').focus();
					return alert('이관제목: 반드시 입력해야 합니다.');	
	 			}
				
				for(var i = 1; i < $('#RS_LIST').Length()+1; i++){
					if($('#RS_LIST').Column(i, 'Flag') === 'D' ||
					   $('#RS_LIST').Column(i, 'Flag') === 'U' ||
					   $('#RS_LIST').Column($('#RS_LIST tr:last').closest('tr').attr('id'), 'Flag') === 'C'){
						return alert('이관대상을 저장해 주세요');
					}
				}
				var request = $('#form').DataSet();
				if($.Page.Data("PRG_STTS_CD") == 'SAV'){
					request.fields.PRG_STTS_CD_S = 'SAV_UPDATE'
				}
				request.fields.PRG_STTS_CD = 'REQ'
				
				$.Service({
					transaction: 'mng.MNGCOMB#saveTrn',
					request: request,
					success: function(ds) {
						$.Navigate('EUT090.jsp');
					}
				});
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
					<h1>이관요청등록</h1>
				</div>
				<div class="location">
					<span class="home">공통</span> &gt;
					<span class="depth01">소스이관관리</span>
				</div>
				
				<div class="tb_data">
					<form id ='form'>
						<input id="REQPSN_ID" type="hidden"/>
						<input id="TRNSF_DT" type="hidden"/>
						<input id="TRNSF_SEQ" type="hidden"/>
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
								<th><label>요청자</label></th>
								<td>
									<input id="REQPSN_NM" type="text" class="input01" readonly />
								</td>
								<th><label>요청일시</label></th>
								<td>
									<input id="REQPSN_DT" type="text" class="input01" readonly />
								</td>
								<th><label>완료희망일</label></th>
								<td class="nobd">
									<input id="CMPL_HOP_DT" type="text" class="input01 date01" />
								</td>
							</tr>
							<tr>
								<th><label>현업요청자</label></th>
								<td>
									<input id="CUST_REQPSN_NM" type="text" class="input01" readonly="readonly" />
									<span class="button gridBtn">
										<button id="btnFind">
											<span class="iconFind"></span><span class="button-text">찾기</span>
										</button>
									</span>
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
									<div id="SYS_MDUL_CD"></div>
								</td>
								<th><label>요청유형</label></th>
								<td>
									<div id="REQST_TP_CD"></div>
								</td>
								<th><label>변경유형</label></th>
								<td class="nobd">
									<div id="CHMNG_TP_CD"></div>
								</td>
							</tr>
							<tr>
								<th><label>이관제목</label></th>
								<td colspan="5" class="nobd">
									<input id="TRNSF_SBJTC" type="text" class="input01 num02" />
								</td>
							</tr>
							<tr>
								<th></th>
								<td colspan="5" class="nobd">
									<div class="tb_data">
										<table>
											<colgroup>
												<col width="130" />
												<col width="150" />
												<col width="120" />
												<col width="170" />
												<col width="180" />
											</colgroup>
											<tr>
												<th><label>프로젝트</label></th>
												<td>
													<div id="PRJ_CD"></div>
												</td>
												<th><label>파일유형</label></th>
												<td class="nobd">
													<div id="FILE_TP_CD"></div>
												</td>
												<td class="nobd txt_r">
													<span class="button gridBtn"><button id="btnDelete">
														<span class="iconDelete"></span><span class="button-text">삭제</span>
													</button> </span>
													<span class="button gridBtn"><button id="btnSave">
														<span class="iconSave"></span><span class="button-text">저장</span>
													</button> </span>
													<span class="button gridBtn"><button id="btnNew">
														<span class="iconNew"></span><span class="button-text">신규</span>
													</button> </span>
												</td>
											</tr>
											<tr>
												<th><label>경로/이름</label></th>
												<td colspan="4" class="nobd">
													<input id="FILE_PATH_CTNS" type="text" class="input01 num02" />
												</td>
											</tr>
										</table>
									</div>
								</td>
							</tr>
							<tr>
								<th><label>이관대상</label>
								</th>
								<td colspan="5" class="nobd">
									<div class="tb_basic">
										<table id="RS_LIST" class="mgt00"></table>
									</div>
								</td>
							</tr>
							<tr>
								<th><label>진행상태</label>
								</th>
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
																<input id="NAME" type="text" class="input01" readonly="readonly" />
															</td>
															<th><label>처리일시</label></th>
															<td class="nobd">
																<input id="DATE" type="text" class="input01 date03" readonly="readonly" />
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
										</div>
									</div>
								</td>
							</tr>
						</table>
					</form>
				</div>
				
				<div class="btn_main">
					<span class="button iconBtn"><button id="btnSaveTem">
						<span class="iconSaveTem"></span><span class="button-text">임시저장</span>
					</button> </span>
					<span class="button iconBtn"><button id="btnRequest">
							<span class="iconRequest"></span><span class="button-text">요청</span>
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
