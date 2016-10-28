<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<spring:eval expression="T(nexcore.sprout.foundry.utils.UserAgentUtil).getUserAgent(pageContext.request)" var="userAgent" />
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="userAgent"> 로그 </div>
<!-- 페이지 타이틀 영역  -->

<!-- 페이지 Content  start -->
<div class="page-content">


<!-- sub title  -->
<h1 id="getsimple"><font size="5px">SQL 로그 설정</font></h1>
<!-- sub title  -->

<h3><pre>* Log4jdbcProxyDataSource 를 통하여 실행결과를 로그로 확인하고 싶은경우 아래와 같이 설정하여 사용할수 있다.

1.sqlFormatter 설정 : SQL 로그 포멧을 커스터마이징 하기 위해서 설정
<code>&lt;bean id="sqlFormatter" class="nexcore.sprout.foundry.log.sqllog.Log4JdbcCustomFormatter"&gt;
			&lt;property name="sqlPrefix" value="SQL::: " /&gt;
&lt;/bean&gt;</code>
2.Log4jdbcProxyDataSource 설정
<code>
* BasicDataSource 설정
&lt;bean id="dataSource" class="net.sf.log4jdbc.Log4jdbcProxyDataSource"&gt;
	&lt;constructor-arg&gt;
		&lt;bean class="org.apache.commons.dbcp.BasicDataSource"
			destroy-method="close"&gt;
			&lt;property name="driverClassName" value="&#36;{jdbc.driverClassName}" /&gt;
			&lt;property name="url" value="&#36;{jdbc.url}" /&gt;
			&lt;property name="username" value="&#36;{jdbc.username}" /&gt;
			&lt;property name="password" value="&#36;{jdbc.password}" /&gt;
			&lt;property name="defaultAutoCommit" value="false" /&gt;
			&lt;property name="maxActive" value="&#36;{jdbc.maxActive}" /&gt;
			&lt;property name="initialSize" value="&#36;{jdbc.initialSize}" /&gt;
		&lt;/bean&gt;
	&lt;/constructor-arg&gt;
	&lt;property name="logFormatter" ref="sqlFormatter" /&gt;
&lt;/bean&gt;</code>
 
3.JNDI로 설정 
<code>&lt;bean id="dataSource" class="net.sf.log4jdbc.Log4jdbcProxyDataSource"&gt;
	&lt;constructor-arg&gt;
		&lt;bean  class="org.springframework.jndi.JndiObjectFactoryBean"&gt;
	    	&lt;property name="jndiName" value="${spring.datasource.jndi.name.biz}"/&gt;
	    	&lt;property name="resourceRef" value="${spring.datasource.jndi.prefix}"/&gt;
		&lt;/bean&gt;
	&lt;/constructor-arg&gt;
	&lt;property name="logFormatter" ref="sqlFormatter"/&gt;
&lt;/bean&gt;</code>

4. 실행된 SQL로그 
<code><img src="<c:url value="/resources/css/images/data_log.png" />" border="0"/></code>
</pre>

<p><em>Log4jdbcProxyDataSource은 서버 성능에 영향이 잇을수  있으므로 로컬에만 설정하여 사용하는 것이 바람직함.</em></p>

<!-- sub title  -->
<h1 id="userAgent"><font size="5px">TRAN LOG  조회</font></h1>
<!-- comment 영역  -->
<h3><pre>로컬개발환경에서 처리되는 요청내역과 처리 결과는 설정에 따라서 NSF_TRAN_LOG 테이블에 저장되며 이를 조회 할수 있다.
사용하는 DB의 종류는 설정에 따라서 h2,oracle 등 다양하게 사용할수 있으며 showcase 에서는 h2 DB 로 설정되어 있다.
</pre></h3>
<!-- sub title  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a id="getBoardListFrag" class="textLink" href="<c:url value="/etc/getTranLogList.frag" />"> 로그 조회(FRAG):   </a>
		</li>
	</ul>
</div>
</pre></h3>
<!-- comment 영역  -->

<!-- sample 소스코드 영역  -->
<pre>TranLogController.java
<code>
package nexcore.sprout.showcase.etc.board.controller;

import nexcore.sprout.showcase.etc.board.service.TranLogService;
import nexcore.sprout.showcase.etc.board.vo.ShowcaseTranLogVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TranLogController {
    @Autowired
    TranLogService tranLogService;

    @RequestMapping("/etc/getTranLogList.json")
    public Model getBoardList(@RequestBody(  required=false)  ShowcaseTranLogVO vo, Model model) {
      try{
    	  System.out.println("/etc/getTranLogList.json");
    	  model.addAttribute("boardList", tranLogService.getTranLogList(vo));
      } catch(Exception e) {
            e.printStackTrace();
      }
      return model;
    }
    
    
    @RequestMapping("/etc/getTranLogList.frag")
    public ModelAndView getBoardList(@RequestBody(  required=false)  ShowcaseTranLogVO vo, ModelAndView model) {
      try{
    	  System.out.println("/etc/getTranLogList.frag");
    	  model.addObject("boardList", tranLogService.getTranLogList(vo));
    	  model.setViewName("etc/tranlogView");
      } catch(Exception e) {
            e.printStackTrace();
      }
      return model;
    }
}
</code>

TranLogService.java
<code>
package nexcore.sprout.showcase.etc.board.service;

import java.util.List;

import nexcore.sprout.showcase.etc.board.dao.TranLogDAO;
import nexcore.sprout.showcase.etc.board.vo.ShowcaseTranLogVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("tranLogService")
public class TranLogService {

