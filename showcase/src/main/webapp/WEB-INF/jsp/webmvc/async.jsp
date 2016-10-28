<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="AsyncReqeusts">Async Requests</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="Callable"><font size="5px">Callable</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>Callable클래스는 클라이언트로 부터 요청이 들어오면 다음과 같이  Callable 객체를 생성하여 새로운 쓰레드를 분리한후 
Call() 메소드를 통하여 로직을 처리하고 분리된 쓰레드를 거쳐서 Dispatcher servlet 으로 응답을 보낸다.

주로 오래 걸리는 DB 작업, 써드파티 REST API 콜 등에 사용한다.
<code>@RequestMapping(“/response-body”)
public @ResponseBody Callable<String> callable() {
	return new Callable<String>() {
		@Override
		public String call() throws Exception {
			Thread.sleep(2000);
			return “Callable result”;
		}
	};
}</code>
</pre> 
</h3>
<!-- comment 영역  -->

<!-- sub title  -->
<h1 id="Callable"><font size="5px">WebAsyncTask</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>Callable과 동일한 방식으로 실행되나 Timeout을 설정할수 있으며 Callable을 WebAsyncTask에 담아서 리턴한다
<code>@RequestMapping("/custom-timeout-handling")
public @ResponseBody WebAsyncTask<String> callableWithCustomTimeoutHandling() {

	Callable<String> callable = new Callable<String>() {
		@Override
		public String call() throws Exception {
			Thread.sleep(2000);
			return "Callable result";
		}
	};

	return new WebAsyncTask<String>(1000, callable);
}
</code>
</pre> 
</h3>
<!-- comment 영역  -->


<!-- sub title  -->
<h1 id="Callable"><font size="5px">DeferredResult</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>DeferredResult는 Callable과 같이 분리된 스레드에 의해서 리턴값이 처리되나,
스케쥴링또는 다른  HTTP처리 등의 외부작업에 대한 응답을 처리할때 결과가 생성된다.
<code>@RequestMapping("/deferred-result/model-and-view")
public DeferredResult deferredResultWithView() {
	DeferredResult result = new DeferredResult();
	this.mavQueue.add(result);
	return result;
}</code>

</pre></h3>

<!-- sub title  -->
<h1 id="Callable"><font size="5px">Async Requests를 위한 스프링 XML 설정</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>비동기요청을  사용하기 위해서는  web.xml에 설정된 filter와 DispatcherServlet에 다음 내용을 추가 해야 한다.
<code>&lt;async-supported&gt;true&lt;/async-supported&gt;</code>

<code>&lt;mvc:annotation-driven&gt;
&lt;mvc:async-support
default-timeout="3000"
task-executor="asyncTaskExecutor"&gt;
&lt;mvc:callable-interceptors&gt;
 &lt;bean class=""nexcore.sprout.showcase.mvc.async.TimeoutCallableProcessingInterceptor" /&gt;
&lt;/mvc:callable-interceptors&gt;
&lt;/mvc:async-support&gt;
&lt;/mvc:annotation-driven&gt;</code>
</pre></h3>




<!-- Tip 영역  -->
<p><em>Note: Links may take 2-3 seconds to complete.</em>
</p>
<!-- Tip 영역  -->

<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a id="callableResponseBodyLink" class="textLink"
				href="<c:url value="/async/callable/response-body" />">GET /async/callable/response-body</a>
		</li>
		<li>
			<a id="callableViewLink" class="textLink" href="<c:url value="/async/callable/view.frag" />">GET /async/callable/view</a>
		</li>
		
		<li>
			<a id="callableExceptionLink" class="textLink"
				href="<c:url value="/async/callable/exception" />">GET /async/callable/exception</a>
		</li>
		<li>
			<a id="callableUnhandledExceptionLink" class="textLink"
				href="<c:url value="/async/callable/exception.frag?handled=false" />">GET /async/callable/exception?handled=false</a>
				(500 Error expected)
		</li>
		<li>
			<a id="callableCustomTimeoutLink" class="textLink"
				href="<c:url value="/async/callable/custom-timeout-handling" />">GET /async/callable/custom-timeout-handling</a>
		</li>
		<li>
			<a id="deferredResultSuccessLink" class="textLink"
				href="<c:url value="/async/deferred-result/response-body" />">GET /async/deferred-result/response-body</a>
		</li>
		<li>
			<a id="deferredResultModelAndViewLink" class="textLink"
				href="<c:url value="/async/deferred-result/model-and-view.frag" />">GET /async/deferred-result/model-and-view</a>
		</li>
		<li>
			<a id="deferredResultErrorLink" class="textLink"
				href="<c:url value="/async/deferred-result/exception" />">GET /async/deferred-result/exception</a>
		</li>
		<li>
			<a id="deferredResultprocessQueuesLink" class="textLink"
				href="<c:url value="/async/deferred-result/processQueues" />">process Queues</a>
		</li>
		<li>
			<a id="deferredResultTimeoutValueLink" class="textLink"
				href="<c:url value="/async/deferred-result/timeout-value" />">GET /async/deferred-result/timeout-value</a>
		</li>
	</ul>
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
<code class="java">package nexcore.sprout.showcase.mvc.async;

