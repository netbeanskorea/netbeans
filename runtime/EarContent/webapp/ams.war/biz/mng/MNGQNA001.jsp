<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>Q&A 관리</title>
<%@include file="/common/common.jsp"%>
<%@include file="/common/editor.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGQNA001.jsp
	 * 화면 설명  : Q&A 관리 
	 * 작성자        : 강훈기
	 * 작성일        : 2013-07-04
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기		2013-07-04	화면 생성
	 ****************************************************************************************/
	$(function() {
		//조회 필수값 체크
		$('#MNGQNA001_goSearch').Form({
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
		$.Page({
			init : function() {
				$.Page.Search_List(1);
			},
			Search_List : function(page) {
				var request = $('#MNGQNA001_goSearch').DataSet();
				request.fields.page = page;
				request.fields.page_size = 20;
				$.Service({
					transaction : 'abm.INFBBase#pINF10001',
					request : request,
					response : '#<%=DBNamingConstants.AMS_QNA%>',
					success : function(ds) {
						$('#pager').RecordSet(ds.recordSets.<%=DBNamingConstants.AMS_QNA%>);
					}
				});
			}
		});
		
		$('#pager').Pager({
			click : function(page) {
				$.Page.Search_List(page || 1);
			}
		});
		
		// 등록버튼
		$('#btnSave').Button({
			role: 'insert',
			click: function() {
				$.Navigate('MNGQNA001P01.jsp');
			}
		});

		// 조회 버튼 클릭
		$('#btnSearch').Button({
			click : function() {
				$('#MNGQNA001_goSearch').Validate(function() {
					$.Page.Search_List(1);
				});
			}
		});

		$('#<%=DBNamingConstants.AMS_QNA%>').Grid({
			columns : [ {
				id : 'QNA_SEQ_NO',
				title : '번호',
				align : 'center',
				width : 70
			}, {
				id : 'TITLE',
				title : '제목',
				align : 'left',
				width : 300,
				formatter: function(value, data) {
					return '<a href="#" class="popupLink link01" QNA_SEQ_NO="'+$.ParamEncode(data.values.QNA_SEQ_NO)+'" QNA_DT="'+$.ParamEncode(data.values.QNA_DT)+'">'+value+'</a>';
				}
			}, {
				id : 'REG_USER_ID',
				title : '등록자',
				align : 'center',
				width : 70
			}, {
				id : 'REG_DATE',
				title : '등록일시',
				align : 'left',
				width : 70
			}, {
				id : 'VIEW_CNT',
				title : '조회수',
				align : 'center',
				width : 70
			}],
			height : 'auto',
			viewrecords : true,
			scrollOffset : 0,
			loadComplete : function() {
			}
		});
		
		$('#<%=DBNamingConstants.AMS_QNA%>').on('click', '.popupLink', function(row) {
			var seq_no = $(this).attr('QNA_SEQ_NO');
			var qna_dt = $(this).attr('QNA_DT');
			$.Navigate('MNGQNA001P02.jsp?QNA_SEQ_NO='+seq_no+'&QNA_DT='+qna_dt);
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
				<div id="content">
					<div id="tabs">
						<div class="contTitle">
							<h1>Q&A 조회</h1>
						</div>
						<div id="tabsheader" class="location">
							<span class="home">Home</span> &gt; <span class="depth01">Information 관리</span>
							&gt; <span class="current">Q&A 조회</span>
						</div>
						<div id="divMain">
							<div class="searchArea">
								<form id="MNGQNA001_goSearch">
									<table class="tb_search">
										<colgroup>
											<col width="130" />
											<col width="648" />
											<col width="160" />
										</colgroup>
										<tr>
											<th><label for="schWord">검색</label></th>
											<td>
												<select id="schKind" name="schKind">
													<option value="TITLE">제목</option>
													<option value="CONTENTS">내용</option>
													<option value="ALL">제목+내용</option>
												</select>
												<input id="schWord" type="text" class="input01 num04" />
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
								<span class="button iconBtn">
									<button id="btnSave">
										<span class="button-icon ui-icon-func-save"></span> <span
											class="button-text"> 등록</span>
									</button>
								</span>
							</div>
							<div class="tb_basic">
								<table id="<%=DBNamingConstants.AMS_QNA%>"></table>
								 <div id="pager" class="paging"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