    @Autowired
    TranLogDAO tranLogDAO;
    
    public List<ShowcaseTranLogVO> getTranLogList(ShowcaseTranLogVO vo) {
    	List<ShowcaseTranLogVO> tranLogList = null;
        try {
        	tranLogList = tranLogDAO.selectTranLogList(vo);
        }catch(Exception e) {
            e.printStackTrace();
        }
        return tranLogList;
    }
   
  
}</code>

TranLogDAO.java
<code>package nexcore.sprout.showcase.etc.board.dao;

import java.util.List;
import nexcore.sprout.showcase.etc.board.vo.ShowcaseTranLogVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@SuppressWarnings("deprecation")
@Repository("tranLogDAO")
public class TranLogDAO {
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
    
    public List<ShowcaseTranLogVO> selectTranLogList(ShowcaseTranLogVO vo) {
        return sqlSessionTemplate.selectList("board.selectTranLogList", vo);
    }
}</code>

ShowcaseTranLogVO
<code>package nexcore.sprout.showcase.etc.board.vo;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
@JsonIgnoreProperties(ignoreUnknown = true)
public class ShowcaseTranLogVO {

	private String seqNo;
	private String LOG_DT;
	private String GLOB_ID;
	private String MENU_ID;
	private String IPAD;
	private String TRN_CD;
	private String USER_ID;
	private String GROUP_ID;
	private String OS_VER;
	private String AGENT_VER;
	private String SVC_STRN_DTTM;
	private String SVC_END_DTTM;
	private String RSLT_MSG;
	
	private String RSLT_MSG_CD;
	private String WAS_INSTANCE_ID;
	private String ELAPSE_TIME;
	public String getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(String seqNo) {
		this.seqNo = seqNo;
	}
	public String getLOG_DT() {
		return LOG_DT;
	}
	public void setLOG_DT(String lOG_DT) {
		LOG_DT = lOG_DT;
	}
	public String getGLOB_ID() {
		return GLOB_ID;
	}
	public void setGLOB_ID(String gLOB_ID) {
		GLOB_ID = gLOB_ID;
	}
	public String getMENU_ID() {
		return MENU_ID;
	}
	public void setMENU_ID(String mENU_ID) {
		MENU_ID = mENU_ID;
	}
	public String getIPAD() {
		return IPAD;
	}
	public void setIPAD(String iPAD) {
		IPAD = iPAD;
	}
	public String getTRN_CD() {
		return TRN_CD;
	}
	public void setTRN_CD(String tRN_CD) {
		TRN_CD = tRN_CD;
	}
	public String getUSER_ID() {
		return USER_ID;
	}
	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}
	public String getGROUP_ID() {
		return GROUP_ID;
	}
	public void setGROUP_ID(String gROUP_ID) {
		GROUP_ID = gROUP_ID;
	}
	public String getOS_VER() {
		return OS_VER;
	}
	public void setOS_VER(String oS_VER) {
		OS_VER = oS_VER;
	}
	public String getAGENT_VER() {
		return AGENT_VER;
	}
	public void setAGENT_VER(String aGENT_VER) {
		AGENT_VER = aGENT_VER;
	}
	public String getSVC_STRN_DTTM() {
		return SVC_STRN_DTTM;
	}
	public void setSVC_STRN_DTTM(String sVC_STRN_DTTM) {
		SVC_STRN_DTTM = sVC_STRN_DTTM;
	}
	public String getSVC_END_DTTM() {
		return SVC_END_DTTM;
	}
	public void setSVC_END_DTTM(String sVC_END_DTTM) {
		SVC_END_DTTM = sVC_END_DTTM;
	}
	public String getRSLT_MSG() {
		return RSLT_MSG;
	}
	public void setRSLT_MSG(String rSLT_MSG) {
		RSLT_MSG = rSLT_MSG;
	}
	public String getRSLT_MSG_CD() {
		return RSLT_MSG_CD;
	}
	public void setRSLT_MSG_CD(String rSLT_MSG_CD) {
		RSLT_MSG_CD = rSLT_MSG_CD;
	}
	public String getWAS_INSTANCE_ID() {
		return WAS_INSTANCE_ID;
	}
	public void setWAS_INSTANCE_ID(String wAS_INSTANCE_ID) {
		WAS_INSTANCE_ID = wAS_INSTANCE_ID;
	}
	public String getELAPSE_TIME() {
		return ELAPSE_TIME;
	}
	public void setELAPSE_TIME(String eLAPSE_TIME) {
		ELAPSE_TIME = eLAPSE_TIME;
	}
	
}</code>

TranLog.xml
<code>
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd"&gt;
&lt;mapper namespace="TranLog"&gt;
	&lt;select id="selectTranLogList" parameterType="nexcore.sprout.showcase.etc.board.vo.ShowcaseTranLogVO" resultType="nexcore.sprout.showcase.etc.board.vo.ShowcaseTranLogVO"&gt;
	SELECT 	 TOP 10 LOG_DT , 
		SEQ_NO, 
		GLOB_ID , 
		MENU_ID , 
		IPAD , 
		TRN_CD , 
		USER_ID , 
		GROUP_ID , 
		OS_VER , 
		AGENT_VER , 
		SVC_STRN_DTTM , 
		SVC_END_DTTM , 
		RSLT_MSG , 
		RSLT_MSG_CD , 
		WAS_INSTANCE_ID , 
		ELAPSE_TIME 
	FROM NSF_TRAN_LOG
	
	&lt;/select&gt;
&lt;/mapper&gt;
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

