<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>비즈코드 관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGCCD001.jsp
	 * 화면 설명  : 비즈코드 관리
	 * 작성자        : 강훈기
	 * 작성일        : 2013-05-10
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기	2013-05-10	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#MNGCCD001_goSearch').Form({
			enter : '#btnSearch' //검색시 엔터키 처리 
		});

		var gridlastsel; // 마지막으로 선택된 행 ID
		var grid2lastsel;
		var griddetail = false;
		var detailgrid_parentid = '';
		$
				.Page({
					init : function() {
						$.Page.Search_List($.Param('page') || 1);
						var req = {
							fields : {}
						};
						req.fields.CODE_ID = 'C003';
						$('#CCD_CLASS_RS').EMKSelectBoxInit(
								'mng.MNGCODS#selectSelector', req, 'USE_FLAG');

					},
					Search_List : function(page) {
						var request = $('#MNGCCD001_goSearch').DataSet();
						request.fields.page = page;
						request.fields.page_size = 10;
						$.Page.Data['page'] = request.fields.page;

						$
								.Service({
									transaction : 'mng.MNGCODB#selectCCDClassList',
									request : request,
									response : '#CCD_CLASS_RS',
									success : function(ds) {
										$('#count')
												.html(
														'('
																+ ds.recordSets.CCD_CLASS_RS.nc_totalRecordCount
																+ '건)');
										$('#pager').RecordSet(
												ds.recordSets.CCD_CLASS_RS);
									}
								});
					},

					Search_List2 : function(page) {
						var CD_CLAS = $('#CCD_CLASS_RS').Get(gridlastsel).CD_CLAS;
						var request = {
							fields : {
								CD_CLAS : CD_CLAS
							}
						};

						request.fields.page = page;
						request.fields.page_size = 10;
						$.Page.Data['page'] = request.fields.page;

						var req = {
							fields : {}
						};
						req.fields.CODE_ID = 'C003';
						$('#CCD_RS').EMKSelectBoxInit(
								'mng.MNGCODS#selectSelector', req, 'USE_FLAG');
						detailgrid_parentid = request.fields.CD_CLAS;

						$
								.Service({
									transaction : 'mng.MNGCODB#selectCCDList',
									request : request,
									response : '#CCD_RS',
									success : function(ds) {
										$('#count2')
												.html(
														'('
																+ ds.recordSets.CCD_RS.nc_totalRecordCount
																+ '건)');
										$('#pager2').RecordSet(
												ds.recordSets.CCD_RS);
									}
								});
					},
					EMKRowEdit : function(grid, row, column) { // 입력하는 column에서 key값을 입력은 가능 수정시에는 사용불가를 만들어 줌 
						if ($('#' + grid).Column(row, 'Flag') === 'C')
							$('#' + grid).ColProp(column, {
								editable : true
							});
						else
							$('#' + grid).ColProp(column, {
								editable : false
							});
						$('#' + grid).RowEdit(row, true);
						return this;
					}
				});

		// 초기화 버튼 클릭
		$('#btnInit').Button({
			click : function() {
				if (window.confirm('작업중이던 데이터가 없어집니다.\n초기화 하시겠습니까?')) {
					$('#CCD_CLASS_RS')._clear();
					$('#pager')._clear();
					$('#CCD_RS')._clear();
					$('#pager2')._clear();
					$('#MNGCCD001_goSearch').Clear();
					$('#count').html('(' + 0 + '건)');
					$('#count2').html('(' + 0 + '건)');
					gridlastsel = undefined;
					grid2lastsel = undefined;
					griddetail = false;
					detailgrid_parentid = '';
				}
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				$.Page.Search_List($.Param('page') || 1);
				$('#CCD_RS')._clear();
				gridlastsel = undefined;
			}
		});

		$('#pager').Pager({
			click : function(page) {
				$.Page.Search_List(page || 1);
			}
		});

		$('#pager2').Pager({
			click : function(page) {
				$.Page.Search_List2(page || 1);
			}
		});

		// grid 추가 버튼 클릭1
		$('#btnAppend').Button({
			click : function() {
				var myData = {
					Flag : 'C'

				};
				$('#CCD_CLASS_RS').Add(myData);

				var addrow = $('#CCD_CLASS_RS tr:last').attr('id');
				$("#CCD_CLASS_RS").Select(addrow);
				// Row를 Edit 모드로 변경한다.
				// Arg1 : Row ID
				// Arg2 : []
				//    Flag 'C' : editmode를 true로 만들 column id list
				//    Flag 'R,U,D' : editmode를 false로 만들 column id list
				//	$("#CCD_CLASS_RS").EMKRowEdit(addrow, 'CODE_ID');
				$.Page.EMKRowEdit('CCD_CLASS_RS', addrow, 'CD_CLAS');
			}
		});

		// 마스터 grid 삭제 버튼 클릭1

		$('#deleteData')
				.Button(
						{
							click : function() {

								var CD_CLAS = $('#CCD_CLASS_RS').Get(
										gridlastsel).CD_CLAS;

								var request = {
									fields : {
										CD_CLAS : CD_CLAS
									}
								};

								if (gridlastsel === undefined) {
									alert("선택된 행이 없습니다.");
								} else {
									$
											.Service({
												transaction : 'mng.MNGCODB#selectDTLCodeCount',
												request : request,
												response : '#count',
												success : function(ds) {
													if (ds.fields.count >= 1) {
														alert(ds.fields.count
																+ '건의 '
																+ '디테일 데이터를 먼저 삭제 해주십시요');
														$('#CCD_CLASS_RS')
																.Column(
																		gridlastsel,
																		'Flag',
																		'R');
														$(ds.fields.count)
																._clear();
													}
												}
											});
									var rs = $('#CCD_CLASS_RS').RecordSet();
									if (gridlastsel && gridlastsel !== '') {
										if ($('#CCD_CLASS_RS').Column(
												gridlastsel, 'Flag') === 'C') {
											$('#CCD_CLASS_RS').Remove(
													gridlastsel);
											// 	Remove를 하게되면 selrow Array의 값이 변경되어서 전체 length값이 감소하므로 i--;를 통해 값을 보정해줌 
										} else {
											$('#CCD_CLASS_RS').Column(
													gridlastsel, 'Flag', 'D');
										}
									}
								}
							}
						});

		// 마스터 저장 버튼 클릭
		$('#btnSave')
				.Button(
						{
							click : function() {

								var ds = {
									fields : {},
									recordSets : {
										CCD_CLASS_RS : {
											nc_list : []
										}
									}
								};
								$('#CCD_CLASS_RS tr').each(
										function() {
											$('#CCD_CLASS_RS').RowSave(
													$(this).attr('id'));
										});

								//ds.fields.page = $.Page.Data['page'];
								//ds.fields.page_size = 20;
								//$.Page.Data['page'] = ds.fields.page;

								if (window.confirm("저장하시겠습니까?")) {
									var selrow = $('#CCD_CLASS_RS').RecordSet();

									for ( var i = 0, j = 0; i < selrow.nc_list.length; i++) {
										if ($('#CCD_CLASS_RS').Column(
												selrow.nc_list[i], 'Flag') !== 'R') {
											ds.recordSets.CCD_CLASS_RS.nc_list[j] = selrow.nc_list[i];
											j++;
										}
									}

									if (ds.recordSets.CCD_CLASS_RS.nc_list.length == '0')
										alert("저장 대상 데이터가 없습니다.");
									else {
										$
												.Service({
													transaction : 'mng.MNGCODB#saveCCDClass',
													request : ds,
													success : function(page) {
														$('#CCD_CLASS_RS')
																._clear();
														$('#CCD_RS')._clear();
														$.Page
																.Search_List(page || 1);

														window
																.alert('['
																		+ page.message.messageId
																		+ ']'
																		+ page.message.messageName);

													},
													error : function(ds) {
														window
																.alert('ERROR: '
																		+ ds.message.messageName
																		+ ds.message.messageName);
													}
												});
									}
								}
							}

						});

		// grid 추가 버튼 클릭2
		$('#btnAppend2').Button({
			click : function() {
				var myData = {
					Flag : 'C',
					CD_CLAS : detailgrid_parentid
				};
				$('#CCD_RS').Add(myData);

				var addrow = $('#CCD_RS tr:last').attr('id');
				$('#CCD_RS').Select(addrow);
				$('#CCD_RS').EMKRowEdit(addrow, [ 'CD' ]);
			}
		});

		// grid 삭제 버튼 클릭2
		$('#deleteData2').Button({
			click : function() {
				if (grid2lastsel === undefined) {
					alert("선택된 행이 없습니다.");
				} else {

					var rs = $('#CCD_RS').RecordSet();
					if (grid2lastsel && grid2lastsel !== '') {
						if ($('#CCD_RS').Column(grid2lastsel, 'Flag') === 'C') {
							$('#CCD_RS').Remove(grid2lastsel);
							// 	Remove를 하게되면 selrow Array의 값이 변경되어서 전체 length값이 감소하므로 i--;를 통해 값을 보정해줌 
						} else {
							$('#CCD_RS').Column(grid2lastsel, 'Flag', 'D');
						}
					}
				}
			}
		});

		// 디테일 저장 버튼 클릭 2
		$('#btnSave2')
				.Button(
						{
							click : function() {

								//var selrow = $("#CCD_RS").SelectRowId(); //선택된 row의ID값 조회
								var ds = {
									fields : {},
									recordSets : {
										CCD_RS : {
											nc_list : []
										}
									}
								};
								$('#CCD_RS tr').each(function() {
									$('#CCD_RS').RowSave($(this).attr('id'));
								});

								ds.fields.page = $.Page.Data['page'];
								ds.fields.page_size = 20;
								$.Page.Data['page'] = ds.fields.page;

								if (window.confirm("저장하시겠습니까?")) {
									var selrow = $("#CCD_RS").RecordSet();

									for ( var i = 0, j = 0; i < selrow.nc_list.length; i++) {
										if ($('#CCD_RS').Column(
												selrow.nc_list[i], 'Flag') !== 'R') {
											ds.recordSets.CCD_RS.nc_list[j] = selrow.nc_list[i];
											j++;
										}
									}

									if (ds.recordSets.CCD_RS.nc_list.length == '0')
										alert("저장 대상 데이터가 없습니다.");
									else {
										$
												.Service({
													transaction : 'mng.MNGCODB#saveCCD',
													request : ds,
													success : function(page) {
														$('#CCD_RS')._clear();
														//$.Page.Search_List(page || 1);
														$.Page
																.Search_List2($
																		.Param('page') || 1);
														// $('#CCD_CLASS_RS').Column(gridlastsel, 'Flag', 'R');
														window
																.alert('['
																		+ page.message.messageId
																		+ ']'
																		+ page.message.messageName);
													},
													error : function(ds) {
														//window.alert('ERROR: ' + ds.message.messageName);
														window
																.alert('ERROR: '
																		+ ds.message.messageName
																		+ ds.message.messageName);
													}
												});
									}
								}

							}
						});

		$('#CCD_CLASS_RS').Grid(
				{
					columns : [ {
						id : 'Flag',
						title : 'Flag',
						align : 'center',
						width : '50'
					}, {
						id : 'CD_CLAS',
						title : '코드',
						align : 'center',
						width : '70'
					}, {
						id : 'CD_CLAS_NM',
						title : '코드명',
						width : '100',
						aligh : 'left',
						editable : true
					}, {
						id : 'DSC_1',
						title : 'DSC_1',
						align : 'left',
						width : '100',
						editable : true
					}, {
						id : 'DSC_2',
						title : 'DSC_2',
						align : 'left',
						width : '150',
						editable : true
					}, {
						id : 'RGSTER_ID',
						title : '등록자',
						width : '100',
						align : 'center'
					}, {
						id : 'RGST_DTIM',
						title : '등록시간',
						width : '100',
						align : 'center'/*,
																																															formatter : function(cellvalue, options, rowdata) {
																																																var rdate = cellvalue.substring(0,16);
																																															    return rdate;
																																															}*/
					} ],
					height : 'auto',
					viewrecords : true,
					scrollOffset : 0,
					//multiselect: true,
					// 이 예제는 클릭퇴는 Column별로 동작을 다르게 해야 하기 때문에 click 이벤트가 아니라
					// onCellSelect event에 로직을 정의 한다.
					// event 우선순위 -> onCellSelect -> click

					// Row 가 Edit Mode일때 수정이 발생하면 호출되는 함수
					RowEditChange : function() {
						// input, select box의 id와 name을 통해 rowid를 조합한다.
						var editobj_id = $(this).attr('id');
						var editobj_name = $(this).attr('name');
						var rowid = editobj_id.substr(0, editobj_id.length
								- editobj_name.length - 1);

						// Flag 변경
						if ($('#CCD_CLASS_RS').Column(rowid, 'Flag') === 'R') { // flag를 R인 경우만 클릭시에 flag를 U로 변경
							$('#CCD_CLASS_RS').Column(rowid, 'Flag', 'U');
						}
					},

					onCellSelect : function(row, col, cellcontent, e) {
						// 	새로 생생된 ROW에 대해서는 Details에 거래를 날려서는 안된다.
						var grid = $('#CCD_CLASS_RS').Get(row);
						if (grid.Flag === 'C') {
							$('#CCD_RS')._clear();
							griddetail = false;
							return;
						}
						if (col == '1') {
							$('#CCD_CLASS_RS').RowSave(gridlastsel);
							gridlastsel = row;
							$.Page.Search_List2($.Param('page') || 1);
							griddetail = true;
							$('#CCD_CLASS_RS').Select(row);
						} else {
							griddetail = false;
						}
					},

					click : function(row, iRow, iCol, e) {

						if (row) {
							$('#CCD_CLASS_RS').RowSave(gridlastsel);
							$('#CCD_CLASS_RS').RowRestore(gridlastsel); // 이전 edit창 닫기
							$('#CCD_CLASS_RS').EMKRowEdit(row, [ 'CD_CLAS' ]);
							gridlastsel = row;
						}
					},

					loadComplete : function(data) {
					}

				});

		$('#CCD_RS').Grid(
				{
					columns : [ {
						id : 'Flag',
						title : 'Flag',
						width : '50',
						align : 'center'
					}, {
						id : 'CD',
						title : '코드',
						align : 'center',
						width : '70'
					}, {
						id : 'CD_NM',
						title : '코드명',
						width : '100',
						aligh : 'left',
						editable : true
					}, {
						id : 'DSC_1',
						title : 'DSC_1',
						align : 'left',
						width : '100',
						editable : true
					}, {
						id : 'DSC_2',
						title : 'DSC_2',
						align : 'left',
						width : '150',
						editable : true
					}, {
						id : 'RGSTER_ID',
						title : '등록자',
						width : '100',
						align : 'center'
					}, {
						id : 'RGST_DTIM',
						title : '등록시간',
						width : '100',
						align : 'center'/*,
																																															formatter : function(cellvalue, options, rowdata) {
																																																var rdate = cellvalue.substring(0,16);
																																															    return rdate;
																																															}*/
					}, {
						id : 'CD_CLAS',
						title : '부모코드아이디',
						hidden : true
					} ],
					height : 'auto',
					viewrecords : true,
					scrollOffset : 0,
					//multiselect: true,

					// Row 가 Edit Mode일때 수정이 발생하면 호출되는 함수
					RowEditChange : function() {
						// input, select box의 id와 name을 통해 rowid를 조합한다.
						var editobj_id = $(this).attr('id');
						var editobj_name = $(this).attr('name');
						var rowid = editobj_id.substr(0, editobj_id.length
								- editobj_name.length - 1);

						// Flag 변경
						if ($('#CCD_RS').Column(rowid, 'Flag') === 'R') { // flag를 R인 경우만 클릭시에 flag를 U로 변경
							$('#CCD_RS').Column(rowid, 'Flag', 'U');
						}
					},

					click : function(row, iRow, iCol, e) {

						if (row) {
							$('#CCD_RS').RowSave(grid2lastsel);
							$('#CCD_RS').RowRestore(grid2lastsel); // 이전 edit창 닫기
							$('#CCD_RS').EMKRowEdit(row, [ 'CD' ]);
							grid2lastsel = row;
						}
					},

					loadComplete : function(data) {
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
				<h1>업무코드 관리</h1>
			</div>
			<div class="searchArea">
				<form id="MNGCCD001_goSearch">
					<table class="tb_search">
						<colgroup>
							<col width="130" />
							<col width="284" />
							<col width="130" />
							<col width="284" />
							<col width="110" />
						</colgroup>
						<tr>
							<th><label for="CD_CLAS">코드</label>
							</th>
							<td><input id="CD_CLAS" type="text" class="input01" />
							</td>
							<th><label for="CD_CLAS_NM">코드명</label>
							</th>
							<td><input id="CD_CLAS_NM" type="text" class="input01" />
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
					</button> </span> <span class="button iconBtn"><button id="btnAppend">
						<span class="iconAppend"></span><span class="button-text">행추가</span>
					</button> </span>
			</div>
			<div class="tb_basic">
				<table id="CCD_CLASS_RS"></table>
				<div id="pager" class="paging"></div>
			</div>
			<p class="subConts" id="count2">(0건)</p>
			<div class="btn_common type02">
				<span class="button iconBtn">
					<button id="btnSave2">
						<span class="button-icon ui-icon-func-save"></span> <span
							class="button-text"> 저장</span>
					</button> </span> <span class="button iconBtn"><button id="btnAppend2">
						<span class="iconAppend"></span><span class="button-text">행추가</span>
					</button> </span>
			</div>
			<div class="tb_basic">
				<table id="CCD_RS"></table>
				<div id="pager2" class="paging"></div>
			</div>
		</div>
	</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
