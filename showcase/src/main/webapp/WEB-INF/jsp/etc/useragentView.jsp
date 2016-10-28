<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<spring:eval expression="T(nexcore.sprout.foundry.utils.UserAgentUtil).getUserAgent(pageContext.request)" var="userAgent" />
<div class="success">
	유형 : ${userAgent.getBrowser().getBrowserType()} <br/>
	이름 : ${userAgent.getBrowser().getName()}<br/>
	제조 : ${userAgent.getBrowser().getManufacturer().getName()}<br/>
	버젼 : ${userAgent.getBrowserVersion().getVersion()}"<br/>
	OS       : ${userAgent.getOperatingSystem().getName()}<br/>
	디바이스 : ${userAgent.getOperatingSystem().getDeviceType()}<br/>
	제조사   : ${userAgent.getOperatingSystem().getManufacturer().getName()}<br/>
</div>
