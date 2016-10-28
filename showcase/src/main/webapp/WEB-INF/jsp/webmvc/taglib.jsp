<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="SpEL">Spring Taglib</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="getpeoperties"><font size="5px">Properties 사용</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
showcase.properties 파일 설정
<code>showcase.version=2.0
showcase.auth=all
</code>
  설정
<code>&lt;util:properties id="showcaseproperties" location="/WEB-INF/jsp/taglib/showcase.properties/&gt;</code>
* jsp  활용
<code>&lt;%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%&gt;
&lt;spring:eval expression="@showcaseproperties['showcase.version']" var="showcaseVersion"/&gt;
version=&#36;{ showcaseVersion } 
</code>
* java  코드활 용
<code>@Value( "&#35;{ showcaseproperties['showcase.version'] }" )
String showcaseVersion;</code></pre>
</h3>

<!-- sub title  -->
<h1 id="getobject"><font size="5px">오브젝트의 사용</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
콘트롤러 작성
<pre><code>@Autowired
private SomeBean someBean;

@RequestMapping(value="/webmvc/taglib", method=RequestMethod.GET)
public ModelAndView taglibGetView() {
	ModelAndView mav = new ModelAndView();                   
       mav.setViewName("webmvc/taglib");
      mav.addObject("someBean", someBean);
       return mav;
}
</code></pre>
JSP  사용
<pre><code>&lt;%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%&gt;
<!--  testing spring:eval -->
&lt;spring:eval expression="someBean.someMethod()" var="someMessage"/&gt;
or
&lt;spring:eval expression="someBean.someMethod" var="someMessage"/&gt;
&#36;{someMessage}
</code></pre>
</pre>
</h3>

<!-- comment 영역  -->

<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/taglibview.frag');">some Message</a>
		</li>
		
	</ul>	
</div>
<!-- sample 실행 영역  -->

<!-- sample 소스코드 영역  -->
<pre>
<code class="java">package nexcore.sprout.showcase.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class WebmvcController {
	
	@Autowired
	private SomeBean someBean;
	
	@RequestMapping(value="/webmvc/taglibview", method=RequestMethod.GET)
	public ModelAndView taglibGetView() {
		ModelAndView mav = new ModelAndView();                   
        mav.setViewName("taglib/taglibview");
        mav.addObject("someBean", someBean);
        return mav;
	}
	
}
</code>
</pre>
<!-- sample 소스코드 영역  -->
	
