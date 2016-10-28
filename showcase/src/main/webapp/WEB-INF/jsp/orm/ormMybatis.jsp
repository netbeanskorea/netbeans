<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="simple">ORM</div>
<!-- 페이지 타이틀 영역  -->


<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="getsimple"><font size="5px">MyBatis 설정</font></h1>
<!-- sub title  -->

<!-- comment 영역  -->
<h3><pre>
1. SqlSessionTemplate 빈 추가 (필수) : SqlSessionFactoryBean 으로 생성한 빈을 생성자 파라메터로 받는다.
<code>&lt;bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate"
	destroy-method="clearCache"&gt;
	&lt;constructor-arg index="0"&gt;
		&lt;bean class="org.mybatis.spring.SqlSessionFactoryBean"&gt;
			&lt;property name="dataSource" ref="dataSourceForSprout" /&gt;
			&lt;property name="configLocation"
				value="classpath:META-INF/persistence/mybatis/mybatis-config-sprout.xml" /&gt;
		&lt;/bean&gt;
	&lt;/constructor-arg&gt;
&lt;/bean&gt;</code>

2. mybatis-config-sprout설정 : dbms.properties 와  mapper 설정을 포함한다.
<code>&lt;?xml version="1.0" encoding="UTF-8" ?&gt;
&lt;!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd"&gt;
&lt;configuration&gt;
	&lt;properties resource="META-INF/properties/dbms.properties" /&gt;
	&lt;settings&gt;
	&lt;setting name="cacheEnabled" value="true"/&gt;            &lt;!-- mybatis cache 사용여부 --&gt;
	&lt;setting name="lazyLoadingEnabled" value="true"/&gt;       &lt;!-- 지연로딩 사용여부 --&gt;
	&lt;setting name="multipleResultSetsEnabled" value="true"/&gt;  &lt;!-- 한 개의 구문에서 여러 개의 ResultSet을 허용할지 여부 --&gt;
	&lt;setting name="useColumnLabel" value="true"/&gt;          &lt;!-- 컬럼명 대신 컬럼 라벨을 사용 --&gt;
	&lt;setting name="useGeneratedKeys" value="false"/&gt;        &lt;!-- 생성키에 대한 JDBC 지원 허용 여부 --&gt;
	
	&lt;!-- mybatis가 컬럼을 필드/프로퍼티에 자동으로 매핑할지와 방법에 대한 명시(PARTIAL은 중첩되지 않은 것들을 매핑 --&gt;
	&lt;setting name="autoMappingBehavior" value="PARTIAL"/&gt;     
	
	&lt;setting name="defaultExecutorType" value="SIMPLE"/&gt;      &lt;!-- 디폴트 Executor 설정(SIMPLE은 특별히 동작하는 것은 업음) --&gt;
	&lt;setting name="defaultStatementTimeout" value="10"/&gt;      &lt;!-- DB 응답 타임아웃 설정 --&gt;
	&lt;setting name="safeRowBoundsEnabled" value="false"/&gt;      &lt;!-- 중첩구문내 RowBound 사용 허용여부 --&gt;
	&lt;setting name="mapUnderscoreToCamelCase" value="false"/&gt;  &lt;!-- 전통적 DB 컴럼명을 JAVA의 Camel표기법으로 자동 매핑 설정 --&gt;
	&lt;setting name="localCacheScope" value="SESSION"/&gt;         &lt;!-- 로컬캐시 사용여부(SESSION: 세션을 사용해서 모든쿼리를 캐시) --&gt;
	
	&lt;!-- mybatis로 넘어오는 parameter가 null인 경우, jdbcType을 Setting --&gt;
	&lt;setting name="jdbcTypeForNull" value="NULL"/&gt;           
	
	&lt;setting name="lazyLoadTriggerMethods" value="equals,clone,hashCode,toString"/&gt;&lt;!-- 지연로딩을 야기하는 객체의 메소드를 명시 --&gt;
	&lt;/settings&gt;
	&lt;mappers&gt;
		&lt;mapper resource="META-INF/persistence/mybatis/${dbms.kind}/TranLog.xml" /&gt;
	&lt;/mappers&gt;
&lt;/configuration&gt;</code>

3. TranLog.xml 설정 : mapper 설정
<code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
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
</pre></h3>

<p><em>자세한 MyBatis 사용법은  다음 링크 사이트를 참고 : 
<a href="http://mybatis.org/mybatis-3/ko/" target="_blank">>> <b>http://mybatis.org/mybatis-3/ko/</b> </a></em>
</p>
<!-- comment 영역  -->
<!-- sub title  -->
<h1><font size="5px">Example</font></h1>
<div class="sample">
	<ul>
		<li>
			<a id="getBoardListFrag" class="textLink" href="<c:url value="/etc/getTranLogList.frag" />"> 로그 조회 :   </a>
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
				   			MvcUtil.showSuccessResponse(text, link); }
		       , error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});
	
});	
</script>

