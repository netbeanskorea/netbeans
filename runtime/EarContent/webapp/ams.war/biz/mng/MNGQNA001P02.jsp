<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>Q&A 상세조회</title>
<%@include file="/common/common.jsp"%>
<%@include file="/common/editor.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGQNA001P02.jsp
	 * 화면 설명  : Q&A 상세조회
	 * 작성자        : 강훈기
	 * 작성일        : 2013-07-04
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기	2013-07-04	화면 생성
	 ****************************************************************************************/
	$(function() {
		
		var loginId = '<%= loginId %>'; // 로그인 된 아이디
		
		//조회 필수값 체크
		$('#MNGQNA001P02').Form({
			validation : {
				TITLE : {
					required : true,
					name : '제목'
				}
			}
		});
		$('#QNAComment').Form({
			validation : {
				COMMENT_CONTENT : {
					required : true,
					name : '내용'
				}
			}
		});
		
		var qna_seq_no = $.Page.Data('QNA_SEQ_NO');
		var qna_dt =  $.Page.Data('QNA_DT');
		
		$('#editor').Editor({
			image: true
		});
		
		$.Page({
			init : function() {
				var request = $.DataSet();
				request.fields.<%=DBNamingConstants.QNA_SEQ_NO%> = qna_seq_no;
				request.fields.<%=DBNamingConstants.QNA_DT%> = qna_dt;
				$.Service({
					transaction : 'abm.INFBBase#pINF10002',
					request : request,
					response : '#MNGQNA001P02',
					success : function(ds) {
		            	tinymce.editors[0].setContent(ds.fields.<%=DBNamingConstants.CONTENTS%>);
					}
				});
				$.Page.comment_search();
			},
			comment_search : function(){
				var request = $('#MNGQNA001P02').DataSet();
				request.fields.<%=DBNamingConstants.QNA_SEQ_NO%> = qna_seq_no;
				request.fields.<%=DBNamingConstants.QNA_DT%> = qna_dt;
				$.Service({
					transaction : 'abm.INFBBase#pINF10006',
					request : request,
					success : function(ds) {
						var comment_list = ds.recordSets.AMS_QNA_COMMENT;
						var len = comment_list.nc_list.length;
						
						// 날짜를 구해서 현재 날짜이면 시간:분(hh:mm), 아니라면 전체날짜를 출력(yyyy-mm-dd)
						var d = new Date();
						
						function leadingZeros(n, digits) {
							  var zero = '';
							  n = n.toString();

							  if (n.length < digits) {
							    for (i = 0; i < digits - n.length; i++)
							      zero += '0';
							  }
							  return zero + n;
							}
						
		 				var today =  leadingZeros(d.getFullYear(), 4) + '-' +
		 			    leadingZeros(d.getMonth() + 1, 2) + '-' +
		 			    leadingZeros(d.getDate(), 2);
						
		 				// 날짜를 구해서 현재 날짜이면 시간:분, 아니라면 전체날짜를 출력 끝
		 				
						for(var i = 0; i < len; i++){
							var reg_date = comment_list.nc_list[i].REG_DATE;
							
							// 날짜를 구해서 현재 날짜이면 시간:분, 아니라면 전체날짜를 출력
							if(reg_date.substring(0,10) != today){
								reg_date = reg_date.substr(0,10);
							}else{
								reg_date = reg_date.substr(11, 5);
							}
							
							// 댓글을 실제 화면에 mapping시켜주는 부분
							var txt;
							var level = comment_list.nc_list[i].QNA_COMMENT_LEVEL;
							if(level == '1'){
			                    txt = "<ul class='ulComment'><li class='clearfix'><span class='usr_nm'>" + comment_list.nc_list[i].REG_USER_ID + "</span><span class='crt_dt'>" + reg_date + "</span>";
							}else{
			                    txt = "<ul class='ulComment'><li class='clearfix'><span class='usr_nm'><img src='/Resource/images/icon/ico_comment_reply.gif' style='padding-left:"+ (level-1) * 15 +"px;'/>" + comment_list.nc_list[i].REG_USER_ID + "</span><span class='crt_dt'>" + reg_date + "</span>";
							}

							txt = txt + "<a href='#1' class='comment' onclick='onReplyClick(this)' comment_seq_no = '"+ comment_list.nc_list[i].COMMENT_SEQ_NO +"' seq_no='" + comment_list.nc_list[i].QNA_SEQ_NO + "' qna_dt='" + comment_list.nc_list[i].QNA_DT + "'parent_comment_seq='"+ comment_list.nc_list[i].PARENT_COMMENT_SEQ +"'></a>";
							
	                     	if (loginId == comment_list.nc_list[i].REG_USER_ID) {
								txt = txt + "<span><a href='#1' class='del' onclick='onDelClick(this)' comment_seq_no = '"+ comment_list.nc_list[i].COMMENT_SEQ_NO +"' seq_no='" + comment_list.nc_list[i].QNA_SEQ_NO + "' qna_dt='" + comment_list.nc_list[i].QNA_DT + "'>삭제</a></span>";
								txt = txt + "<span><a href='#1' class='modify' onclick='onModifyClick(this)' comment_seq_no = '"+ comment_list.nc_list[i].COMMENT_SEQ_NO +"' seq_no='" + comment_list.nc_list[i].QNA_SEQ_NO + "' qna_dt='" + comment_list.nc_list[i].QNA_DT + "' content='"+ comment_list.nc_list[i].COMMENT_CONTENT +"'>수정</a></span>";
							}

	                        if(level == '1'){
			                    txt = txt + "</li><li class='cont'><span class='wspre'>" + comment_list.nc_list[i].COMMENT_CONTENT + "</span></li></ul>";
							}else{
			                    txt = txt + "</li><li class='cont' style='padding-left:"+ (((level-1) * 15) + 9) +"px;'><span class='wspre'>" + comment_list.nc_list[i].COMMENT_CONTENT + "</span></li></ul>";
							}

		                    $(txt).appendTo('#divComment');
							
						}
						
					}
				});
			}
		});
		
		// 수정버튼
		$('#btnUpdate').Button({
			role: 'update',
			click: function() {
				if (window.confirm('수정하시겠습니까?')) {
					$('#MNGQNA001P02').Validate(function(){
						var request = $('#MNGQNA001P02').DataSet();
						request.fields.<%=DBNamingConstants.CONTENTS%> = tinymce.editors[0].getContent();
						request.fields.<%=DBNamingConstants.QNA_SEQ_NO%> = qna_seq_no;
						request.fields.<%=DBNamingConstants.QNA_DT%> = qna_dt;
						$.Service({
							transaction : 'abm.INFBBase#pINF10004',
							request : request,
							success : function(ds) {
								$.Navigate('MNGQNA001.jsp');
							}
						});
					});
				}
			}
		});
		
		// 답글버튼
		$('#btnReply').Button({
			role: 'insert',
			click: function() {
				$.Navigate('MNGQNA001P01.jsp?QNA_SEQ_NO='+qna_seq_no+'&QNA_DT='+qna_dt);
			}
		});
		
		// 삭제버튼
		$('#btnDelete').Button({
			role: 'delete',
			click: function() {
				if (window.confirm('삭제하시겠습니까?')) {
					var request = $('#MNGQNA001P02').DataSet();
					
					request.fields.<%=DBNamingConstants.QNA_SEQ_NO%> = qna_seq_no;
					request.fields.<%=DBNamingConstants.QNA_DT%> = qna_dt;
					
					$.Service({
						transaction : 'abm.INFBBase#pINF10005',
						request : request,
						success : function(ds) {
							$.Navigate('MNGQNA001.jsp');
						}
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

		// 댓글버튼
		$('#btnComment').Button({
			role: 'insert',
			click: function() {
				if (window.confirm('댓글을 등록하시겠습니까?')) {
					var request = $('#QNAComment').DataSet();
					request.fields.<%=DBNamingConstants.QNA_SEQ_NO%> = qna_seq_no;
					request.fields.<%=DBNamingConstants.QNA_DT%> = qna_dt;
					$.Service({
						transaction : 'abm.INFBBase#pINF10007',
						request : request,
						success : function(ds) {
							$('#divComment *').remove();
							$('#COMMENT_CONTENT').Clear();
							$.Page.comment_search();
						}
					});
				}
			}
		});
		
		
	});
	
	var prev_event;		// 이전 이벤트와 비교
	var continue_comment = false;	// true: 같은 이벤트 -> 입력창 열기, false: 같은 이벤트 -> 입력창 닫기
	
	// 댓글의 댓글 입력화면
    function onReplyClick(e) {
    	$('#divComment2 *').remove();
    	$('#divComment3 *').remove();
    	
    	
    	if(e == prev_event && continue_comment == false){		// 같은 이벤트, 창 닫기
        
    		continue_comment = !continue_comment;
    	
    	}else if(e == prev_event && continue_comment == true){ 	// 같은 이벤트, 창 열기
   	    	
    		$(e).parent().parent().after(
   	    		'<div class="tb_data" id="divComment2">' +
   					'<textarea id="COMMENT_CONTENT2" class="textarea01" ></textarea>' +
   					'<span class="button replyBtnBig">' +
   	                    '<button id="btnComment2">' +
   	                        '<span class="button-text">댓글등록</span>' +
   	                    '</button>' +
   	                '</span>' +
   		        '</div>'
   			);
   	    	
   	    	$('#COMMENT_CONTENT2').focus();
   	    	continue_comment = !continue_comment;
    		
    	}else{													// 다른 이벤트
	    	
    		$(e).parent().parent().after(
	    		'<div class="tb_data" id="divComment2">' +
					'<textarea id="COMMENT_CONTENT2" class="textarea01" ></textarea>' +
					'<span class="button replyBtnBig">' +
	                    '<button id="btnComment2">' +
	                        '<span class="button-text">댓글등록</span>' +
	                    '</button>' +
	                '</span>' +
		        '</div>'
			);
	    	
	    	$('#COMMENT_CONTENT2').focus();
	    	continue_comment = false;
    	}
    	
    	prev_event = e;
    	
    	// 댓글의 댓글 등록버튼
		$('#btnComment2').Button({
			click: function() {
				if (window.confirm('댓글을 등록하시겠습니까?')) {
					var request = $.DataSet();
					request.fields.QNA_SEQ_NO = $(e).attr('seq_no');
					request.fields.QNA_DT = $(e).attr('qna_dt');
					request.fields.PARENT_COMMENT_SEQ = $(e).attr('comment_seq_no');
					request.fields.COMMENT_CONTENT = $('#COMMENT_CONTENT2').Value();
					$.Service({
					    transaction: 'abm.INFBBase#pINF10007',
					    request: request,
					    success: function (ds) {
					    	$('#divComment *').remove();
							$.Page.comment_search();
					    }
					});
				}
			}
		});
    	
	}
	
 	// 댓글의 수정화면
    function onModifyClick(e) {
	   	$('#divComment2 *').remove();
	   	$('#divComment3 *').remove();
    	var current_event = $(e).parent().parent();
    	if(e == prev_event && continue_comment == false){		// 같은 이벤트, 창 닫기
	    	$(prev_event).parent().parent().parent().find('li').last().show();
	    	continue_comment = !continue_comment;
    	}else if(e == prev_event && continue_comment == true){	// 같은 이벤트, 창 열기
    		current_event.parent().find('li').last().hide();
        	current_event.after(
        		'<div class="tb_data" id="divComment3">' +
    				'<textarea id="COMMENT_CONTENT3" class="textarea01" ></textarea>' +
   					'<span class="button replyBtnBig">' +
   	                    '<button id="btnComment3">' +
   	                        '<span class="button-text">댓글수정</span>' +
   	                    '</button>' +
   	                '</span>' +
   	                '<span class="button replyBtnBig">' +
                       '<button id="btnCancel3">' +
                           '<span class="button-text">취소</span>' +
                       '</button>' +
                   '</span>' +
    	        '</div>'
    		);
	 		var content = $(e).attr('content');
	 		continue_comment = !continue_comment;
	 		$('#COMMENT_CONTENT3').Value(content);
	    	$('#COMMENT_CONTENT3').focus();
    	}else{													// 다른 이벤트
    		current_event.parent().find('li').last().hide();
        	current_event.after(
        		'<div class="tb_data" id="divComment3">' +
    				'<textarea id="COMMENT_CONTENT3" class="textarea01" ></textarea>' +
   					'<span class="button replyBtnBig">' +
   	                    '<button id="btnComment3">' +
   	                        '<span class="button-text">댓글수정</span>' +
   	                    '</button>' +
   	                '</span>' +
   	                '<span class="button replyBtnBig">' +
                       '<button id="btnCancel3">' +
                           '<span class="button-text">취소</span>' +
                       '</button>' +
                   '</span>' +
    	        '</div>'
    		);
	 		var content = $(e).attr('content');
	 		continue_comment = false;
	 		$('#COMMENT_CONTENT3').Value(content);
	    	$('#COMMENT_CONTENT3').focus();
    	}
    	
    	prev_event = e;
    	
    	// 댓글의 수정버튼
		$('#btnComment3').Button({
			click: function() {
				if (window.confirm('댓글을 수정하시겠습니까?')) {
					var request = $.DataSet();
					request.fields.QNA_SEQ_NO = $(e).attr('seq_no');
					request.fields.QNA_DT = $(e).attr('qna_dt');
					request.fields.COMMENT_SEQ_NO = $(e).attr('comment_seq_no');
					request.fields.COMMENT_CONTENT = $('#COMMENT_CONTENT3').Value();
					$.Service({
					    transaction: 'abm.INFBBase#pINF10008',
					    request: request,
					    success: function (ds) {
					    	$('#divComment *').remove();
							$.Page.comment_search();
					    }
					});
				}
			}
		});
		$('#btnCancel3').Button({
			click: function() {
				$('#divComment *').remove();
				$.Page.comment_search();
			}
		});
	}
	
	
	// 댓글 삭제버튼
    function onDelClick(e) {
    	if (window.confirm('삭제하시겠습니까?')) {
			var request = $.DataSet();
			request.fields.COMMENT_SEQ_NO = $(e).attr('comment_seq_no');
			request.fields.QNA_SEQ_NO = $(e).attr('seq_no');
			request.fields.QNA_DT = $(e).attr('qna_dt');
			$.Service({
			    transaction: 'abm.INFBBase#pINF10009',
			    request: request,
			    success: function (ds) {
			    	$('#divComment *').remove();
					$.Page.comment_search();
			    }
			});
    	}
	}
	

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
					<h1>Q&A 상세조회</h1>
				</div>
				<div class="btn_common">
					<span class="button iconBtn">
						<button id="btnReply">
							<span class="button-icon ui-icon-func-Reply"></span> <span
								class="button-text">답글</span>
						</button> </span>
					<span class="button iconBtn">
						<button id="btnUpdate">
							<span class="button-icon ui-icon-func-edit"></span> <span
								class="button-text">수정</span>
						</button> </span>
					<span class="button iconBtn">
						<button id="btnDelete">
							<span class="button-icon ui-icon-func-delete"></span> <span
								class="button-text">삭제</span>
						</button></span>
					<span class="button iconBtn">
						<button id="btnCancel">
							<span class="button-icon ui-icon-func-cancelRequest"></span> <span
								class="button-text">취소</span>
						</button> </span>
				</div>
				<div class="tb_data">
					<form name="MNGQNA001P02" id="MNGQNA001P02">
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
				<div class="contSubTitle type03">
		    		<h3 class="required">Comment</h3>
		        </div>
		        <div class="tb_data">
		            <form id="QNAComment" name="QNAComment">
		               <textarea id="COMMENT_CONTENT" class="comment" ></textarea>
		                <span class="button replyBtnBig">
		                    <button id="btnComment">
		                        <span class="button-text">댓글등록</span>
		                    </button>
		                </span>
		            </form>
		        </div>
		        <div id="divComment" class="commentList"></div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="/common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>
