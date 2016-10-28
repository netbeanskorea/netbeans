<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
	
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="userAgent">부가기능</div>
<!-- 페이지 타이틀 영역  -->

<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="userAgent"><font size="5px">중복요청 처리</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>서버에서 생성된 guid 를 list에 저장하고 있다가  클라이언트로 부터 요청시 전송된 token key 가 list 에 존재하는지 여부를 확인하여 
존재하지 않으면 중복요청처리를 한다  이때 사용된 token 은 list 에서 삭제처리 한다.

1. interceptor  등록  
<pre><code>&lt;mvc:interceptors&gt;
&lt;bean class=<span class="code-quote">"nexcore.sprout.foundry.webmvc.interceptors.DuplicatedSubmitPreventInterceptor"</span>/&gt;
&lt;/mvc:interceptors&gt;
</code></pre>
2. Controller 에 적용 :
   중복 체크가 필요한 Method에  @DuplicatedSubmitChecker 어노테이션 사용   
<pre><code>@DuplicatedSubmitChecker 
@RequestMapping(value = "/dup", method = RequestMethod.GET)
   public String dupcheck(Locale locale, Model model) {
</code></pre>
 3. Client 요청방법: <pre><code>중복 Request header 또는 HttpAttribute 의 synchronizedToken 의 값을 동일한 키 값으로 http request 또는 header에 전송
</code></pre>
</pre></h3>
<!-- comment 영역  -->
<p><em>중복 체크 skip을 원할경우 :  Request Parameter key: "cs" 적용</em></p>

<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a id="dupChecker" class="textLink" href="<c:url value="/etc/dupcheck.frag"/>?synchronizedToken=${synchronizedToken}">두번 요청하면 중복요청 오류 발생( ${synchronizedToken} ) :   </a>
		</li>
		<li>
			<a id="skipDupChecker" class="textLink" href="<c:url value="/etc/dupcheck.frag" />?cs=true">중복체크 통과(Request Parameter key: "cs" 강제적용 ) :  </a>
		</li>
	</ul>
</div>
<!-- sample 실행 영역  -->

<!-- sample 소스코드 영역  -->
<pre>
<code class="java">
package nexcore.sprout.showcase.etc.duplicated;

import nexcore.sprout.foundry.webmvc.interceptors.DuplicatedSubmitChecker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DuplicatedCheckerController {

	@DuplicatedSubmitChecker
	@RequestMapping(value="/etc/dupcheck")
	public @ResponseBody String dupchecker() {
		return "Checker Pass !!!";
	}
}
</code>
</pre>
<!-- sample 소스코드 영역  -->
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