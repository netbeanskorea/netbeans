<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>즐겨찾기 관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGMNU003.jsp
	 * 화면 설명  : 즐겨찾기 관리
	 * 작성자        : 이진희
	 * 작성일        : 2013-01-24
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	이진희	2013-01-24	화면 생성
	 * ver0.2	이진희	2013-02-01	기능 추가(flag 행추가 행삭제 및 기타기능)
	 * ver0.3	이진희	2013-02-02	validation 생성 (validation 문구 type 조정 필요)
	 * 2번째 팝업 적용 필요
	 ****************************************************************************************/
	$(function() {
		//조회 필수값 체크
		$('#MNGMNU003_goSearch').Form({
			validation : {
				USER_ID : {
					required : true,
					name : '사용자ID'
				},
				USER_NAME : {
					required : true,
					name : '사용자이름'
				}
			},
			enter : '#btnSearch'
		});
		var lastsel; // 마지막으로 선택된 행 ID
		$
				.Page({
					init : function() {
						lastsel = undefined;
					},
					Search_List : function(page) {
						var request = $('#MNGMNU003_goSearch').DataSet();

						$
								.Service({
									transaction : 'mng.MNGMNUB#selectFavoritesList',
									request : request,
									response : '#FAVORITES_RS',
									success : function(ds) {
										$('#count')
												.html(
														'('
																+ ds.recordSets.FAVORITES_RS.nc_totalRecordCount
																+ '건)');
										for ( var i = 1; i <= ds.recordSets.FAVORITES_RS.nc_totalRecordCount; i++) {
											$('#FAVORITES_RS').Column(i,
													'Flag', 'R'); //조회된 모든 행의 flag를 R로 셋팅
										}
									}
								});
					},
					EMKRowEdit : function(FAVORITES_RS, row, column) {
						$('#' + FAVORITES_RS).RowEdit(row, true);
						return this;
					}
				});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				lastsel = undefined;
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#MNGMNU003_goSearch').Clear();
					$('#FAVORITES_RS')._clear();
					$('#count').html('(0건)');
				}
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				lastsel = undefined;
				$('#MNGMNU003_goSearch').Validate(function() {
					$.Page.Search_List(1);
				});
			}
		});

		// 저장 버튼 클릭
		$('#btnSave')
				.Button(
						{
							click : function() {
								lastsel = undefined;
								$('#MNGMNU003_goSearch')
										.Validate(
												function() {
													var ds = {
														fields : {},
														recordSets : {
															FAVORITES_RS : {
																nc_list : []
															}
														}
													};
													$('#FAVORITES_RS tr')
															.each(
																	function() {
																		$(
																				'#FAVORITES_RS')
																				.RowSave(
																						$(
																								this)
																								.attr(
																										'id'));
																	});

													var rs = $('#FAVORITES_RS')
															.RecordSet();

													if (window
															.confirm("저장하시겠습니까?")) {
														for ( var i = 0, j = 0; i < rs.nc_list.length; i++) {
															if ($(
																	'#FAVORITES_RS')
																	.Column(
																			rs.nc_list[i],
																			'Flag') !== 'R') { // (row, column, value) 조회 또는 입력
																ds.recordSets.FAVORITES_RS.nc_list[j] = rs.nc_list[i];
																ds.recordSets.FAVORITES_RS.nc_list[j].USER_ID = $(
																		'#USER_ID')
																		.val(); // 유저아이디가 필요함
																j++;
															}
														}

														if (ds.recordSets.FAVORITES_RS.nc_list.length == '0')
															alert("저장 대상 데이터가 없습니다.");
														else {
															$
																	.Service({
																		transaction : 'mng.MNGMNUB#saveFavorites',
																		request : ds,
																		success : function(
																				page) {
																			$(
																					'#FAVORITES_RS')
																					._clear();
																			$.Page
																					.Search_List(1);
																			window
																					.alert('['
																							+ page.message.messageId
																							+ '] '
																							+ page.message.messageName);

																		},
																		error : function(
																				ds) {
																			window
																					.alert('['
																							+ ds.message.messageId
																							+ '] '
																							+ ds.message.messageName);
																		}
																	});
														}
													}
												});
							}
						});

		//사용자찾기버튼 클릭
		$('#btnUserId').Button({
			click : function() {
				$.Popup({
					width : 550,
					height : 495,
					url : 'MNGMNU003P01.jsp',
					center : true,
					close : function(data) {
						if (!data) {
							// TODO:
							return;
						}
						//팝업에서 가져온 USER_ID와 USER_NAME을 form에 맵핑
						$('#USER_ID').Value(data.USER_ID);
						$('#USER_NAME').Value(data.USER_NAME);
						$.Page.Search_List(1);
					}
				});
			}
		});

		// grid 추가 버튼 클릭
		$('#insertData')
				.Button(
						{
							click : function() {
								$('#MNGMNU003_goSearch')
										.Validate(
												function() {
													var rs = $('#FAVORITES_RS')
															.RecordSet();
													var list = [];

													for ( var j = 0; j < rs.nc_list.length; j++) {
														var temp = {
															MENU_ID : rs.nc_list[j].MENU_ID,
															MENU_CATEGORY : rs.nc_list[j].MENU_CATEGORY
														};
														list.push(temp);
													}

													$
															.Popup({
																url : 'MNGMNU003P02.jsp',
																width: 1000,
																height: 475,
																data : {
																	'USER_ID' : $(
																			'#USER_ID')
																			.Value(),
																	'LIST' : list
																},
																center : true,
																close : function(
																		data) {
																	var length = data.recordSets.MENU_RS.nc_list.length;
																	if (length === 0) {
																		// TODO:
																		return;
																	}

																	// popup에서 선택된 메뉴가 복수일 경우 삽입
																	for (i = 0; i < length; i++) {
																		var myData = {
																			Flag : 'C',
																			MENU_CATEGORY : data.recordSets.MENU_RS.nc_list[i].MENU_CATEGORY,
																			MENU_ID : data.recordSets.MENU_RS.nc_list[i].MENU_ID,
																			MENU_NAME : data.recordSets.MENU_RS.nc_list[i].MENU_NAME,
																			PAGE_URL : data.recordSets.MENU_RS.nc_list[i].PAGE_URL
																		};
																		$(
																				'#FAVORITES_RS')
																				.Add(
																						myData);
																	}
																}
															});
												});
							}
						});

		// grid 삭제 버튼 클릭
		$('#deleteData')
				.Button(
						{
							click : function() {
								if (lastsel !== undefined) {
									var rs = $('#FAVORITES_RS').RecordSet();

									// Flag가 'C'일 경우 바로삭제 그 이외에는 Flag를 'D'로 변경
									if (lastsel && lastsel !== '') {
										if ($('#FAVORITES_RS').Column(lastsel,
												'Flag') === 'C') {
											$('#FAVORITES_RS').Remove(lastsel);
										} else {
											$('#FAVORITES_RS').Column(lastsel,
													'Flag', 'D');
										}
									}
								} else {
									alert("선택된 행이 없습니다.");
								}
							}
						});

		$('#FAVORITES_RS').Grid({
			columns : [ {
				id : 'Flag',
				title : 'Flag',
				align : 'center',
				width : 50
			}, {
				id : 'MENU_CATEGORY',
				title : '구분',
				align : 'left'
			}, {
				id : 'MENU_ID',
				title : '메뉴ID',
				align : 'left'
			}, {
				id : 'MENU_NAME',
				title : '메뉴명',
				align : 'left'
			}, {
				id : 'PAGE_URL',
				title : 'URL',
				align : 'left'
			}, {
				id : 'FAVORITES_REMARK',
				title : '비고',
				align : 'left',
				editable : true
			} ],
			height : 231,
			viewrecords : true,
			scrollOffset : 0,
			//checkbox기능 삭제 	
			//multiselect: true,
			click : function(row, iRow, iCol, e) {
				if (row) {
					$('#FAVORITES_RS').RowSave(lastsel);
					$('#FAVORITES_RS').RowRestore(lastsel); // 이전 edit창 닫기
					$('#FAVORITES_RS').EMKRowEdit(row);
					lastsel = row;
				}
			},
			loadComplete : function() {
			}
		});

		// USER_ID 입력창에서 포커스가 벗어났을 경우 USER_NAME을 검색해서 맵핑(존재하지 않을 경우는 비움)
		$('#USER_ID').focusout(function() {
			if ($('#USER_ID').Value() !== '') {
				$.Service({
					transaction : 'mng.MNGMNUB#selectUserFind',
					request : {
						fields : {
							USER_ID : $('#USER_ID').Value()
						}
					},
					response : '#MNGMNU003_goSearch',
					success : function(ds) {
						if (ds.fields.USER_NAME === undefined) {
							$('#USER_NAME').Value('');
						}
					}
				});
			} else {
				$('#USER_ID').Value('');
				$('#USER_NAME').Value('');
			}
		});

		// USER_NAME 입력창에서 포커스가 벗어났을 경우 USER_ID을 검색해서 맵핑
		// 1. 두개 이상 존재할 경우는 팝업창을 띄움
		// 2. 존재하지 않을 경우는 비움
		$('#USER_NAME').focusout(function() {
			if ($('#USER_NAME').Value() !== '') {
				$.Service({
					transaction : 'mng.MNGMNUB#selectUserFind',
					request : {
						fields : {
							USER_NAME : $('#USER_NAME').Value()
						}
					},
					response : '#MNGMNU003_goSearch',
					success : function(ds) {
						if (ds.message.messageId == 'M3000009') {
							$.Popup({
								width : 550,
								height : 495,
								url : 'MNGMNU003P01.jsp',
								data : {
									'USER_NAME' : $('#USER_NAME').Value()
								},
								center : true,
								close : function(data) {
									if (!data) {
										// TODO:
										return;
									}
									$('#USER_ID').Value(data.USER_ID);
									$('#USER_NAME').Value(data.USER_NAME);
									$.Page.Search_List(1);
								}
							});
						}
						if (ds.fields.USER_ID === undefined) {
							$('#USER_ID').Value('');
						}
					}
				});
			} else {
				$('#USER_ID').Value('');
				$('#USER_NAME').Value('');
			}
		});

	});
