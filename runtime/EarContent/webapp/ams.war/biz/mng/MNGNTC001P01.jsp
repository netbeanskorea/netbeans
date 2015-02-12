<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<%@include file="../../common/common.jsp"%>
<title>공지사항 등록</title>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGNTC001P01.JSP
	 * 화면 설명  : 공지사항 등록
	 * 작성자        : 강훈기
	 * 작성일        : 2013-11-01
	 * 변경이력   : 
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * VER0.1	강훈기    2013-11-01	화면 생성
	 ****************************************************************************************/

	$(function() {
		$('#dateRange').DateRange();
		var lastsel = null;
		$('#<%=DBNamingConstants.NOTICE_DT%>').Date();
		$('#<%=DBNamingConstants.NOTICE_DT%>').Disable();
		
		$('#form').Form();
		
		$('#form').File({
			success: function(data) {
				var request = 
				{	
					fields: {}, 
					recordSets: {
						__FILE_LIST__ : {nc_list: data}, 
						<%=DBNamingConstants.AMS_NOTICE%> : $('#<%=DBNamingConstants.AMS_NOTICE%>').RecordSet()
					}
				};
				request.fields =  $('#form').Fields();				
				var html = request.fields.<%=DBNamingConstants.NOTICE_HTML_FILE%>;
				if(html === ''){
					request.fields.<%=DBNamingConstants.NOTICE_HTML_FILE%> = 'inner_notice.jsp';
				}
				$.Service({
					transaction : 'abm.INFBBase#pINF30002',
					request : request,
					success : function(ds) {
						$.Popup.Close($.Page.Data['schData']);
					}
				});
			}, 
			error : function (data) {
				console.log(data);
			}
		});
		
		$.Page({
			init : function() {
				$.Service({
					transaction : 'abm.INFBBase#pINF30006',
					success : function(ds) {
						$('#<%=DBNamingConstants.NOTICE_SEQ_NO%>').Value(ds.fields.<%=DBNamingConstants.NOTICE_SEQ_NO%>);
					}
				});
				$.CodeHelper([ {
					divId : 'd_USE_YN',
					parentCode : 'C003',
					codeId : '<%=DBNamingConstants.USE_YN%>',
					codeValueId  : 'ATTRIBUTE_02',
					blank : false,
					blankLabel : '',          
				    blankValue : '',           
					style : 'select',
					func : function() {
					},
					type : 'SYS'
				} ],
				function() {
				});
				$.Page.Search_List();
			},
			Search_List : function(){
				$.Service({
					transaction : 'abm.UGRBBase#pUGR10001',
					success : function(ds) {
						var AMS_GROUP_ARR = ds.recordSets.<%=DBNamingConstants.AMS_GROUP%>;
						var options = $('#<%=DBNamingConstants.AMS_NOTICE%>').RecordSet();
						var GROUP_RS = {nc_list : []} ;
						var len1 = AMS_GROUP_ARR.nc_list.length;
						var len2 = options.nc_list.length;
						for(var j = 0; j < len1; j++) {
							var checker = false;
							for(var i = 0; i < len2; i++) {
								if(options.nc_list[i].TARGET_GROUP_ID === AMS_GROUP_ARR.nc_list[j].GROUP_ID) {
									checker = true;
									break;
								}
							}
							if(!checker) GROUP_RS.nc_list.push(AMS_GROUP_ARR.nc_list[j]);
						}
						$('#<%=DBNamingConstants.AMS_GROUP%>').RecordSet(GROUP_RS);
					}
				});
			}
		});
		
		

		//등록 저장 버튼 
		$('#btnSave').Button({
			click : function() {
				if (window.confirm("등록하시겠습니까?")) {
					$('#form').Service();
				}
			}
		});
		
		//수정 취소하기
		$('#btnCancel').Button({
			click : function() {
				$.Page.Close();
			}
		});
		
		$('#btnMoveLeft').Button({
			click: function() {
				var delrow = $('#<%=DBNamingConstants.AMS_GROUP%>').SelectRowId();
				//tr id를 가지고 가지 않아 다시 checkbox 선택이 분명하지 않아 다시 RecordSet처리
				var tableData;
				tableData = $('#<%=DBNamingConstants.AMS_NOTICE%>').Record();
				var tempArray = [];
				var len = delrow.length;
				for( var i = 0; i < len; i++) {
					var r = $('#<%=DBNamingConstants.AMS_GROUP%>').Record(delrow[i]);
					r.TARGET_GROUP_ID = r.GROUP_ID;
					tempArray.push(r);
					$('#<%=DBNamingConstants.AMS_GROUP%>').Remove(delrow[i]);
				}
				var addrow = {
					nc_list: $.merge(tableData, tempArray)
				};
				$('#<%=DBNamingConstants.AMS_NOTICE%>').RecordSet(addrow);
			}
		});
		
		$('#btnMoveRight').Button({
			click: function() {
				var delrow = $('#<%=DBNamingConstants.AMS_NOTICE%>').SelectRowId();
				var len = delrow.length;
				for( var i = 0; i < len; i++) {
					$('#<%=DBNamingConstants.AMS_NOTICE%>').Remove(delrow[i]);
				}
				$.Page.Search_List();
			}
		});
		
		$('#fileAppend').Button({
			click: function() {
				$('#UPLOAD_FILE').parent().append('<br/><input id="UPLOAD_FILE" type="file" name="UPLOAD_FILE"/>');
			}
		});
		
		$('#<%=DBNamingConstants.AMS_GROUP%>').Grid({
			columns: [
				{
					id: '<%=DBNamingConstants.GROUP_ID%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0021", locale, "Group ID") %>',
					align: 'left',
					width: 150
				}, {
					id: '<%=DBNamingConstants.GROUP_NAME%>',
					title: '<%=BaseUtils.getAmsLabelValue("L0022", locale, "Group NM") %>',
					align: 'left',
					width: 150
				}
			],
			height: 200,
			viewrecords: true,
			multiselect: true,
			shrinkToFit: false,
			scrollOffset: 0,
			gridview: true
		});
		
		$('#<%=DBNamingConstants.AMS_NOTICE%>').Grid({
			columns : [{
				id : '<%=DBNamingConstants.NOTICE_SEQ_NO%>',
				title : 'NO',
				hidden : true
			}, {
				id : '<%=DBNamingConstants.NOTICE_DT%>',
				title : '날짜',
				hidden : true
			}, {
				id : '<%=DBNamingConstants.TITLE%>',
				title : '제목',
				hidden : true
			}, {
				id : '<%=DBNamingConstants.CONTENTS%>',
				title : '내용',
				hidden : true
			}, {
				id : '<%=DBNamingConstants.VIEW_START_DT%>',
				title : '공지시작일',
				hidden : true
			}, {
				id : '<%=DBNamingConstants.VIEW_END_DT%>',
				title : '공지종료일',
				hidden : true
			}, {
				id : '<%=DBNamingConstants.NOTICE_HTML_FILE%>',
				title : '연결URI',
				hidden : true
			}, {
				id : '<%=DBNamingConstants.POP_UP_WSIZE%>',
				title : '팝업<br/>가로사이즈',
				hidden : true
			}, {
				id : '<%=DBNamingConstants.POP_UP_HSIZE%>',
				title : '팝업<br/>세로사이즈',
				hidden : true
			}, {
				id : '<%=DBNamingConstants.TARGET_GROUP_ID%>',
				title : '그룹ID',
				sortable : true,
				align : 'center',
				width : 100
			}, {
				id : '<%=DBNamingConstants.GROUP_NAME%>',
				title : '그룹명',
				sortable : true,
				align : 'center',
				width : 100
			}, {
				id : '<%=DBNamingConstants.USE_YN%>',
				title : '사용여부',
				hidden : true
			}],
			height : 200,
			viewrecords : true,
			multiselect: true,
			scrollOffset : 0,
			click : function(row, iRow, iCol, e) {
			}
		});
		
	});
