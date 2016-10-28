<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- CSS -->
<link href="<c:url value="/resources/css/common.css"/>"  rel="stylesheet"/> 
<link href="<c:url value="/resources/css/rainbow.css"/>" rel="stylesheet"/> 
<link href="<c:url value="/resources/css/default.css"/>" rel="stylesheet"/> 
<link href="<c:url value="/resources/form.css"/>"  rel="stylesheet"/> 
<link href="<c:url value="/resources/jqueryui/1.8/themes/base/jquery.ui.core.css" />" rel="stylesheet" type="text/css"/>
<link href="<c:url value="/resources/jqueryui/1.8/themes/base/jquery.ui.theme.css" />" rel="stylesheet" type="text/css"/>


<!-- JQuery -->
<script type="text/javascript" src="<c:url value="/resources/js/lib/jquery/jquery-1.11.3.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/js/lib/jquery/jquery-ui-1.11.4.custom.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/lib/jquery/jquery.form.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/lib/jquery/jquery.fileupload.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/lib/jquery/jquery.iframe-transport.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/lib/highlight/highlight.pack.js"/>"></script>

<script type="text/javascript" src="<c:url value="/resources/jqueryui/1.8/jquery.ui.core.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/jqueryui/1.8/jquery.ui.widget.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/jqueryui/1.8/jquery.ui.tabs.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/json2.js" />"></script>

<script>
	MvcUtil = {};
	MvcUtil.showSuccessResponse = function (text, element) {
		MvcUtil.showResponse("success", text, element);
	};
	MvcUtil.showErrorResponse = function showErrorResponse(text, element) {
		MvcUtil.showResponse("error", text, element);
	};
	MvcUtil.showResponse = function(type, text, element) {
		var responseElementId = element.attr("id") + "Response";
		var responseElement = $("#" + responseElementId);
		if (responseElement.length == 0) {
			responseElement = $('<span id="' + responseElementId + '" class="' + type + '" style="display:none">' + text + '</span>').insertAfter(element);
		} else {
			responseElement.replaceWith('<span id="' + responseElementId + '" class="' + type + '" style="display:none">' + text + '</span>');
			responseElement = $("#" + responseElementId);
		}
		responseElement.fadeIn("slow");
	};
	MvcUtil.xmlencode = function(xml) {
		//for IE 
		var text;
		if (window.ActiveXObject) {
		    text = xml.xml;
		 }
		// for Mozilla, Firefox, Opera, etc.
		else {
		   text = (new XMLSerializer()).serializeToString(xml);
		}			
		    return text.replace(/\&/g,'&'+'amp;').replace(/</g,'&'+'lt;')
	        .replace(/>/g,'&'+'gt;').replace(/\'/g,'&'+'apos;').replace(/\"/g,'&'+'quot;');
	};
</script>	

 
 
<script type="text/javascript">
     var scrollOffsetId = '' ;
	 $(document).ready(function(){
		 $(".sidemenu li:has(ul)").click(function(event){
				if ( $(this).hasClass("active") ){
					//$(this).removeClass("active");
					//$(this).children("ul").slideUp(200);					
				}
				else{					
					$(".sidemenu li:has(ul)").each(function() {
						if ( $(this).hasClass("active") ){
							$(this).removeClass("active");
							//$(this).children("ul").slideUp(200);
						}
					});
					$(this).addClass("active");
					//$(this).children("ul").slideDown(400);
				}
		 });
		 
		 $(".sidemenu li").click(function(event){
			   if ( $(this).hasClass("active") ){}
			   else{					
					$(".sidemenu li").each(function() {
						if ( $(this).hasClass("active") ){
							$(this).removeClass("active");
						}
					});
					$(this).addClass("active");
				}
		 });

		 $(".sidemenu li ul li").click(function(event){
			 $(".sidemenu li ul li").each(function() {
				if ( $(this).hasClass("active") ){
					$(this).removeClass("active");	
				}
			}); 
			
			 $(this).addClass("active");
			 
			 scrollOffsetId = $('a',this).attr("href");
			$(this).parent().prev().trigger("click");
			
		});
	});	
</script>
 
 
 <script type="text/javascript">
function goNavigate(viewUrl,targetEle,data, callback){
	
	var target = "#contents";
	
	if(typeof targetEle != 'undefined' && targetEle != null) {
		target = targetEle;
	}
//	alert(target +":" + viewUrl);
	
	$(target).load(viewUrl,data,function(){
		//alert(scrollOffsetId);
		if(scrollOffsetId != ''){
			if($(scrollOffsetId).length > 0){
				$('html, body').animate({ scrollTop: $(scrollOffsetId).offset().top }, 1000);
			}
			scrollOffsetId = '';
		}
		if(typeof callback != 'undefined' && callback != null) {
			callback();
		}
		
	});
	
}




// 코드 하이라이트 처리
$(document).ready(function() {
	  $('pre code').each(function(i, block) {
	    hljs.highlightBlock(block);
	  });
	});
</script>