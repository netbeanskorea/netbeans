package ams.fwk.mail;

import java.util.List;
import java.util.Map;

import nexcore.framework.core.log.LogManager;
import nexcore.framework.core.parameter.IConfigurationManager;
import nexcore.framework.core.prototype.AbsFwkService;
import nexcore.framework.core.template.ITemplateEngine;
import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.core.util.StringUtils;

import org.apache.commons.logging.Log;

/**
 * SMTP를 이용하여 메일을 전송하는 메일 컴포넌트 구현부
 * 
 * @version 0.1
 * @since 2012-11-12
 *
 */
public class MailManager extends AbsFwkService implements IMailManager {
	
	/**
     * 로거
     */
	private Log logger                                = LogManager.getFwkLog();
	
	/**
     * 메인 전송을 위한 객체
     */
    protected IAmsMailSender mailSender                  = null;
    
    /**
     * IConfigurationManager 인스턴스
     */
    protected IConfigurationManager configManager     = null;
    
    /**
     * ITemplateEngine 인스턴스
     */
    protected ITemplateEngine templateEngine          = null;
    
    /**
     * 템플릿 파일 위치
     */
    protected String templateLocation                 = "config/template/";
    
    /**
     * Default constructor
     */
    public MailManager() {
    	super();
    }
    
    /**
     * Configuration 인스턴스 설정
     * @param configManager
     */
    public void setConfigurationManager(IConfigurationManager configManager) {
        this.configManager = configManager;
    }
    
    /**
     * Template 인스턴스 설정
     * @param engine
     */
    public void setTemplateEngine(ITemplateEngine engine) {
        this.templateEngine = engine;
    }
    
    /**
     * 템플릿 파일 위치 설정
     * @param templateLocation
     */
    public void setTemplateLocation(String templateLocation) {
    	this.templateLocation = templateLocation;
    }
    
    @Override
    public void init() {
    	AmsSmtpMailSender smtpMailSender = new AmsSmtpMailSender();
    	
    	String smtpHost = configManager.getConfig("online.email.smtp.host");
    	String smtpPort = configManager.getConfig("online.email.smtp.port");
    	String smtpAuth = configManager.getConfig("online.email.smtp.auth");
    	String smtpSsl = configManager.getConfig("online.email.smtp.ssl");
    	String smtpUser = configManager.getConfig("online.email.smtp.user");
    	String smtpPassword = configManager.getConfig("online.email.smtp.password");
    	
    	smtpMailSender.setSmtpHost(smtpHost);
    	if (StringUtils.isNotEmpty(smtpPort) ) {
    	    smtpMailSender.setSmtpPort(Integer.parseInt(smtpPort));
    	}
    	smtpMailSender.setSmtpAuth(Boolean.valueOf(smtpAuth));
    	smtpMailSender.setSmtpSsl(Boolean.parseBoolean(smtpSsl));
    	smtpMailSender.setSmtpUser(smtpUser);
    	smtpMailSender.setSmtpPassword(smtpPassword);
    	
    	this.mailSender = smtpMailSender;
    	
    	super.init();
    }
    
    /**
	 * HTML 형식의 메일을 발송한다.
	 * 
	 * @param to        수신 메일 주소
	 * @param cc        참조 메일 주소
	 * @param bcc       숨은 참조 메일 주소
	 * @param subject   메일 제목
	 * @param html      메일 내용 (HTML 형식)
	 */
    @Override
    public void sendHtml(List to, List cc, List bcc, String subject, String html) {
    	String from = configManager.getConfig("online.email.smtp.defaultsender");
    	this.sendHtml(from, to, cc, bcc, subject, html);
    	
    }
    
    /**
	 * HTML 형식의 메일을 발송한다.
	 * 
	 * @param from      송신 메일 주소
	 * @param to        수신 메일 주소
	 * @param cc        참조 메일 주소
	 * @param bcc       숨은 참조 메일 주소
	 * @param subject   메일 제목
	 * @param html      메일 내용 (HTML 형식)
	 */
    @Override
    public void sendHtml(String from, List to, List cc, List bcc, String subject,
    		String html) {
    	this.sendHtml(from, to, cc, bcc, subject, html, BaseUtils.getDefaultEncoding());
    	
    }

    /**
	 * HTML 형식의 메일을 발송한다.
	 * 
	 * @param from      송신 메일 주소
	 * @param to        수신 메일 주소
	 * @param cc        참조 메일 주소
	 * @param bcc       숨은 참조 메일 주소
	 * @param subject   메일 제목
	 * @param html      메일 내용 (HTML 형식)
	 * @param encoding  메일 제목/내용의 인코딩 방식 (예:UTF-8)
	 */
	@Override
	public void sendHtml(String from, List to, List cc, List bcc, String subject,
			String html, String encoding) {
		this.sendHtml(from, to, cc, bcc, subject, html, encoding, false, null, null);

	}

	/**
	 * HTML 형식의 메일을 발송한다.
	 * 
	 * @param from          송신 메일 주소
	 * @param to            수신 메일 주소
	 * @param cc            참조 메일 주소
	 * @param bcc           숨은 참조 메일 주소
	 * @param subject       메일 제목
	 * @param html          메일 내용 (HTML 형식)
	 * @param encoding      메일 제목/내용의 인코딩 방식 (예:UTF-8)
	 * @param useTemplate   템플릿 사용 여부
	 * @param params        템플릿을 채우기 위한 params
	 * @param templateFile  템플릿 파일명
	 */
	@Override
	public void sendHtml(String from, List to, List cc, List bcc, String subject,
			String html, String encoding, boolean useTemplate, Map params, String templateFile) {
		if (logger.isDebugEnabled()) {
			logger.debug("MailManager sendHtml");
		}
		
		if (StringUtils.isEmpty(from)) {
			from = configManager.getConfig("online.email.smtp.defaultsender");
		}
		
		if (StringUtils.isEmpty(encoding)) {
			encoding = BaseUtils.getDefaultEncoding();
		}
		
		// Template 사용인 경우 처리
		if (useTemplate) {
			if (StringUtils.isEmpty(templateFile)) {
				templateFile = this.templateLocation + "default.html";
			} else {
				templateFile = this.templateLocation + templateFile;
			}
			
			html = templateEngine.translateToString(templateFile, params);
		}
		
		// Send Email using IEmkMailSender component
		mailSender.sendHtml(from, to, cc, bcc, subject, html, encoding);

	}
	
	@Override
	public void destroy() {
		mailSender        = null;
		super.destroy();
	}

}
