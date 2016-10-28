<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="mapping">Message Converters</div>
<!-- 페이지 타이틀 영역  -->

<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="MessageConverter"><font size="5px">MessageConverter</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>  
<pre> 
 HTTP 요청 및 응답을 개별 컨텐츠가 아닌 메세지 본문 전체로 다룰 경우  사용 되는 방식 
</pre></h3>
<!-- comment 영역  -->
</div>
<!-- 페이지 Content  end -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="StringHttpMessageConverter"><font size="5px">StringHttpMessageConverter</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>  
<pre>스트링 타입을 지원하며 모든종류의 미디어타입을 허용한다. 
따라서 HTTP 요청의 본문을 그대로 스트링으로 가져올 수 있다. 
응답의 경우 콘텐트 타입이 text/plain 으로 전달되므로 
단순 문자열로 응답을 보내고 싶을 때는 @ResponseBody 와 함께 스트링 리턴값을 사용하면 된다.
<pre><code>@RequestMapping(value="/string", method=RequestMethod.POST)
public @ResponseBody String readString(@RequestBody String string) {
	return "Read string '" + string + "'";
}</code></pre>
</pre></h3>
<!-- comment 영역  -->
</div>
<!-- 페이지 Content  end -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="FormHttpMessageConverter"><font size="5px">FormHttpMessageConverter</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>  
<pre>폼 데이터를 주고 받을 때 사용하며 오브젝트 타입은  MultiValueMap<String, String> 을 지원한다. 
요청폼 정보는 @ModelAttribute 를 이용해 바인딩하는 것이 훨씬 편리하여, 
FormHttpMessageConverter 를 @RequestBody 에 사용할 일은 별로 없을 것이다.
다음은 @ModelAttribute에바인딩한  FormHttpMessageConverter를 사용한 예이다.
<pre><code>@RequestMapping(value="/form", method=RequestMethod.POST)
public @ResponseBody String readForm(@ModelAttribute JavaBean bean) {
	return "Read x-www-form-urlencoded: " + bean;
}</code></pre>


다음은 MultiValueMap를 적용한 예이다.
<pre><code>@RequestMapping(value="/form", method=RequestMethod.GET)
public @ResponseBody MultiValueMap<String, String> writeForm() {
	MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
	map.add("foo", "bar");
	map.add("fruit", "apple");
	return map;
}</code></pre>
</pre></h3>
<!-- comment 영역  -->



<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="Jaxb2RootElementHttpMessageConverter"><font size="5px">Jaxb2RootElementHttpMessageConverter</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>JAXB2의 @XmlRootElement 와 @XmlType 이 붙은 클래스를 이용해서 XML 과 오브젝트 사이의 메시지 변환을 지원한다. 
기본적으로 SourceHttpMessageConverter 와 동일한 XML 미디어 타입을 지원한다. 
오브젝트는 두 가지 에노테이션 중 하나가 적용됐다면 어떤 타입이든 사용할 수 있다.

@RequestBody로 파라미터로 받아서 컨버터를 적용한 예이다.
<pre><code>@RequestMapping(value="/xml", method=RequestMethod.POST)
public @ResponseBody String readXml(@RequestBody JavaBean bean) {
	return "Read from XML: " + bean;
}</code></pre>

다음은 JavaBean을 XML로 컨버터를 적용한 예이다.
<pre><code>@RequestMapping(value="/xml", method=RequestMethod.GET)
public @ResponseBody JavaBean writeXml() {
	return new JavaBean("bar", "apple");
}</code></pre>
</pre></h3>
<!-- comment 영역  -->


</div>
<!-- 페이지 Content  end -->



<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="MappingJacksonHttpMessageConverter"><font size="5px">MappingJacksonHttpMessageConverter</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>Jackson ObjectMapper 를 이용해서 자바 오브젝트와 JSON 문서를 자동변환해주는 메시지 컨버터이며 application/json을 지원한다. 
일반적으로 프로퍼티를 가진 자바빈 스타일이거나 HashMap 을 이용하면 정확한 변환 결과를 얻을 수 있다.