</script>
</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="../../common/TopMenu.jsp"%>
		<!-- //headerArea-->
		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="../../common/LeftMenu.jsp"%>
			<!-- //leftArea -->
			<div id="contentArea">
				<div class="contTitle">
					<h1>즐겨찾기 관리</h1>
				</div>
				<div class="searchArea">
					<form id="MNGMNU003_goSearch">
						<table class="tb_search">
							<colgroup>
								<col width="130" />
								<col width="284" />
								<col width="130" />
								<col width="284" />
								<col width="110" />
							</colgroup>
							<tr>
								<th><label for="USER_ID">사용자ID</label></th>
								<td><input id="USER_ID" type="text" maxlength="20"
									class="input01" /> <span class="button findBtn">
										<button id="btnFind">
											<span class="iconFind"></span> <span class="button-text">DDR 검색</span>
										</button> </span>
								</td>
								<th><label for="USER_NAME">사용자명</label></th>
								<td><input id="USER_NAME" type="text" maxlength="30"
									class="input01" />
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
				<p class="subConts" id="count">(0건)</p>
				<div class="btn_common type02">
					<span class="button iconBtn">
						<button id="btnInit">
							<span class="button-icon ui-icon-search-reset"></span> <span
								class="button-text"> 초기화</span>
						</button> </span> <span class="button iconBtn">
						<button id="btnSave">
							<span class="button-icon ui-icon-func-save"></span> <span
								class="button-text"> 저장</span>
						</button> </span> <span class="button iconBtn"><button id="insertData">
							<span class="iconAppend"></span><span class="button-text">행추가</span>
						</button> </span> <span class="button iconBtn"><button id="deleteData">
							<span class="iconRemove"></span><span class="button-text">행삭제</span>
						</button> </span>
				</div>
				<div class="tb_basic">
					<table id="FAVORITES_RS"></table>
					<!--  <div id="pager" class="paging"></div> -->
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
