<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="lnb_title">
	<h1>SECURITY</h1>
</div>
<ul class="sidemenu"> 
	<li>
		<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/security/security_main.frag');">Spring security 인증</a>
		<ul style="display:block;">				
			<li><a href="#webxml">web.xml 설정</a></li>
			<li><a href="#securitycore">sprout-security-core.xml 설정</a></li>
			<li><a href="#securityfile">sprout-security-file.xml 설정</a></li>
			<li><a href="#securityproperties">security.properties 설정</a></li>
			<li><a href="#sproutroot">sprout-root.xml 설정</a></li>
			<li><a href="#securityExample">Example </a></li>
			
			
		</ul> 
	</li>	
	<!-- <li>
		<a href="#simple">일반 인증</a>
	</li>	 -->
			
</ul>

