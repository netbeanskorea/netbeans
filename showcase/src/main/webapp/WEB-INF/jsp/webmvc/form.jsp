<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page session="false" %>
<%-- <link href="<c:url value="/resources/form.css" />" rel="stylesheet"  type="text/css" />		 --%>
<!-- 페이지 타이틀 영역  -->
<div class="titleArea" id="forms">Form</div>
<!-- 페이지 타이틀 영역  -->

<!-- 페이지 Content  start -->
<div class="page-content">

<!-- sub title  -->
<h1 id="forms"><font size="5px">Spring Form</font></h1> 

<h3><pre>Spring form 태그를 사용하려면 다음 디렉티브를 JSP 페이지 상단에 추가해야 한다.
<pre><code>&lt;%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %&gt;</code></pre>
</pre>
</h3>
<!-- comment 영역  -->

<!-- sub title  -->
<h1><font size="5px">Example</font></h1>
<div id="formsContent">
		<form:form id="form" method="post" modelAttribute="formBean" cssClass="cleanform">
			<div class="header">
		  		<c:if test="${not empty message}">
					<div id="message" class="success">${message}</div>	
		  		</c:if>
		  		<s:bind path="*">
		  			<c:if test="${status.error}">
				  		<div id="message" class="error">Form has errors</div>
		  			</c:if>
		  		</s:bind>
			</div>
		  	<fieldset>
		  		<legend>Personal Info</legend>
		  		<form:label path="name">
		  			Name <form:errors path="name" cssClass="error" />
		 		</form:label>
		  		<form:input path="name" />
	
		  		<form:label path="age">
		  			Age <form:errors path="age" cssClass="error" />
		 		</form:label>
		  		<form:input path="age" />
		  		
		  		<form:label path="birthDate">
		  			Birth Date (in form yyyy-mm-dd) <form:errors path="birthDate" cssClass="error" />
		 		</form:label>
		  		<form:input path="birthDate" />
		  		 
		  		<form:label path="phone">
		  			Phone (in form (###) ###-####) <form:errors path="phone" cssClass="error" />
		  		</form:label>
		  		<form:input path="phone" />
	
		  		<form:label path="currency">
		  			Currency (in form $#.##) <form:errors path="currency" cssClass="error" />
		  		</form:label>
		  		<form:input path="currency" />
	
		  		<form:label path="percent">
		  			Percentage (in form ##%) <form:errors path="percent" cssClass="error" />
		  		</form:label>
		  		<form:input path="percent" />
	
		  	</fieldset>
	
			<fieldset>
				<legend>Inquiry</legend>
				<form:label path="inquiry">
					Type (select one)
				</form:label>
				<form:select path="inquiry">
					<form:option value="comment">Comment</form:option>
					<form:option value="feedback">Feedback</form:option>
					<form:option value="suggestion">Suggestion</form:option>
				</form:select>
				
		  		<form:label path="inquiryDetails">
		  			Details
		  		</form:label>
		  		<form:textarea path="inquiryDetails" />
		  	</fieldset>
	
			<fieldset class="checkbox">
				<legend>Request Additional Info</legend>
				<label><form:checkbox path="additionalInfo[mvc]" value="true" />on Spring MVC</label>
				<label><form:checkbox path="additionalInfo[java]" value="true" />on Java (4-ever)</label>				
			</fieldset>
		  		  	
			<fieldset class="radio">
				<legend>Subscribe to Newsletter?</legend>
				<label><form:radiobutton path="subscribeNewsletter" value="true" />Yes</label>
				<label><form:radiobutton path="subscribeNewsletter" value="false" /> No</label>
			</fieldset>
	
			<p><button type="submit">Submit</button></p>
		</form:form>
		
<script type="text/javascript">
			$(document).ready(function() {
				$("#form").submit(function() {  
					$.post($(this).attr("action"), $(this).serialize(), function(html) {
						$("#formsContent").replaceWith(html);
						if($(".error").length == 1){
							$('html, body').animate({ scrollTop:$(".error").offset().top},500);
						}else if($(".error").length > 1){
							$('html, body').animate({ scrollTop:$(".error:first").offset().top},500);	
						}
						
					});
					return false;  
				});			
				
			
			});
		</script>	
	</div>
<!-- sample 소스코드 영역  -->
<pre>
<code>package nexcore.sprout.showcase.mvc.form;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;

import javax.validation.constraints.Min;
import javax.validation.constraints.Past;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.format.annotation.NumberFormat.Style;

import nexcore.sprout.showcase.mvc.convert.MaskFormat;

public class FormBean {
	
	@NotEmpty
	private String name;
	
	@Min(21)
	private int age;

	@DateTimeFormat(iso=ISO.DATE)
	@Past
	private Date birthDate;

	@MaskFormat("(###) ###-####")
	private String phone;

	@NumberFormat(pattern="$###,###.00")
	private BigDecimal currency;

	@NumberFormat(style=Style.PERCENT)
	private BigDecimal percent;
	
	private InquiryType inquiry;
	
	private String inquiryDetails;
	
	private boolean subscribeNewsletter;
	
	private Map<String, String> additionalInfo;

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public BigDecimal getCurrency() {
		return currency;
	}

	public void setCurrency(BigDecimal currency) {
		this.currency = currency;
	}

	public BigDecimal getPercent() {
		return percent;
	}

	public void setPercent(BigDecimal percent) {
		this.percent = percent;
	}

	public InquiryType getInquiry() {
		return inquiry;
	}

	public void setInquiry(InquiryType inquiry) {
		this.inquiry = inquiry;
	}

	public String getInquiryDetails() {
		return inquiryDetails;
	}

	public void setInquiryDetails(String inquiryDetails) {
		this.inquiryDetails = inquiryDetails;
	}

	public boolean isSubscribeNewsletter() {
		return subscribeNewsletter;
	}

	public void setSubscribeNewsletter(boolean subscribeNewsletter) {
		this.subscribeNewsletter = subscribeNewsletter;
	}

	public Map<String, String> getAdditionalInfo() {
		return additionalInfo;
	}

	public void setAdditionalInfo(Map<String, String> additionalInfo) {
		this.additionalInfo = additionalInfo;
	}

	public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("properties name=");
        if (name != null) {
        	sb.append("'").append(name).append("', ");
        } else {
        	sb.append(name).append(", ");
        }
        sb.append("age=").append(age).append(", ");
        sb.append("birthDate=").append(birthDate).append(", ");
        sb.append("phone=");
        if (phone != null) {
        	sb.append("'").append(phone).append("', ");
        } else {
        	sb.append(phone).append(", ");
        }
        sb.append("currency=").append(currency).append(", ");
        sb.append("percent=").append(percent).append(", ");
        sb.append("inquiry=").append(inquiry).append(", ");
        sb.append("inquiryDetails=");
        if (inquiryDetails != null) {
        	sb.append("'").append(inquiryDetails).append("', ");
        } else {
        	sb.append(inquiryDetails).append(", ");
        }
        sb.append("subscribeNewsletter=").append(subscribeNewsletter).append(", ");
        sb.append("additionalInfo=").append(additionalInfo);
        return sb.toString();
    }
}
</code>
<code class="java">package nexcore.sprout.showcase.mvc.form;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import nexcore.sprout.showcase.mvc.extensions.ajax.AjaxUtils;

@Controller
@RequestMapping("/form")
@SessionAttributes("formBean")
public class FormController {

	// Invoked on every request

	@ModelAttribute
	public void ajaxAttribute(WebRequest request, Model model) {
		model.addAttribute("ajaxRequest", AjaxUtils.isAjaxRequest(request));
	}

	// Invoked initially to create the "form" attribute
	// Once created the "form" attribute comes from the HTTP session (see @SessionAttributes)

	@ModelAttribute("formBean")
	public FormBean createFormBean() {
		return new FormBean();
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public String form() {
		return "webmvc/form";
	}

	@RequestMapping(method=RequestMethod.POST)
	public String processSubmit(@Valid FormBean formBean, BindingResult result, 
								@ModelAttribute("ajaxRequest") boolean ajaxRequest, 
								Model model, RedirectAttributes redirectAttrs) {
		if (result.hasErrors()) {
			return "webmvc/form";
		}
		// Typically you would save to a db and clear the "form" attribute from the session 
		// via SessionStatus.setCompleted(). For the demo we leave it in the session.
		String message = "Form submitted successfully.  Bound " + formBean;
		// Success response handling
		if (ajaxRequest) {
			// prepare model for rendering success message in this request
			model.addAttribute("message", message);
			return "webmvc/form";
		} else {
			// store a success message for rendering on the next request after redirect
			// redirect back to the form to render the success message along with newly bound values
			redirectAttrs.addFlashAttribute("message", message);
			return "redirect:/webmvc/form";			
		}
	}
	
}
</code>

<code>&lt;form:form id="form" method="post" modelAttribute="formBean" cssClass="cleanform"&gt;
	&lt;div class="header"&gt;
  		&lt;c:if test="&#36;{not empty message}"&gt;
			&lt;div id="message" class="success"&gt;&#36;{message}&lt;/div&gt;	
  		&lt;/c:if&gt;
  		&lt;s:bind path="*"&gt;
  			&lt;c:if test="&#36;{status.error}"&gt;
		  		&lt;div id="message" class="error"&gt;Form has errors&lt;/div&gt;
  			&lt;/c:if&gt;
  		&lt;/s:bind&gt;
	&lt;/div&gt;
  	&lt;fieldset&gt;
  		&lt;legend&gt;Personal Info&lt;/legend&gt;
  		&lt;form:label path="name"&gt;
  			Name &lt;form:errors path="name" cssClass="error" /&gt;
 		&lt;/form:label&gt;
  		&lt;form:input path="name" /&gt;

  		&lt;form:label path="age"&gt;
  			Age &lt;form:errors path="age" cssClass="error" /&gt;
 		&lt;/form:label&gt;
  		&lt;form:input path="age" /&gt;
  		
  		&lt;form:label path="birthDate"&gt;
  			Birth Date (in form yyyy-mm-dd) &lt;form:errors path="birthDate" cssClass="error" /&gt;
 		&lt;/form:label&gt;
  		&lt;form:input path="birthDate" /&gt;
  		 
  		&lt;form:label path="phone"&gt;
  			Phone (in form (###) ###-####) &lt;form:errors path="phone" cssClass="error" /&gt;
  		&lt;/form:label&gt;
  		&lt;form:input path="phone" /&gt;

  		&lt;form:label path="currency"&gt;
  			Currency (in form &#36;#.##) &lt;form:errors path="currency" cssClass="error" /&gt;
  		&lt;/form:label&gt;
  		&lt;form:input path="currency" /&gt;

  		&lt;form:label path="percent"&gt;
  			Percentage (in form ##%) &lt;form:errors path="percent" cssClass="error" /&gt;
  		&lt;/form:label&gt;
  		&lt;form:input path="percent" /&gt;

  	&lt;/fieldset&gt;

	&lt;fieldset&gt;
		&lt;legend&gt;Inquiry&lt;/legend&gt;
		&lt;form:label path="inquiry"&gt;
			Type (select one)
		&lt;/form:label&gt;
		&lt;form:select path="inquiry"&gt;
			&lt;form:option value="comment"&gt;Comment&lt;/form:option&gt;
			&lt;form:option value="feedback"&gt;Feedback&lt;/form:option&gt;
			&lt;form:option value="suggestion"&gt;Suggestion&lt;/form:option&gt;
		&lt;/form:select&gt;
		
  		&lt;form:label path="inquiryDetails"&gt;
  			Details
  		&lt;/form:label&gt;
  		&lt;form:textarea path="inquiryDetails" /&gt;
  	&lt;/fieldset&gt;

	&lt;fieldset class="checkbox"&gt;
		&lt;legend&gt;Request Additional Info&lt;/legend&gt;
		&lt;label&gt;&lt;form:checkbox path="additionalInfo[mvc]" value="true" /&gt;on Spring MVC&lt;/label&gt;
		&lt;label&gt;&lt;form:checkbox path="additionalInfo[java]" value="true" /&gt;on Java (4-ever)&lt;/label&gt;				
	&lt;/fieldset&gt;
  		  	
	&lt;fieldset class="radio"&gt;
		&lt;legend&gt;Subscribe to Newsletter?&lt;/legend&gt;
		&lt;label&gt;&lt;form:radiobutton path="subscribeNewsletter" value="true" /&gt;Yes&lt;/label&gt;
		&lt;label&gt;&lt;form:radiobutton path="subscribeNewsletter" value="false" /&gt; No&lt;/label&gt;
	&lt;/fieldset&gt;

	&lt;p&gt;&lt;button type="submit"&gt;Submit&lt;/button&gt;&lt;/p&gt;
&lt;/form:form&gt;</code>
</pre>
