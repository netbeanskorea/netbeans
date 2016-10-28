<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page buffer="12kb" %> 


<html>
<head>
<meta charset="utf-8">  
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<c:set var="locale" value="${sessionScope['org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE']}"/>
<tiles:insertAttribute name="htmlCommon"/>
</head>
<body>
	<div id="wrap">
		<div id="header">
			<tiles:insertAttribute name="header"/>
		</div>
		<div id="container">
			<div id="lnbwrap"> 
				<tiles:insertAttribute name="sidebar"/>
			</div>
			<div id="conwrap">
				<div id="contents">
					<tiles:insertAttribute name="body"/>
				</div>
			</div>
		</div>
		<div id="footer">
			<tiles:insertAttribute name="footer"/>
		</div>
	</div>
</body>
<a class="scroll-to-top visible" href="#" id="scrollToTop"><i class="icon icon-chevron-up icon-white"></i></a>
</html>