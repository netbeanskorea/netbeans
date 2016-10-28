<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<div class="lnb_title">
	<h1>ETC</h1>
</div>
<ul class="sidemenu"> 
	<li>
		<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/etc/tranlog.frag');">로그조회</a>
	</li>
	<li>
		<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/etc/duplicatedSubmitChecker.frag');">중복요청 처리</a>
	</li>
	<li>
		<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/etc/useragent.frag');">UserAgent  분석</a>
	</li>
	<li>
		<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/etc/etcProperties.frag');">Properties</a>
	</li>
	<li>
		<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/etc/springProfile.frag');">Spring Profile</a>
	</li>
	<li>
		<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/etc/springCache.frag');">Spring Cache</a>
	</li>
	<!-- <li>
		<a href="#simple">JMX</a>
	</li>	 -->
	<!-- <li>
		<a href="#" onClick="goNavigate('/showcase/etc/springProfile.frag');">환경</a>
		<ul style="display:block;">				
			<li><a href="#">Spring Profile</a></li>
			<li><a href="#">properties</a></li>
		</ul> 
	</li> -->
	
	<!-- <li>
		<a href="#simple">테스트</a>
	</li> -->
</ul>

