<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="mapping">Response Writing</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="getsimple"><font size="5px">@ResponseBody</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>
<pre>메소드가 리턴하는 오브젝트는 뷰를 통해 결과를 만들어내는 모델로 사용되는 대신, 
메시지 컨버터를 통해 바로 HTTP 응답의 메시지 본문으로 전환된다.

아래 responseBody() 메소드에 @ResponseBody 가 없다면 스트링 타입의 리턴 값은 뷰 이름으로 인식될 것이다.
하지만 @ResponseBody 가 붙었으므로 스트링 타입을 지원하는 메시지 컨버터가 이를 변환해서 HttpServletResponse 의 출력스트림에 넣어 버린다.
<pre><code>@RequestMapping("/annotation")
public @ResponseBody String responseBody() {
	return "The String ResponseBody";
}</code></pre>     

@ResponseBody는 자바스크립트를 이용하여  UTF-8형식으로 받을수 있다.
<pre><code>req.setRequestHeader("Accept", "text/plain;charset=UTF-8");</code></pre>
메소드에 명시하여도  UTF-8형식으로 받을수 있다.
<pre><code>@RequestMapping(value="/charset/produce", produces="text/plain;charset=UTF-8")</code></pre>
</pre></h3>
<!-- comment 영역  -->



<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a id="responseBody" class="textLink" href="<c:url value="/response/annotation" />">@ResponseBody : </a>			
		</li>
		<li>
			<a id="responseCharsetAccept" class="utf8TextLink" href="<c:url value="/response/charset/accept" />">@ResponseBody (UTF-8 charset requested) : </a>
		</li>
		<li>
			<a id="responseCharsetProduce" class="textLink" href="<c:url value="/response/charset/produce" />">@ResponseBody (UTF-8 charset produced) : </a>
		</li>
		<li>
			<a id="responseEntityStatus" class="textLink" href="<c:url value="/response/entity/status" />">ResponseEntity (custom status) : </a>			
		</li>
		<li>
			<a id="responseEntityHeaders" class="textLink" href="<c:url value="/response/entity/headers" />">ResponseEntity (custom headers) : </a>			
		</li>
	</ul>
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
<code class="java">
package nexcore.sprout.showcase.mvc.response;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/response", method=RequestMethod.GET)
public class ResponseController {

	@RequestMapping("/annotation")
	public @ResponseBody String responseBody() {
		return "The String ResponseBody";
	}

	@RequestMapping("/charset/accept")
	public @ResponseBody String responseAcceptHeaderCharset() {
		return "\u3053\u3093\u306b\u3061\u306f\u4e16\u754c\uff01 (\"Hello world!\" in Japanese)";
	}

	@RequestMapping(value="/charset/produce", produces="text/plain;charset=UTF-8")
	public @ResponseBody String responseProducesConditionCharset() {
		return "\u3053\u3093\u306b\u3061\u306f\u4e16\u754c\uff01 (\"Hello world!\" in Japanese)";
	}

	@RequestMapping("/entity/status")
	public ResponseEntity<String> responseEntityStatusCode() {
		return new ResponseEntity<String>("The String ResponseBody with custom status code (403 Forbidden)",
				HttpStatus.FORBIDDEN);
	}

