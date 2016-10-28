<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="lnb_title">
	<h1>ResourceBundle</h1>
</div>
<ul class="sidemenu"> 
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/resourcebundle/resourcebundle.frag');">Message/Label</a></li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/resourcebundle/i18n.frag');">국제화(i18n)</a>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/resourcebundle/codesource.frag');">코드</a></li>
</ul>