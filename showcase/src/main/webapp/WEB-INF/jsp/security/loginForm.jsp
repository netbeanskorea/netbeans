<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page session="false" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="forms">LoginForm</div>

<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/> 

<!-- 페이지 타이틀 영역  -->
<!-- sub title  -->
<div id="formsContent">
		<form:form id="form" action="${pageContext.request.contextPath}/j_spring_security_check.do"  method="POST" cssClass="cleanform">
			<div class="header">
		  		<c:if test="${not empty message}">
					<div id="message" class="success">${message}</div>	
		  		</c:if>
			</div>
		  	<fieldset>
		  		<legend>Personal Info</legend>
		  		userid:<input type="text" name="userId" id="userId" value="user"/>
		  		password:<input type="password" name="userPassword" id="userPassword" value="user"/>
		  		<input type="hidden"  name="_csfg" value=""/>
		  </fieldset>		
			<p><button type="submit" >Form 로그인</button>
			<button type="button" onClick="formSubmit();" >Json 로그인</button>
			</p>
		</form:form>
	</div>
<script type="text/javascript">
function formSubmit(){
	//$("#form").submit(function() {
		alert('Json 로그인');
		var form = $("#form");
		var button = form.children(":first");
		var data ="{ \"userId\": \""+$('#userId').val()+"\", \"userPassword\": \""+$('#userPassword').val()+"\" }";
		var myurl = "<%=request.getContextPath()%>/j_spring_security_check.json";
		
		 $.ajax({ url: myurl, data: data,type: "POST",contentType: "application/json", dataType: "text",
			beforeSend: function(req) {
				req.setRequestHeader("Accept", "application/json");
			},
			success: function(json) {
				$("#formsContent").load("<c:url value="/security/loginSuccess.frag"/>");
				//MvcUtil.showSuccessResponse(JSON.stringify(json), button);
			},
			error: function(xhr) {
				MvcUtil.showErrorResponse(xhr.responseText, button);
			}}); 
	//});
}
 $(document).ready(function() {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$(document).ajaxSend(function(e, xhr, options) {
		//xhr.setRequestHeader(header, token);
		xhr.setRequestHeader('X-CSRF-TOKEN', 'SKCC12N00647-2692-1451284794106-268');
	});
});
</script>	
