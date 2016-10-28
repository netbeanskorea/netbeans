<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="simple">ORM</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="getsimple"><font size="5px">Basic DataSource 설정</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
1. dbms.properties 설정
<code>############### DB INFO ###############
dbms.kind=h2

# Properties file with JDBC  
jdbc.initLocation=classpath:META-INF/persistence/init/${dbms.kind}/initDB.sql

############### JDBC INFO FOR NOT USE WAS DATASOURCE ###############
jdbc.driverClassName=org.h2.Driver
#jdbc.url=jdbc:h2:/data/m2
jdbc.url=jdbc:h2:mem:showcase
jdbc.username=sa
jdbc.password=
jdbc.maxActive=20
jdbc.initialSize=10</code>
2. DataSource 설정 
<code>&lt;bean class="org.apache.commons.dbcp.BasicDataSource"
	destroy-method="close"&gt;
	&lt;property name="driverClassName" value="&#36;{jdbc.driverClassName}" /&gt;
	&lt;property name="url" value="&#36;{jdbc.url}" /&gt;
	&lt;property name="username" value="&#36;{jdbc.username}" /&gt;
	&lt;property name="password" value="&#36;{jdbc.password}" /&gt;
	&lt;property name="defaultAutoCommit" value="false" /&gt;
	&lt;property name="maxActive" value="&#36;{jdbc.maxActive}" /&gt;
	&lt;property name="initialSize" value="&#36;{jdbc.initialSize}" /&gt;
&lt;/bean&gt;</code>

* JNDI로 설정
<code>&lt;bean id="dataSource" class="org.springframework.jndi.JndiObjectFactoryBean"&gt;
   	&lt;property name="jndiName" value="&#36;{spring.datasource.jndi.name.sprout}"/&gt;
   	&lt;property name="resourceRef" value="&#36;{spring.datasource.jndi.prefix}"/&gt;
&lt;/bean&gt;
</code>
</pre></h3>
</div>
<!-- 페이지 Content  end -->


<script type="text/javascript">
$(document).ready(function() {

	$("a.textLink").click(function(){
		var link = $(this);
		$.ajax({ url: link.attr("href"), dataType: "text"
			   , success: function(text) { 
				   			MvcUtil.showSuccessResponse(text, link); }
		       , error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});
	
});	
</script>

