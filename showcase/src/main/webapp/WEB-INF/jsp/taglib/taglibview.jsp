<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<spring:eval expression="someBean.someMethod()" var="someMessage"/>
<spring:eval expression="@showcaseproperties['showcase.version']" var="showcaseVersion"/>

<div class="success">
	<h3>showcaseVersion : ${ showcaseVersion}</h3>
	<h3>메세지는        : ${ someMessage}</h3>
	<br/>
	<h3><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/taglib.frag');"> Back</a></h3>
</div>