</script>
</head>
<body>
	<!--  <div id="container"> -->
	<div id="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea">
				<div class="contTitle">
					<h2>공지사항 등록</h2>
				</div>
					<div class="tb_data">
						<form id="form" name="form">
						<table>
							<colgroup>
								<col width="150"/>
								<col width="200"/>
								<col width="150"/>
								<col width="200"/>
							</colgroup>
							<tr>
								<th><label for="<%=DBNamingConstants.NOTICE_SEQ_NO%>" class="required">NO</label></th>
								<td><input id="<%=DBNamingConstants.NOTICE_SEQ_NO%>" type="text"
									class="input01" readonly/>
								</td>
								<th><label for="<%=DBNamingConstants.NOTICE_DT%>" class="required">날짜</label></th>
								<td class="nobd"><input id="<%=DBNamingConstants.NOTICE_DT%>" type="text"
									class="input01" readonly/>
								</td>
							</tr>
							<tr>
								<th><label for="dateRange">공지기간</label></th>
								<td class="nobd" colspan="3">
									<span id="dateRange">
										<input id="VIEW_START_DT" type="text" class="date01" /> ~ <input id="VIEW_END_DT" type="text" class="date01" />
									</span>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.NOTICE_HTML_FILE%>" class="required">HTML</label></th>
								<td class="nobd" colspan="3"><input id="<%=DBNamingConstants.NOTICE_HTML_FILE%>" type="text"
									class="input01 num02" placeholder="inner_notice.jsp"/>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.POP_UP_WSIZE%>" class="required">가로크기</label></th>
								<td>
									<input id="<%=DBNamingConstants.POP_UP_WSIZE%>" type="text" class="input01"/>
								</td>
								<th><label for="<%=DBNamingConstants.POP_UP_HSIZE%>" class="required">세로크기</label></th>
								<td class="nobd">
									<input id="<%=DBNamingConstants.POP_UP_HSIZE%>" type="text" class="input01"/>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.TITLE%>" class="required">제목</label></th>
								<td class="nobd" colspan="3"><input id="<%=DBNamingConstants.TITLE%>" type="text"
									class="input01 num02"/>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.CONTENTS%>" class="required">내용</label></th>
								<td class="nobd" colspan="3">
									<textarea id="<%=DBNamingConstants.CONTENTS%>"	class="textarea03"></textarea>
								</td>
							</tr>
							<tr>
								<th><label for="File">파일첨부</label></th>
								<td class="nobd" colspan="3">
									<input id="UPLOAD_FILE" type="file"/>
									<button id="fileAppend" class="formBtn">파일 추가</button>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.USE_YN%>" class="required">사용여부</label></th>
								<td class="nobd" colspan="3">
									<div id="d_USE_YN"></div>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="clearfix">
					<div class="float3_l_44">
						<div class="contSubTitle">
							<h3>할당된 그룹</h3>
						</div>
						<div class="tb_basic">
							<table id="<%=DBNamingConstants.AMS_NOTICE%>"></table>
						</div>
					</div>
					<div class="float3_c_10">
						 <div class="buttonArea moveRight">
			                <span class="button btnMoveRight"><button id="btnMoveRight" title="선택 삭제"></button></span>
			            </div>
			            <div class="buttonArea moveLeft">
			                <span class="button btnMoveLeft"><button id="btnMoveLeft" title="선택 추가"></button></span>
			            </div>
					</div>
					<div class="float3_r_44">
						<div class="contSubTitle">
							<h3>미할당 그룹</h3>
						</div>
						<div class="tb_basic">
							<table id="<%=DBNamingConstants.AMS_GROUP%>"></table>
						</div>
						<div id="pager2" class="paging"></div>
					</div>
				</div>
				<div class="btn_main">
					<span class="button iconBtn">
						<button id="btnSave">
							<span class="button-icon ui-icon-func-save"></span> <span
								class="button-text">등록</span>
						</button> </span> <span class="button iconBtn">
						<button id="btnCancel">
							<span class="button-icon ui-icon-func-cancelRequest"></span> <span
								class="button-text">취소</span>
						</button> 
					</span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>