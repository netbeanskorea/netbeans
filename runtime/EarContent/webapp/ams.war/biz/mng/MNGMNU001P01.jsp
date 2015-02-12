<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<%@include file="../../common/common.jsp"%>
<title>메뉴 등록</title>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGMNU001P01.JSP
	 * 화면 설명  : 메뉴 등록
	 * 작성자        : 강훈기
	 * 작성일        : 2013-09-06
	 * 변경이력   : 
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * VER0.1	강훈기	    2013-09-06	화면 생성
	 ****************************************************************************************/

	$(function() {
		$.Page({
			init : function() {
				var PARENT_MENU_ID = $.Page.Data('<%=DBNamingConstants.PARENT_MENU_ID%>');
				$('#<%=DBNamingConstants.PARENT_MENU_ID%>').Value(PARENT_MENU_ID);
				$('#<%=DBNamingConstants.MENU_CATEGORY%>').Value($.Page.Data('<%=DBNamingConstants.MENU_CATEGORY%>'));
				var menu_depth_no = $.Page.Data('<%=DBNamingConstants.MENU_DEPTH_NO%>')
				$('#<%=DBNamingConstants.MENU_DEPTH_NO%>').Value(parseInt(menu_depth_no) + 1);
				
				$.Service({
					transaction : 'abm.MNUBBase#pMNU10006',
					request : {
						fields : {
							<%=DBNamingConstants.PARENT_MENU_ID%> : PARENT_MENU_ID
						},
						recordSets : {}
					},
					success : function(ds) {
						$('#<%=DBNamingConstants.DISPLAY_INDEX%>').Value(ds.fields.<%=DBNamingConstants.DISPLAY_INDEX%>);
					}
				});
			}
		});
	
		$('#<%=DBNamingConstants.INTRNL_VIEW%>').Select({
			change : function() {
				//alert($('#INTRNL_VIEW option:selected').val() );
				if($('#<%=DBNamingConstants.INTRNL_VIEW%> option:selected').val() == 'N') {
					$('#<%=DBNamingConstants.POPUP_VIEW%>').removeAttr("disabled");
				} else {
					$('#<%=DBNamingConstants.POPUP_VIEW%> option:eq(1)').attr("selected", "selected");
					$('#<%=DBNamingConstants.POPUP_VIEW%>').prop('disabled', 'disabled');
				}
			}
		});
		//등록 저장 버튼 
		$('#btnSave').Button({
			click : function() {
				
				var request = $('#form').DataSet();

				if (window.confirm("등록하시겠습니까?")) {
					$.Service({
						transaction : 'abm.MNUBBase#pMNU10005',
						request : request,
						success : function(ds) {
							alert(ds.message.messageName);
							$.Popup.Close($.Page.Data['schData']);
						}
					});
				}
			}
		});

		//취소하기
		$('#btnCancel').Button({
			click : function() {
				//$.Popup.Close();
				$.Page.Close();
			}
		});

		$('#form').Form({
			validation : {
				<%=DBNamingConstants.MENU_ID%> : {
					required : true
				}
			}
		});
		
		$('#<%=DBNamingConstants.MENU_CATEGORY%>').Options([
			{value: 'SYS', label: '시스템'},
			{value: 'BIZ', label: '업무'}
		]);
		$('#<%=DBNamingConstants.SCREEN_DISPLAY%>').Options([
   			{value: 'Y', label: '사용'},
   			{value: 'N', label: '미사용'}
   		]);
		$('#<%=DBNamingConstants.USE_FLAG%>').Options([
			{value: 'Y', label: '사용'},
			{value: 'N', label: '미사용'}
		]);
		$('#<%=DBNamingConstants.INTRNL_VIEW%>').Options([
   			{value: 'Y', label: '내부'},
   			{value: 'N', label: '외부'}
   		]);
		$('#<%=DBNamingConstants.POPUP_VIEW%>').Options([
   			{value: 'Y', label: '팝업'},
   			{value: 'N', label: '메인'}
   		]);
		$('#<%=DBNamingConstants.POPUP_VIEW%>').Disable();
		$('#<%=DBNamingConstants.POPUP_VIEW%>').Value('N');
		
		$('#<%=DBNamingConstants.SECRET_MODE%>').Options([
 			{value: 'Y', label: '사용'},
 			{value: 'N', label: '미사용'}
 		]);
	});
