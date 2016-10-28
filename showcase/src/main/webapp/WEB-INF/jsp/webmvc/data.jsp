<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="mapping">Request Data</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">


<!-- sub title  -->
<h1 id="RequestParam"><font size="5px">@RequestParam : 요청파라미터변수</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>HTTP 요청 파라미터를 메소드 파라미터에 넣어 줄때 사용한다. 
가져올 오쳥 파라미터의 이름을 @RequestParam 애노테이션의 기본 값으로 지정해주면 된다. 
요청 파라미터의 값은 메소드 파라미터의 타입에 따라 적절하게 변환된다.

* 요청 파라미터를 String 타입으로 받아서 메소드의 foo 파라미터에 넣어준다.(/data/param?foo=bar)
<pre><code>@RequestMapping(value="param", method=RequestMethod.GET)
public @ResponseBody String withParam(@RequestParam String foo) {
	return "Obtained 'foo' query parameter value '" + foo + "'";
}</code></pre>

* 하나 이상의 파라미터에 적용가능. 
<pre><code>public String method(@RequestParam("id") int id, 
@RequestParam("name") String name,
@RequestParam("file") MultipartFile file) { ... }</code></pre>

*자바 Object로 사용 가능하다.(/data/group?param1=foo&param2=bar&param3=baz)
<pre><code>@RequestMapping(value="group", method=RequestMethod.GET)
public @ResponseBody String withParamGroup(JavaBean bean) {
	return "Obtained parameter group " + bean;
}</code></pre>

* @RequestParam 사용시 해당 파라미터는 반드시 있어야 한다. 없다면 HTTP 400 - Bad Request 를 받게 될 것이다.
파라미터를 선택적으로 사용하려면 required 엘리먼트를 false 로 설정해야 한다. 
요청 파라미터가 존재하지 않을 때 사용할 디폴트 값도 지정할 수 있다. 
<pre><code>@RequestParam(value="id", required=false, defaultValue="-1") int id) { ... }</code></pre>

* 메소드 파라미터의 이름과 요청 파라미터의 이름이 일치할경우 @RequestParam 의 이름은 생략가능하다
<pre><code>public String method5(@RequestParam int id) { ... }</code></pre>
</pre></h3>
<!-- comment 영역  -->
<p>String, int 와 같은 단순 타입인 경우는 @RequestParam 을 아예 생략할 수도 있다. 
이때는 메소드 파라미터와 같은 이름의 요청 파라미터 값을 받는다.
하지만 파라미터의 개수가 많고 종류가 다양해지면 코드를 이해하는 데 불편할 수도 있다. 
단순한 메소드가 아니라면 명시적으로 @RequestParam 을 부여해 주는 것을 권장한다.</p>

<!-- sub title  -->
<h1 id="PathVariables"><font size="5px">@PathVariables: 패스변수</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>@RequestMapping 의 URL 정의 부의 중괄호({}) 에 명시된 패스 변수를 받는다.
이 때 {} 위치에 해당하는 내용을 컨트롤러 메소드에서 파라미터로 전달받을 수 있다.
{}에 들어가는 이름을 패스변수(Path Variable)라고 부르며, 
컨트롤러 메소드 파라미터에는 @PathVariable 애노테이션을 이용해 URI 템플릿 중에서 어떤 파라미터를 가져올지를 결정할 수 있다.
<pre><code>@RequestMapping("/user/view/{id}")
public String view(@PathVariable("id") int id) {
    ...
}</code></pre>
  <!-- Tip 영역  -->
</pre></h3>
<p>파라미터의 타입은 타입이 일치하지 않는 값이 들어 올 경우 별 다른 예외처리를 해주지 않는 다면 HTTP 400 - Bad Request 응답코드가 전달된다 
int 타입일 경우 반드시 해당 패스 변수 자리에 int 값이 있어야 한다. </p>
<!-- comment 영역  -->


<!-- sub title  -->
<h1 id="MatrixVariable"><font size="5px">@MatrixVariable: Matrix URI</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>Maxrix URI 는 파라미터로 넘길 key, value 쌍을 ; ( 세미콜론) 으로 구분하여 사용 가능하다.
<pre><code>Query parameters : /data/matrixvars/simple?foo=bar
Matrix parameters : /data/matrixvars;foo=bar/simple</code></pre>

<pre><code>@RequestMapping(value="/{path}/simple", method=RequestMethod.GET)
public @ResponseBody String withMatrixVariable(@PathVariable String path,@MatrixVariable ( value="foo", required=false, pathVar="path") String foo  ) { 
	return "Obtained matrix variable 'foo=" + foo + "' from path segment '" + path + "'";
}</code></pre>

path = matrixvars 
foo = foo
		
@MatrixVariable 각 필드는 아래와 같이 사용한다. 

value : 파라미터명 
required = false :  파라미터가 반드시 명시되어야 하는지 여부, 파라미터가 없으면 해당 함수로 매핑이 안됨
pathVar : 파라미터가 어떤 PathVariable 에 붙어서 오는지를 지정한다
defaultValue : 변수의 기본값 세팅 

Multi 로 사용 가능하다.다음은 Multi 로 사용하는 방법이다
<pre><code>/data/matrixvars;foo=bar1/multiple;foo=bar2</code></pre>

