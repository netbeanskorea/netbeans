<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="dbpaging">DB 페이징</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="setPaging"><font size="5px">페이징 설정</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
1. 쿼리작성 : 해당 페이지의 리스트를 가져오는 쿼리에 paging.pagingPreSQL,paging.pagingPostSQL 를 인클루드 한다. (  Paging.xml  참고 )
<code>&lt;select id="selectBoardList" parameterType="com.skcc.sample.board.vo.BoardVO" resultType="com.skcc.sample.board.vo.BoardVO"&gt;
<u>&lt;include refid="paging.pagingPreSQL"/&gt;</u>
SELECT 
	SEQ_NO AS "seqNo"
         ,TITLE AS "title"
         ,CONTENT AS "content"
         ,READ_CNT AS "readCnt"
         ,WRITER AS "writer"
         ,TO_CHAR(REQ_DATE,'YYYY-MM-DD') AS "reqDate"
         ,TO_CHAR(DUE_DATE,'YYYY-MM-DD') AS "dueDate"
FROM BOARD
&lt;include refid="selectBoardSearchCondition"/&gt;
      ORDER BY SEQ_NO DESC
<u>&lt;include refid="paging.pagingPostSQL" /&gt;</u>
&lt;/select&gt;</code>

* Paging.xml
<code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd"&gt;
&lt;mapper namespace="paging"&gt;
&lt;!-- 패이징을 위한 샘플 QUERY 입니다..업무에 맞게 수정하셔서 사용 바랍니다..  --&gt;
&lt;sql id="pagingPreSQL"&gt;
 		SELECT * FROM (   
   				SELECT ROWNUM , AA.* FROM (
&lt;/sql&gt;
&lt;sql id="pagingPostSQL"&gt;
       			)   AA )
       	 &lt;![CDATA[
       	    WHERE ROWNUM  &gt;= &#35;{firstRowIndex} AND  ROWNUM  &lt;= &#35;{lastRowIndex}
       	 ]]&gt; 	
