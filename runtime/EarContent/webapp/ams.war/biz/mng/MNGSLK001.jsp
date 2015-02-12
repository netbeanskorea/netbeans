<%@ page pageEncoding="utf-8"%>
<%@ page import="ams.fwk.utils.HSMUtils" %>
<!doctype html>
<html>
<head>
<title>S-Link 관리</title>
<%@include file="../../common/common.jsp"%>
<script>
/*****************************************************************************************
 * 화면 이름  : 
 * 화면 설명  : 
 * 작성자      : 
 * 작성일      : 
 * 변경이력   :
 * 버전		성명		반영일자		내용                  
 *----------------------------------------------------------------------------------------
 * ver0.1		
 ****************************************************************************************/

$(function() {
	$('#MNGSLK001_MakeLink').Form({
		init : function() {
		},
		validation : {
			ENVIRONMENT_GROUP : {
				required:true,
				name : '개발 환경'
			},
			BIZ_CATEGORY : {
				required:true,
				name : '업무 구분'
			},
			LINK_ID : {
				required:true,
				name : '암호화 ID'
			},
			LINK_URL : {
				required:true,
				name : '암호화 URL'
			}
		}
	});
	$.Page({
		init: function(){
			//개발환경 select box구성
			$.CodeHelper([ {
				divId : 'ENVIRONMENT',
				parentCode : 'C005',
				codeId : 'ENVIRONMENT_GROUP',
				style : 'select',
				func : function() {
				},
				type : 'SYS'
			} ]	,
			function() {
				$('#MNGSLK001_MakeLink').Form({
					validation : {
						ENVIRONMENT_GROUP : {
							required:true,
							name : '개발 환경'
						}
					}
				});
				$('#PARENT_ENV_CD').val("C005");
			});	
			//시스템구분 select box구성
			$.CodeHelper([ {
				divId : 'DIV_BIZ_CATEGORY',
				parentCode : 'C002',
				codeId : 'BIZ_CATEGORY',
				style : 'select',
				func : function() {
				},
				type : 'SYS'
			} ]	,
			function() {
				$('#MNGSLK001_MakeLink').Form({
					validation : {
						BIZ_CATEGORY : {
							required:true,
							name : '업무 구분'
						}
					}
				});
				$('#PARENT_BIZ_CATE').val("C002");
			});	
		}
	/* 	, Search_List: function(page) {
			var request = $('#MNGSLK001_MakeLink').DataSet();
			
			$.Service({
				transaction: 'mng.MNGCOMB#generateSLink',
				request: request,
				success: function(ds) {
				
				}
			});
		} */
	});
	/**
	*생성버튼
	*/
	$('#btnGen').Button({
		click : function() {
			var request = $('#MNGSLK001_MakeLink').DataSet();
			 $('#MNGSLK001_MakeLink').Validate(function() {
				 $.Service({
						transaction: 'mng.MNGCOMB#generateSLink',
						request: request,
						success: function(ds) {
							$('#ECRYPTED_URL').val(ds.fields.ECRYPTED_URL);
						}
					});
			 });
		}
	});
	/**
	*초기화 버튼
	*/
	$('#btnInit').Button({
		click : function () {
			$('#ECRYPTED_URL').val("");
		}
	});
	
	$('#btnSave').Button({
		click :  function () {
			if(document.all) {
				window.clipboardData.setData('Text',$('#ECRYPTED_URL').val());
				alert("클립보드에 복사되었습니다.");
			} else{
				alert("IE외의 브라우저에서는 현재 기능을 지원하지 않습니다.");
				window.prompt('Dialog text', $('#ECRYPTED_URL').val());
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
			<!-- //leftArea -->
			<%@include file="../../common/LeftMenu.jsp"%>
			<!-- //leftArea -->
			<div id="contentArea">
				<div class="contTitle">
					<h1>S-Link</h1>
				</div>
				<div class="searchArea close">
					<form id="MNGSLK001_MakeLink">
						<input type="hidden" name="PARENT_ENV_CD" id="PARENT_ENV_CD" />
						<input type="hidden" name="PARENT_BIZ_CATE" id="PARENT_BIZ_CATE" />
						<table class="tb_search">
							<colgroup>
								<col width="130" />
								<col width="284" />
								<col width="130" />
								<col width="284" />
								<col width="110" />
							</colgroup>
							<tr class="first_row">
								<th><label for="ENVIRONMENT_GROUP">개발 환경</label></th>
								<td><div id="ENVIRONMENT">
									<select id="ENVIRONMENT_GROUP" name="ENVIRONMENT_GROUP"></select>
								</div>
								</td>											
								<th><label for="BIZ_CATEGORY">업무 구분</label></th>
								<td><div id="DIV_BIZ_CATEGORY">
										<select id="BIZ_CATEGORY" name="BIZ_CATEGORY"></select>
										</div>
								</td>						
								<td class="searchBtn" rowspan="2">
									<button id="btnSearch" class="btnSearch">
										<span class="button-text">Search</span>
									</button>
								</td>						
							</tr>
							<tr>
								<th><label for="LINK_ID">암호화 ID</label></th>
								<td><input id="LINK_ID"  type="text" maxlength="30" size="30" /></td>
								<th><label for="LINK_URL">암호화 URL</label></th>
								<td><input id="LINK_URL"  type="text" maxlength="35"  size="35"/></td>
							</tr>
						</table>
					</form>
				</div>
				<div class="search_more">
					<a href="javascript:SlideDownSearch();"></a>
				</div>
				<div class="btn_common type01">
					<span class="button iconBtn">
						<button id="btnGen">
							<span class="button-icon ui-icon-search-reset"></span> <span
								class="button-text">생성</span>
						</button> </span> <span class="button iconBtn">
					</span>
				</div>
				<div class="tb_data">
					<table id="LINK_RS">
						<colgroup>
							<col width="130" />
							<col width="860" />
						</colgroup>
						<tr>
						<th><label>URL</label></th>
						<td >
							<textarea id="ECRYPTED_URL" class="textarea03" maxlength="4000"></textarea>
						</td>								
					</table>
				</div>
				<div class="btn_common type01">
					<span class="button iconBtn">
						<button id="btnInit">
							<span class="button-icon ui-icon-search-reset"></span> <span
								class="button-text">초기화</span>
						</button> </span> <span class="button iconBtn">
						<button id="btnSave">
							<span class="button-icon ui-icon-func-save"></span> <span
								class="button-text">복사</span>
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