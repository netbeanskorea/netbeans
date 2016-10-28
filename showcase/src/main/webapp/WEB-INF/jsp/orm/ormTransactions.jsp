<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="simple">Transaction</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="getsimple"><font size="5px">트랜잭션 매니저</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
1. DataSourceTransactionManager 
Connection의 트랜잭션 API를 이용해서 트랜잭션을 관리해주는 트랜잭션 매니저다. 
이 트랜잭션 매니저를 사용하려면 트랜잭션을 적용할 DataSource 가 스프링의 빈으로 등록돼야 한다. 
JDBC와 iBatis SqlMap 으로 만든 DAO에 적용할 수 있다.
<code>&lt;bean id="transactionManager"
		class="org.springframework.jdbc.datasource.DataSourceTransactionManager"&gt;
		&lt;property name="dataSource" ref="dataSource" /&gt;
	&lt;/bean&gt;&gt;</code>

2. JpaTransactionManager
JPA를 이용하는 DAO에는 JpaTransactionManager를 사용한다. 
<code>&lt;bean id="emf" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean"&gt;
    ...
&lt;/bean&gt;
 
&lt;bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager"&gt;
    &lt;property name="entityManagerFactory" ref="emf" /&gt;
&lt;/bean&gt;</code>
</pre></h3>

<!-- sub title  -->
<h1 id="transactionAnnotation"><font size="5px">@Transactional </font></h1>
<!-- sub title  -->
<!-- comment 영역  -->
<h3><pre>
1. @Transactional  어노테이션 사용을 위하여 다음과 같이 설정되어 있다.
<code>&lt;tx:annotation-driven transaction-manager="transactionManager" /&gt;</code>

2.@Transactional 어노테이션 적용
 *  클래스에 직접 @Transactional 을 적용할 경우 클래스 내의 모든 메소드에 적용 가능하다
 *  메소드에 @Transactional이 있으면 클래스 레벨의 @Transactional 선언보다 우선해서 적용된다.
 *  따라서 @Transactional을 적용하는 우선순위는 클래스의 메소드, 클래스, 인터페이스의 메소드, 인터페이스 순이다.
<code>@Transactional
public class MemberDao{
    ...
     
    public void add(Member m) { ... }
    public void add(List<Member> members) { ... }
    public void deleteAll() { ... }
    @Transactional(readOnly=true)
    public long count() { ... }
}</code>
</pre>
</h3>

<!-- sub title  -->
<h1 id="transactionProperty"><font size="5px">트랜잭션 속성</font></h1>
<!-- sub title  -->
<h3>
<pre>@Transactional 을 이용했을 때는 다음과 같이 애노테이션의 앨리먼트로 트랜잭션 속성을 지정할 수 있다.
<code>@Transactional(readOnly=...,
       isolation=...,
       propagation=...,
       timeout=...,
       rollbackFor=..., rollbackForClassName=...,
       noRollbackFor=..., noRollbackForClassName=...)</code>
       
1.트랜잭션 전파(propagation)
       
트랜잭션을 시작하거나 기존 트랜잭션에 참여하는 방법을 결정하는 속성이다
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
          <td>REQUIRED</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>디폴트 속성이다. 모든 트랜잭션 매니저가 지원하며, 대개 이속성이면 충분하다.
   미리 시작된 트랜잭션이 있으면 참여하고 없으면 새로 시작한다. 
   자연스럽고 간단한 트랜잭션 전파 방식이지만 사용해보면 매우 강력하고 유용하다는 사실을 알 수 있다.
   하나의 트랜잭션이 시작된 후에 다른 트랜잭션 경계가 설정된 메소드를 호출하면 자연스럽게 같은 트랜잭션으로 묶인다.</td>
        </tr>
         <tr>
          <td>SUPPORTS</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>이미 시작된 트랜잭션이 있으면 참여하고 그렇지 않으면 트랜잭션 없이 진행하게 만든다. 트랜잭션이 없긴 하지만 해당 경계 안에서 Connection은 공유할 수 있다.</td>
        </tr>
         <tr>
          <td>MANDATORY</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> REQUIRED와 비슷하게 이미 시작된 트랜잭션이 있으면 참여한다. 반면에 트랜잭션이 시작된 것이 없으면 새로 시작하는 대신 예외를 발생시킨다. 
   혼자서는 독립적으로 트랜잭션을 진행하면 안 되는 경우에 사용한다.</td>
        </tr>
          <tr>
          <td>REQUIRED_NEW</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>항상 새로운 트랜잭션을 시작한다. 이미 진행 중인 트랜잭션이 있으면 트랜잭션을 잠시 보류시킨다. 
   JTA 트랜잭션 매니저를 사용한다면 서버의 트랜잭션 매니저에 트랜잭션 보류가 가능하도록 설정되어 있어야 한다.</td>
        </tr>
         <tr>
          <td>NOT_SUPPORTED</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>트랜잭션을 사용하지 않게 한다. 이미 진행 중인 트랜잭션이 있으면 보류시킨다.</td>
        </tr>
           <tr>
          <td>NEVER</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>트랜잭션을 사용하지 않도록 강제한다. 이미 진행 중인 트랜잭션도 존재하면 안된다 있다면 예외를 발생시킨다.</td>
        </tr>
           <tr>
          <td>NESTED</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>이미 진행중인 트랜잭션이 있으면 중첩 트랜잭션을 시작한다. 하지만 독립적인 트랜잭션을 마드는 REQUIRES_NEW와는 다르다.</td>
        </tr>
      </tbody>
    </table>