@RequestBody로 파라미터를 받아서 컨버터를 적용한 예이다.
<pre><code>@RequestMapping(value="/json", method=RequestMethod.POST)
public @ResponseBody String readJson(@Valid @RequestBody JavaBean bean) {
	return "Read from JSON: " + bean;
}</code></pre>

다음은 JavaBean을 사용하여 리턴값에 컨버터를 적용한 예이다.
<pre><code>@RequestMapping(value="/json", method=RequestMethod.GET)
public @ResponseBody JavaBean writeJson() {
	return new JavaBean("bar", "apple");
}</code></pre>
</pre></h3>
<!-- comment 영역  -->


</div>
<!-- 페이지 Content  end -->


<%-- 
<!-- 페이지 Content  start -->
<div class="page-content">

sub title 
<h1 id="AtomFeedHttpMessageConverter"><font size="5px">AtomFeedHttpMessageConverter</font></h1>
sub title 

comment 영역 
<h3> Atom 피드를 변환한다.</h3>
comment 영역 

</div>
페이지 Content  end



페이지 Content  start
<div class="page-content">

sub title 
<h1 id="RssChannelHttpMessageConverter"><font size="5px">RssChannelHttpMessageConverter</font></h1>
sub title 

comment 영역 
<h3>  RSS 피드를 변환한다.</h3>
comment 영역 
 --%>
<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
<h3>StringHttpMessageConverter</h3>
	<ul>
				<li>
					<form id="readString" class="textForm" action="<c:url value="/messageconverters/string" />" method="post">
						<input id="readStringSubmit" type="submit" value="Read a String" />
					</form>
				</li>
				<li>
					<a id="writeString" class="textLink" href="<c:url value="/messageconverters/string" />">Write a String</a>
				</li>
			</ul>
			<h3>FormHttpMessageConverter</h3>
			<ul>
				<li>
					<form id="readForm" action="<c:url value="/messageconverters/form" />" method="post">
						<input id="readFormSubmit" type="submit" value="Read Form Data" />		
					</form>
				</li>
				<li>
					<a id="writeForm" href="<c:url value="/messageconverters/form" />">Write Form Data</a>
				</li>
			</ul>
			<h3>Jaxb2RootElementHttpMessageConverter</h3>
			<ul>
				<li>
					<form id="readXml" class="readXmlForm" action="<c:url value="/messageconverters/xml" />" method="post">
						<input id="readXmlSubmit" type="submit" value="Read XML" />		
					</form>
				</li>
				<li>
					<a id="writeXmlAccept" class="writeXmlLink" href="<c:url value="/messageconverters/xml" />">Write XML via Accept=application/xml</a>
				</li>
                <li>
                    <a id="writeXmlExt" class="writeXmlLink" href="<c:url value="/messageconverters/xml.xml" />">Write XML via ".xml"</a>
                </li>
			</ul>
			<h3>MappingJacksonHttpMessageConverter</h3>
			<ul>
				<li>
					<form id="readJson" class="readJsonForm" action="<c:url value="/messageconverters/json" />" method="post">
						<input id="readJsonSubmit" type="submit" value="Read JSON" />	
					</form>
				</li>
				<li>
					<form id="readJsonInvalid" class="readJsonForm invalid" action="<c:url value="/messageconverters/json" />" method="post">
						<input id="readInvalidJsonSubmit" type="submit" value="Read invalid JSON (400 response code)" />	
					</form>
				</li>
				<li>
					<a id="writeJsonAccept" class="writeJsonLink" href="<c:url value="/messageconverters/json" />">Write JSON via Accept=application/json</a>
				</li>
                <li>
                    <a id="writeJsonExt" class="writeJsonLink" href="<c:url value="/messageconverters/json.json" />">Write JSON via ".json"</a>
                </li>
			</ul>
			<%-- <h3>AtomFeedHttpMessageConverter</h3>
			<ul>
				<li>
					<form id="readAtom" action="<c:url value="/messageconverters/atom" />" method="post">
						<input id="readAtomSubmit" type="submit" value="Read Atom" />		
					</form>
				</li>
				<li>
					<a id="writeAtom" href="<c:url value="/messageconverters/atom" />">Write Atom</a>
				</li>
			</ul>
			<h3>RssChannelHttpMessageConverter</h3>
			<ul>
				<li>
					<form id="readRss" action="<c:url value="/messageconverters/rss" />" method="post">
						<input id="readRssSubmit" type="submit" value="Read Rss" />	
					</form>
				</li>
				<li>
					<a id="writeRss" href="<c:url value="/messageconverters/rss" />">Write Rss</a>
				</li>
			</ul>	 --%>		
