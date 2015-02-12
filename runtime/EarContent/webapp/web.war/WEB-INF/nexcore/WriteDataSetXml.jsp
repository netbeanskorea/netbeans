<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="rs" value="${_rsData.recordSetMap['recordSet_1']}" scope="request"/>

<?xml version="1.0" encoding="UTF-8"?>

<dataset>
    <params>
        <c:forEach items="${_rsData.paramKeys}" var="paramKey">
        <${paramKey}>${_rsData.paramMap['AAA']}</${paramKey}>
        </c:forEach>
    </params>
</dataSet>