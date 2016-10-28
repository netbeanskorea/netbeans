<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="SpEL">Properties</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="getpeoperties"><font size="5px">Properties  설정</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
1.Properties DEFINITIONS
<code>&lt;bean id="propertyConfigurer" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer"&gt;
	&lt;property name="systemPropertiesModeName" value="SYSTEM_PROPERTIES_MODE_OVERRIDE" /&gt;
	&lt;property name="ignoreUnresolvablePlaceholders" value="false" /&gt;
	&lt;property name="properties" ref="configurationProperties"/&gt;
&lt;/bean&gt;
</code>
2.Properties  설정
<code>&lt;bean id="configurationProperties" class="org.springframework.beans.factory.config.PropertiesFactoryBean"&gt;
	&lt;property name="ignoreResourceNotFound" value="false"/&gt;
	&lt;property name="localOverride" value="true"/&gt;
	&lt;property name="locations"&gt;
		&lt;list&gt;
			&lt;value&gt;classpath:META-INF/properties/configuration.properties&lt;/value&gt;
			&lt;value&gt;classpath:META-INF/properties/security.properties&lt;/value&gt;
			&lt;value&gt;classpath:META-INF/properties/users.properties&lt;/value&gt;
			&lt;value&gt;classpath:META-INF/properties/dbms.properties&lt;/value&gt;
		&lt;/list&gt;			
	&lt;/property&gt;
	&lt;!--Optional Settings --&gt;
	&lt;property name="propertiesArray"&gt;
		&lt;list&gt;
			&lt;!-- 서버 환경(로컬,개발,운영) 별 설정 파일  --&gt;
			&lt;ref bean="mode_properties"/&gt;
			&lt;!-- Instance 별(개별 JVM용) 설정 파일  --&gt;
			&lt;ref bean="instance_properties"/&gt;
		&lt;/list&gt;	
	&lt;/property&gt;
&lt;/bean&gt;
</code>
3.Instance 별 설정 , JVM -D option 이용 
<code>&lt;!-- Instance 별 설정 , JVM -D option 이용  --&gt;
&lt;util:properties id="instance_properties" location="classpath:META-INF/properties/instance/instance_&#36;{instanceId:localhost}.properties"/&gt;
</code>

4.spring profile을 이용하여  서버 유형별,환경별 Bean 설정을 처리(파일 선택(local,dev,production)을 하거나 환경에 맞는 설정을 세팅함)
<code>
   &lt;util:properties id="mode_properties" location="classpath:META-INF/properties/mode/mode_local.properties"/&gt;
&lt;!-- 개발기용  --&gt;
&lt;beans profile="dev"&gt;
	&lt;util:properties id="mode_properties" location="classpath:META-INF/properties/mode/mode_dev.properties"/&gt;
&lt;/beans&gt;
&lt;!-- 운영기용  --&gt;
&lt;beans profile="production"&gt;
	&lt;util:properties id="mode_properties" location="classpath:META-INF/properties/mode/mode_production.properties"/&gt;
&lt;/beans&gt;</code>
<p> * spring profile 지정 방법 
 1. jvm arg 이용 
      -Dspring.profiles.active=dev,abc
 2. web.xml  이용 
	&lt;context-param&gt;
	  &lt;param-name&gt;spring.profiles.active&lt;/param-name&gt;
	  &lt;param-value&gt;dev&lt;/param-value&gt;
	&lt;/context-param&gt;
 3. System Property:
	export spring.profiles.active=production
</p></pre>
</h3>
 

<!-- comment 영역  -->

	
