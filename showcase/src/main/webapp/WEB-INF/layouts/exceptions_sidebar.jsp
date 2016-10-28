<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<div class="lnb_title">
	<h1>Exception Handling</h1>
</div>
<ul class="sidemenu"> 
	<li>
		<a href="#simple">Simple</a>
		<ul style="display:block;">				
			<li><a href="#getsimple">simple</a></li>
			<li><a href="#simpleRevisited">/simple/revisited</a></li>
		</ul> 
	</li>	
	<li>
		<a href="#">Request Mapping</a>
		<ul style="display:block;">				
			<li><a href="#">By path</a></li>
			<li><a href="#">By path pattern</a></li>
			<li><a href="#">By path and method</a></li>
		</ul> 
	</li>
	<li>
		<a href="#">Request Data</a>
			<ul style="display:block;">				
				<li><a href="#">Query parameter</a></li>
				<li><a href="#">Group of query parameters</a></li>
				<li><a href="#">Path variable</a></li>
			</ul> 
	</li>
	<li>
		<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/form.frag');">form</a>
	</li>	
</ul>

