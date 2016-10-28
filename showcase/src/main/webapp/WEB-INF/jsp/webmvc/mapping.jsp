<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="mapping">Request Mapping</div>
<!-- 페이지 타이틀 영역  -->

<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="urlMapping"><font size="5px">URL  Mapping</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>@RequestMapping 을 이용한 URL 매핑은 Controller Class 또는 Method에 붙여서 사용할수 있다.
이경우 디폴트 엘리먼트인 value 에 스트링 또는 배열 타입으로 URL 패턴을 지정하여 사용한다.
     
다음은 URL 매핑만을 사용하는 경우이다.
<pre><code>@RequestMapping("/mapping/path")</code></pre>
URL 패턴은 다음과 같이 와일드 카드를 사용할 수 있다.
<pre><code> @RequestMapping("/mapping/path/*")
 @RequestMapping("/mapping/**/user")</code></pre>
</pre>
</h3>
<!-- comment 영역  -->


<!-- sub title  -->
<h1 id="params"><font size="5px">String[] params(): 요청 파라미터</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
 같은 URL을 사용하더라도 HTTP 요청 파라미터별로 별개의 작업을 하고자 할경우. 
 @RequestMapping에 매핑을 위한 요청 파라미터를 '타입=값' 형식으로 매핑한다.
 
 다음 두 개의 매핑 모두 같은 URL 을 갖고 있지만 파라미터가 다르다. 
 /mapping/parameter?foo=bar이라는 URL로 요청을 받으면 첫 번째 매핑이 적용되고, 
 /mapping/parameter?foo=no 라는 URL로 요청을 받으면 두 번째 매핑이 적용된다.
<pre><code>/mapping/parameter?foo=bar -> @RequestMapping(value="/mapping/parameter", params="foo=bar")
/mapping/parameter?foo=no -> @RequestMapping(value="/mapping/parameter", params="foo=no")</code></pre>

 또한 특정 파라미터가 존재하지 않아야 한다는 조건을 지정할 수도 있다. 
 이때는 "!" 를 파라미터 이름 앞에 붙여주면 된다. 
 다음 선언은 foo 라는 파라미터가 아예 존재하지 않는 경우에만 매핑되도록 선언한 것이다.
<pre><code>/mapping/parameter -> @RequestMapping(value="/mapping/parameter", params="!foo")</code></pre>
  <!-- Tip 영역  -->
</pre></h3>
<p>params 는 배열로 선언되어 있으므로 하나 이상을 지정할 수 있다.</p>
<!-- comment 영역  -->


<!-- sub title  -->
<h1 id="headers"><font size="5px">String[] headers : HTTP 헤더</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
HTTP 헤더 정보매핑 방식은 params 와 비슷하게 '헤더이름=값' 형식을 사용한다.
다음 매핑 선언은 헤더의 FooHeader 값이 foo, 인경우에만 첫 번째로 매핑해주고,
FooHeader 가 없는경우 두 번째로 매핑 해준다.
<pre><code>@RequestMapping(value="/mapping/header", method=RequestMethod.GET, headers="FooHeader=foo")
@RequestMapping(value="/mapping/header", method=RequestMethod.GET, headers="!FooHeader")
</code></pre>
</pre></h3>
<!-- comment 영역  -->



<!-- sub title  -->
<h1 id="MediaType"><font size="5px">MediaType 분기 : application/json,  application/xml</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
MediaType 방식을 사용할경우 HTTP 헤더 정보 따라서 뷰를 결정한다.
Accept 값이 = application/json ,application/xml ....