</script>
</head>
<body>
	<!--  <div id="container"> -->
	<div id="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea" class="type01">
				<div class="contTitle">
					<h2><%=BaseUtils.getAmsLabelValue("L0074", locale, "Menu Register") %></h2>
				</div>
				<div class="tb_data">
					<form id="form">
						<table>
							<colgroup>
								<col width="170">
								<col width="*">
							</colgroup>
							<tr>
								<th><label for="<%=DBNamingConstants.MENU_CATEGORY%>"><%=BaseUtils.getAmsLabelValue("L0040", locale, "Category") %></label></th>
								<td class="nobd">
									<select id="<%=DBNamingConstants.MENU_CATEGORY%>" name="<%=DBNamingConstants.MENU_CATEGORY%>"></select>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.MENU_ID%>"><%=BaseUtils.getAmsLabelValue("L0027", locale, "Menu ID") %></label>
								</th>
								<td class="nobd"><input id="<%=DBNamingConstants.MENU_ID%>" class="input01"
									type="text"/></td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.MENU_NAME%>"><%=BaseUtils.getAmsLabelValue("L0028", locale, "Menu Name") %></label>
								</th>
								<td class="nobd"><input id="<%=DBNamingConstants.MENU_NAME%>" class="input01"
									type="text" /></td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.MENU_NAME_EN%>"><%=BaseUtils.getAmsLabelValue("L0076", locale, "Menu Name EN") %></label>
								</th>
								<td class="nobd"><input id="<%=DBNamingConstants.MENU_NAME_EN%>" class="input01"
									type="text" /></td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.DISPLAY_INDEX%>"><%=BaseUtils.getAmsLabelValue("L0036", locale, "DP Index") %></label>
								</th>
								<td class="nobd"><input id="<%=DBNamingConstants.DISPLAY_INDEX%>" class="input01"
									type="text" maxlength="2" /></td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.PARENT_MENU_ID%>"><%=BaseUtils.getAmsLabelValue("L0035", locale, "Parent ID") %></label>
								</th>
								<td class="nobd"><input id="<%=DBNamingConstants.PARENT_MENU_ID%>" class="input01"
									type="text" disabled="disabled" /></td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.PAGE_URI%>">URI</label>
								</th>
								<td class="nobd"><input id="<%=DBNamingConstants.PAGE_URI%>" class="input01 num02"
									type="text" /></td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.MENU_DEPTH_NO%>"><%=BaseUtils.getAmsLabelValue("L0077", locale, "Menu Level") %></label>
								</th>
								<td class="nobd"><input id="<%=DBNamingConstants.MENU_DEPTH_NO%>" class="input01"
									type="text" disabled="disabled"/></td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.DESCRIPTION%>"><%=BaseUtils.getAmsLabelValue("L0078", locale, "Desciption") %></label>
								</th>
								<td class="nobd">
									<textarea id="<%=DBNamingConstants.DESCRIPTION%>" class="textarea01"></textarea>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.SCREEN_DISPLAY%>"><%=BaseUtils.getAmsLabelValue("L0056", locale, "Scr Disp") %></label></th>
								<td class="nobd">
									<select id="<%=DBNamingConstants.SCREEN_DISPLAY%>" name="SCREEN_DISPLAY"></select>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.SECRET_MODE%>">Secret_Mode</label></th>
								<td class="nobd">
									<select id="<%=DBNamingConstants.SECRET_MODE%>" name="SECRET_MODE"></select>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.INTRNL_VIEW%>"><%=BaseUtils.getAmsLabelValue("L0079", locale, "Intrnl View") %></label></th>
								<td class="nobd">
									<select id="<%=DBNamingConstants.INTRNL_VIEW%>" name="INTRNL_VIEW"></select>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.POPUP_VIEW%>"><%=BaseUtils.getAmsLabelValue("L0080", locale, "Popup View") %></label></th>
								<td class="nobd">
									<select id="<%=DBNamingConstants.POPUP_VIEW%>" name="POPUP_VIEW"></select>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.USE_FLAG%>"><%=BaseUtils.getAmsLabelValue("L0037", locale, "Use") %></label></th>
								<td class="nobd">
									<select id="<%=DBNamingConstants.USE_FLAG%>" name="USE_FLAG"></select>
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