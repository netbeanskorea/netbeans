<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<spring:eval expression="T(nexcore.sprout.foundry.utils.UserAgentUtil).getUserAgent(pageContext.request)" var="userAgent" />
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="env">Spring Profile</div>
<!-- 페이지 타이틀 영역  -->

<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="springProfile"><font size="5px">스프링 프로필 설정(Spring Profile)</font></h1>
<!-- comment 영역  -->
<h3><pre>profile 기능을  적용하면 서버환경에 맞게 필요한 환경을 수정해서 반영할수 있다. 

적용방법은 다음과 같다. 

1.beans 설정 profile 지정
<code>&lt;beans profile="devProfile"&gt;   
     &lt;bean id="someBean" class="nexcore.sprout.showcase.mvc.SomeBean"&gt;
        &lt;property name="profileName" value="Developement  profile"/&gt;
    &lt;/bean&gt;
&lt;/beans&gt;
&lt;beans profile="prodProfile"&gt;
    &lt;bean id="someBean" class="nexcore.sprout.showcase.mvc.SomeBean"&gt;
        &lt;property name="profileName" value="Production profile"/&gt;
    &lt;/bean&gt;
&lt;/beans&gt;</code>

2.profile 활성화 : jvm 옵션 또는 web.xml 에 context-param 으로 설정
<code>jvm 옵션 
-Dspring.profiles.active=dbcp_datasource,devProfile</code>
<code>web.xml 설정
&lt;context-param&gt;
	&lt;param-name&gt;spring.profiles.active&lt;/param-name&gt;
	&lt;param-value&gt;dbcp_datasource,devProfile&lt;/param-value&gt;
&lt;/context-param&gt;
</code> 

3.System Property로 설정
<code>export spring.profiles.active=production</code>
</pre></h3>
<!-- sub title  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a id="profileView" class="textLink" href="<c:url value="/etc/springProfileView" />"> Current profile:   </a>
		</li>
		
		<li>
			<a id="ChangeprofileView" class="textLink" href="<c:url value="/etc/springChangeProfileView" />"> Change Current profile:   </a>
		</li>
	</ul>
</div>
</pre></h3>
<!-- comment 영역  -->

<!-- sample 소스코드 영역  -->
<pre><code class="java">
package nexcore.sprout.showcase.mvc;

public class SomeBean {

    private String profileName;
    
	public String someMethod() {
        return "Saying Hello World sprout-showcase";
    }
	
	public void setProfileName(String profileName){
		this.profileName =profileName;
	}
	
	
	public String getProfileName(){
		return this.profileName;
	}
}
</code>
<code class="java">
package nexcore.sprout.showcase.etc;

import nexcore.sprout.showcase.mvc.SomeBean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ConfigurableWebApplicationContext;

@Controller
public class ShowEtcViewController {
	
	@Autowired ConfigurableWebApplicationContext subContext;
	@Autowired SomeBean someBean;

	@RequestMapping(value="/etc/springProfileView")
	public @ResponseBody String getProfileTestView() {
		return currentProfile(1) + "=> " +someBean.getProfileName();
	}
	
	@RequestMapping(value="/etc/springChangeProfileView")
	public @ResponseBody String getChangeProfileTestView() {
		setProfile();
		return someBean.getProfileName()  +  "=> " + currentProfile(1);
	}
	
	public void setProfile(){
		String currentProfile = currentProfile(1);
		String toChangeProfile = currentProfile.equals("devProfile") ? "prodProfile" : "devProfile";
        ConfigurableWebApplicationContext rootContext = (ConfigurableWebApplicationContext)subContext.getParent();
         
        // root, sub 싹다 엑티브 프로파일을 바꾼후 리프레쉬 해야 적용됨
        // Refreshing Root WebApplicationContext
        rootContext.getEnvironment().setActiveProfiles(currentProfile(0));
        rootContext.getEnvironment().addActiveProfile(toChangeProfile);
        //rootContext.getEnvironment().setActiveProfiles(toChangeProfile);
        rootContext.refresh();
         
        // Refreshing Spring-servlet WebApplicationContext
        subContext.getEnvironment().setActiveProfiles(currentProfile(0));
        subContext.getEnvironment().addActiveProfile(toChangeProfile);
        //subContext.getEnvironment().setActiveProfiles("dbcp_datasource," +toChangeProfile);
        subContext.refresh();
        
         
    }
     
	
    private String currentProfile(int cnt){
        String[] profiles = subContext.getEnvironment().getActiveProfiles();
         
        if( profiles.length==0 ){
            profiles = subContext.getEnvironment().getDefaultProfiles();
        }
        return profiles[cnt];
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

