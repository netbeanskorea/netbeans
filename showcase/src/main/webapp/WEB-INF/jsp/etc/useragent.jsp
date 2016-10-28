<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<spring:eval expression="T(nexcore.sprout.foundry.utils.UserAgentUtil).getUserAgent(pageContext.request)" var="userAgent" />
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="userAgent">부가기능</div>
<!-- 페이지 타이틀 영역  -->

<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="userAgent"><font size="5px">UserAgent  분석</font></h1>
<!-- comment 영역  -->
<h3><pre>UserAgent 정보는 UserAgentUtil 사용한다.
</pre></h3>
<!-- sub title  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a id="userAgentView" class="textLink" href="<c:url value="/etc/userAgentView.frag" />"> UserAgent:   </a>
		</li>
	</ul>
</div>
</pre></h3>
<p><em>자세한 사항은 UserAgentUtils 사이트 참고 : <b><a href="http://bitwalker.eu/user-agent-utils/javadoc/index.html" target="_blank"> > http://bitwalker.eu/user-agent-utils/javadoc/index.html </a></b></em></p>
<!-- comment 영역  -->

<!-- sample 소스코드 영역  -->
<pre>SpEL 사용
<code class="java">
&lt;spring:eval expression="T(nexcore.sprout.foundry.utils.UserAgentUtil).getUserAgent(pageContext.request)" var="userAgent" /&gt;

&#36;{userAgent.getBrowser().getBrowserType()}
&#36;{userAgent.getBrowser().getName()}
&#36;{userAgent.getBrowser().getManufacturer().getName()}
&#36;{userAgent.getBrowserVersion().getVersion()}
&#36;{userAgent.getOperatingSystem().getName()}
&#36;{userAgent.getOperatingSystem().getDeviceType()}
&#36;{userAgent.getOperatingSystem().getManufacturer().getName()}
</code>
jsp 사용
<code class="java">
&lt;% 
UserAgent ua = UserAgentUtils.getUserAgent(request);

ua.getBrowser().getBrowserType();
ua.getBrowser().getName();
ua.getBrowser().getManufacturer().getName();
ua.getBrowserVersion().getVersion();
ua.getOperatingSystem().getDeviceType();
ua.getOperatingSystem().getName();
ua.getOperatingSystem().getManufacturer().getName();
%&gt;
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

