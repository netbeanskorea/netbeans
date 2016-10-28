<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea">Redirecting</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="redirect"><font size="5px">redirect: 접두사</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>콘트롤러에서 redirect: 접두사를 가진 뷰 이름을 반한하면  
뷰 이름에서 접두사를 제외한 나머지 부분은 리다이렉트 URL로 인지하여 해당 뷰로 전환된다.
</pre></h3>
<!-- comment 영역  -->

<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/redirect/uriTemplate.frag');">URI Template String</a>
		<li>
			<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/redirect/uriComponentsBuilder.frag');">UriComponentsBuilder</a>
		</li>
	</ul>
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
<code class="java">
package nexcore.sprout.showcase.mvc.redirect;

import javax.inject.Inject;

import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Controller
@RequestMapping("/redirect")
public class RedirectController {
	@Qualifier("conversionService")
	@Autowired
	private  ConversionService conversionService;

	public RedirectController() {
		conversionService = new DefaultFormattingConversionService();
	}

	@RequestMapping(value="/uriTemplate", method=RequestMethod.GET)
	public String uriTemplate(RedirectAttributes redirectAttrs) {
		redirectAttrs.addAttribute("account", "a123");  // Used as URI template variable
		redirectAttrs.addAttribute("date", new LocalDate(2011, 12, 31));  // Appended as a query parameter
		return "redirect:/redirect/{account}.frag";
	}

	@RequestMapping(value="/uriComponentsBuilder", method=RequestMethod.GET)
	public String uriComponentsBuilder() {
		String date = this.conversionService.convert(new LocalDate(2010, 10, 31), String.class);
		UriComponents redirectUri = UriComponentsBuilder.fromPath("/redirect/{account}").queryParam("date", date)
				.build().expand("a123").encode();
		//String toUrl = redirectUri.toUriString() + ".frag";
		String toUrl = redirectUri.getPath() + ".frag?" + redirectUri.getQuery();
		return "redirect:" +toUrl;
	}

	@RequestMapping(value="/{account}", method=RequestMethod.GET)
	public String show(@PathVariable String account, @RequestParam(required=false) LocalDate date) {
		return "redirect/redirectResults";
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
				   			MvcUtil.showSuccessResponse(text, link); 
				   			console.log("text",JSON.stringify(text)); }
		       , error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});
	
});	
</script>
