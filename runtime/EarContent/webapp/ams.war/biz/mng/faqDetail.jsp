<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="nexcore.framework.core.util.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*" %>
<%@ page import="org.jdom.*" %>  
<%@include file="../common/common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>FAQ 상세조회</title>
<script language="JavaScript" type="text/javascript" src="<%=request.getContextPath()%>/Resource/lib/ext/richtext.js"></script>
<script type="text/javascript">
function submitForm() {
	//make sure hidden and iframe values are in sync before submitting form
	updateRTE('rte1'); //use this when syncing only 1 rich text editor ("rtel" is name of editor)
	//updateRTEs(); //uncomment and call this line instead if there are multiple rich text editors inside the form
	alert("Submitted value: "+document.faqDetailForm.rte1.value) //alert submitted value
	return true; //Set to false to disable form submission, for easy debugging.
}

function goFaqList() {
	var frm = document.faqDetailForm;
	frm.action = "faqList.jsp";
	frm.method = "post";
	frm.submit();
}

function faqUpdate() {
	updateRTE('rte1');
	var frm = document.faqDetailForm;
	var rteValue = document.faqDetailForm.rte1.value;
	
	document.faqDetailForm.rte1.value = replaceAll(replaceAll(rteValue,"\r\n",""),"'", "&quot;");
	
	//alert(document.faqDetailForm.rte1.value);
	frm.method = "post";
	frm.action = "faqUpdate.jsp";
	frm.submit();
}

function replaceAll(temp, org, rep) {
	return temp.split(org).join(rep);
}
//Usage: initRTE(imagesPath, includesPath, cssFile)
initRTE("<%=request.getContextPath()%>/Resource/images/rte_images/", "<%=request.getContextPath()%>/Resource/css/", "rte.css");
	
</script>

</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="../common/TopMenu.jsp"%>
		<!-- //headerArea-->
		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="../common/LeftMenu.jsp"%>
			<!-- //leftArea -->
			<div id="contents">
				<div id="content">
				<form name="faqDetailForm">
				<table width="100%">
					<tr height="20px">
					</tr>
				</table>
				<table width="100%"  border="0">
					<tr>
						<td style="font: 맑은고딕;font-size: 14px; font-weight: bold;">타입 :
							<select name="type">
								<option value="INFO">INFO</option>
								<option value="ERROR">ERROR</option>
							</select>
						</td>
					</tr>
					<tr>
						<td style="font: 맑은고딕;font-size: 14px; font-weight: bold;">제목 : 
							<input type="text" name="title" value="" size="150" />
						</td>
					</tr>
					<tr>
						<td >
						<script type="text/javascript">
							writeRichText('rte1', 'DB로부터 가지고온 글 내용', 980, 460, true, false);//writeRichText(rte, html, width, height, buttons, readOnly)
						</script>
						</td>
					</tr>
					<tr>
						<td>
							<table width="97%" >
								<tr>
									<td width="90%"></td>
									<td width="5%" align="center" style="border-right:1px dotted gray; font-size:14px ;font-weight: bold; font-family: 맑은고딕; line-height: 14px; color: blue" >
										<a href="javascript:goFaqList();" style="font-size:14px; font:맑은고딕;color:black; text-decoration: none;">목록</a>
									</td>
									<td width="5%" align="center" style="font-size:14px ;font-weight: bold; font-family: 맑은고딕; line-height: 14px; color: blue" >
										<a href="javascript:faqUpdate();" style="font-size:14px; font:맑은고딕;color:black; text-decoration: none;">등록</a>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>