	@RequestMapping("/entity/headers")
	public ResponseEntity<String> responseEntityCustomHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.TEXT_PLAIN);
		return new ResponseEntity<String>("The String ResponseBody with custom header Content-Type=text/plain",
				headers, HttpStatus.OK);
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
				   			console.log("text",JSON.stringify(text)); }
		       , error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});

	$("a.utf8TextLink").click(function(){
		var link = $(this);
		$.ajax({ url: link.attr("href"), dataType: "text", beforeSend: function(req) { req.setRequestHeader("Accept", "text/plain;charset=UTF-8"); }, success: function(text) { MvcUtil.showSuccessResponse(text, link); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});

	$("form.textForm").submit(function(event) {
		var form = $(this);
		var button = form.children(":first");
		$.ajax({ type: "POST", url: form.attr("action"), data: "foo", contentType: "text/plain", dataType: "text", success: function(text) { MvcUtil.showSuccessResponse(text, button); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, button); }});
		return false;
	});

	$("#readForm").submit(function() {
		var form = $(this);
		var button = form.children(":first");
		$.ajax({ type: "POST", url: form.attr("action"), data: "foo=bar&fruit=apple", contentType: "application/x-www-form-urlencoded", dataType: "text", success: function(text) { MvcUtil.showSuccessResponse(text, button); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, button); }});
		return false;
	});

	$("#writeForm").click(function() {
		var link = $(this);
		$.ajax({ url: this.href, dataType: "text", beforeSend: function(req) { req.setRequestHeader("Accept", "application/x-www-form-urlencoded"); }, success: function(form) { MvcUtil.showSuccessResponse(form, link); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});					
		return false;
	});

	$("form.readXmlForm").submit(function() {
		var form = $(this);
		var button = form.children(":first");
		$.ajax({ type: "POST", url: form.attr("action"), data: "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><javaBean><foo>bar</foo><fruit>apple</fruit></javaBean>", contentType: "application/xml", dataType: "text", success: function(text) { MvcUtil.showSuccessResponse(text, button); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, button); }});
		return false;
	});

	$("a.writeXmlLink").click(function() {
		var link = $(this);
		$.ajax({ url: link.attr("href"),
			beforeSend: function(req) { 
				if (!this.url.match(/\.xml$/)) {
					req.setRequestHeader("Accept", "application/xml");
				}
			},
			success: function(xml) {
				MvcUtil.showSuccessResponse(MvcUtil.xmlencode(xml), link);
			},
			error: function(xhr) { 
				MvcUtil.showErrorResponse(xhr.responseText, link);
			}
		});
		return false;
	});					

	$("form.readJsonForm").submit(function() {
		var form = $(this);
		var button = form.children(":first");
		var data = form.hasClass("invalid") ?
				"{ \"foo\": \"bar\" }" : 
				"{ \"foo\": \"bar\", \"fruit\": \"apple\" }";
		$.ajax({ type: "POST", url: form.attr("action"), data: data, contentType: "application/json", dataType: "text", success: function(text) { MvcUtil.showSuccessResponse(text, button); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, button); }});
		return false;
	});

	
	
	$("a.writeMenuJsonLink").click(function() {
		var link = $(this);
		$.ajax({ url: this.href,
			beforeSend: function(req) {
				if (!this.url.match(/\.json$/)) {
					req.setRequestHeader("Accept", "application/json");
				}
				
			},
			success: function(json) {
				console.log("json",JSON.stringify(json));
				MvcUtil.showSuccessResponse(JSON.stringify(json), link);
				
			},
			error: function(xhr) {
				MvcUtil.showErrorResponse(xhr.responseText, link);
			}});
		return false;
	});
	
	$("a.writeJsonLink").click(function() {
		var link = $(this);
		$.ajax({ url: this.href,
			beforeSend: function(req) {
				if (!this.url.match(/\.json$/)) {
					req.setRequestHeader("Accept", "application/json");
				}
			},
			success: function(json) {
				MvcUtil.showSuccessResponse(JSON.stringify(json), link);
				console.log("json",json);
			},
			error: function(xhr) {
				MvcUtil.showErrorResponse(xhr.responseText, link);
			}});
		return false;
	});

	$("#readAtom").submit(function() {
		var form = $(this);
		var button = form.children(":first");
		$.ajax({ type: "POST", url: form.attr("action"), data: '<?xml version="1.0" encoding="UTF-8"?> <feed xmlns="http://www.w3.org/2005/Atom"><title>My Atom feed</title></feed>', contentType: "application/atom+xml", dataType: "text", success: function(text) { MvcUtil.showSuccessResponse(text, button); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, button); }});
		return false;
	});

	$("#writeAtom").click(function() {
		var link = $(this);
		$.ajax({ url: link.attr("href"),
			beforeSend: function(req) { 
				req.setRequestHeader("Accept", "application/atom+xml");
			},
			success: function(feed) {
				MvcUtil.showSuccessResponse(MvcUtil.xmlencode(feed), link);
			},
			error: function(xhr) { 
				MvcUtil.showErrorResponse(xhr.responseText, link);
			}
		});
		return false;
	});
	
	$("#readRss").submit(function() {
		var form = $(this);
		var button = form.children(":first");
		$.ajax({ type: "POST", url: form.attr("action"), data: '<?xml version="1.0" encoding="UTF-8"?> <rss version="2.0"><channel><title>My RSS feed</title></channel></rss>', contentType: "application/rss+xml", dataType: "text", success: function(text) { MvcUtil.showSuccessResponse(text, button); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, button); }});
		return false;
	});

	$("#writeRss").click(function() {
		var link = $(this);	
		$.ajax({ url: link.attr("href"),
			beforeSend: function(req) { 
				req.setRequestHeader("Accept", "application/rss+xml");
			},
			success: function(feed) {
				MvcUtil.showSuccessResponse(MvcUtil.xmlencode(feed), link);
			},
			error: function(xhr) { 
				MvcUtil.showErrorResponse(xhr.responseText, link);
			}
		});
		return false;
	});

	$("#byHeader").click(function(){
		var link = $(this);
		$.ajax({ url: this.href, dataType: "text", beforeSend: function(req) { req.setRequestHeader("FooHeader", "foo"); }, success: function(form) { MvcUtil.showSuccessResponse(form, link); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});


});
</script>
