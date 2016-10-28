<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea">Interceptor</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="HandlerInterceptor"><font size="5px">HandlerInterceptor</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>핸들러 인터셉터는 DispatcherServlet 이 컨트롤러를 호출하기 전과 후에 요청과 응답을 참조하거나 가공할 수 있는 일종의 필터로서, 
서블릿 필터와 그 쓰임새가 유사하다. 
하지만 서블릿 필터보다 더 졍교하고 편리하게 인터셉터를 만들 수 있으며  DI를 통해 다른 빈을 활용할 수도 있다.

핸들러 인터셉터를 사용하려면 먼저 핸들러 매핑 클래스를 빈으로 등록해야 한다. 
핸들러 매핑 빈의 interceptors 프로퍼티를 이용해 핸들러 인터셉터 빈의 레퍼런스를 넣어 주면 된다.
<pre><code >&lt;bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"&gt;
    &lt;property name="interceptors"&gt;
        &lt;list&gt;
            &lt;ref bean="officeHoursInterceptor"/&gt;
        &lt;/list&gt;
    &lt;/property&gt;
&lt;/bean&gt;

&lt;bean id="officeHoursInterceptor"
      class="nexcore.sprout.showcase.mvc.interceptors.TimeBasedAccessInterceptor"&gt;
    &lt;property name="openingTime" value="9"/&gt;    
    &lt;property name="closingTime" value="18"/&gt;
&lt;/bean&gt;
</code></pre>
</pre></h3>
<!-- comment 영역  -->


<!-- sub title  -->
<h1 id="mvcinterceptor"><font size="5px">&lt;mvc:interceptors&gt;</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>HandlerInterceptor 를 사용하면 Controller 실행 전이나 후에 공통작업을 처리할 수 있으나,
특정 RequestMapping 전용으로 HandlerInterceptor 를 적용할 수는 없으므로 
HandlerInterceptor 구현시에 callback 으로 넘어오는 handler 파라메터를 사용해서, 
if/else 류의 코딩방식으로 해결해야 한다는 단점이 있다.

이런 문제를 해결하기 위해 &lt;mvc:interceptors&gt; 를 사용한다.
<pre><code class="xml">&lt;!-- 특정 패턴의 요청에만 적용하는 Interceptor 설정 --&gt;
&lt;mvc:interceptors&gt;
    &lt;mvc:interceptor&gt;
        &lt;mvc:mapping path="/map1" /&gt; &lt;!-- 모든 URL 을 등록하고자 한다면 /** --&gt;
        &lt;mvc:mapping path="/map2" /&gt;
        &lt;bean class=""/&gt; &lt;!-- HandlerInterceptor 인터페이스를 구현한 클래스 --&gt;
    &lt;/mvc:interceptor&gt;
&lt;/mvc:interceptors&gt;
 
&lt;!-- 모든 요청에 적용하는 Interceptor 설정 --&gt;
&lt;!-- 
&lt;mvc:interceptors&gt;
    &lt;bean class=""/&gt;
&lt;/mvc:interceptors&gt;
 --&gt;</code></pre>
</pre></h3>
<!-- comment 영역  -->

<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a id="checkOpen" class="textLink" href="<c:url value="/interceptors/checkinterceptor" />">office check : </a>
		</li>
	</ul>	
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
spring-mvc.xml 설정
<code class="xml">&lt;mvc:interceptors&gt;
 	&lt;mvc:interceptor&gt;
		&lt;mvc:mapping path="/interceptors/checkinterceptor" /&gt;
		&lt;bean id="officeHoursInterceptor" class="nexcore.sprout.showcase.mvc.interceptors.TimeBasedAccessInterceptor"&gt;
		    &lt;property name="openingTime" value="9"/&gt;    
		    &lt;property name="closingTime" value="18"/&gt;
		&lt;/bean&gt; 
	&lt;/mvc:interceptor&gt;	
&lt;/mvc:interceptors&gt;</code>
</pre>

 
<pre>
TimeBasedAccessInterceptor 작성
<code class="java">package nexcore.sprout.showcase.mvc.interceptors;

import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class TimeBasedAccessInterceptor extends HandlerInterceptorAdapter {     
	private int openingTime;   
	private int closingTime;     
	public void setOpeningTime(int openingTime) {     
		this.openingTime = openingTime;   
	}
		
	public void setClosingTime(int closingTime) {     
		this.closingTime = closingTime;   
	}     
	
	@Override
	public boolean preHandle(HttpServletRequest request,HttpServletResponse response,Object handler ) throws Exception {       
		Calendar cal = Calendar.getInstance();   
		int hour = cal.get(Calendar.HOUR_OF_DAY);     
		if (openingTime <= hour && hour < closingTime) { 
			System.out.println("TimeBasedAccessInterceptor : true");
			response.sendRedirect(request.getContextPath()+"/interceptors/officeopen");
	        return true;
		} else {      
			System.out.println("TimeBasedAccessInterceptor : false");
			response.sendRedirect(request.getContextPath()+"/interceptors/officenotopen");
			return false;     
		}   
	} 
}
</code>
</pre>

<pre>
InterceptorsController 콘트롤러 작성
<code class="java">package nexcore.sprout.showcase.mvc.interceptors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/interceptors")
public class InterceptorsController {
	
	@RequestMapping(value="checkinterceptor", method=RequestMethod.GET)
	public @ResponseBody String checkInterceptor() {
		return "office check ";
	}

	@RequestMapping(value="officeopen", method=RequestMethod.GET)
	public @ResponseBody String officeOpen() {
		return "interceptor : office open ";
	}
	
	@RequestMapping(value="officenotopen", method=RequestMethod.GET)
	public @ResponseBody String notOpen() {
		return "interceptor : office not open ";
	}
}
</code>
</pre>

<pre>
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
