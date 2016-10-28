<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<div class="success">
	<h3>javaBean.foo: ${javaBean.foo}</h3>
	<h3>javaBean.fruit: ${javaBean.fruit}</h3>
	<br/>
	<h3><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/views.frag');"> Back</a></h3>
</div>