&lt;/sql&gt;
&lt;sql id="pagingPreSqlOverCount"&gt;
		SELECT  FLOOR((AA.totalCount-1)/&#35;{rowPerPage})+1 totalPage ,  AA.* FROM (
					SELECT COUNT(*) OVER() totalCount, ROWNUM ROWNUMBER,MAINSQL.* FROM 
      					(
&lt;/sql&gt;
&lt;sql id="pagingPostSqlOverCount"&gt;

		 	) MAINSQL 
		 &lt;![CDATA[ ) AA WHERE ROWNUMBER&gt;=((&#35;{pageNo}-1)*&#35;{rowPerPage})+1 AND ROWNUMBER &lt;= (((&#35;{pageNo}-1)*&#35;{rowPerPage})+1) + &#35;{rowPerPage}-1 ]]&gt;  
&lt;/sql&gt;
&lt;/mapper&gt;&gt;</code>
2.VO 작성시 아래와 같이  PageVo 를 상속 받는다.
<code>public class ShowcaseBoardVO extends PageVO
{
......
}
</code>
* PageVo 매핑정보
<div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th  width="50" align="left">SproutConstants</th>
          <th>매핑변수</th>
          <th>매핑메소드</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>FIRST_ROW_INDEX</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>firstRowIndex</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> getFirstRowIndex() </td>
        </tr>
         <tr>
          <td>LAST_ROW_INDEX</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> lastRowIndex</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> getLastRowIndex()</td>
        </tr>
         <tr>
          <td>TOTAL_CNT</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> totalCnt</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> getTotalCnt()</td>
        </tr>
          <tr>
          <td>TOTAL_PAGE</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> totalPage</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> getTotalPage()</td>
        </tr>
         <tr>
          <td>PAGE_NO</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> pageNo</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>  getPageNo()</td>
        </tr>
         <tr>
          <td>START_PAGE_NO</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> startPageNo</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>  getStartPageNo()</td>
        </tr>
           <tr>
          <td>END_PAGE_NO</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>endPageNo</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> getEndPageNo()</td>
        </tr>
        <tr>
          <td>ROW_PER_PAGE</td>
          <td class="text-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>rowPerPage</td>
          <td class="text-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>getRowPerPage()</td>
        </tr>
      </tbody>
    </table>
</div>
<!-- table 영역  -->  


3. 콘트롤러에 PageUtil을 이용하여 Page정보를 다음과 같이 Attribute 로 추가.
<code> @RequestMapping("/getBoardList")
public String getBoardList(BoardVO vo, Model model) {
	int totalCount=boardService.getTotalBoardCnt(vo);
	
	// get Page Info (총건수, Page 번호, Page 크기,total page) and set PageVo
	<u>Map&lt;String, Integer&gt; returnPagingInfo=PageUtil.getPageInfo(totalCount, vo);</String></u>
	
    model.addAttribute("pager", returnPagingInfo);
    model.addAttribute("boardList", boardService.getBoardList(vo));
    return "board/boardList";
}</code>
4. 자바스크립트 함수 : 주소 요청시 pageNo, rowPerPage 가 파라미터로 추가 
<code>
&lt;script type="text/javascript"&gt;
function getBoardList(pageNo, rowPerPage) {
	var form = document.form;
	form.action = '&lt;%=request.getContextPath()%&gt;/board/getBoardList.do?pageNo=' + pageNo + '&rowPerPage=' + rowPerPage;		
	form.submit();
}
&lt;/script&gt;
</code>
5. HTML  에서는  Pager attribute 를 이용하여 다음을 참고하여 작성한다.  
<code>&lt;div class="pager" style="position: relative;"&gt;
		&lt;div class="pager-left"&gt;
			&lt;span&gt;총 개수: &#36;{pager.totalCnt}&lt;/span&gt;
	    &lt;/div&gt;
		&lt;div class="pager-center"&gt;
            &lt;c:forEach var="i" begin="1" end="&#36;{pager.endPageNo}"&gt;
			&lt;ul class="pagination page-list"&gt;
				&lt;li class="page-item page-button &#36;{pager.pageNo == i ? 'current' : ''}"&gt;
					<u>&lt;a class="page-set" href="" onclick="getBoardList(&#36;{i}, &#36;{pager.rowPerPage}); return false;"&gt;&#36;{i}&lt;/a&gt;</u>
				&lt;/li&gt;
			&lt;/ul&gt;
           &lt;/c:forEach&gt;
		&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;
</code>
</pre></h3>
<!-- comment 영역  -->
<!-- sub title  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a id="getBoardListFrag" class="textLink" href="<c:url value="/ormBoard/getBoardList.frag?rowPerPage=5&pageNo=1" />"> 게시판 조회 :   </a>
		</li>
	</ul>
</div>
</pre></h3>
<!-- comment 영역  -->
<!-- sample 소스코드 영역  -->
<pre>
ShowcaseBoardController.java
<code> 
package nexcore.sprout.showcase.orm.board.controller;

import java.util.Map;

import nexcore.sprout.showcase.common.util.ShowcasePageUtil;
import nexcore.sprout.showcase.orm.board.service.ShowcaseBoardService;
import nexcore.sprout.showcase.orm.board.vo.ShowcaseBoardVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    
  
}
</code>
ShowcaseBoardService.java
<code>package nexcore.sprout.showcase.orm.board.service;

import java.util.List;

import nexcore.sprout.showcase.orm.board.dao.ShowcaseBoardDAO;
import nexcore.sprout.showcase.orm.board.vo.ShowcaseBoardVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("showcaseBoardService")
public class ShowcaseBoardService {

    @Autowired
    private ShowcaseBoardDAO showcaseBoardDAO;
    
    public List<ShowcaseBoardVO> getBoardList(ShowcaseBoardVO vo) {
    	return showcaseBoardDAO.selectBoardList(vo);
    }
    
    public int getTotalBoardCnt(ShowcaseBoardVO vo) {
        return showcaseBoardDAO.selectTotalBoardCnt(vo);
    }	
    
   
}
</code>
ShowcaseBoardDAO.java
<code>package nexcore.sprout.showcase.orm.board.dao;

import java.util.List;

import nexcore.sprout.showcase.orm.board.vo.ShowcaseBoardVO;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("showcaseBoardDAO")
public class ShowcaseBoardDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
    
	public List<ShowcaseBoardVO> selectBoardList(ShowcaseBoardVO vo) {
        return sqlSessionTemplate.selectList("board.selectBoardList", vo);
    }
    
	 public int selectTotalBoardCnt(ShowcaseBoardVO vo) {
        return sqlSessionTemplate.selectOne("board.selectTotalBoardCnt", vo);
    }
 
}</code>
ShowcaseBoardVO.java
<code>package nexcore.sprout.showcase.orm.board.vo;

import java.util.List;

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
	
	@Pattern(regexp="^(19[7-9][0-9]|20[0-9]{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])&#36;")
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
}</code></pre>
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

