<!DOCTYPE html>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page buffer="12kb" %> 
<html>
<head>
<meta charset="utf-8">  
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- jQuery -->
<c:set var="locale" value="${sessionScope['org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE']}"/>
<tiles:insertAttribute name="htmlCommon"/>
</head>
<body>
	<div id="wrap">
		<div id="container">
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
</html>