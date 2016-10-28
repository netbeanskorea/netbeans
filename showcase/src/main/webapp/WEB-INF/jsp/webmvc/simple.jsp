<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="simple">Simple</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="getsimple"><font size="5px">GET /simple </font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
@Controller 어노테이션은 해당 클래스가 컨트롤러의 역할을 한다는 것을 나타낸다. 
핑된 메서드에 이러한 어노테이션이 붙은 클래스를 찾고 @RequestMapping 어노테이션을 탐지한다.
컨트롤러의 자동탐지를 활성화하려면 설정에 컴포넌트 스캔을 다음   XML 코드처럼 spring-context 스키마 를추가해야 한다. 
<pre><code class="xml"> context:component-scan base-package="nexcore.sprout.showcase"</code></pre>
</pre></h3>
<!-- comment 영역  -->


<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li><a id="simpleLink" class="textLink" href="<c:url value="/simple" />">GET /simple : </a></li>
		<li><a id="simpleRevisited1" class="textLink" href="<c:url value="/simple/revisited" />">GET /simple/revisited : </a></li>
	</ul>
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
<code class="java">
package nexcore.sprout.showcase.mvc.simple;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SimpleController {

	@RequestMapping("/simple")
	public @ResponseBody String simple() {
		return "Hello world!";
	}

}


package nexcore.sprout.showcase.mvc.simple;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SimpleControllerRevisited {

	@RequestMapping(value="/simple/revisited", method=RequestMethod.GET, headers="Accept=text/plain")
	public @ResponseBody String simple() {
		return "Hello world revisited!";
	}

}</code>
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
				   			MvcUtil.showSuccessResponse(text, link); 
		       , error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});
	
});	

	
</script>
