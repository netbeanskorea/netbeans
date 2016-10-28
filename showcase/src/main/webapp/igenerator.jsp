<meta  http-equiv="X-UA-Compatible" content="IE=8" />
<%@page import="nexcore.sprout.showcase.db.IGenerator"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%
	String tName = request.getParameter("TABLE_NAME") == null ? "":request.getParameter("TABLE_NAME");
	String insert = "";
	String select = "";
	String update = "";
	String delete = "";
	String resultMap = "";
	String tblName = "";
	String whereSql ="";

	if(!"".equals(tName) ) {
		
		IGenerator sg = new IGenerator(tName.toUpperCase(),"BOC_DS");
		insert = sg.generateInsertScript();
		select = sg.generateSelectScript();
		update = sg.generateUpdateScript();
		delete = sg.generateDeleteScript();
		resultMap = sg.generateResultMap();
		whereSql = sg.generateWhereScript();
		//Map<String, String> TABLE_INFORMATION = sg.getTableInfo();
		tblName = sg.getTableName(tName.toUpperCase() );
	}
		
	
%>	

<form method="post">
	테이블명 : <input type="text" name="TABLE_NAME" value="<%=tName%>"/>
	<input type="hidden" name="_csrf" value="${_csrf.token}"/>
	<input type="hidden" name="_csrf_header" value="${_csrf.headerName}"/>
	<input type="submit" value="SQL-MAP 생성"/> 
</form>
<textarea cols="150" rows="40">
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE sqlMap     PUBLIC "-//ibatis.apache.org//DTD SQL Map 2.0//EN"     "http://ibatis.apache.org/dtd/sql-map-2.dtd">
<sqlMap>
<sql id="<%=tblName%>Where">
<%=whereSql%> 
</sql>

<insert id="insert<%=tblName%>" parameterClass="java.util.HashMap">
   /* insert<%=tblName%> */
<%=insert%> 
</insert>

<select id="get<%=tblName%>Count"  resultClass="java.lang.Integer" parameterClass="java.util.HashMap">
  /* get<%=tblName%>Count */
SELECT COUNT(*) CNT from  <%=tName.toUpperCase() %> where 1=1
<include refid="<%=tblName%>Where"/>
</select>
   
<select id="get<%=tblName%>List" resultClass="java.util.HashMap" parameterClass="java.util.HashMap">
  /* get<%=tblName%>List */
<%=select%>
<include refid="<%=tblName%>Where"/>
</select>

<%if(!"".equals(delete)) {%>	   
<update id="update<%=tblName%>" parameterClass="java.util.HashMap">
	/* update<%=tblName%> */
<%=update%>
</update>
<% } %>

<%if(!"".equals(delete)) {%>		   
<delete id="delete<%=tblName%>" parameterClass="java.util.HashMap">
	/* delete<%=tblName%> */
<%=delete%>
</delete>
<% } %>
<select id="get<%=tblName%>ListForPaging" resultClass="java.util.HashMap" parameterClass="java.util.HashMap">
/* get<%=tblName%>ListForPaging  */
<include refid="pagingPreSQL"/>
<%=select%>	
<include refid="<%=tblName%>Where"/>
<include refid="pagingPostSQL"/>
</select>

</sqlMap>
</textarea>	



