<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="Tiles">Tiles</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="tilesdefinitions"><font size="5px">tiles-definitions  작성</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>
<pre><code>&lt;bean id="tilesConfigurer" class="org.springframework.web.servlet.view.tiles3.TilesConfigurer"&gt;
	&lt;property name="definitions"&gt;
		&lt;list&gt;
			&lt;value&gt;classpath*:/META-INF/tiles/*.xml&lt;/value&gt;
		&lt;/list&gt;
	&lt;/property&gt;
	&lt;property name="preparerFactoryClass" value="org.springframework.web.servlet.view.tiles3.SpringBeanPreparerFactory" /&gt;
&lt;/bean&gt;</code>

<code>&lt;!DOCTYPE tiles-definitions PUBLIC "-//Apache Software Foundation//DTD Tiles Configuration 3.0//EN" "http://tiles.apache.org/dtds/tiles-config_3_0.dtd"&gt;
&lt;tiles-definitions&gt;
   &lt;definition name="tiles-sample" template="/WEB-INF/jsp/tiles/layout.jsp"&gt;
		&lt;put-attribute name="header" value="/WEB-INF/jsp/tiles/header.jsp" /&gt;
		&lt;put-attribute name="sidebar" value="/WEB-INF/jsp/tiles/sidebar.jsp" /&gt;
		&lt;put-attribute name="body" value="" /&gt;
		&lt;put-attribute name="footer" value="/WEB-INF/jsp/tiles/footer.jsp" /&gt;
	&lt;/definition&gt;
	&lt;definition name="/WEB-INF/jsp/tiles/tilesview.do" extends="tiles-sample" &gt;
		&lt;put-attribute name="body" value="/WEB-INF/jsp/tiles/tilesview.jsp" /&gt;
	&lt;/definition&gt;
&lt;/tiles-definitions&gt;
</code></pre>
</h3>

<!-- sub title  -->
<h1 id="getlauout"><font size="5px">layout.jsp 작성</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>
<pre><code>&lt;%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%&gt;
&lt;%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%&gt;    
&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8"&gt;
&lt;title&gt;Insert title here&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;table border="1" align="center" width="100%" height="100%"&gt;
        &lt;tr&gt;
            &lt;td colspan="2"&gt;&lt;tiles:insertAttribute name="header"/&gt;&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr height="100%"&gt;
            &lt;td&gt;&lt;tiles:insertAttribute name="sidebar"/&gt;&lt;/td&gt;
            &lt;td&gt;&lt;tiles:insertAttribute name="body"/&gt;&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td colspan="2"&gt;&lt;tiles:insertAttribute name="footer"/&gt;&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
</h3>

<!-- comment 영역  -->
<!-- sub title  -->
<h1 id="getTiles"><font size="5px">layout.jsp  작성</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>
<pre><code>&lt;H1&gt;Tiles Header&lt;/H1&gt;
</code></pre>
</h3>

<!-- comment 영역  -->
<!-- sub title  -->
<h1 id="getTiles"><font size="5px">footer.jsp 작성 </font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>
<pre><code>Copyrightⓒ footer
</code></pre>
</h3>

<!-- comment 영역  -->
<!-- sub title  -->
<h1 id="getTiles"><font size="5px">menu.jsp 작성 </font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>
<pre><code>&lt;table&gt;
    &lt;tr&gt;
        &lt;td&gt;Menu Item 1&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Menu Item 2&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Menu Item 3&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
</code></pre>
</h3>


<!-- comment 영역  -->
<!-- sub title  -->
<h1 id="getTiles"><font size="5px">tilesview.jsp 작성 </font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>
<pre><code>This is Body
</code></pre>
</h3>


<!-- sample 실행 영역  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a id="tilessample" class="textLink" target="_blank" href="<c:url value="/tiles/tilesview" />">Tiles View </a>
		</li>
	</ul>	
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
<code class="java">@RequestMapping(value = "webmvc/tilesview", method = RequestMethod.GET)
public String a() {
    return "tiles/tilesview";
}
</code>
</pre>

<pre>
<!-- sample 소스코드 영역  -->

</div>
<!-- 페이지 Content  end -->

