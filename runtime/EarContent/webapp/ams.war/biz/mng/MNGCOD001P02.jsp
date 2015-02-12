<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<%@include file="../../common/common.jsp"%>
<title>공통코드 수정</title>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGMNU001P02.JSP
	 * 화면 설명  : 공통코드 수정
	 * 작성자        : 강훈기
	 * 작성일        : 2013-09-02
	 * 변경이력   : 
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * VER0.1	강훈기    2013-09-02	화면 생성
	 ****************************************************************************************/

	$(function() {
		$.Page({
			init : function() {
				// 이전화면에서 넘어온 CODE_ID를 기준으로 검색
				var id = $.Page.Data('<%=DBNamingConstants.CODE_ID%>');
				var locale = $.Page.Data('<%=DBNamingConstants.LOCALE_ID%>');
				$.Service({
					transaction : 'abm.CODBBase#pCOD10002',
					request : {
						fields : {
							<%=DBNamingConstants.CODE_ID%> : id,
							<%=DBNamingConstants.LOCALE_ID%> : locale
						},
						recordSets : {}
					},
					response : '#form1',
					success : function(ds) {
						$.CodeHelper([{
						     divId: 'd_category', // 코드가 생성될 DIV
						     parentCode: 'C002',        // 부모 Code ID (해당 부모코드의 자식코드에 대해서 객체 생성)
						     codeId: '<%=DBNamingConstants.CATEGORY%>',    // 생성될 객체의 ID
						     blank : false,
						     style: 'select',           // radio, checkbox
						     codeValueId : 'ATTRIBUTE_02',
						     func: function() {         // select change 시 사용되는 함수
						     }
						}],
						function() {
							$('#<%=DBNamingConstants.CATEGORY%>').Value(ds.fields.<%=DBNamingConstants.CATEGORY%>);
						});
						$.CodeHelper([{
						     divId: 'd_use_flag', // 코드가 생성될 DIV
						     parentCode: 'C003',        // 부모 Code ID (해당 부모코드의 자식코드에 대해서 객체 생성)
						     codeId: '<%=DBNamingConstants.USE_FLAG%>',    // 생성될 객체의 ID
						     blank : false,
						     style: 'select',           // radio, checkbox
						     codeValueId : 'ATTRIBUTE_02',
						     func: function() {         // select change 시 사용되는 함수
						     }
						}],
						function() {
							$('#<%=DBNamingConstants.USE_FLAG%>').Value(ds.fields.<%=DBNamingConstants.USE_FLAG%>);
						});
						$.CodeHelper([{
						     divId: 'd_locale_id', // 코드가 생성될 DIV
						     parentCode: 'C009',        // 부모 Code ID (해당 부모코드의 자식코드에 대해서 객체 생성)
						     codeId: '<%=DBNamingConstants.LOCALE_ID%>',    // 생성될 객체의 ID
						     blank : false,
						     style: 'select',           // radio, checkbox
						     codeValueId : 'ATTRIBUTE_03',
						     func: function() {         // select change 시 사용되는 함수
						     }
						}],
						function() {
							$('#<%=DBNamingConstants.LOCALE_ID%>').Value(ds.fields.<%=DBNamingConstants.LOCALE_ID%>);
						});
					}
				});
			}
		});

		//수정 저장 버튼 
		$('#btnSave').Button({
			click : function() {
				var request = $('#form1').DataSet();
				$('#form1').Validate(function() {
					if (window.confirm("수정하시겠습니까?")) {
						$.Service({
							transaction : 'abm.CODBBase#pCOD10003',
							request : request,
							success : function(ds) {
								alert(ds.message.messageName);
								$.Popup.Close($.Page.Data['schData']);
							}
						});
					}
				});
			}
		});

		//수정 취소하기
		$('#btnCancel').Button({
			click : function() {
				$.Page.Close();
			}
		});
		
		$('#btnDelete').Button({
			click : function() {
				var request = $('#form1').DataSet();
				$('#form1').Validate(function() {
					if (window.confirm("삭제하시겠습니까?")) {
						$.Service({
							transaction : 'abm.CODBBase#pCOD10004',
							request : request,
							success : function(ds) {
								alert(ds.message.messageName);
								$.Popup.Close($.Page.Data['schData']);
							}
						});
					}
				});
			}
		});
		
		$('#form1').Form({
			validation : {
				<%=DBNamingConstants.CODE_ID%> : {
					required : true,
					name : '코드'
				},
				<%=DBNamingConstants.CODE_NAME%> : {
					required : true,
					name : '코드명'
				},
				<%=DBNamingConstants.DISPLAY_INDEX%> : {
					required : true,
					number : true,
					name : '정렬순서'
				},
				<%=DBNamingConstants.LOCALE_ID%> : {
					required : true,
					name : '언어'
				}
			}
		});
	});
