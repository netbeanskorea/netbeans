<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<title>공지사항 등록</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : NoticeIns.jsp
	 * 화면 설명  : 공지사항 등록
	 * 작성자        : 이진희
	 * 작성일        : 2012-11-12
	 * 변경이력   :
	 *	 
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	이진희	2012-11-12	화면 생성(CSS 제외함)
	 * 
	 ****************************************************************************************/
	$(function() {
		$('#form').Form({
			
		});
		$('#form').File({
			success: function(data) {
				var req_ds = {fields: {}, recordSets: {__FILE_LIST__: {nc_list: data}}};
				req_ds.fields =  $('#form').Fields();				
				
				console.log(req_ds);
				$.Service({
					transaction: 'brd.BRDBBase#pBRD10002',
					request: req_ds, // $('#form').DataSet()
					success: function(ds) {
						window.alert(ds.message.messageName);
					    window.location.href = 'NoticeList.jsp';
					},
					fail: function(ds) {
				        window.alert('FAIL: ' + ds.message.messageName);
					},
					error: function(ds) {
					    window.alert('ERROR: ' + ds.message.messageName);
					}
				});
			}, 
			error : function (data) {
				console.log(data);
			}
		});
		$('#btnSave').Button({
			click: function() {
				if (window.confirm("입력 하시겠습니까?")) {
					//$('#form').Validate(function () {
						//$('#form').FileValidate(function () {
							$('#form').Service();
						//});
					//});					
				}
			}
		});
		$('#btnCancel').Button({
			click: function() {
				$.Navigate('NoticeList.jsp', {
					schKind: $.Param('schKind'),
					schWord: $.Param('schWord'),
					page: $.Param('page')
				});
			}
		});
		
		$('#fileAppend').Button({
			click: function() {
				$('#UPLOAD_FILE').parent().append('<br/><input id="UPLOAD_FILE" type="file" name="UPLOAD_FILE"/>');
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
					<h1>게시판 등록</h1>
				</div>
				<div class="tb_data">
					<form id="form" name="form">
						<table class="fieldTbl mt10">
							<tr>
								<th><label for="TITLE">제목</label></th>
								<td>
									<input id="TITLE" type="text" maxlength="1000" />
								</td>
							</tr>
							<tr>
								<th><label for="CONTENT">내용</label></th>
								<td>
									<textarea id="CONTENT" class="textarea01"></textarea>
								</td>
							</tr>
							<tr>
								<th><label for="File">파일</label></th>
								<td>
									<input id="UPLOAD_FILE" type="file"/>
									<button id="fileAppend">
										<span class="button iconBtn">
											<span class="button-icon ui-icon-func-save"></span>
											<span class="button-text">파일추가</span>
										</span>
									</button>
								</td>
						</tr>
						</table>
						<div class="btn_common">
							<div class="buttonArea mt05 txt_r">
								<span class="button iconBtn">
									<button id="btnSave">
										<span class="button-icon ui-icon-func-save"></span> <span class="button-text">저장</span>
									</button> </span> <span class="button iconBtn">
									<button id="btnCancel">
										<span class="button-icon ui-icon-func-delete"></span> <span class="button-text">취소</span>
									</button> </span>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- //leftArea -->
			<%@include file="/common/Footer.jsp"%>
			<!-- //leftArea -->
	</div>
</body>
</html>