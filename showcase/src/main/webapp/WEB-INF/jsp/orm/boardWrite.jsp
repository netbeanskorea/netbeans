<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><spring:message code="board.title.new"/></title>
</head>
<script>
function submit() {
	
	var form = document.form;
	form.action = '<%=request.getContextPath()%>/ormBoard/addBoard.frag';
	var link = $("#getBoardListFrag");
	 $.post($('#form').attr('action'), $('#form').serialize(), function(html) {
		MvcUtil.showSuccessResponse(html, link); 
		if($(".error").length == 1){
			$('html, body').animate({ scrollTop:$(".error").offset().top},500);
		}else if($(".error").length > 1){
			$('html, body').animate({ scrollTop:$(".error:first").offset().top},500);	
		} 
		 
	});
}
</script>
<body>
	<div class="contTitle">
		<h3><spring:message code="board.title.new"/></h3>
	</div>
	<div class="tb_data">
		<form:form id="form" name="form" action="${request.contextPath}/ormBoard/addBoard.frag" method="POST"   modelAttribute="showcaseBoardVO">
		<input type="hidden" name="_csrf" value="${_csrf.token}"/>
		<input type="hidden" name="_csrf_header" value="${_csrf.headerName}"/>
			<div class="table-responsive">
  				<table class="table table-bordered table-striped">
				<colgroup>
					<col width="130" />
					<col width="300" />
					<col width="160" />
					<col width="400" />
				</colgroup>
				<tr>
					<th>
						<form:label path="writer" for="writer"><spring:message code="board.label.writer"/></form:label>
					</th>
					<td>
						<form:input path="writer" value="${boardInfo.writer}"/>
						<form:errors path="writer" cssClass="error"/>
					</td>
					<th>
						<form:label path="dueDate" for="dueDate"><spring:message code="board.label.dueDate"/> (yyyy-mm-dd)</form:label>						
					</th>
					<td>
						<form:input path="dueDate" value="${boardInfo.dueDate}"/>
						<form:errors path="dueDate" cssClass="error"/>
					</td>
				</tr>
				<tr>
					<th>
						<form:label path="title" for="title"><spring:message code="board.label.title"/>(<spring:message code="board.label.max"/>10)</form:label>
					</th>
					<td colspan="3">
						<form:input path="title" cssClass="Textinput input01 num05" value="${boardInfo.title}"/>
						<form:errors path="title" cssClass="error"/>
					</td>
					
				</tr>								
				<tr>
					<th>
						<form:label path="content" for="content"><spring:message code="board.label.content"/></form:label>
					</th>
					<td colspan="3">
						<form:errors path="content" cssClass="error"/>
						<textarea id="content" name="content" class="textarea05" >${boardInfo.content}</textarea>
					</td>					
				</tr>
			</table>					
		</form:form>
	</div>	
	<div class="btn_main" align="center">
		<span class="button iconBtn">
			<a id="btnSave" type="button" onclick="submit(); return false;" href="#">
				<span class="button-icon ui-icon-func-save"></span> <span class="button-text"><spring:message code="board.btn.save"/></span>
			</a> </span> <span class="button iconBtn">
			<%-- <a id="btnCancel" type="button" class="button" href="<%=request.getContextPath()%>/board/">
				<span class="button-icon ui-icon-func-cancelRequest"></span> <span class="button-text"><spring:message code="board.btn.cancel"/></span>
			</a> 	 --%>		
		</span>
	</div>
</body>
</html>

