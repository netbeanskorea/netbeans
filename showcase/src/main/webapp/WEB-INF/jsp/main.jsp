<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>

<div class="main-header">
	<div class="main-contents">
	<h1 >sprout-showcase</h1>
	</div>
</div>
<div>	
<div class="main-headers">
		<section class="main_btns" id="nav-mvc" >
			<a href="<%=request.getContextPath()%>/webmvc"><h1>web-mvc</h1></a>
		</section>
		<section class="main_btns" id="nav-security"  >
			<a href="<%=request.getContextPath()%>/wsecurity"><h1>security</h1></a>
		</section>
		<section class="main_btns"  id="nav-session" >
			<a href="<%=request.getContextPath()%>/session"><h1>session</h1></a>
		</section>
		<section class="main_btns"  id="nav-ioc"  >
			<a href="<%=request.getContextPath()%>/ioc"><h1>ioc</h1></a>
		</section>
</div>