import java.util.concurrent.Callable;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.WebAsyncTask;

@Controller
@RequestMapping("/async/callable")
public class CallableController {


	@RequestMapping("/response-body")
	public @ResponseBody Callable<String> callable() {

		return new Callable<String>() {
			@Override
			public String call() throws Exception {
				Thread.sleep(2000);
				return "Callable result";
			}
		};
	}

	@RequestMapping("/view")
	public Callable<String> callableWithView(final Model model) {

		return new Callable<String>() {
			@Override
			public String call() throws Exception {
				Thread.sleep(2000);
				model.addAttribute("foo", "bar");
				model.addAttribute("fruit", "apple");
				return "views/html";
			}
		};
	}

	@RequestMapping("/exception")
	public @ResponseBody Callable<String> callableWithException(
			final @RequestParam(required=false, defaultValue="true") boolean handled) {

		return new Callable<String>() {
			@Override
			public String call() throws Exception {
				Thread.sleep(2000);
				if (handled) {
					// see handleException method further below
					throw new IllegalStateException("Callable error");
				}
				else {
					throw new IllegalArgumentException("Callable error");
				}
			}
		};
	}

	@RequestMapping("/custom-timeout-handling")
	public @ResponseBody WebAsyncTask<String> callableWithCustomTimeoutHandling() {

		Callable<String> callable = new Callable<String>() {
			@Override
			public String call() throws Exception {
				Thread.sleep(2000);
				return "Callable result";
			}
		};

		return new WebAsyncTask<String>(1000, callable);
	}

	@ExceptionHandler
	@ResponseBody
	public String handleException(IllegalStateException ex) {
		return "Handled exception: " + ex.getMessage();
	}

}
</code>
</pre>
<pre>
<code class="java">package nexcore.sprout.showcase.mvc.async;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/async")
public class DeferredResultController {

	private final Queue&lt;DeferredResult&lt;String&gt;&gt; responseBodyQueue = new ConcurrentLinkedQueue&lt;DeferredResult&lt;String&gt;&gt;();

	private final Queue&lt;DeferredResult&lt;ModelAndView&gt;&gt; mavQueue = new ConcurrentLinkedQueue&lt;DeferredResult&lt;ModelAndView&gt;&gt;();

	private final Queue&lt;DeferredResult&lt;String&gt;&gt; exceptionQueue = new ConcurrentLinkedQueue&lt;DeferredResult&lt;String&gt;&gt;();

	@RequestMapping("/deferred-result/response-body")
	public @ResponseBody DeferredResult&lt;String&gt; deferredResult() {
		DeferredResult&lt;String&gt; result = new DeferredResult&lt;String&gt;();
		this.responseBodyQueue.add(result);
		return result;
	}

	@RequestMapping("/deferred-result/model-and-view")
	public DeferredResult&lt;ModelAndView&gt; deferredResultWithView() {
		DeferredResult&lt;ModelAndView&gt; result = new DeferredResult&lt;ModelAndView&gt;();
		this.mavQueue.add(result);
		return result;
	}

	@RequestMapping("/deferred-result/exception")
	public @ResponseBody DeferredResult&lt;String&gt; deferredResultWithException() {
		DeferredResult&lt;String&gt; result = new DeferredResult&lt;String&gt;();
		this.exceptionQueue.add(result);
		return result;
	}
	
	@RequestMapping("/deferred-result/processQueues")
	public @ResponseBody String deferredProcessQueues() {
		processQueues();
		return "processQueues : Ok";
	}
	
	
	@RequestMapping("/deferred-result/timeout-value")
	public @ResponseBody DeferredResult&lt;String&gt; deferredResultWithTimeoutValue() {

		// Provide a default result in case of timeout and override the timeout value
		// set in src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml

		return new DeferredResult&lt;String&gt;(1000L, "Deferred result after timeout");
	}

	@Scheduled(fixedRate=5000)
	public void processQueues() {
		for (DeferredResult&lt;String&gt; result : this.responseBodyQueue) {
			result.setResult("Deferred result : " +responseBodyQueueCnt);
			this.responseBodyQueue.remove(result);
		}
		for (DeferredResult&lt;String&gt; result : this.exceptionQueue) {
			result.setErrorResult(new IllegalStateException("DeferredResult error"));
			this.exceptionQueue.remove(result);
		}
		for (DeferredResult&lt;ModelAndView&gt; result : this.mavQueue) {
			result.setResult(new ModelAndView("views/html", "javaBean", new JavaBean("bar", "apple")));
			this.mavQueue.remove(result);
		}
	}

	@ExceptionHandler
	@ResponseBody
	public String handleException(IllegalStateException ex) {
		return "Handled exception: " + ex.getMessage();
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
