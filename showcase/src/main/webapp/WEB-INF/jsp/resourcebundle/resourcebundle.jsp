<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="resourcebundle">Resource Bundle</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="ResourceBundleMessageSource"><font size="5px">Message / Leabel  사용</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>* ResourceBundleMessageSource 설정 
<code>&lt;bean id="messageSource" class="org.springframework.context.support.ResourceBundleMessageSource"&gt;
	&lt;property name="basenames"&gt;
		&lt;list&gt;
               &lt;value&gt;nexcore/sprout/core/msg/sproutMessage&lt;/value&gt;
               &lt;value&gt;META-INF/messages/message/msg&lt;/value&gt;
               &lt;value&gt;META-INF/messages/label/label&lt;/value&gt;
               &lt;value&gt;META-INF/messages/error/error&lt;/value&gt;
               &lt;value&gt;META-INF/sprout/messages/error/foundry_error&lt;/value&gt;
           &lt;/list&gt;
	&lt;/property&gt;
&lt;/bean&gt;
</code>
<p><em>* 설정파일은 루트컨텍스트 안에 존재해야 jsp 에서 조회 가능하다</em></p>
* MessageSourceAccessor 설정
<code>&lt;bean id="messageSourceAccessor" class="org.springframework.context.support.MessageSourceAccessor"&gt;
	&lt;constructor-arg ref="messageSource"/&gt;
&lt;/bean&gt;	</code>
* jsp 활용
<pre><code>&lt;%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%&gt;
&lt;spring:message code='customer.label.common.search' text='검색'"/&gt;
</code>
</h3>
<!-- comment 영역  -->


<!-- sample 실행 영역  -->
<h1>Example</h1>
<div class="sample">
	<ul>
		<li>
			<a id="resourcebundleviewKo" class="textLink" href="<c:url value="/resourcebundle/resourcebundleView.frag?locale=ko_KR" />">Message/Label  조회</a>
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
