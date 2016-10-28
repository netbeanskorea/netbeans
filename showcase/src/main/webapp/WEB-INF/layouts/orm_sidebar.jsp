<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="lnb_title">
	<h1>ORM</h1>
</div>
<ul class="sidemenu"> 
	<li>
		<a href="#simple" onClick="goNavigate('<%=request.getContextPath()%>/orm/ormMybatis.frag');">Mybatis</a>
	</li>	
	<li>
		<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/orm/ormDatasource.frag');">DataSource 설정</a>
	</li>
	<li>
		<a href="#"  onClick="goNavigate('<%=request.getContextPath()%>/orm/ormPaging.frag');">Paging</a>
			<!-- <ul style="display:block;">				
				<li><a href="#">Page</a></li>
				<li><a href="#">Scrolling</a></li>
			</ul>  -->
	</li>
	<li>
		<a href="#" onClick="goNavigate('<%=request.getContextPath()%>/orm/ormTransactions.frag');">Transaction</a>
		<!-- <ul style="display:block;">				
			<li><a href="#">XA</a></li>
			<li><a href="#">NonXA</a></li>
			<li><a href="#">Propagation관련</a></li>
		</ul>  -->
	</li>
</ul>

