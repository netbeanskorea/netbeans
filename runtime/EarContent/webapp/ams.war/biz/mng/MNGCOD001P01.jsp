<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<%@include file="../../common/common.jsp"%>
<title>공통코드 등록</title>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGMNU001P01.jsp
	 * 화면 설명  : 공통코드 등록
	 * 작성일     : 2012-11-12
	 * 변경이력   : 
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	강훈기	2013-09-02	화면 생성
	 ****************************************************************************************/
	$(function() {

		$.Page({
			init : function() {
				//상위코드 추가시 부모코드에 'ROOT' 자동입력, 하위코드 추가시 부모코드 자동입력  
				var PARENT_CODE_ID = $.Page.Data('<%=DBNamingConstants.PARENT_CODE_ID%>');
				$('#<%=DBNamingConstants.PARENT_CODE_ID%>').Value(PARENT_CODE_ID);
				
				$.Service({
					transaction : 'abm.CODBBase#pCOD10007',
					request : {
						fields : {
							<%=DBNamingConstants.PARENT_CODE_ID%> : PARENT_CODE_ID
						},
						recordSets : {}
					},
					success : function(ds) {
						$('#<%=DBNamingConstants.DISPLAY_INDEX%>').Value(ds.fields.<%=DBNamingConstants.DISPLAY_INDEX%>);
					}
				});
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
				});
			}
		});

		$('#btnSave').Button({
			click : function() {
				var gridData = $('#<%=DBNamingConstants.PARENT_CODE_ID%>').Value();
				$('#form1').Validate(function() {
					if (window.confirm("등록 하시겠습니까?")) {
						$.Service({
							transaction : 'abm.CODBBase#pCOD10005',
							request : '#form1', // $('#form1').DataSet()
							success : function(ds) {
								alert(ds.message.messageName);
								$.Popup.Close($.Page.Data['schData']);
							}
						});
					}
				});
			}
		});

		//등록 취소하기
		$('#btnCancel').Button({
			click : function() {
				$.Page.Close();
			}
		});

		$('#form1').Form({
			validation : {
				<%=DBNamingConstants.PARENT_CODE_ID%> : {
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
					<h2><%=BaseUtils.getAmsLabelValue("L0068", locale, "Common Code Register") %></h2>
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
									class="input01" maxlength="15" />
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
								class="button-text"><%=BaseUtils.getAmsLabelValue("L0054", locale, "Save") %></span>
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