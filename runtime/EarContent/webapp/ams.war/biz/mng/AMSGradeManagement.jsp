<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>공지사항 게시판</title>
<%@include file="/common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : AMSGradeManagement.jsp
	 * 화면 설명  : 공지사항 게시판
	 * 작성자        : 최지은
	 * 작성일        : 2013-09-25
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	최지은	2013-09-25	화면 생성
	 ****************************************************************************************/
	 
	 var currGradeID;
	 var grid2Data;
// 	 var delRow;
	 
	$(function() {
		$('#AMSGradeManagement').Form();
		$('#AMSGradeManagement2').Form();
		$.Page({
			init: function() {
				$.Page.Search_List(1);
				$.Page.Search_List3(1);
			},
			Search_List: function(page) {
				var request = $('#AMSGradeManagement').DataSet();
				
				$.Service({
					transaction: 'ddr.DDRBBase#pGRD00201',
					request : request,
					response: '#grid',
					success: function(ds) {
						console.log(ds);
						
					}
				});
			},
			Search_List2: function(gradeID) {
				$.Service({
					transaction: 'ddr.DDRBBase#pGRD00203',
					request : {
						fields : {
							'GRADE' : gradeID,
						},
						recordSets : {}
					},
					response: '#grid2',
					success: function(ds) {
						console.log(ds);
					}
				});
			},
			Search_List3: function(page) {
				
				var request = $('#AMSGradeManagement2').DataSet();
				
				$.Service({
					transaction: 'ddr.DDRBBase#pGRD00202',
					request : request,
					response: '#grid3',
					success: function(ds) {
						console.log(ds);
					}
				});
			},
			AddUser : function(req){
			
				console.log(JSON.stringify(req));
			
				$.Service({
					transaction : 'ddr.DDRBBase#pGRD00204',
					request : req,
					success : function(ds) {
						var tablelen = {
							nc_list: grid2Data
						};
						$('#grid2').RecordSet(tablelen);	
					}
				});
				
			},
			RemoveUser : function(req, delrow){
				$.Service({
					transaction : 'ddr.DDRBBase#pGRD00204',
					request : req,
					success : function(ds) {
						for( var i = 0; i < delrow.length; i++) {
							$('#grid2').Remove(delrow[i]);
						}
					}
				});
			}
		});

		// 조회 버튼 클릭 이벤트
		$('#btnSearch').Button({
			click: function() {
				$.Page.Search_List(1);
			}
		});
		// 조회 버튼 클릭 이벤트
		$('#btnSearch2').Button({
			click: function() {
				$.Page.Search_List3(1);
			}
		});
		//제품 테이블
		$('#grid').Grid({
			columns: [
				{
					id: 'GRADENO',
					title: 'PRODUCT <br> NO',
					align: 'left',
					width: 80
				}, {
					id: 'NAME',
					title: 'PRODUCT <br> Name',
					align: 'left',
					sortable : true, //sortable 로 그리드에서 정렬 가능 
					width: 80 
				}, {
					id: 'BOOKNM',
					title: 'Book',
					align: 'left',
					width: 80
				}, {
					id: 'USEYN',
					title: '사용여부',
					align: 'left',
					width: 80
				}
			],
// 			height: 'auto',
			gridview: true,
			number: true,
			height : 400,
			viewrecords : true,
			scrollOffset : 0,
			loadComplete: function(data) {
				var tableLength = data.rows.length;
				if(tableLength > 0){
					
					//처음 row를 select 처리한다.
					$(this).find('tr:eq(1)').addClass('ui-state-highlight');
					
					var rs = $('#grid').Record(1);
					var gradeID = rs.GRADENO;
					currGradeID = gradeID;
					$.Page.Search_List2(gradeID);
					
				}
			},
			click: function(row, status, e) {	
				
				//처음 select 처리했던 row의 색을 제거한다.
				if(row != 1){
					$('#grid').find('tr:eq(1)').removeClass('ui-state-highlight');
				}
				
				if (row) {
// 					var data = $('#ddr.DDRBBase#pGRD00201').getRowData(row);
// 					var schData = $('#MNGMSG001_goSearch').DataSet();
					
					var rs = $('#grid').Record(row);
					var gradeID = rs.GRADENO;
					currGradeID = gradeID;
					
					$.Page.Search_List2(gradeID);
				}
			}
		});
		
		//제품별 사용자 테이블
		$('#grid2').Grid({
			columns: [
				{
					id: 'USER_ID',
					title: '사용자 ID',
					align: 'left',
					width: 80
				}, {
					id: 'USER_NAME',
					title: '사용자 이름',
					align: 'left',
					width: 80 
				}
			],
// 			height: 'auto',
			gridview: true,
			multiselect: true,
			number: true,
			height : 400,
			viewrecords : true,
			scrollOffset : 0,
			loadComplete: function() {
			}
		});
		
		//사용자 테이블
		$('#grid3').Grid({
			columns: [
				{
					id: 'USER_ID',
					title: '사용자 ID',
					align: 'left',
					width: 80
				}, {
					id: 'USER_NAME',
					title: '사용자 이름',
					align: 'left',
					width: 80 
				}, {
					id: 'EMP_ID',
					title: '사번',
					align: 'left',
					width: 80 
				}
			],
// 			height: 'auto',
			gridview: true,
			multiselect: true,
			number: true,
			height : 400,
			viewrecords : true,
			scrollOffset : 0,
			loadComplete: function() {
			}
		});
		$('#btnAppend02').Button({
			click: function(){
				var row = $('#grid3').SelectRowId();
				var tableData;
				var delData = [];
				var addData = [];
				
				//Grade에 내용이 있을 때 작동.
				var gradeTableLength = $('#grid').Record().length;
				if(gradeTableLength > 0){
			
					//행추가에 필요한 사용여부 값임의지정
					var chk ="Y"
					if(row.length === 0){
						alert("선택된 행이 없습니다.");
					}
					else{
						tableData = $('#grid2').Record();
						var tablelen = tableData.length;
						var len = row.length;
						var req = {
							fields : {
								'GRADENO': currGradeID,
								'CRUD' : 'C'
							},
							recordSets : {
								'USER_RS': {
									nc_list: []
								} 
							}
						};
						if(tablelen <= 0){
							for( var i = 0; i < len; i++) {
								//사용여부값 chk 임의 지정
								req.recordSets.USER_RS.nc_list.push({'USER_ID': $('#grid3').Record(row[i]).USER_ID, 'USER_NAME': $('#grid3').Record(row[i]).USER_NAME});
								tableData.push({'USER_ID': $('#grid3').Record(row[i]).USER_ID, 'USER_NAME': $('#grid3').Record(row[i]).USER_NAME});
							}
							
							grid2Data = tableData;
							
							//MSS_USER_GRADE_MAPPING 테이블에 저장
							$.Page.AddUser(req);
							
						}else{
							for( var i = 0; i < row.length; i++) {
								Data = $('#grid3').Column(row[i],'USER_ID');
								for( var j = 0; j < tablelen; j++){
									if(Data == tableData[j].USER_ID){
										alert('이미 목록에 추가되어 있습니다');
										return;
									}
								}
								//사용여부값 chk 임의 지정
								req.recordSets.USER_RS.nc_list.push({'USER_ID': $('#grid3').Record(row[i]).USER_ID, 'USER_NAME': $('#grid3').Record(row[i]).USER_NAME});
								tableData.push({'USER_ID': $('#grid3').Record(row[i]).USER_ID, 'USER_NAME': $('#grid3').Record(row[i]).USER_NAME});
							}
							
							grid2Data = tableData;
							
							//MSS_USER_GRADE_MAPPING 테이블에 저장
							$.Page.AddUser(req);
							
						}
					}
				}
				
			}
		});
		// - 버튼 클릭
		$('#btnRemove02').Button({
			click: function() {
				var delrow = $("#grid2").SelectRowId();
				var now = new Date();
				if(delrow.length === 0){
					alert("선택된 행이 없습니다.");
				
				}else if(delrow.length !== 0) {
					var r=confirm("선택한 사용자를 제거하시겠습니까?");
					if (r==true){
						var req = {
								fields : {
									'GRADENO': currGradeID,
									'CRUD' : 'D'
								},
								recordSets : {
									'USER_RS': {
										nc_list: []
									} 
								}
							};
						
						for( var i = 0; i < delrow.length; i++) {
// 							$('#grid2').Remove(delrow[i]);
							req.recordSets.USER_RS.nc_list.push({'USER_ID': $('#grid2').Record(delrow[i]).USER_ID});
						}
						
						grid2Data = req.recordSets.USER_RS.nc_list;
						
						//MSS_USER_GRADE_MAPPING 테이블에서 삭제
						$.Page.RemoveUser(req, delrow);
						
					} else {
						
					}
				}
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
			<!-- //leftArea-->
			<%@include file="../../common/LeftMenu.jsp"%>
			<!-- //leftArea-->

			<div id="contentArea">
				<div class="contTitle">
					<h1>Product Management</h1>
				</div>
				<div class="clearfix">
					<div class="float2_l_70">
						<div class="searchArea">
							<form id="AMSGradeManagement">
								<table class="tb_search">
									<colgroup>
										<col width="150" />
										<col width="211" />
										<col width="150" />
										<col width="211" />
										<col width="56" />
									</colgroup>
									<tr>
										<th><label>Product No</label></th>
										<td>
											<input id="GRADENO" type="text" class="input01" />
										</td>
										<th><label>Product Name</label></th>
										<td>
											<input id="NAME" type="text" class="input01" />
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
					</div>
					<div class="float2_r_30">
						<div class="searchArea close">
							<form id="AMSGradeManagement2">
								<table class="tb_search">
									<colgroup>
										<col width="260" />
										<col width="151" />
										<col width="56" />
									</colgroup>
									<tr class="first_row">
										<th><label>사용자 ID</label></th>
										<td>
											<input id="USER_ID" type="text" class="input01 num03" />
										</td>
										<td rowspan="2" class="searchBtn">
											<button id="btnSearch2" class="btnSearch">
												<span class="button-text">Search</span>
											</button>
										</td>
									</tr>
									<tr>
										<th><label>사용자<br/>이름</label></th>
										<td>
											<input id="USER_NAME" type="text" class="input01 num03" />
										</td>
									</tr>
								</table>
							</form>
						</div>
						<div class="search_more">
							<a href="javascript:SlideDownSearch();"></a>
						</div>
					</div>
				</div>
				<div class="clearfix">
					<div class="float2_l_30">
						<div class="contSubTitle">
							<h2 >Product List</h2>
						</div>
						<div class="tb_basic">
							<table id="grid"></table>
						</div>
					</div>
					<div class="float2_r_70">
						<div class="clearfix">
							<div class="float3_l_44">
								<div class="contSubTitle">
									<h2>Product별 사용자 List</h2>
								</div>
								<div class="tb_basic">
									<table id="grid2"></table>
								</div>
							</div>
							<div class="float3_c_10">
								<div class="btnImage">
									<span class="btnImage">
										<button id="btnAppend02" class="iconAppend02">
											<span class="button-text"><em>+</em></span>
										</button> </span> <span class="btnImage">
										<button id="btnRemove02" class="iconRemove02">
											<span class="button-text"><em>-</em> </span>
										</button> </span>
								</div>
							</div>
							<div class="float3_r_44">
								<div class="contSubTitle">
									<h2>전체 사용자 List</h2>
								</div>
								<div class="tb_basic">
									<table id="grid3"></table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- quick link -->
			<%@include file="../../common/Quick.jsp"%>
			<!-- quick link -->

		</div>

		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