<pre><code>@RequestMapping(value="{path1}/{path2}", method=RequestMethod.GET)
public @ResponseBody String withMatrixVariablesMultiple (
		@PathVariable String path1, @MatrixVariable(value="foo", required=false, pathVar="path1") String foo1,
		@PathVariable String path2, @MatrixVariable(value="foo", required=false, pathVar="path2") String foo2) {

	return "Obtained matrix variable foo=" + foo1 + " from path segment '" + path1
			+ "' and variable 'foo=" + foo2 + " from path segment '" + path2 + "'";
}</code></pre>
path1 = matrixvars 
path2 = multiple
첫번째 MatrixVariable foo = bar1 
두번째 MatrixVariable foo = bar2
  <!-- Tip 영역  -->
</pre></h3>

<!-- comment 영역  -->


<!-- sub title  -->
<h1 id="requestBody"><font size="5px">@RequestBody</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>
<pre>HTTP 요청의 body 부분을 그대로 파라미터로 전달받을때 사용한다. 
XML 이나 JSON 기반의 메시지를 사용하는 요청의 경우 이 방법이 유용하다.
다음과 같이 정의하면 메시지 본문 부분이 모두 스트링으로 변환돼서 전달될 것이다.
<pre><code>public void message(@RequestBody String body) { ... }</code></pre>
</pre></h3>
<p>XML 요청은 MarshallingHttpMessageConverter 등을 이용해서 XML 이 변환된 오브젝트로 전달 받게된다. 
JSON 타입의 메시지라면 MappingJacksonHttpMessageConverter 를 사용할 수 있다.
 @RequestBody 는 보통 @ResponseBody 와 함께 사용된다. </p>
<!-- comment 영역  -->

<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
				<a id="param" class="textLink" href="<c:url value="/data/param?foo=bar" />">Query parameter : </a>
			</li>
			<li>
				<a id="group" class="textLink" href="<c:url value="/data/group?param1=foo&param2=bar&param3=baz" />">Group of query parameters : </a>
			</li>
			<li>
				<a id="var" class="textLink" href="<c:url value="/data/path/foo" />">Path variable : </a>
			</li>
			<li>
				<a id="matrixVar" class="textLink" href="<c:url value="/data/matrixvars;foo=bar/simple" />">Matrix variable : </a>
			</li>
			<li>
				<a id="matrixVarMultiple" class="textLink" href="<c:url value="/data/matrixvars;foo=bar1/multiple;foo=bar2" />">Matrix variables (multiple) : </a>
			</li>
			<li>
				<a id="reqheader" class="textLink" href="<c:url value="/data/header" />">Header : </a>
			</li>
			<li>
				<form id="requestBody" class="textForm" action="<c:url value="/data/body" />" method="post">
					<input id="requestBodySubmit" type="submit" value="Request Body" /> : 
				</form>
			</li>				
			<li>
				<form id="requestBodyAndHeaders" class="textForm" action="<c:url value="/data/entity" />" method="post">
					<input id="requestBodyAndHeadersSubmit" type="submit" value="Request Body and Headers" /> : 
				</form>
			</li>
	</ul>
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
<code class="java">
package nexcore.sprout.showcase.mvc.data;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/data")
public class RequestDataController {

	@RequestMapping(value="param", method=RequestMethod.GET)
	public @ResponseBody String withParam(@RequestParam String foo) {
		return "Obtained 'foo' query parameter value '" + foo + "'";
	}

	@RequestMapping(value="group", method=RequestMethod.GET)
	public @ResponseBody String withParamGroup(JavaBean bean) {
		return "Obtained parameter group " + bean;
	}

	@RequestMapping(value="path/{var}", method=RequestMethod.GET)
	public @ResponseBody String withPathVariable(@PathVariable String var) {
		return "Obtained 'var' path variable value '" + var + "'";
	}

	@RequestMapping(value="/{path}/simple", method=RequestMethod.GET)
	public @ResponseBody String withMatrixVariable(@PathVariable String path,@MatrixVariable ( value="foo", required=false, pathVar="path") String foo  ) { 
			//@MatrixVariable String foo) {
		return "Obtained matrix variable 'foo=" + foo + "' from path segment '" + path + "'";
	}

	@RequestMapping(value="{path1}/{path2}", method=RequestMethod.GET)
	public @ResponseBody String withMatrixVariablesMultiple (
			@PathVariable String path1, @MatrixVariable(value="foo", required=false, pathVar="path1") String foo1,
			@PathVariable String path2, @MatrixVariable(value="foo", required=false, pathVar="path2") String foo2) {

		return "Obtained matrix variable foo=" + foo1 + " from path segment '" + path1
				+ "' and variable 'foo=" + foo2 + " from path segment '" + path2 + "'";
	}

	@RequestMapping(value="header", method=RequestMethod.GET)
	public @ResponseBody String withHeader(@RequestHeader String Accept) {
		return "Obtained 'Accept' header '" + Accept + "'";
	}

	@RequestMapping(value="cookie", method=RequestMethod.GET)
	public @ResponseBody String withCookie(@CookieValue String openid_provider) {
		return "Obtained 'openid_provider' cookie '" + openid_provider + "'";
	}

	@RequestMapping(value="body", method=RequestMethod.POST)
	public @ResponseBody String withBody(@RequestBody String body) {
		return "Posted request body '" + body + "'";
	}

	@RequestMapping(value="entity", method=RequestMethod.POST)
	public @ResponseBody String withEntity(HttpEntity<String> entity) {
		return "Posted request body '" + entity.getBody() + "'; headers = " + entity.getHeaders();
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
