<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="lnb_title">
	<h1>WEB-MVC</h1>
</div>
<ul class="sidemenu"> 
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/simple.frag');">Simple</a></li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/mapping.frag');">Request Mapping</a>
		<ul style="display:block;">				
			<li><a href="#urlMapping">URL Mapping</a></li>
			<li><a href="#params">String[] params(): 요청 파라미터</a></li>
			<li><a href="#headers">String[] headers : HTTP 헤더</a></li>
			<li><a href="#MediaType">MediaType 분기</a></li>
		</ul> 
	</li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/data.frag');">Request Data</a>
		<ul style="display:block;">				
			<li><a href="#RequestParam">@RequestParam : 파라미터변수</a></li>
			<li><a href="#PathVariables">@PathVariables: 패스변수</a></li>
			<li><a href="#MatrixVariable">@MatrixVariable: Matrix URI</a></li>
			<li><a href="#requestBody">@RequestBody</a></li>
		</ul> 
	</li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/responses.frag');">Response Writing</a></li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/messageconverters.frag');">Message Converters</a>
		<ul style="display:block;">				
			<li><a href="#StringHttpMessageConverter">StringHttpMessageConverter</a></li>
			<li><a href="#FormHttpMessageConverter">FormHttpMessageConverter</a></li>
			<li><a href="#Jaxb2RootElementHttpMessageConverter">Jaxb2RootElementHttpMessageConverter</a></li>
			<li><a href="#MappingJacksonHttpMessageConverter">MappingJacksonHttpMessageConverter</a></li>
		<!-- 	<li><a href="#AtomFeedHttpMessageConverter">AtomFeedHttpMessageConverter</a></li>
			<li><a href="#RssChannelHttpMessageConverter">RssChannelHttpMessageConverter</a></li> -->
		</ul> 
	</li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/views.frag');">View Rendering</a></li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/convert.frag');">Type Conversion</a></li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/validation.frag');">Validation</a></li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/form.frag');">Form</a></li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/fileuploadForm.frag');">File Upload / Download</a></li>
	<!-- <li><a href="#exceptions">Exception Handling</a></li> -->
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/redirect.frag');">Redirecting</a></li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/async.frag');">Async Requests</a></li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/interceptor.frag');">Interceptor</a>
		<ul style="display:block;">				
			<li><a href="#HandlerInterceptor">HandlerInterceptor</a></li>
			<li><a href="#mvcinterceptor">mvc:interceptors</a></li>
		</ul> 
	</li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/tiles.frag');">Tiles</a></li>
	<li><a href="#" onClick="goNavigate('<%=request.getContextPath()%>/webmvc/taglib.frag');">Spring Taglib</a>
		<ul style="display:block;">				
			<li><a href="#getpeoperties">Properties 사용</a></li>
			<li><a href="#getobject">오브젝트의 사용</a></li>
		</ul> 
	</li>
</ul>

