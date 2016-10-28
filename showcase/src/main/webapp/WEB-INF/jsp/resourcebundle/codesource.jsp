<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="resourcebundle">Resource Bundle</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="ResourceBundleMessageSource"><font size="5px">CodeSource의 사용</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
* codeSource 설정
<code>&lt;bean id="codeSource"
		class="nexcore.sprout.foundry.resourcebundle.code.ReloadableResourceBundleCodeSource"&gt;
		&lt;property name="basenames"&gt;
			&lt;list&gt;
				&lt;value&gt;classpath:META-INF/codes/code&lt;/value&gt;
			&lt;/list&gt;
		&lt;/property&gt;
		&lt;property name="cacheSeconds" value="5" /&gt;
	&lt;/bean&gt;
</code>
* codeSourceAccessor 설정
<code>&lt;bean id="codeSourceAccessor"
	class="nexcore.sprout.foundry.resourcebundle.code.CodeSourceAccessor"&gt;
	&lt;constructor-arg ref="codeSource" /&gt;
&lt;/bean&gt;	</code>
</pre>
</h3>
<!-- comment 영역  -->


<!-- sample 실행 영역  -->
<h1>Example</h1>
<div class="sample">
	<ul>
		<li>
			<a id="resourcebundleview" class="textLink" href="<c:url value="/resourcebundle/codesourceView" />">CodeSource 조회 : </a>
		</li>
	</ul>	
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
<code class="java">
package nexcore.sprout.showcase.resourcebundle;

import nexcore.sprout.foundry.resourcebundle.code.CodeSourceAccessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ResourceBundleViewcController {
	@Autowired
	private CodeSourceAccessor codeSourceAccessor;
	
	@RequestMapping(value="/resourcebundle/codesourceView", method=RequestMethod.GET)
	public @ResponseBody  String getCodeSoureView() {
        return  codeSourceAccessor.getCode("SYS","C010","C0101").toString();
	}
}
</code>
</pre>

<!-- 페이지 Content  end -->



<script type="text/javascript">
$(document).ready(function() {

	$("a.textLink").click(function(){
		var link = $(this);
		$.ajax({ url: link.attr("href"), dataType: "text"
			   , success: function(text) { 
				   			MvcUtil.showSuccessResponse(text, link); 
				   			console.log("text",JSON.stringify(text)); }
		       , error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});
	
});	

	
</script>
