<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ page session="false" %>

<div class="success">
	<h3>Path variable 'account': ${account}</h3>
	<h3>Query param 'date': ${param.date}</h3>
	<br/>
	<h3><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/redirect.frag');"> Back</a></h3>
</div>
