<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<%@include file="../../common/common.jsp"%>
<title>메시지 등록</title>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGMSG001P02.JSP
	 * 화면 설명  : 메시지 등록
	 * 작성자        : 강훈기
	 * 작성일        : 2013-09-04
	 * 변경이력   : 
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * VER0.1	강훈기    2013-09-04	화면 생성
	 ****************************************************************************************/

	$(function() {
		$.Page({
			init : function() {
				
			}
		});

		//수정 저장 버튼 
		$('#btnSave').Button({
			click : function() {
				var request = $('#form').DataSet();
				$('#form').Validate(function() {
					if (window.confirm("등록하시겠습니까?")) {
						$.Service({
							transaction : 'abm.MSGBBase#pMSG10005',
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
		$('#form').Form({
			validation : {
				<%=DBNamingConstants.MESSAGE_ID%> : {
					required : true,
					name : '메시지ID'
				},
				<%=DBNamingConstants.MESSAGE_NAME%> : {
					required : true,
					name : '메시지명'
				},
				<%=DBNamingConstants.MESSAGE_TYPE%> : {
					required : true,
					name : '유형'
				},
				<%=DBNamingConstants.USE_FLAG%> : {
					required : true,
					name : '사용여부'
				},
			}
		});
		$('#'+'<%=DBNamingConstants.MESSAGE_TYPE%>').Options([
			{value: '1', label: '에러'},
			{value: '2', label: '경고'},
			{value: '3', label: '정보'},
			{value: '4', label: '확인'}
			
		]);
		
		$('#'+'<%=DBNamingConstants.USE_FLAG%>').Options([
   			{value: 'Y', label: '사용'},
   			{value: 'N', label: '미사용'}
   		]);
		$('#'+'<%=DBNamingConstants.LOCALE_ID%>').Options([
   			{value: 'ko_KR', label: '한글'},
   			{value: 'en_EN', label: '영어'}
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
					<h2>메시지 등록</h2>
				</div>
				<div class="tb_data">
					<form id="form">
						<table>
							<colgroup>
								<col width="170">
								<col width="340">
							</colgroup>
							<tr>
								<th><label for="<%=DBNamingConstants.MESSAGE_ID%>" class="required">메시지ID</label></th>
								<td class="nobd"><input id="<%=DBNamingConstants.MESSAGE_ID%>" type="text"
									class="input01" maxlength="15" />
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.MESSAGE_NAME%>" class="required">메시지명</label></th>
								<td class="nobd"><textarea class="textarea01" id="<%=DBNamingConstants.MESSAGE_NAME%>"></textarea>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.DESCRIPTION%>" class="required">설명</label></th>
								<td class="nobd"><textarea class="textarea01" id="<%=DBNamingConstants.DESCRIPTION%>"></textarea>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.MESSAGE_TYPE%>">유형</label></th>
								<td class="nobd">
									<select id="<%=DBNamingConstants.MESSAGE_TYPE%>"></select>
								</td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.USE_FLAG%>">사용여부</label>
								</th>
								<td class="nobd"><select id="<%=DBNamingConstants.USE_FLAG%>" name="<%=DBNamingConstants.USE_FLAG%>">
								</select></td>
							</tr>
							<tr>
								<th><label for="<%=DBNamingConstants.LOCALE_ID%>">언어</label></th>
								<td class="nobd">
									<select id="<%=DBNamingConstants.LOCALE_ID%>"></select>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="btn_main">
						<span class="button iconBtn">
							<button id="btnSave">
								<span class="button-icon ui-icon-func-save"></span> <span
									class="button-text">저장</span>
							</button> </span> <span class="button iconBtn">
							<button id="btnCancel">
								<span class="button-icon ui-icon-func-cancelRequest"></span> <span
									class="button-text">취소</span>
							</button> </span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>