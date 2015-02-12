<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>FAQ 등록</title>
<%@include file="/common/common.jsp"%>
<%@include file="/common/editor.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGFAQ001P01.jsp
	 * 화면 설명  : FAQ 등록
	 * 작성자        : 강훈기
	 * 작성일        : 2013-07-12
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기	2013-07-12	화면 생성
	 ****************************************************************************************/
	$(function() {
		// 필수값 체크
		$('#MNGFAQ001P01').Form({
			validation : {
				TITLE : {
					required : true,
					name : '제목'
				}
			},
			enter : '#btnSave'
		});
		
		$('#editor').Editor({
			image: true
		});
		
		// 등록버튼
		$('#btnSave').Button({
			click: function() {
				if (window.confirm('저장하시겠습니까?')) {
					$('#MNGFAQ001P01').Validate(function(){
						var request = $('#MNGFAQ001P01').DataSet();
						request.fields.<%=DBNamingConstants.CONTENTS%> = tinymce.editors[0].getContent();
						$.Service({
							transaction : 'abm.INFBBase#pINF20003',
							request : request,
							success : function(ds) {
								$.Navigate('MNGFAQ001.jsp');
							}
						});
					});
				}
			}
		});
		
		// 취소버튼
		$('#btnCancel').Button({
			click: function() {	
				if (window.confirm('취소하시겠습니까?')) {
					$.Navigate('MNGFAQ001.jsp');
				}
			}
		});

	});
	
</script>
</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="/common/TopMenu.jsp"%>
		<!-- //headerArea-->
		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="/common/LeftMenu.jsp"%>
			<!-- //leftArea -->
			<div id="contentArea">
				<div id="content">
					<div id="tabs">
						<div class="contTitle">
							<h1>FAQ 등록</h1>
						</div>
						<div id="tabsheader" class="location">
							<span class="home">Home</span> &gt; <span class="depth01">Information 관리</span>
							&gt; <span class="current">FAQ 등록</span>
						</div>
						<div id="divMain">
							<div class="tb_data">
								<form name="MNGFAQ001P01" id="MNGFAQ001P01">
									<table>
										<colgroup>
											<col width="130" />
											<col width="*" />
										</colgroup>
										<tr>
											<th><label class="required">제목</label></th>
											<td>
												<input type="text" name="title" id="TITLE" class="input01 num05"/>
											</td>
										</tr>
									</table>
									<textarea id="editor" class="textarea05"></textarea>
								</form>
							</div>
						</div>
						<div class="btn_main">
						<span class="button iconBtn">
							<button id="btnSave">
								<span class="button-icon ui-icon-func-save"></span> <span
									class="button-text">저장</span>
							</button> </span>
						<span class="button iconBtn">
							<button id="btnCancel">
								<span class="button-icon ui-icon-func-cancelRequest"></span> <span
									class="button-text">취소</span>
							</button> </span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="/common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
