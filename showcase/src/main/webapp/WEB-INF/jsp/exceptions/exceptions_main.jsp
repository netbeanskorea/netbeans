<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="simple">Exception Handling</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="getsimple"><font size="5px">GET /simple</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3>  단순 문자열 요청 request mapping 입니다.</h3>
<!-- comment 영역  -->

<!-- Tip 영역  -->
<p>jQuery 가 필요합니다.
초보자 템플릿 에서 보여지는대로 모든 JavaScript 플러그인은 jQuery 를 필요로 하는 점을 유의하세요. 지원되는 jQuery 의 버전을 보려면 우리의 bower.json 을 참조하세요.</p>
<!-- Tip 영역  -->

<!-- table 영역  -->
<div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th class="col-xs-4">기능</th>
          <th class="col-xs-4">인터넷 익스플로러 8</th>
          <th class="col-xs-4">인터넷 익스플로러 9</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><code>border-radius</code></th>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 지원되지 않음</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 지원됨</td>
        </tr>
        <tr>
          <th scope="row"><code>box-shadow</code></th>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 지원되지 않음</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 지원됨</td>
        </tr>
        <tr>
          <th scope="row"><code>transform</code></th>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 지원되지 않음</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 지원됨, <code>-ms</code> 접두사 필요</td>
        </tr>
        <tr>
          <th scope="row"><code>transition</code></th>
          <td colspan="2" class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 지원되지 않음</td>
        </tr>
        <tr>
          <th scope="row"><code>placeholder</code></th>
          <td colspan="2" class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 지원되지 않음</td>
        </tr>
      </tbody>
    </table>
  </div>
<!-- table 영역  -->  


<!-- sample 실행 영역  -->
<h3>Example</h3>
<div class="sample">
	<ul>
		<li><a id="simpleLink" class="textLink" href="<c:url value="/simple" />">GET /simple : </a></li>
	</ul>
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
<code class="java">
package nexcore.sprout.showcase.mvc.simple;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SimpleController {

	@RequestMapping("/simple")
	public @ResponseBody String simple() {
		return "Hello world!";
	}

}
</code>
</pre>
<!-- sample 소스코드 영역  -->

</div>
<!-- 페이지 Content  end -->



<div class="page-content">
<!--  -->
<h1 id="simpleRevisited"><font size="5px">GET /simple/revisited</font></h1>
<h3> 단순 문자열 요청 request mapping 입니다.</h3>
<p>jQuery 가 필요합니다.
초보자 템플릿 에서 보여지는대로 모든 JavaScript 플러그인은 jQuery 를 필요로 하는 점을 유의하세요. 지원되는 jQuery 의 버전을 보려면 우리의 bower.json 을 참조하세요.</p>
<h3>Example</h3>
<div class="sample">
	<ul>
		<li><a id="simpleRevisited1" class="textLink" href="<c:url value="/simple/revisited" />">GET /simple/revisited : </a></li>
	</ul>
</div>
<pre>
<code class="java">
package nexcore.sprout.showcase.mvc.simple;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SimpleControllerRevisited {

	@RequestMapping(value="/simple/revisited", method=RequestMethod.GET, headers="Accept=text/plain")
	public @ResponseBody String simple() {
		return "Hello world revisited!";
	}

}
</code>
</pre>
</div>
