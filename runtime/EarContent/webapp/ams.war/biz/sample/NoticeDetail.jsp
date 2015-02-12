<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<%@include file="../../common/common.jsp"%>
<title>공지사항 상세</title>
<script>
	/*****************************************************************************************
	 * 화면 이름  : NoticeView.jsp
	 * 화면 설명  : 공지사항 상세
	 * 작성자        : 백인하
	 * 작성일        : 2012-11-12
	 * 변경이력   : 
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	백인하	2012-11-12	화면 생성
	 ****************************************************************************************/
	$(function() {
		var file_seq_no;
		$.Page({
            init: function() {
                  $.Service({
                        transaction: 'brd.BRDBBase#pBRD10005',
                        request: {
	                     	 fields: {
	                     		 SEQ_NO: $.Param('SEQ_NO')
	                     	 },
                       	 	recordSets: {}
                        },
                        response: '#form',
                        success: function(ds) {
                        	file_seq_no = ds.fields['FILE_SEQ_NO'];
                        	$('#fileDownloadDiv').FileDownloadInit(file_seq_no);   
                        }
                  });
            }
		});

		$('#form').Form();

		$('#btnSave').Button({
			click: function() {
				if (window.confirm("수정 하시겠습니까?")) {
					$.Service({
                        transaction: 'brd.BRDBBase#pBRD10003',
                        request: {
                       	 fields: {
                       		 SEQ_NO: $.Param('SEQ_NO'),
                       		 TITLE:$('#TITLE').Value(),
                       		 CONTENT:$('textarea#CONTENT').Value(),
                       		 FILE_SEQ_NO:file_seq_no
                       	 },
                       	 recordSets: {}
                        },
                        response: '#form',
                        success: function(ds) {
                        	$.Navigate('NoticeList.jsp', {
								schKind: $.Param('schKind'),
								schWord: $.Param('schWord'),
								page: $.Param('page')
							});   
                        }
                  });
				}
			}
		});
		
		$('#btnDel').Button({
			click: function() {
				if (window.confirm("삭제 하시겠습니까?")) {
					$.Service({
						transaction: 'brd.BRDBBase#pBRD10004',
						request: {
                     	  	fields: {
                    			SEQ_NO: $.Param('SEQ_NO')
                    		},
                   		 	recordSets: {}
                   	 	},
						success: function(ds) {
							alert(ds.message.messageName);
							$.Navigate('NoticeList.jsp', {
								schKind: $.Param('schKind'),
								schWord: $.Param('schWord'),
								page: $.Param('page')
							});
						}
					});
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
		
		$('#btnDownloadAll').Button({
			click: function() {
				$.FileDownloadAll('11,10');
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
					<h1>게시판 상세</h1>
				</div>
				<div class="tb_data">
					<form id="form">
						<table class="fieldTbl mt10">
							<tr>
								<th><label for="TITLE">제목</label></th>
								<td><input id="TITLE" type="text" class="input01"/></td>
							</tr>
							<tr>
								<th colspan="2" align="left"><label for="CONTENT">내용</label></th>
							</tr>
							<tr>
								<td colspan="2"><textarea id="CONTENT" class="textarea01"></textarea></td>
							</tr>
							
							<tr>
								<th><label for="File1">파일1</label></th>
								<td>
									<div id="fileDownloadDiv"></div>
								</td>
							</tr>
						</table>
						<div class="btn_common">
							<span class="button iconBtn">
								<button id="btnDel">
									<span class="button-icon ui-icon-func-delete"></span> <span
										class="button-text">삭제</span>
								</button> </span> <span class="button iconBtn">
								<button id="btnSave">
									<span class="button-icon ui-icon-func-edit"></span> <span
										class="button-text">수정</span>
								</button> </span> <span class="button iconBtn">
								<button id="btnCancel">
									<span class="button-icon ui-icon-func-delete"></span> <span
										class="button-text">취소</span>
								</button> </span><span class="button iconBtn">
								<button id="btnDownloadAll">
									<span class="button-icon ui-icon-func-delete"></span> <span
										class="button-text">모든파일다운로드</span>
								</button> 
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