</div>
<!-- sample 실행 영역  -->

<!-- sample 소스코드 영역  -->
<pre>
<code class="java">package nexcore.sprout.showcase.mvc.messageconverters;

import javax.validation.Valid;

import com.rometools.rome.feed.atom.Feed;
import com.rometools.rome.feed.rss.Channel;

import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/messageconverters")
public class MessageConvertersController {

	// StringHttpMessageConverter

	@RequestMapping(value="/string", method=RequestMethod.POST)
	public @ResponseBody String readString(@RequestBody String string) {
		return "Read string '" + string + "'";
	}

	@RequestMapping(value="/string", method=RequestMethod.GET)
	public @ResponseBody String writeString() {
		return "Wrote a string";
	}

	// Form encoded data (application/x-www-form-urlencoded)

	@RequestMapping(value="/form", method=RequestMethod.POST)
	public @ResponseBody String readForm(@ModelAttribute JavaBean bean) {
		return "Read x-www-form-urlencoded: " + bean;
	}

	@RequestMapping(value="/form", method=RequestMethod.GET)
	public @ResponseBody MultiValueMap<String, String> writeForm() {
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		map.add("foo", "bar");
		map.add("fruit", "apple");
		return map;
	}

	// Jaxb2RootElementHttpMessageConverter (requires JAXB2 on the classpath - useful for serving clients that expect to work with XML)

	@RequestMapping(value="/xml", method=RequestMethod.POST)
	public @ResponseBody String readXml(@RequestBody JavaBean bean) {
		return "Read from XML: " + bean;
	}

	@RequestMapping(value="/xml", method=RequestMethod.GET)
	public @ResponseBody JavaBean writeXml() {
		return new JavaBean("bar", "apple");
	}

	// MappingJacksonHttpMessageConverter (requires Jackson on the classpath - particularly useful for serving JavaScript clients that expect to work with JSON)

	@RequestMapping(value="/json", method=RequestMethod.POST)
	public @ResponseBody String readJson(@Valid @RequestBody JavaBean bean) {
		return "Read from JSON: " + bean;
	}

	@RequestMapping(value="/json", method=RequestMethod.GET)
	public @ResponseBody JavaBean writeJson() {
		return new JavaBean("bar", "apple");
	}

	// AtomFeedHttpMessageConverter (requires Rome on the classpath - useful for serving Atom feeds)

	@RequestMapping(value="/atom", method=RequestMethod.POST)
	public @ResponseBody String readFeed(@RequestBody Feed feed) {
		return "Read " + feed.getTitle();
	}

	@RequestMapping(value="/atom", method=RequestMethod.GET)
	public @ResponseBody Feed writeFeed() {
		Feed feed = new Feed();
		feed.setFeedType("atom_1.0");
		feed.setTitle("My Atom feed");
		return feed;
	}

	// RssChannelHttpMessageConverter (requires Rome on the classpath - useful for serving RSS feeds)

	@RequestMapping(value="/rss", method=RequestMethod.POST)
	public @ResponseBody String readChannel(@RequestBody Channel channel) {
		return "Read " + channel.getTitle();
	}

	@RequestMapping(value="/rss", method=RequestMethod.GET)
	public @ResponseBody Channel writeChannel() {
		Channel channel = new Channel();
		channel.setFeedType("rss_2.0");
		channel.setTitle("My RSS feed");
		channel.setDescription("Description");
		channel.setLink("http://localhost:8080/mvc-showcase/rss");
		return channel;
	}

}
</code>
</pre>
<pre>
<code class="javascript">
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
