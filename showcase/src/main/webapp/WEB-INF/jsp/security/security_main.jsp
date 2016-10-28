<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="simple">Spring Security 인증</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="webxml"><font size="5px">web.xml 설정</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>web.xml의 spring security filter 및 리스너 설정은 다음과 같다.
<code class="xml">&lt;!-- spring security --&gt;
&lt;listener&gt;
    &lt;listener-class&gt;
org.springframework.security.web.session.HttpSessionEventPublisher
&lt;/listener-class&gt;
&lt;/listener&gt;	
&lt;filter&gt;
	&lt;filter-name&gt;springSecurityFilterChain&lt;/filter-name&gt;
	&lt;filter-class&gt;org.springframework.web.filter.DelegatingFilterProxy&lt;/filter-class&gt;
&lt;/filter&gt;
&lt;filter-mapping&gt;
	&lt;filter-name&gt;springSecurityFilterChain&lt;/filter-name&gt;
	&lt;url-pattern&gt;/*&lt;/url-pattern&gt;
&lt;/filter-mapping&gt;
</code> 
filter-name 의 springSecurityFilterChain 명은 spring security에서 기본적으로 제공하는 명명 규칙으로함. filter-name 변경시 에러 발생. 
</pre></h3>
<!-- comment 영역  -->


<!-- sub title  -->
<h1 id="securitycore"><font size="5px">WEB-INF/META-INF/spring/security/sprout-security-core.xml 설정</font></h1>
<!-- sub title  -->
<!-- comment 영역  -->
<h3><pre>1.sessionRegistry 설정
Session 정보를 관리하는 객체. 세션을 처리는 각 객체애 injection
<code>&lt;beans:bean id="sessionRegistry" class="org.springframework.security.core.session.SessionRegistryImpl"/&gt;</code>

2.concurrencyFilter
세션이 유효하지 않거나, 만료된 세션으로 요청이 들어올 경우 특정 페이지${expired.url}로 redirect한다.
<code> &lt;beans:bean id="concurrencyFilter" class="org.springframework.security.web.session.ConcurrentSessionFilter"&gt;
    &lt;beans:constructor-arg index="0" ref="sessionRegistry"/&gt;
    &lt;beans:constructor-arg index="1" value="&#36;{expired.url}"/&gt;
&lt;/beans:bean&gt;</code>

3.loginUrlAuthenticationEntryPoint
사용자 요청시 인증(Authentication) 여부를 확인하여 미 인증 사용자인 경우 로그인 페이지로 redirect 한다. 
redirect 방식과 forward 방식의 사용이 가능하며 기본설정은 forward true 임(forward 설정 false는 redirect 방식)
<code>&lt;!-- 로그인 페이지 설정(인증 권한을 필요로 하는 사용자 접근시 로그인 페이지로 화면 이동) --&gt;
&lt;beans:bean id="loginUrlAuthenticationEntryPoint" class="nexcore.sprout.foundry.security.web.authentication.DefaultLoginUrlAuthenticationEntryPoint"&gt;
	&lt;beans:constructor-arg&gt;
		&lt;beans:value&gt;&#36;{login.form.url}&lt;/beans:value&gt;
	&lt;/beans:constructor-arg&gt;
    &lt;beans:property name="useForward"   value="true"/&gt;
&lt;/beans:bean&gt;
</code>
<p><em>forward 설정 false 로 할경우 login 입력 페이지는 인증권한이 없는 권한설정이 추가 되어야 함 (리디렉션 순환 오류 발생)
<img src="<c:url value="/resources/css/images/1.png" />" border="0"/>
설정방법은 sprout-security-file.xml ) 
&lt;sec:intercept-url pattern="/security/loginForm" access="ROLE_ANONYMOUS"/&gt;</em>

</p>


4.accessDeniedHandler
AccessDeniedHandler객체는 권한이 부족한 요청시 오류 페이지로 forward 처리(form과 ajax(json) 처리가 가능)
<code>&lt;!-- access denied handler --&gt;
&lt;beans:bean id="accessDeniedHandler"  class="nexcore.sprout.foundry.security.web.access.DefaultAccessDeniedHandler"&gt;
	&lt;beans:property name="errorPage" value="&#36;{access.denied.url}"/&gt;
&lt;/beans:bean&gt;</code>


5.logoutFilter / logoutSuccessHandler
로그아웃 처리를 하는 URL 정보를 설정하고, 내부적으로는 세션을 만료처리 후 logoutSuccessHandler를 호출하여 후 처리를 할 수 있는 인터페이스를 제공한다.
<code>&lt;beans:bean id="logoutFilter" class="org.springframework.security.web.authentication.logout.LogoutFilter"&gt;
	&lt;beans:constructor-arg ref="logoutSuccessHandler"/&gt;
	&lt;beans:constructor-arg &gt;
		&lt;beans:list&gt;
			&lt;beans:bean class="org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler"/&gt;
		&lt;/beans:list&gt;
	&lt;/beans:constructor-arg&gt;
	&lt;beans:property name="logoutRequestMatcher"&gt;
		&lt;beans:bean class="org.springframework.security.web.util.matcher.RegexRequestMatcher"&gt;
			&lt;beans:constructor-arg index="0" value="&#36;{logout.processes.url}"/&gt;
			&lt;beans:constructor-arg index="1" value=""/&gt;
		&lt;/beans:bean&gt;
	&lt;/beans:property&gt;
&lt;/beans:bean&gt;

&lt;!-- logout success handler --&gt;
&lt;beans:bean id="logoutSuccessHandler" class="nexcore.sprout.foundry.security.web.authentication.logout.DefaultSimpleUrlLogoutSuccessHandler"&gt;
	&lt;beans:property name="useForward"       value="true"/&gt;
	&lt;beans:property name="defaultTargetUrl" value="&#36;{logout.success.url}"/&gt;
&lt;/beans:bean&gt;</code>

6.defaultUsernamePasswordAuthenticationFilter
설정으로 사용자계정/패스워드 처리에 대한 설정 : usernameParameter/ passwordParameter
* 로그인 처리를 담당하는 URL 정보 셋팅 : &#36;{login.processes.url}
* 로그인 처리시 필요한 파라미터명 설정  : userId, userPassword
* 로그인 실패시 호출되는 URL 정보 셋팅 : authenticationFailureHandler
* 로그인 성공시 호출되는 URL 정보 셋팅 : authenticationSuccessHandler
* 사용자 정보를 관리하는 UserDeatilsService 객체
* 패스워드의 암호화 처리를 해주는 PasswordEncoder 객체를 설정
<code>&lt;beans:bean id="defaultUsernamePasswordAuthenticationFilter" class="nexcore.sprout.foundry.security.web.authentication.JsonUsernamePasswordAuthenticationFilter"&gt;
&lt;beans:property name="usernameParameter" value="userId"/&gt;&lt;!-- 계정ID의 파라미터 명 --&gt;
&lt;beans:property name="passwordParameter" value="userPassword"/&gt;&lt;!-- 계정 패스워드의 파라미터 명 --&gt;
&lt;beans:property name="sessionAuthenticationStrategy" ref="sas"/&gt;
&lt;beans:property name="authenticationManager" ref="authenticationManager"/&gt;
&lt;beans:property name="requiresAuthenticationRequestMatcher"&gt;&lt;!-- 로그인 처리 URL 정보 --&gt;
	&lt;beans:bean class="org.springframework.security.web.util.matcher.RegexRequestMatcher"&gt;
		&lt;beans:constructor-arg index="0" value="&#36;{login.processes.url}"/&gt;
		&lt;beans:constructor-arg index="1" value="POST"/&gt;
	&lt;/beans:bean&gt;
&lt;/beans:property&gt;
&lt;beans:property name="authenticationSuccessHandler"&gt;
	&lt;beans:bean class="nexcore.sprout.foundry.security.web.authentication.DefaultSavedRequestAwareAuthenticationSuccessHandler"&gt;
		&lt;beans:property name="useForward" value="true"/&gt;
		&lt;beans:property name="defaultTargetUrl" value="&#36;{login.success.url}"/&gt;
	&lt;/beans:bean&gt;
&lt;/beans:property&gt;
&lt;beans:property name="authenticationFailureHandler"&gt;
	&lt;beans:bean class="nexcore.sprout.foundry.security.web.authentication.DefaultSimpleUrlAuthenticationFailureHandler"&gt;
		&lt;beans:property name="useForward" value="true"/&gt;
		&lt;beans:property name="defaultFailureUrl" value="&#36;{login.failure.url}"/&gt;
		&lt;/beans:bean&gt;
	&lt;/beans:property&gt;
&lt;/beans:bean&gt;</code>
<p><em>login.processes.url호출시 form과 ajax(json)  처리가 가능하나 : form 일경우 *.do 로 호출,  ajax일경우 *.json 으로 호출. </em></p>
<p><em>
 로그인 처리시 필요한 파라미터인 userId, userPassword 필드명은 Form 또는 Json 필드명과 일치해야 한다.
<img src="<c:url value="/resources/css/images/securityForm.PNG" />" border="0"/> </em></p>
7.UserDeatilsService / PasswordEncoder
스프링의 StandardPasswordEncoder 이용 하여 sha256 방식으로 설정.
<code>&lt;sec:authentication-manager alias="authenticationManager"&gt;
		&lt;sec:authentication-provider user-service-ref="defaultUserDetailsService"&gt;
			&lt;sec:password-encoder ref="messageDigestPasswordEncoder" /&gt;
		&lt;/sec:authentication-provider&gt;
	&lt;/sec:authentication-manager&gt;	
	
	&lt;beans:bean id="messageDigestPasswordEncoder"
		class="org.springframework.security.crypto.password.StandardPasswordEncoder" /&gt;			
&lt;/beans:beans&gt;
</code> 
</pre></h3>
<!-- sub title  -->
<h1 id="securityfile"><font size="5px">WEB-INF/META-INF/spring/security/sprout-security-file.xml 설정</font></h1>
<!-- sub title  -->
<!-- comment 영역  -->
<h3><pre>1. 권한 체크가 필요없는 url 정보 등록
<code class="xml">&lt;sec:http pattern="/resources/**" 		security="none" /&gt;
</code> 

2.spring security file config (file 기반일때의 설정)

* CONCURRENT_SESSION_FILTER :사용자 세션 관리 filter

* LOGOUT_FILTER : 로그 아웃 관리 filter

* FORM_LOGING_FILTER :로그인 관리 filter

* FILTER_SECURITY_INTERCEPTOR 
	자원(URL)에 대한 권한 정보 관리
	요청 자원(URL)에 대한 권한 처리
	요청 자원(URL)에 대한 권한 오류 처리
<code>&lt;sec:http access-decision-manager-ref="accessDecisionManager"
      authentication-manager-ref="authenticationManager"
      entry-point-ref="loginUrlAuthenticationEntryPoint"&gt;
    
&lt;sec:custom-filter position="CONCURRENT_SESSION_FILTER" ref="concurrencyFilter" /&gt;			      
&lt;sec:custom-filter position="LOGOUT_FILTER"             ref="logoutFilter"  /&gt;			      
&lt;sec:custom-filter position="FORM_LOGIN_FILTER"         ref="defaultUsernamePasswordAuthenticationFilter"  /&gt;
&lt;sec:access-denied-handler ref="accessDeniedHandler"  /&gt;

&lt;!-- spring security showcase에 필요한 URL 정보 --&gt;
&lt;sec:intercept-url pattern="/security/loginForm" access="ROLE_ANONYMOUS"/&gt; &lt;!-- 리다이렉션처리시 :  로그인폼 인증경로 제외 --&gt;
&lt;sec:intercept-url pattern="/security/loginSuccess" access="ROLE_USER,ROLE_ADMIN"/&gt;
&lt;/sec:http&gt;	</code>

3.사용자 정보를 관리하는 UserDeatilsService 객체사용을 위한 properties 설정
<code>&lt;sec:user-service id="defaultUserDetailsService" properties="classpath:META-INF/properties/users.properties"/&gt;</code>
</pre></h3>


<!-- sub title  -->
<h1 id="securityproperties"><font size="5px">WEB-INF/META-INF/properties/security.properties 설정</font></h1>
<!-- sub title  -->
<!-- comment 영역  -->
<h3><pre>security.properties 는 다음과 같이 설정한다.
<code class="xml"># LoginUrlAuthenticationEntryPoint
login.form.url=/security/loginForm
# ConcurrentSessionFilter
expired.url=/security/expiredUrl

# login processes URL
login.processes.url=/j_spring_security_check.(do|json)

# login success URL
login.success.url=/security/loginSuccess

# login.failur URL
login.failure.url=/loginFailure

# logout processes URL
logout.processes.url=/logout.(do|json)

# logout  success URL
logout.success.url=/security/logoutSuccess

# 접근 권한 거부시 이동하는 URL
access.denied.url=/security/accessDenied

</code>
</pre></h3>


<!-- sub title  -->
<h1 id="sproutroot"><font size="5px">sprout-root.xml 추가</font></h1>
<!-- sub title  -->
<!-- comment 영역  -->
<h3><pre>마지막으로 sprout-root.xml에 다음 항목을 추가 한다.
<code class="xml">&lt;!-- Security FILE --&gt;
&lt;import resource="classpath:/META-INF/spring/core/security/sprout-security-core.xml"/&gt;
&lt;import resource="classpath:/META-INF/spring/core/security/sprout-security-file.xml"/&gt;
</code> 
</pre></h3>



<!--  -->
<!-- sample 실행 영역  -->
<h1 id="securityExample"><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
				<a id="byPath" class="textLink" href="<c:url value="/security/loginSuccess" />">로그인 체크</a>
			</li>
	</ul>
</div>			
</div>
<!-- 페이지 Content  end -->

<pre> loginForm.jsp : &#36;{login.form.url}
<code>&lt;%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%&gt;
&lt;%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%&gt;
&lt;%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%&gt;
&lt;%@ page session="false" %&gt;
&lt;!-- 페이지 타이틀 영역  --&gt;
&lt;div class="titleArea" id="forms"&gt;LoginForm&lt;/div&gt;
&lt;!-- 페이지 타이틀 영역  --&gt;
&lt;!-- sub title  --&gt;
&lt;div id="formsContent"&gt;
		&lt;form:form id="form" action=<u>"<%=request.getContextPath()%>/j_spring_security_check.do"</u>  method="POST" cssClass="cleanform"&gt;
			&lt;div class="header"&gt;
		  		&lt;c:if test="&#36;{not empty message}"&gt;
					&lt;div id="message" class="success"&gt;&#36;{message}&lt;/div&gt;	
		  		&lt;/c:if&gt;
			&lt;/div&gt;
		  	&lt;fieldset&gt;
		  		&lt;legend&gt;Personal Info&lt;/legend&gt;
		  		userid:&lt;input type="text" name="userId" id="userId" value="user"/&gt;
		  		password:&lt;input type="password" name="userPassword" id="userPassword" value="user"/&gt;
		  		&lt;input type="hidden"  name="_csfg" value=""/&gt;
		  &lt;/fieldset&gt;		
			&lt;p&gt;&lt;button type="submit" &gt;Form 로그인&lt;/button&gt;
			&lt;button type="button" onClick="formSubmit();" &gt;Json 로그인&lt;/button&gt;
			&lt;/p&gt;
		&lt;/form:form&gt;
	&lt;/div&gt;
&lt;script type="text/javascript"&gt;
function formSubmit(){
	//&#36;("#form").submit(function() {
		alert('Json 로그인');
		var form = &#36;("#form");
		var button = form.children(":first");
		var data ="{ \"userId\": \""+&#36;('#userId').val()+"\", \"userPassword\": \""+&#36;('#userPassword').val()+"\" }";
		var myurl = <u>"<%=request.getContextPath()%>/j_spring_security_check.json"</u>;
		
		 &#36;.ajax({ url: myurl, data: data,type: "POST",contentType: "application/json", dataType: "text",
			beforeSend: function(req) {
				req.setRequestHeader("Accept", "application/json");
			},
			success: function(json) {
				&#36;("#formsContent").load("/showcase/security/loginSuccess.frag");
				//MvcUtil.showSuccessResponse(JSON.stringify(json), button);
			},
			error: function(xhr) {
				MvcUtil.showErrorResponse(xhr.responseText, button);
			}}); 
	//});
}
 &#36;(document).ready(function() {
	var token = &#36;("meta[name='_csrf']").attr("content");
	var header = &#36;("meta[name='_csrf_header']").attr("content");
	&#36;(document).ajaxSend(function(e, xhr, options) {
		//xhr.setRequestHeader(header, token);
		xhr.setRequestHeader('X-CSRF-TOKEN', 'SKCC12N00647-2692-1451284794106-268');
	});
});
&lt;/script&gt;	
</code>
loginSuccess.jsp : &#36;{login.success.url}
<code>&lt;%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%&gt;
&lt;%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%&gt;
&lt;%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%&gt;
&lt;div class="success"&gt;
		로그인 성공....
	&lt;div class="sample"&gt;
		&lt;ul&gt;
		&lt;li&gt;
				&lt;a id="byPath" class="textLink" href="&lt;c:url value="/logout.do" /&gt;"&gt;로그아웃 하기 &lt;/a&gt;
			&lt;/li&gt;
		&lt;li&gt;
				&lt;a id="byPath/security" class="textLink" href="&lt;c:url value="/security/security_main" /&gt;"&gt;돌아가기 &lt;/a&gt;
			&lt;/li&gt;	
	&lt;/ul&gt;
	&lt;/div&gt;
&lt;/div&gt;	
</code>

logoutSuccess.jsp : &#36;{logout.success.url}
<code>&lt;%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%&gt;
&lt;%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%&gt;
&lt;%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%&gt;
&lt;!-- sub title  --&gt;
&lt;div class="success"&gt;
		로그아웃성공 성공....
		&lt;div class="sample"&gt;
	&lt;/div&gt;
	&lt;div class="sample"&gt;
		&lt;ul&gt;
		&lt;li&gt;
				&lt;a id="byPath" class="textLink" href="&lt;c:url value="security" /&gt;"&gt;돌아가기 &lt;/a&gt;
			&lt;/li&gt;
&lt;/div&gt;
</code>
</pre>
