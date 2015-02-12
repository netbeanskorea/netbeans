package ams.fwk.mail;

import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.core.util.StringUtils;


/**
 * SMTP를 이용하여 메일을 전송하기 위한 IEmkMailSender 구현 클래스
 * 
 * @version 0.1
 * @since 2013-03-06
 *
 */
public class AmsSmtpMailSender implements IAmsMailSender {
	
	/**
     * SSL Socket Factory
     */
    static final String SSL_SOCKET_FACTORY_CLASS = "javax.net.ssl.SSLSocketFactory";

    /**
     * SMTP 서버주소
     */
    protected String     smtpHost   = null;

    /**
     * SMTP 포트
     */
    protected int        smtpPort   = 25;

    /**
     * SMTP 인증 여부
     */
    protected boolean    smtpAuth   = false;

    /**
     * SSL 사용 여부
     */
    protected boolean    smtpSsl    = false;

    /**
     * SMTP 사용자 ID
     */
    protected String     smtpUser   = null;

    /**
     * SMTP 사용자 비밀번호
     */
    protected String     smtpPasswd = null;
    
    /**
     * Default constructor
     */
    public AmsSmtpMailSender() {
		super();
	}
    
    /**
     *<pre>
     * SMTP 서버 주소를 설정한다.
     *</pre>
     *
     * @param smtpHost SMTP 서버 주소
     */
    public void setSmtpHost(String smtpHost) {
        this.smtpHost = smtpHost;
    }
    
    
    /**
     *<pre>
     * SMTP 서버 포트를 설정한다.
     *</pre>
     *
     * @param smtpPort SMTP 서버 포트
     */
    public void setSmtpPort(int smtpPort) {
        this.smtpPort = smtpPort;
    }
    
    
    /**
     *<pre>
     * SMTP 인증이 필요한지 여부를 설정한다.
     *</pre>
     *
     * @param auth SMTP 인증이 필요한지 여부
     */
    public void setSmtpAuth(boolean auth) {
        this.smtpAuth = auth;
    }
    
    
    /**
     *<pre>
     * SSL을 사용할 것인지 여부를 설정한다.
     *</pre>
     *
     * @param useSsl SSL을 사용할 것인지 여부
     */
    public void setSmtpSsl(boolean useSsl) {
        this.smtpSsl = useSsl;
    }
    
    
    /**
     *<pre>
     * SMTP 서버 이용 시 인증이 필요한 경우, 사용자 아이디 값을 설정한다.
     *</pre>
     *
     * @param smtpUser 사용자 아이디
     */
    public void setSmtpUser(String smtpUser) {
        this.smtpUser = smtpUser;
    }
    
    /**
     *<pre>
     * SMTP 서버 이용 시 인증이 필요한 경우, 사용자 비밀번호 값을 설정한다.
     *</pre>
     *
     * @param password 사용자 비밀번호
     */
    public void setSmtpPassword(String password) {
        this.smtpPasswd = password;
    }
	
    /**
     * @see IAmsMailSender.common.mail.IEmkMailSender#sendHtml(java.lang.String, java.util.List, java.util.List, java.util.List, java.lang.String, java.lang.String, java.lang.String)
     */
	public void sendHtml(String from, List to, List cc, List bcc, String subject, String html, String encoding) {
		
		final Properties props = new Properties();
        
        props.put("mail.smtp.host", smtpHost);
        props.put("mail.smtp.port", Integer.toString(smtpPort) );
        props.put("mail.smtp.auth", Boolean.toString(smtpAuth) );
        
        if (smtpSsl) {
            props.put("mail.transport.protocol", "smtps");
        } else {
            props.put("mail.transport.protocol", "smtp");
        }        
        
        Authenticator authenticator = null;
        if (smtpAuth) {
            authenticator = new Authenticator() {
                public PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(smtpUser, smtpPasswd);
                }
            };
        }
        
        if (smtpSsl) {
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.socketFactory.port", Integer.toString(smtpPort) );
            props.put("mail.smtp.socketFactory.class", SSL_SOCKET_FACTORY_CLASS);
            props.put("mail.smtp.socketFactory.fallback", "false");
        }
        
        final Session      session = Session.getInstance(props, authenticator);
        final MimeMessage  message = new MimeMessage(session);
        
        // 메일 작성
        try {
            // 송신자 설정
            message.setFrom(new InternetAddress(from) );
                        
            // 수신자 설정
            if (to != null) {
                for (Iterator it = to.iterator(); it.hasNext();) {
                    String addr = (String)it.next();
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(addr));
                }
            }
            
            // 수신자 목록이 비어 있을 경우 Exception을 발생시킴 !
            if (BaseUtils.isEmpty(message.getRecipients(Message.RecipientType.TO))) {
                throw new RuntimeException("No recipient is set !");
            }
            
            // 참조자 설정
            if (cc != null) {
                for (Iterator it = cc.iterator(); it.hasNext();) {
                    String addr = (String)it.next();
                    message.addRecipient(Message.RecipientType.CC, new InternetAddress(addr));
                }
            }
            
            // 숨은 참조자 설정
            if (bcc != null) {
            	for (Iterator it = bcc.iterator(); it.hasNext();) {
            		String addr = (String)it.next();
            		message.addRecipient(Message.RecipientType.BCC, new InternetAddress(addr));
            	}
            }
            
            // 제목 설정
            if (StringUtils.isEmpty(subject) ) {
                subject = "No subject";
            }
            message.setSubject(subject, encoding);
            
            // 내용 설정
            message.setHeader("Content-Type", "text/html");
            message.setContent(html, "text/html; charset=" + encoding);
            
            // 메시지 저장
            message.saveChanges();
            
        } catch (AddressException e) {
            throw new RuntimeException("Invalid mail address found !", e);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to create mail message !", e);
        }
        
        // 메일 전송
        try {
            Transport.send(message); 
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send mail !", e);
        }
		
	}

}