이러한 값들은 $.ajax({ url: this.href, .. req.setRequestHeader("Accept", "application/json");  .
또는 req.setRequestHeader("Accept", "application/xml");  과 같이 사용한다.
다음은 produces로 매핑되는 URL 에 JSON 과 XML  을 매핑 하는 방법이다.
<pre><code>@RequestMapping(value="/mapping/produces", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
@RequestMapping(value="/mapping/produces", method=RequestMethod.GET, produces=MediaType.APPLICATION_XML_VALUE)
</code></pre>
</pre></h3>
<!-- comment 영역  -->


<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
				<a id="byPath" class="textLink" href="<c:url value="/mapping/path" />">By path : </a>
			</li>
			<li>
				<a id="byPathPattern" class="textLink" href="<c:url value="/mapping/path/wildcard" />">By path pattern : </a>
			</li>
			<li>
				<a id="byMethod" class="textLink" href="<c:url value="/mapping/method" />">By path and method : </a>
			</li>
			<li>
				<a id="byParameter" class="textLink" href="<c:url value="/mapping/parameter?foo=bar" />">By path, method, and presence of parameter : </a>
			</li>
			<li>
				<a id="byNotParameter" class="textLink" href="<c:url value="/mapping/parameter" />">By path, method, and not presence of parameter : </a>
			</li>
			<li>
				<a id="byHeader" href="<c:url value="/mapping/header" />">By presence of header : </a>
			</li>
			<li>
				<a id="byHeaderNegation" class="textLink" href="<c:url value="/mapping/header" />">By absence of header : </a>
			</li>
			<li>
				<form id="byConsumes" class="readJsonForm" action="<c:url value="/mapping/consumes" />" method="post">
					<input id="byConsumesSubmit" type="submit" value="By consumes" />  : 
				</form>
			</li>
			<li>
				<a id="byProducesAcceptJson" class="writeJsonLink" href="<c:url value="/mapping/produces" />">By produces via Accept=application/json : </a>
			</li>
            <li>
                <a id="byProducesAcceptXml" class="writeXmlLink" href="<c:url value="/mapping/produces" />">By produces via Accept=appilcation/xml : </a>
            </li>
            <li>
              <a id="byProducesJsonExt" class="writeJsonLink" href="<c:url value="/mapping/produces.json" />">By produces via ".json" : </a>
            </li>
            <li>
                <a id="byProducesXmlExt" class="writeXmlLink" href="<c:url value="/mapping/produces.xml" />">By produces via ".xml" : </a>
            </li>
	</ul>
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
<code class="java">
package nexcore.sprout.showcase.mvc.mapping;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MappingController {

	@RequestMapping("/mapping/path")
	public @ResponseBody String byPath() {
		return "Mapped by path!";
	}

	@RequestMapping(value="/mapping/path/*", method=RequestMethod.GET)
	public @ResponseBody String byPathPattern(HttpServletRequest request) {
		return "Mapped by path pattern ('" + request.getRequestURI() + "')";
	}

	@RequestMapping(value="/mapping/method", method=RequestMethod.GET)
	public @ResponseBody String byMethod() {
		return "Mapped by path + method";
	}

	@RequestMapping(value="/mapping/parameter", method=RequestMethod.GET, params="foo")
	public @ResponseBody String byParameter() {
		return "Mapped by path + method + presence of query parameter!";
	}

	@RequestMapping(value="/mapping/parameter", method=RequestMethod.GET, params="!foo")
	public @ResponseBody String byParameterNegation() {
		return "Mapped by path + method + not presence of query parameter!";
	}

	@RequestMapping(value="/mapping/header", method=RequestMethod.GET, headers="FooHeader=foo")
	public @ResponseBody String byHeader() {
		return "Mapped by path + method + presence of header!";
	}

	@RequestMapping(value="/mapping/header", method=RequestMethod.GET, headers="!FooHeader")
	public @ResponseBody String byHeaderNegation() {
		return "Mapped by path + method + absence of header!";
	}

	@RequestMapping(value="/mapping/consumes", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String byConsumes(@RequestBody JavaBean javaBean) {
		return "Mapped by path + method + consumable media type (javaBean '" + javaBean + "')";
	}

	@RequestMapping(value="/mapping/produces", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody JavaBean byProducesJson() {
		return new JavaBean();
	}

	@RequestMapping(value="/mapping/produces", method=RequestMethod.GET, produces=MediaType.APPLICATION_XML_VALUE)
	public @ResponseBody JavaBean byProducesXml() {
		return new JavaBean();
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

	$("#byHeader").click(function(){
		var link = $(this);
		$.ajax({ url: this.href, dataType: "text", beforeSend: function(req) { req.setRequestHeader("FooHeader", "foo"); }, success: function(form) { MvcUtil.showSuccessResponse(form, link); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});
	

});
</script>
