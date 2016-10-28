<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<spring:eval expression="T(nexcore.sprout.foundry.utils.UserAgentUtil).getUserAgent(pageContext.request)" var="userAgent" />
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="env">Spring Cache</div>
<!-- 페이지 타이틀 영역  -->

<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="ehcache"><font size="5px">Cache 설정</font></h1>
<!-- comment 영역  -->
<h3><pre>1.cache 사용 선언
<code>&lt;cache:annotation-driven cache-manager="ehcacheManager" /&gt;
&lt;bean id="ehcacheManager" class="org.springframework.cache.ehcache.EhCacheCacheManager"&gt;
		&lt;property name="cacheManager" ref="ehcache"/&gt;
	&lt;/bean&gt;
	&lt;!-- EhCache library setup --&gt;
&lt;bean id="ehcache" class="org.springframework.cache.ehcache.EhCacheManagerFactoryBean"&gt; 
	&lt;property name="configLocation" value="classpath:META-INF/common/ehcache-config.xml"/&gt;
&lt;/bean&gt;
</code>

2.ehCache 환경설정 : ehcache-config.xml 
<code>&lt;ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="http://www.ehcache.org/ehcache.xsd"
         updateCheck="false" monitoring="autodetect" dynamicConfig="false"
         maxBytesLocalHeap="25%" name="debop4j-cache"&gt;

&lt;diskStore path="java.io.tmpdir"/&gt;
&lt;cache name="sample1"  
       eternal="true"
       overflowToDisk="false"  
       memoryStoreEvictionPolicy="LRU"
       statistics="false"
        /&gt;                                        
&lt;/ehcache&gt;
</code>
3.설정 속성 정보
<div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th  width="50" align="left">구분</th>
          <th> 내용 </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>maxElementsInMemory</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>메모리에 저장될 수 있는 객체의 최대 개수</td>
        </tr>
         <tr>
          <td>eternal</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> true이면 timeout 관련 설정은 무시되고, Element가 캐시에서 삭제되지 않는다. </td>
        </tr>
         <tr>
          <td>timeToIdleSeconds</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 메모리에 저장된 객체 개수가 maxElementsInMemory에서 지정한 값에 다다를 경우 디스크에 오버플로우 되는 객체는 저장할 지의 여부를 지정한다.</td>
        </tr>
          <tr>
          <td>timeToLiveSeconds</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Element가 존재하는 시간. 이 시간이 지나면 캐시에서 제거된다. 이 시간이 0이면 만료 시간을 지정하지 않는다. 기본값은 0이다.</td>
        </tr>
         <tr>
          <td>diskPersistent</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> VM이 재 가동할 때 디스크 저장소에 캐싱된 객체를 저장할지의 여부를 지정한다. 기본값은 false이다.</td>
        </tr>
           <tr>
          <td>diskExpiryThreadIntervalSeconds</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Disk Expiry 쓰레드의 수행 시간 간격을 초 단위로 지정한다. 기본값은 120 이다.</td>
        </tr>
           <tr>
          <td>memoryStoreEvictionPolicy</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>객체의 개수가 maxElementsInMemory에 도달했을 때,메모리에서 객체를 어떻게 제거할 지에 대한 정책을 지정한다.<br/><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>기본값은 LRU(Least Recently Used, 최근이용한거 남김)이다.<br/><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>FIFO(먼저 입력된것을 제거)와 LFU(가장 적게 이용된 것을 제거)도 지정할 수 있다.</td>
        </tr>
      </tbody>
    </table>
</div>
<!-- table 영역  -->

</pre></h3>

<!-- sub title  -->
<h1 id="ehcacheuse"><font size="5px">Cache 사용</font></h1>
<!-- sub title  -->

<h3><pre>1.@Cacheable 어노테이션
메서드 결과가 캐시에 저장되고, 동일한 인자로 메서드를 호출하면, 메서드를 실제로 호출하지 않고 그 값을 반환한다.
<code>@Cacheable("books")
public Book findBook(ISBN isbn) {…}</code>

2.@CacheEvict 어노테이션
캐시 삭제를 수행할 메서드에 선언한다. 캐시의 데이터를 지울 트리거 역할을 할 메서드에 사용한다
<code>@CacheEvict(value = "books", allEntries=true)
public void loadBooks(InputStream batch)</code>
* 이 옵션은 캐시 영역을 비워야 할 때 유용하다. 이 경우에는 키를 명시해도 적용되지 않기 때문에 무시한다.
</pre>
<p><em>스프링캐시의 자세한 내용은  spring 사이트를 참고한다.: <a href="http://docs.spring.io/spring/docs/3.2.15.RELEASE/spring-framework-reference/html/cache.html" target="_blank">http://docs.spring.io/spring/docs/3.2.15.RELEASE/spring-framework-reference/html/cache.html</a></em></p>
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

