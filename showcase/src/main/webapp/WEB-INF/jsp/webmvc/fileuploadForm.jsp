<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page session="false" %>
<%-- <link href="<c:url value="/resources/form.css" />" rel="stylesheet"  type="text/css" />		 --%>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="forms">Spring FileUpload</div>
<!-- 페이지 타이틀 영역  -->
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>

<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="forms"><font size="5px">멀티파트 리졸버</font></h1> 

<h3><pre>Spring에서는 아파치 Commons 의 FileUpload 라이브러리를 사용하는 CommonsMultipartResolver를 지원한다.
<code>&lt;bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"&gt;
  &lt;property name="maxUploadSize" value="100000000" /&gt;
  &lt;property name="maxInMemorySize" value="100000000" /&gt;
&lt;/bean%&gt;</code>
<p><em>Note : 반드시 id를 multipartResolver로 해야 한다</em></p>
</pre></h3>
<h1 id="forms"><font size="5px">콘트롤러</font></h1> 
<h3><pre>
1.콘트롤러에서는 HttpServletRequest 를 MultipartHttpServletRequest 로 캐스팅한 후에  MultipartFile 오브젝트를 가져와서 사용한다
<code>public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) {
         
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
    MultipartFile multipartFile = multipartRequest.getFile("image");
    ....
}</code>
2.@RequestParam 어노테이션을 사용
<code>@RequestMapping(value="/processUploadControl", method=RequestMethod.POST)
	public @ResponseBody String processUploadControl(@RequestParam("file") MultipartFile file, Model model) throws IOException {
</code>

3.@RequestPart 어노테이션을 사용
<code>@RequestMapping(value="/processUpload", method=RequestMethod.POST)
public @ResponseBody String processUpload(@RequestPart("file") MultipartFile file, Model model) throws IOException {
	File dest = new File (destFilePath, file.getOriginalFilename());
	file.transferTo(dest);
	return "uploaded successfully : " + destFilePath;
}</code>
</pre>
<p><em>스프링 사이트 참조 : <a href="http://docs.spring.io/spring/docs/3.2.15.RELEASE/spring-framework-reference/html/mvc.html#mvc-multipart" target="_blank">http://docs.spring.io/spring/docs/3.2.15.RELEASE/spring-framework-reference/html/mvc.html#mvc-multipart</a></em></p>
</h3>
<!-- comment 영역  -->

<!-- sub title  -->
<h1><font size="5px">Example</font></h1>
<div id="fileuploadContent">
		<h2>File Upload</h2>
		<c:url var="actionUrl" value="/fileupload/processUpload?${_csrf.parameterName}=${_csrf.token}"/>
		<form id="fileuploadForm1" action="${actionUrl}" method="POST" enctype="multipart/form-data" class="cleanform">
			<div class="header">
		  		<c:if test="${not empty message}">
					<div id="message" class="success">${message}</div>	  		
		  		</c:if>
			</div>
			<label for="file">@RequestParam 어노테이션 C:\Showcasefile</label>
			<input id="file" type="file" name="file" />	<div id="fileUploadResult1"></div>
			<p><button type="submit">Upload</button></p>		
		</form>
		<c:url var="actionUrl" value="/fileupload/processUploadControl?${_csrf.parameterName}=${_csrf.token}"/>
		<form id="fileuploadForm2" action="${actionUrl}" method="POST" enctype="multipart/form-data" class="cleanform">
			<div class="header">
		  		<c:if test="${not empty message}">
					<div id="message" class="success">${message}</div>	  		
		  		</c:if>
			</div>
			<label for="file">@RequestPart 어노테이션 : C:\Showcasefile2</label>
			<input id="file" type="file" name="file" />	<div id="fileUploadResult2"></div>
			<p><button type="submit">Upload</button></p>		
		</form>
	
		<script type="text/javascript">
			$(document).ready(function() {
				$('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#file"));
				$("#fileuploadForm1").ajaxForm({ success: function(html) {
						$("#fileUploadResult1").replaceWith(html);
					}
				});
				
				$("#fileuploadForm2").ajaxForm({ success: function(html) {
					$("#fileUploadResult2").replaceWith(html);
				}
			});
			});
		</script>	

<h1 id="download"><font size="5px">File Download</font></h1> 
<h3><pre>콘트롤러에 전달받은 파일명을  파일정보와 함께 DownloadView 객체 생성자에 전달하여 DownloadView를 리턴시키면 된다.
<code>@RequestMapping("/download")
public DownloadView download(@RequestParam("fileName") String fileName,Model model) throws Exception {
    File file = new File("C:\\Showcasefile2",fileName);
    return new DownloadView(file, fileName);
}
</code>
</pre></h3>	
<div class="sample">
		<h2>File Download</h2>  : input에 파일명 입력 
		<c:url var="actionUrl" value="/fileupload/download?${_csrf.parameterName}=${_csrf.token}"/>
		<form id="fileuploadForm2" action="${actionUrl}" method="POST" class="cleanform">
			<div class="header">
		  		<c:if test="${not empty message}">
					<div id="message" class="success">${message}</div>	  		
		  		</c:if>
			</div>
			<label for="file">C:\Showcasefile2</label>
			파일명:<input id="fileName" type="text" name="fileName" />
			<p><button type="submit">Download</button></p>		
		</form>
</div>			
<!-- sample 소스코드 영역  -->
<pre>
<code>package nexcore.sprout.showcase.mvc.fileupload;

import java.io.File;
import java.io.IOException;

import nexcore.sprout.showcase.mvc.extensions.ajax.AjaxUtils;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/fileupload")
public class FileUploadController {

	@ModelAttribute
	public void ajaxAttribute(WebRequest request, Model model) {
		model.addAttribute("ajaxRequest", AjaxUtils.isAjaxRequest(request));
	}

	@RequestMapping(method=RequestMethod.GET)
	public String fileUploadForm() {
		return "webmvc/fileupload";
	}

	@RequestMapping(value="/processUpload", method=RequestMethod.POST)
	public @ResponseBody String processUpload(@RequestPart("file") MultipartFile file, Model model) throws IOException {
		
		String destFilePath = "C:\\Showcasefile";
		File destParentFile = new File(destFilePath);
	    if(!destParentFile.exists()) {//부모경로가 존재하지 않을 경우에는 생성
	        destParentFile.mkdirs();
	    }
	    
		File dest = new File (destFilePath, file.getOriginalFilename());
		file.transferTo(dest);
		return "uploaded successfully : " + destFilePath;
	}
	
	
	@RequestMapping(value="/processUploadControl", method=RequestMethod.POST)
	public @ResponseBody String processUploadControl(@RequestBody MultipartFile file, Model model) throws IOException {
		
		String destFilePath = "C:\\Showcasefile2";
		File destParentFile = new File(destFilePath);
	    if(!destParentFile.exists()) {//부모경로가 존재하지 않을 경우에는 생성
	        destParentFile.mkdirs();
	    }
	    
		File dest = new File (destFilePath, file.getOriginalFilename());
		file.transferTo(dest);
		return "uploaded successfully : " + destFilePath;
	}
	
	
		@RequestMapping("/download")
	    public DownloadView download(@RequestParam("fileName") String fileName,Model model) throws Exception {
	        File file = new File("C:\\Showcasefile2",fileName);
	        return new DownloadView(file, fileName);
	    }
	
	
}
</code>
</pre>



<script type="text/javascript">
$(document).ready(function() {

	/* $("a.textLink").click(function(){
		;
	});
	 */
});	

	
</script>