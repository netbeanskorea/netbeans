<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<%@include file="../../common/common.jsp"%>
<title>레이블 등록</title>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGLBL001P01.JSP
	 * 화면 설명  : 레이블 등록
	 * 작성자        : 강훈기
	 * 작성일        : 2013-10-14
	 * 변경이력   : 
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * VER0.1	강훈기    2013-10-14	화면 생성
	 ****************************************************************************************/

	$(function() {
		
		var lastsel = null;
		
		$.Page({
			init : function() {

				$.CodeHelper([{
				     divId: 'div01', 			// 코드가 생성될 DIV
				     parentCode: 'C009',        // 부모 Code ID (해당 부모코드의 자식코드에 대해서 객체 생성)
				     codeId: 'LOCALE_ID_FORM',    // 생성될 객체의 ID
				     style: 'select',           // radio, checkbox
				     blank : false,
				     codeValueId: 'ATTRIBUTE_03',
				     blankLabel : '',           // select시 초기화용
				     func: function() {         // select change 시 사용되는 함수
				    	 
				     }
				}]);
				
			}
		});

		//등록 저장 버튼 
		$('#btnSave').Button({
			click : function() {
				var request = $('#<%=DBNamingConstants.AMS_LABEL%>').DataSet();
				request.fields.LABEL_ID = $('#LABEL_ID_FORM').Value();
				if (window.confirm("등록하시겠습니까?")) {
					$.Service({
						transaction : 'abm.LBLBBase#pLBL10003',
						request : request,
						success : function(ds) {
							alert(ds.message.messageName);
							$.Popup.Close($.Page.Data['schData']);
						}
					});
				}
			}
		});
		
		//수정 취소하기
		$('#btnCancel').Button({
			click : function() {
				$.Page.Close();
			}
		});
		
		$('#btnAppend').Button({
			click: function() {
				$('#form').Validate(function() {
					var tableData = $('#<%=DBNamingConstants.AMS_LABEL%>').Record();
					
					var tempArray = {
							LABEL_ID : $('#LABEL_ID_FORM').Value(),
							LOCALE_ID : $('#LOCALE_ID_FORM').Value(),
							LABEL_NAME : $('#LABEL_NAME_FORM').Value()
					};
					
					// Grid에 추가할 값이 이미 존재할 때 조건문
					var len = $('#<%=DBNamingConstants.AMS_LABEL%>').Record().length;
					for(var i = 0; i < len; i++){
						if(tableData[i].LABEL_ID === tempArray.LABEL_ID && 
						   tableData[i].LOCALE_ID === tempArray.LOCALE_ID){
							tableData[i].LABEL_NAME = tempArray.LABEL_NAME;
							var addrow = {
								nc_list: tableData
							};
							$('#<%=DBNamingConstants.AMS_LABEL%>').RecordSet(addrow);
							return;
						}
					}
					
					tableData.push(tempArray)
					
					var addrow = {
						nc_list: tableData
					};
					
					$('#<%=DBNamingConstants.AMS_LABEL%>').RecordSet(addrow);
				});
			}
		});
		
		$('#btnRemove').Button({
			click: function() {
				if (lastsel === undefined) {
					alert("선택된 행이 없습니다.");
				} else {
					$('#<%=DBNamingConstants.AMS_LABEL%>').Remove(lastsel);
					lastsel = undefined; // 선택된 Row가 없을 때 lastsel을 초기화		
				}
			}
		});
		
		$('#form').Form({
			validation : {
				LABEL_ID_FORM : {
					required : true,
					name : '<%=BaseUtils.getAmsLabelValue("L0057", locale, "Label ID") %>'
				},
				LABEL_NAME_FORM : {
					required : true,
					name : '<%=BaseUtils.getAmsLabelValue("L0058", locale, "Label Name") %>'
				},
				LOCALE_ID_FORM : {
					required : true,
					name : '<%=BaseUtils.getAmsLabelValue("L0039", locale, "Locale") %>'
				}
			}
		});
		
		$('#<%=DBNamingConstants.AMS_LABEL%>').Grid({
			columns : [{
				id : 'LABEL_ID',
				title : '<%=BaseUtils.getAmsLabelValue("L0057", locale, "Label ID") %>',
				sortable : true,
				align : 'center',
				width : 150
			}, {
				id : 'LOCALE_ID',
				title : '<%=BaseUtils.getAmsLabelValue("L0039", locale, "Locale") %>',
				sortable : true,
				align : 'center',
				width : 200
			}, {
				id : 'LABEL_NAME',
				title : '<%=BaseUtils.getAmsLabelValue("L0058", locale, "Label Name") %>',
				sortable : true,
				align : 'center',
				width : 250
			}],
			height : 231,
			viewrecords : true,
			scrollOffset : 0,
			click : function(row, iRow, iCol, e) {
				lastsel = row;
				data = $('#AMS_LABEL').Record(row);
			 	$('#LABEL_ID_FORM').Value(data.LABEL_ID);
			 	$('#LOCALE_ID_FORM').Value(data.LOCALE_ID);
			 	$('#LABEL_NAME_FORM').Value(data.LABEL_NAME);
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
					<h2><%=BaseUtils.getAmsLabelValue("L0069", locale, "Label Register") %></h2>
				</div>
				<div class="tb_data">
					<form id="form">
						<table>
							<colgroup>
								<col width="170">
								<col width="340">
							</colgroup>
							<tr>
								<th><label for="LABEL_ID_FORM" class="required"><%=BaseUtils.getAmsLabelValue("L0057", locale, "Label ID") %></label></th>
								<td class="nobd"><input id="LABEL_ID_FORM" type="text"
									class="input01" maxlength="10"/>
								</td>
							</tr>
							<tr>
								<th><label for="LOCALE_ID_FORM"><%=BaseUtils.getAmsLabelValue("L0039", locale, "Locale") %></label></th>
								<td class="nobd"><div id="div01"></div></td>
							</tr>
							<tr>
								<th><label for="LABEL_NAME_FORM" class="required"><%=BaseUtils.getAmsLabelValue("L0058", locale, "Label Name") %></label></th>
								<td class="nobd"><input id="LABEL_NAME_FORM" type="text"
									class="input01 num02" maxlength="30" />
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="btn_common">
					<span class="button iconBtn">
						<button id="btnAppend">
							<span class="button-icon ui-icon-func-save"></span> <span
								class="button-text"><%=BaseUtils.getAmsLabelValue("L0064", locale, "Add") %></span>
						</button>
					</span>
					<span class="button iconBtn">
						<button id="btnRemove">
							<span class="button-icon ui-icon-func-delete"></span> <span
								class="button-text"><%=BaseUtils.getAmsLabelValue("L0061", locale, "Remove") %></span>
						</button>
					</span>
				</div>
				<div class="tb_basic">
					<table id="<%=DBNamingConstants.AMS_LABEL%>"></table>
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