</div>
<!-- table 영역  -->


2.트랜잭션 격리 수준(isolation)

트랜잭션 격리수준은 동시에 여러 트랜잭션이 진행될 때에 트랜잭션의 작업 결과를 여타 트랜잭션에게 어떻게 노출할 것인지를 결정하는 기준이다. 
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
          <td>DEFAULT</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>사용하는 데이터 액세스 기술 또는 DB 드라이버의 디폴트 설정을 따른다.대부분의 DB는 READ_COMMITTED를 기본 격리수준으로 갖는다. </td>
        </tr>
         <tr>
          <td>READ_UNCOMMITTED</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>가장 낮은 격리수준이다. 하나의 트랜잭션이 커밋되기 전에 그 변화가 다른 트랜잭션에 그대로 노출되는 문제가 있다. 하지만 가장 빠르기 때문에 데이터의 일관성이 조금 떨어지더라도 성능을 극대화할 때 의도적으로 사용하기도 한다.</td>
        </tr>
         <tr>
          <td>READ_COMMITTED</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 실제로 가장 많이 사용되는 격리수준이다.다른 트랜잭션이 커밋하지 않은 정보는 읽을 수 없다. 대신 하나의 트랜잭션이 읽은 로우를 다른 트랜잭션이 수정할 수 있다. 이 때문에 처음 트랜잭션이 같은 로우를 읽을 경우 다른 내용이 발견될 수 있다. 
  .</td>
        </tr>
          <tr>
          <td>REPEATABLE_READ</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>하나의 트랜잭션이 읽은 로우를 다른 트랜잭션이 수정하는 것을 막아준다.</td>
        </tr>
         <tr>
          <td>SERIALIZABLE</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>가장 강력한 트랜잭션 격리수준이다. 이름 그대로 트랜잭션을 순차적으로 진행시켜 주기 때문에 여러 트랜잭션이 동시에 같은 테이블의 정보를 액세스하지 못한다</td>
        </tr>
      </tbody>
    </table>
</div>
<!-- table 영역  -->
3.트랜잭션 제한시간(timeout)<code>
트랜잭션에 제한시간을 지정할 수 있다. 값은 초 단위로 지정한다. 
디폴트는 트랜잭션 시스템의 제한시간을 따르는 것이다. 트랜잭션 제한시간을 직접 지정하는 경우 이 기능을 지원하지 못하는 일부 트랜잭션 매니저는 예외를 발생시킬 수 있다.
</code>
4.읽기전용 트랜잭션(read-only, readOnly)
<code>
트랜잭션을 읽기 전용으로 설정할 수 있다. 
성능을 최적화하기 위해 사용할 수도 있고 특정 트랜잭션 작업 안에서 쓰기 작업이 일어나는 것을 의도적으로 방지하기 위해 사용할 수도 있다. 
일반적으로 읽기 전용 트랜잭션이 시작된 이후 INSERT, UPDATE, DELETE 같은 쓰기 작업이 진행되면 예외가 발생한다. 
</code>
5.트랜잭션 롤백 예외(rollback-for, rollbackFor, rollbackForClassName)
<code>
선언적 트랜잭션에서는 런타임 예외가 발생하면 롤백한다. 반면에 예외가 전혀 발생하지 않거나 체크 예외가 발생하면 커밋한다.
체크 예외지만 롤백 대상으로 삼아야 하는 것이 있다면 XML의 rolback-for 애트리뷰트나 
애노테이션의 rollbackFor 또는 rollbackForClassName 앨리먼트를 이용해서 예외를 지정하면 된다. 
</code>
rollback-for 나 rollbackForClassName 은 예외 이름을 넣으면 되고, rollbackFor 는 예외 클래스를 직접 넣는
<code>@Transactional(readOnly=true, rollbackFor=NoSuchMemberException.class)</code>

6.트랜잭션 커밋 예외(no-rollback-for, noRollbackFor, noRollbackForClassName)
<code>
rollback-for 속성과는 반대로 기본적으로는 롤백 대상인 런타임 예외를 트랜잭션 커밋 대상으로 지정해 준다.
사용 방법은 rollback-for 와 동일하다.</code>
       </pre>
</h3>       
<p><em>자세한 사용법은  다음 링크 사이트를 참고한다 : 
<a href="http://docs.spring.io/spring/docs/3.2.15.RELEASE/spring-framework-reference/html/transaction.html" target="_blank">>> <b>http://docs.spring.io/spring/docs/3.2.15.RELEASE/spring-framework-reference/html/transaction.html</b> </a></em>
</p>

<!-- sample 소스코드 영역  -->
<pre>
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
				   			MvcUtil.showSuccessResponse(text, link); }
		       , error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});
	
});	
</script>

