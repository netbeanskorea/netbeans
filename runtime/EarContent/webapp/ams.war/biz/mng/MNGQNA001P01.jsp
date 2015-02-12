<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>Q&A 등록</title>
<%@include file="/common/common.jsp"%>
<%@include file="/common/editor.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGQNA001P01.jsp
	 * 화면 설명  : Q&A 등록
	 * 작성자        : 강훈기
	 * 작성일        : 2013-07-12
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기	2013-07-12	화면 생성
	 ****************************************************************************************/
	$(function() {
		// 필수값 체크
		$('#MNGQNA001P01').Form({
			validation : {
				TITLE : {
					required : true,
					name : '제목'
				}
			},
			enter : '#btnSave'
		});
		
		$.Page({
			init : function() {
				// 상세조회화면에서 답글버튼을 눌렀을 때 if문이 동작
				if($.Page.Data('QNA_SEQ_NO') && $.Page.Data('QNA_DT')){
					var qna_seq_no = $.Page.Data('QNA_SEQ_NO');
					var qna_dt =  $.Page.Data('QNA_DT');

					var request = $.DataSet();
					request.fields.<%=DBNamingConstants.QNA_SEQ_NO%> = qna_seq_no;
					request.fields.<%=DBNamingConstants.QNA_DT%> = qna_dt;
					$.Service({
						transaction : 'abm.INFBBase#pINF10002',
						request : request,
						response : '#MNGQNA001P02',
						success : function(ds) {
							$('#TITLE').Value('RE: ' + ds.fields.<%=DBNamingConstants.TITLE%>);
							var content_text = '<br/><br/><div class="MsoNormal" align="center" style="text-align:center"><span lang="EN-US" style="font-size: 12pt; font-family: "Times New Roman", serif;"><hr size="2" width="100%" align="center" tabindex="-1"></span></div>'; 
							tinymce.editors[0].setContent(content_text + ds.fields.<%=DBNamingConstants.CONTENTS%>);
						}
					});
					
				}
			}
		});
		
		$('#editor').Editor({
			image: true
		});
		
		// 등록버튼
		$('#btnSave').Button({
			click: function() {
				if (window.confirm('저장하시겠습니까?')) {
					$('#MNGQNA001P01').Validate(function(){
						var request = $('#MNGQNA001P01').DataSet();
						request.fields.<%=DBNamingConstants.CONTENTS%> = tinymce.editors[0].getContent();
						if($.Page.Data('QNA_SEQ_NO')){
							request.fields.<%=DBNamingConstants.PARENT_SEQ_NO%> = $.Page.Data('QNA_SEQ_NO');
						}
						$.Service({
							transaction : 'abm.INFBBase#pINF10003',
							request : request,
							success : function(ds) {
								$.Navigate('MNGQNA001.jsp');
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
					$.Navigate('MNGQNA001.jsp');                                                                                                                                                                                                                                                                                                                                     
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
				<div class="contTitle">
					<h1>Q&A 등록</h1>
				</div>
				<div id="tabsheader" class="location">
					<span class="home">Home</span> &gt; <span class="depth01">Information 관리</span>
					&gt; <span class="current">Q&A 등록</span>
				</div>
				<div id="divMain">
					<div class="tb_data">
						<form name="MNGQNA001P01" id="MNGQNA001P01">
							<table>
								<colgroup>
									<col width="130" />
									<col width="860" />
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
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
