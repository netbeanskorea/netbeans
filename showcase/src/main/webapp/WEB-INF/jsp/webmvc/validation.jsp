<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="Validation">Validation</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="beancheck"><font size="5px">Bean 검증</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>Bean 검증의 큰 특징은 모델 오브젝트의 필드에 달린 제약조건(constraints) 애노테이션을 이용해 검증을 진행할 수 있다는 점이다.
예를들어 @NotNull 애노테이션은 필드의 값이 null 이 아님을 확인하는 제약조건이고, 
@Min 은 최소값을 지정할 수 있는 제약조건이다. 
이 두가지를 이용하여 빈검증 클래스를 다음과 같이 간단하게 만들 수 있다.
<pre><code>public class User {
  @NotNull
  private String name;
   
  @Min(0)
  private int age;
</code></pre>
다음으로 콘트롤러에서는 @Valid 어노테이션을 이용하여 자동으로 검증하게 된다.
<pre><code>@Controller
public class UserController {
@RequestMapping("/add")
public void add(@ModelAttribute @Valid User user, BindingResult result) {
     
    ...
}</code></pre>
위 콘트롤러에서 BindingResult 에는 모델의 바인딩 작업 중에 발생한 타입 변환 오류정보와 검증 작업에서 발생한 검증 오류 정보가 저장된다.
따라서 다음과 같이 검증 결과를  체크해 볼수 있다.
<pre><code>if (result.hasErrors()) {
	return "Object has validation errors";
} else {
	return "No errors";
}
</code></pre>
</pre></h3>
<p>
 빈 문자열까지 확인하려면 @Size(min=1) 을 사용해야 한다.
 </p>
<!-- comment 영역  -->


<!-- table 영역  -->
<div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th  width="50" align="left">Annotation</th>
          <th>Supported Type</th>
          <th>기능</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>@AssertFalse</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> boolean, Boolean</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성의 값이 false인지 체크한다</td>
        </tr>
            <tr>
          <td scope="row"><code>@AssertTrue</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> boolean, Boolean</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성의 값이 true인지 체크한다</td>
        </tr>
        <tr>
          <td scope="row"><code>@DecimalMax</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> BigDecimal, BigInteger, String, byte, short, 
int, long and primitive type에 대한 wrappers</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성이 가질 수 있는 최대값을 체크한다</td>
        </tr>
    <tr>
          <td scope="row"><code>@DecimalMin</code></td>
           <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> BigDecimal, BigInteger, String, byte, short, 
int, long and primitive type에 대한 wrappers</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성이 가질 수 있는 최소값을 체크한다.</td>
        </tr>
        <tr>
          <td>@Digits</td>
           <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> BigDecimal, BigInteger, String, byte, short, 
int, long and primitive type에 대한 wrappers</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성이 가질 수 있는 정수부의 자리수와 
소수부의 자리수를 체크한다.</td>
        </tr>
         <tr>
          <td scope="row"><code>@Future</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> java.util.Date, java.util.Calendar</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성의 값이 현재일 이후인지 체크한다.</td>
        </tr>
         <tr>
          <td scope="row"><code>@Max</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> BigDecimal, BigInteger, String, byte, short, 
int, long and primitive type에 대한 wrappers</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성이 가질 수 있는 최대 Length를 체크한다</td>
        </tr>
         <tr>
          <td scope="row"><code>@Min</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> BigDecimal, BigInteger, String, byte, short,
 int, long and primitive type에 대한 wrappers</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성이 가질 수 있는 최소 Length를 체크한다.</td>
        </tr>
         <tr>
          <td scope="row"><code>@NotNull</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> any type</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성의 값이 Null이 아닌지 체크한다.</td>
        </tr>
         <tr>
          <td scope="row"><code>@Null</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> any type</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성의 값이 Null인지 체크한다</td>
        </tr>
         <tr>
          <td scope="row"><code>@Past</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> java.util.Date, java.util.Calendar</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성의 값이 현재일 이전인지 체크한다.</td>
        </tr>
         <tr>
          <td scope="row"><code>@Pattern</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> String</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 속성의 값이 정의된 Regular Expression에 
부합하는지 체크한다. <br><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Regular Expression은 
Java Regular Expression Convention에  <br><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 맞게 정의해야 한다.</td>
        </tr>
         <tr>
          <td scope="row"><code>@Size</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> String, Collection, Map and arrays</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 	해당 속성이 가질 수 있는 최대, 최소 Length를 체크한다</td>
        </tr>
         <tr>
          <td scope="row"><code>@Valid</code></td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> any non primitive type</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 해당 객체에 대해 Validation Check가 이루어진다</td>
        </tr>
      </tbody>
    </table>
  </div>
<!-- table 영역  -->  


<!-- sample 실행 영역  -->
<h1>Example</h1>
<div class="sample">
<ul>
	<li>
		<%-- <a id="getBoardListFrag" class="textLink" href="<c:url value="/ormBoard/getBoardList.frag?rowPerPage=5&pageNo=1" />"> 게시판 조회 : 새글작성   </a> --%>
		<a id="getBoardListFrag" class="textLink" href="<%=request.getContextPath()%>/ormBoard/goBoardEdit.frag?rowPerPage=5&pageNo=1"> 게시판 조회 : 새글작성   </a>
	</li>
	</ul>
	<%-- <ul>
		<li>
			<a id="validateNoErrors" class="textLink" href="<c:url value="/validate?number=3&date=2029-07-04" />">Validate, no errors</a>
		</li>
		<li>
			<a id="validateErrors" class="textLink" href="<c:url value="/validate?number=3&date=2010-07-01" />">Validate, errors</a>
		</li>
	</ul>	 --%>
</div>
<!-- sample 실행 영역  -->


<!-- sample 소스코드 영역  -->
<pre>
* VO
<code class="java">
package nexcore.sprout.showcase.orm.board.vo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import nexcore.sprout.showcase.common.vo.PageVO;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public class ShowcaseBoardVO extends PageVO {
    
	private String seqNo;

	@NotNull
	@Size(min=1, max=10)
	private String title;
	
	@NotNull
	@Size(min=1)
	private String content;
		
	private String readCnt;
	
	@NotNull
	@Size(min=1)
	private String writer;
	
	private String reqDate;
	
	@Pattern(regexp="^(19[7-9][0-9]|20[0-9]{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$")
	private String dueDate;
	
	private String schKind;
	public String getSchKind() {
        return schKind;
    }
    public void setSchKind(String schKind) {
        this.schKind = schKind;
    }
    public String getSchWord() {
        return schWord;
    }
    public void setSchWord(String schWord) {
        this.schWord = schWord;
    }
    private String schWord;
	
	public String getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(String seqNo) {
		this.seqNo = seqNo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getReadCnt() {
		return readCnt;
	}
	public void setReadCnt(String readCnt) {
		this.readCnt = readCnt;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public String getReqDate() {
		return reqDate;
	}
	public void setReqDate(String reqDate) {
		this.reqDate = reqDate;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	@Override
    public String toString() {
        return "BoardVO [seqNo=" + seqNo + ", title=" + title + ", content=" + content + ", readCnt=" + readCnt
            + ", writer=" + writer + ", reqDate=" + reqDate + ", dueDate=" + dueDate + ", schKind=" + schKind
            + ", schWord=" + schWord + "]";
    }
}
</code>

* 콘트롤러
<code> 
package nexcore.sprout.showcase.orm.board.controller;

import java.util.Map;

import javax.validation.Valid;

import nexcore.sprout.showcase.common.util.ShowcasePageUtil;
import nexcore.sprout.showcase.orm.board.service.ShowcaseBoardService;
import nexcore.sprout.showcase.orm.board.vo.ShowcaseBoardVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
 
@Controller
@RequestMapping("/ormBoard")
public class ShowcaseBoardController {
    
    @Autowired
    private ShowcaseBoardService showcaseBoardService;
        
    @RequestMapping("/getBoardList")
    public String getBoardList(ShowcaseBoardVO vo, Model model) {
    	int totalCount=showcaseBoardService.getTotalBoardCnt(vo);
    	
    	// get Page Info (총건수, Page 번호, Page 크기,total page) and set PageVo
    	Map<String, Integer> returnPagingInfo=ShowcasePageUtil.getPageInfo(totalCount, vo);
        model.addAttribute("pager", returnPagingInfo);
        
        model.addAttribute("boardList", showcaseBoardService.getBoardList(vo));
        return "orm/pageList";
    }
    
    @RequestMapping("/goBoardEdit")
    public String goBoardEdit(ShowcaseBoardVO vo, Model model) {
        return "orm/boardWrite";
    }
    
    //@Transactional
    @RequestMapping("/addBoard")
    public String addBoard(@Valid ShowcaseBoardVO vo,  BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "orm/boardWrite";            
        }        
     //   model.addAttribute("addBoardCnt", boardService.addBoard(vo));
    	return "redirect:/ormBoard/getBoardList.frag";
    }

    
  
}</code>

* 화면
<code>&lt;form:form id="form" name="form" action="<%=request.getContextPath()%>/ormBoard/addBoard.frag" method="POST"   modelAttribute="showcaseBoardVO"&gt;
	&lt;div class="table-responsive"&gt;
				&lt;table class="table table-bordered table-striped"&gt;
		&lt;colgroup&gt;
			&lt;col width="130" /&gt;
			&lt;col width="300" /&gt;
			&lt;col width="160" /&gt;
			&lt;col width="400" /&gt;
		&lt;/colgroup&gt;
		&lt;tr&gt;
			&lt;th&gt;
				&lt;form:label path="writer" for="writer"&gt;&lt;spring:message code="board.label.writer"/&gt;&lt;/form:label&gt;
			&lt;/th&gt;
			&lt;td&gt;
				&lt;form:input path="writer" value="&#36;{boardInfo.writer}"/&gt;
				&lt;form:errors path="writer" cssClass="error"/&gt;
			&lt;/td&gt;
			&lt;th&gt;
				&lt;form:label path="dueDate" for="dueDate"&gt;&lt;spring:message code="board.label.dueDate"/&gt; (yyyy-mm-dd)&lt;/form:label&gt;						
			&lt;/th&gt;
			&lt;td&gt;
				&lt;form:input path="dueDate" value="&#36;{boardInfo.dueDate}"/&gt;
				&lt;form:errors path="dueDate" cssClass="error"/&gt;
			&lt;/td&gt;
		&lt;/tr&gt;
		&lt;tr&gt;
			&lt;th&gt;
				&lt;form:label path="title" for="title"&gt;&lt;spring:message code="board.label.title"/&gt;(&lt;spring:message code="board.label.max"/&gt;10)&lt;/form:label&gt;
			&lt;/th&gt;
			&lt;td colspan="3"&gt;
				&lt;form:input path="title" cssClass="Textinput input01 num05" value="&#36;{boardInfo.title}"/&gt;
				&lt;form:errors path="title" cssClass="error"/&gt;
			&lt;/td&gt;
			
		&lt;/tr&gt;								
		&lt;tr&gt;
			&lt;th&gt;
				&lt;form:label path="content" for="content"&gt;&lt;spring:message code="board.label.content"/&gt;&lt;/form:label&gt;
			&lt;/th&gt;
			&lt;td colspan="3"&gt;
				&lt;form:errors path="content" cssClass="error"/&gt;
				&lt;textarea id="content" name="content" class="textarea05" &gt;&#36;{boardInfo.content}&lt;/textarea&gt;
			&lt;/td&gt;					
		&lt;/tr&gt;
	&lt;/table&gt;					
&lt;/form:form&gt;</code>
</pre>
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