</script>
</head>
<body>
	<!--  <div id="container"> -->
	<div id="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea" class="type01">
				<div class="contTitle">
					<h2>공통코드 수정</h2>
				</div>
				<div class="tb_data">
					<form id="form1">
						<table>
							<colgroup>
								<col width="170">
								<col width="340">
							</colgroup>
							<tr>
								<th><label for="<%=DBNamingConstants.CODE_ID%>" class="required"><%=BaseUtils.getAmsLabelValue("L0018", locale, "Code ID") %></label></th>
								<td class="nobd"><input id="<%=DBNamingConstants.CODE_ID%>" type="text"
									class="input01" maxlength="15" disabled/>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.CODE_NAME%>" class="required"><%=BaseUtils.getAmsLabelValue("L0019", locale, "Code Name") %></label></th>
								<td class="nobd"><input id="<%=DBNamingConstants.CODE_NAME%>" type="text"
									class="input01" maxlength="20" />
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.CATEGORY%>"><%=BaseUtils.getAmsLabelValue("L0040", locale, "Category") %></label></th>
								<td class="nobd">
									<div id="d_category"></div>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.DISPLAY_INDEX%>" class="required"><%=BaseUtils.getAmsLabelValue("L0036", locale, "DP Index") %></label>
								</th>
								<td class="nobd"><input id="<%=DBNamingConstants.DISPLAY_INDEX%>" class="input01"
									type="text" maxlength="2" />
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.USE_FLAG%>"><%=BaseUtils.getAmsLabelValue("L0037", locale, "Use") %></label>
								</th>
								<td class="nobd">
									<div id="d_use_flag"></div>
								</td>
							</tr>
							<tr>
							<tr>
								<th><label for="<%=DBNamingConstants.PARENT_CODE_ID%>"><%=BaseUtils.getAmsLabelValue("L0035", locale, "Parent ID") %></label></th>
								<td class="nobd"><input id="<%=DBNamingConstants.PARENT_CODE_ID%>"
									class="input01" type="text" readonly="readonly" />
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.ATTRIBUTE_01%>">Attribute_01</label></th>
								<td class="nobd"><input id="<%=DBNamingConstants.ATTRIBUTE_01%>" class="input01"
									type="text" />
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.ATTRIBUTE_02%>">Attribute_02</label></th>
								<td class="nobd"><input id="<%=DBNamingConstants.ATTRIBUTE_02%>" class="input01"
									type="text" />
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.ATTRIBUTE_03%>">Attribute_03</label></th>
								<td class="nobd"><input id="<%=DBNamingConstants.ATTRIBUTE_03%>" class="input01"
									type="text" />
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.LOCALE_ID%>"><%=BaseUtils.getAmsLabelValue("L0039", locale, "Locale") %></label></th>
								<td class="nobd">
									<div id="d_locale_id"></div>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="btn_main">
					<span class="button iconBtn">
						<button id="btnSave">
							<span class="button-icon ui-icon-func-save"></span> <span
								class="button-text"><%=BaseUtils.getAmsLabelValue("L0015", locale, "Update") %></span>
						</button> </span> <span class="button iconBtn">
						<button id="btnDelete">
							<span class="button-icon ui-icon-func-delete"></span> <span
								class="button-text"><%=BaseUtils.getAmsLabelValue("L0016", locale, "Delete") %></span>
						</button> </span> <span class="button iconBtn">
						<button id="btnCancel">
							<span class="button-icon ui-icon-func-cancelRequest"></span> <span
								class="button-text"><%=BaseUtils.getAmsLabelValue("L0055", locale, "Cancel") %></span>
						</button> </span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>