<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>


<!-- sub title  -->
<div class="success">
	
		access Denied....
		
		<div class="sample">
	</div>
	<div class="sample">
		<ul>
		<li>
			<a id="byPath" class="textLink" href="<c:url value="security" />">돌아가기 </a>
		</li>
	</ul>
	</div>
<script type="text/javascript">
$(document).ready(function() {
    	$("#form").submit(function() {
		var form = $(this);
		var button = form.children(":first");
		var data ="{ \"userId\": \"user\", \"userPassword\": \"user\" }";
		var myurl = "<%=request.getContextPath()%>/j_spring_security_check.json";
		alert(myurl);
		
		$.ajax({ url: myurl, data: data,type: "POST",contentType: "application/json", dataType: "text",
			beforeSend: function(req) {
				req.setRequestHeader("Accept", "application/json");
			},
			success: function(json) {
				MvcUtil.showSuccessResponse(JSON.stringify(json), button);
			},
			error: function(xhr) {
				MvcUtil.showErrorResponse(xhr.responseText, button);
			}});
		return false;
	}); 
	  
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$(document).ajaxSend(function(e, xhr, options) {
		xhr.setRequestHeader('X-CSRF-TOKEN', 'SKCC12N00647-2692-1451284794106-268');
	});
});
</script>	