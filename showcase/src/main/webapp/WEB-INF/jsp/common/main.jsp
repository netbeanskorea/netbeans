<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Main</title>
</head>
<body>
	<div class="contTitle">
		<h1>Sample List</h1>
	</div>
	<div>
		<span class="button iconBtn">
			<a id="btnAdd" type="button" href="<%=request.getContextPath()%>/board/">
				<span class="button-icon ui-icon-search-reset"></span><span class="button-text">1. 게시판 Sample</span>			
			</a> 
		</span>
	</div>							
</body>
</html>