<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!-- sub title  -->
<div class="success">
		로그인 성공....
	<div class="sample">
		<ul>
		<li>
				<a id="byPath" class="textLink" href="<c:url value="/logout.do" />">로그아웃 하기 </a>
			</li>
		<li>
				<a id="byPath/security" class="textLink" href="<c:url value="/security/security_main" />">돌아가기 </a>
			</li>	
	</ul>
	</div>
</div>	
