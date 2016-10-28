<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<table border="1" align="center" width="100%" height="100%">
        <tr>
            <td colspan="2"><tiles:insertAttribute name="header"/></td>
        </tr>
        <tr height="100%">
            <td><tiles:insertAttribute name="sidebar"/></td>
            <td><tiles:insertAttribute name="body"/></td>
        </tr>
        <tr>
            <td colspan="2"><tiles:insertAttribute name="footer"/></td>
        </tr>
    </table>
</body>
</html>
