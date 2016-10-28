<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="resourcebundle">Resource Bundle</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="ResourceBundleMessageSource"><font size="5px">국제화(i18n)</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>* 국제화 처리를 위하여 Resourcebudle Editor 를 이용하여 필요한 Label,Message등을  편집한후 저장한다.
<code><img src="<c:url value="/resources/css/images/resourcebundleeditor.PNG" />" border="0"/></code>
<p><em> ** Resourcebudle Editor 가 없을경우 Eclipse Marketplace에서 플러그인을 설치해야 한다.</em>
<img src="<c:url value="/resources/css/images/resourcebundleeditorSearch.PNG" />" border="0"/>
</p>
* localeResolver 설정
<code>&lt;bean id="localeResolver" class="org.springframework.web.servlet.i18n.SessionLocaleResolver" &gt;
	&lt;property name="defaultLocale" value="&#36;{spring.mvc.locale.default}"/&gt;
&lt;/bean&gt;	</code>

* locale 인터셉터 설정
<code>&lt;mvc:interceptors&gt;
	&lt;bean class="org.springframework.web.servlet.i18n.LocaleChangeInterceptor"&gt;
		&lt;property name="paramName" value="locale"/&gt;
	&lt;/bean&gt;
&lt;/mvc:interceptors&gt;	</code>
* 다국어 적용 : request 파라미터로 locale 전송
<pre><code>
영어  적용 : resourcebundle/resourcebundleView.frag?locale=en_US
한국어적용 : resourcebundle/resourcebundleView.frag?locale=ko_KR
</code>
해당 다국어에 대한 정의항목이 없을경우 default 다국어가 적용된다.
파라미터는 get 방식외에  form 필드,json data 형식으로 적용가능

* jsp 활용
<pre><code>&lt;%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%&gt;
&lt;spring:message code='customer.label.common.search' text='검색'"/&gt;
</code>
</pre>
</h3>
<!-- comment 영역  -->


<!-- sample 실행 영역  -->
<h1>Example</h1>
<div class="sample">
	<ul>
		<li>
			<a id="resourcebundleviewEn" class="textLink" href="<c:url value="/resourcebundle/resourcebundleView.frag" />">ResourceBundle 영어로 조회</a>
		</li>
		<li>
			<a id="resourcebundleviewKo" class="textLink" href="<c:url value="/resourcebundle/resourcebundleView.frag?locale=ko_KR" />">ResourceBundle 한국어로 조회</a>
		</li>
	</ul>	
</div>
<!-- sample 실행 영역  -->

<pre><code>
&lt;div class="success"&gt;
	&lt;h3&gt;customer.label.common.search : &lt;spring:message code='customer.label.common.search' text='검색'/&gt;&lt;/h3&gt;
&lt;/div&gt;
</code></pre>
<script type="text/javascript">
$(document).ready(function() {

	$("a.textLink").click(function(){
		var link = $(this);
		$.ajax({ url: link.attr("href"), dataType: "text",data:{locale:'en_US'}
			   , success: function(text) { 
				   			MvcUtil.showSuccessResponse(text, link); 
				   			console.log("text",JSON.stringify(text)); }
		       , error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});
	
});	

	
</script>
