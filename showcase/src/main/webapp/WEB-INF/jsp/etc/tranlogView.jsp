<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<div class="success">
	 <table border="2">
    <caption>Tran Log</caption>
        <colgroup>
            <col style="width:300px;">
            <col style="width:40px;">
            <col>
            <col style="width:120px;">
            <col style="width:120px;">
            <col style="width:120px;">
        </colgroup>
        <thead>
        <tr align="center">
            <th scope="col">GLOB_ID</th>
            <th scope="col">처리결과</th>
            <th scope="col">요청주소</th>
            <th scope="col">시작</th>
            <th scope="col" class="rtd">종료</th>
        </tr>
        </thead>
        <tbody id="BOARD_LIST">
		<c:choose>
			<c:when test="${empty boardList}">
				<tr>
					<td colspan="5" align="center">조회된 자료가 없습니다.</td>
				</tr>
			</c:when>
			<c:otherwise>
		    <c:forEach var="v" items="${boardList}">
				<tr>
					<td class="tdcenter">${v.GLOB_ID}</td>
					<td class="tdcenter">${v.RSLT_MSG}</td>
					<td class="tdcenter">${v.TRN_CD}</td>
					<td class="tdcenter">${v.SVC_STRN_DTTM}</td>
					<td class="tdcenter rtd">${v.SVC_END_DTTM}</td>
				</tr>
		        </c:forEach>
			</c:otherwise>
		</c:choose>
        </tbody>
    </table>
</div>
