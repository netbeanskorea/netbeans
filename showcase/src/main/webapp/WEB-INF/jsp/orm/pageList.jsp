<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><spring:message code="board.title.list"/></title>
<script type="text/javascript">
function getBoardList(pageNo, rowPerPage) {
	
	
	var form = document.form;
	form.action = '<%=request.getContextPath()%>/ormBoard/getBoardList.frag?pageNo=' + pageNo + '&rowPerPage=' + rowPerPage;		
	form.submit(); 
// 	//scrollOffsetId = "pager";
<%-- //	goNavigate('<%=request.getContextPath()%>/ormBoard/getBoardList.frag?pageNo=' + pageNo + '&rowPerPage=' + rowPerPage,'.getBoardListFragResponse');" --%>
	
	
}

</script>
</head>
<body>
	<div class="contTitle">
		<h3><spring:message code="board.title.list"/></h3>
	</div>
	<div class="searchArea">
		<form id="form" name="form" action="/" method="POST">
			<div class="table-responsive">
			<table class="tb_search">
				<colgroup>
					<col width="130" />
					<col width="648" />
					<col width="160" />
				</colgroup>
				<tr>
					<th><label for="schWord"><spring:message code="board.label.condition"/></label></th>
					<td>
						<select id="schKind" name="schKind" class="Select">
							<option value="title"><spring:message code="board.label.title"/></option>
							<option value="content"><spring:message code="board.label.content"/></option>
						</select>
						<input id="schWord" name="schWord" type="text"  value="${boardVO.schWord}"/>
					</td>
					<td class="searchBtn">
						<span class="button iconBtn">
							<button id="btnSearch" type="button" onclick="getBoardList(1, ${pager.rowPerPage});">
								<span class="button-icon ui-icon-search-reset"></span><span class="button-text"><spring:message code="board.btn.search"/></span>
							</button> 
						</span>
					</td>
				</tr>
			</table>
			</div>
		</form>
	</div>				
	<div class="btn_common">
		<span class="button iconBtn">
				<a id="btnAdd" type="button" href="<%=request.getContextPath()%>/ormBoard/goBoardEdit.frag">
				<span class="button-icon ui-icon-search-reset"></span>새글작성		
			</a> 
		</span>
	</div>						
	<div class="table-responsive">
  		<table class="table table-bordered table-striped" id="board"  border="1" cellpadding="0" cellspacing="0" width="100%">
	<!-- 	<table id="board"  border="1" cellpadding="0" cellspacing="0" width="100%"> -->
			<tr class="header">
				<th bgcolor="orange" width="10%"><spring:message code="board.label.seq"/></th>
				<th bgcolor="orange" width="40%"><spring:message code="board.label.title"/></th>
				<th bgcolor="orange" width="10%"><spring:message code="board.label.writer"/></th>
				<th bgcolor="orange" width="10%"><spring:message code="board.label.readCnt"/></th>
				<th bgcolor="orange" width="15%"><spring:message code="board.label.regDate"/></th>
				<th bgcolor="orange" width="15%"><spring:message code="board.label.dueDate"/></th>
			</tr>
			<c:choose>
				<c:when test="${empty boardList}">
					<tr><td colspan="6" align="center"><spring:message code="board.label.none"/></td></tr>
				</c:when>
				<c:otherwise>
					<c:forEach var="board" items="${boardList}">
						<c:if test="${!board['seqNo']}">
						 	<tr>
								<td>${board.seqNo}</td>
								<td align="left"><a href="<%=request.getContextPath()%>/board/getBoardInfo.do?seqNo=${board.seqNo}">${board.title}</a></td>
								<td align="center">${board.writer}</td>
								<td>${board.readCnt} </td>
								<td align="center">${board.reqDate}</td>
								<td align="center">${board.dueDate}</td>
							</tr>
						</c:if>
					</c:forEach>
				</c:otherwise>
			</c:choose>		
		</table>
		<div id="pager" class="pager" style="position: relative;">
			<div class="pager-left">
				<span>총 개수: ${pager.totalCnt}</span>
			</div>
			<div class="pager-center">
				<c:forEach var="i" begin="1" end="${pager.endPageNo}">
				<ul class="page-list">
					<li class="page-item page-button ${pager.pageNo == i ? 'current' : ''}">
						<%-- <a id="getBoardListPage${i}" class="page-set" href="" onclick="getBoardList(${i}, ${pager.rowPerPage}); return false;">${i}</a> --%>
						<a id="getBoardListPage${i}" class="page-set" href="<c:url value="/ormBoard/getBoardList.frag?rowPerPage=${pager.rowPerPage}&pageNo=${i}" />"> ${i}</a>
					</li>
				</ul>
				</c:forEach>	
			</div>
		</div>
	</div>
</body>
</html>



<script type="text/javascript">
$(document).ready(function() {

	$("a.page-set").click(function(){
		var link = $("#getBoardListFrag");
		$.ajax({ url: $(this).attr("href"), dataType: "text"
			   , success: function(text) { 
				   			MvcUtil.showSuccessResponse(text, link); }
		       , error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});
	
	
	$("#btnAdd").click(function(){
		var link = $("#getBoardListFrag");
		$.ajax({ url: $(this).attr("href"), dataType: "text"
			   , success: function(text) { 
				   			MvcUtil.showSuccessResponse(text, link); }
		       , error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, link); }});
		return false;
	});

	
});	

</script>