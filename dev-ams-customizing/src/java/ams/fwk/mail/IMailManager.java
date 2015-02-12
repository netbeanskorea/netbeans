package ams.fwk.mail;

import java.util.List;
import java.util.Map;

/**
 * SMTP를 이용하여 메일을 전송하는 메일 컴포넌트
 * 
 * @version 0.1
 * @since 2012-11-12
 *
 */
public interface IMailManager {
	
	/**
	 * HTML 형식의 메일을 발송한다.
	 * 
	 * @param to        수신 메일 주소
	 * @param cc        참조 메일 주소
	 * @param bcc       숨은 참조 메일 주소
	 * @param subject   메일 제목
	 * @param html      메일 내용 (HTML 형식)
	 */
	void sendHtml(List to, List cc, List bcc, String subject, String html);
	
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
	void sendHtml(String from, List to, List cc, List bcc, String subject, String html);

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
	void sendHtml(String from, List to, List cc, List bcc, String subject, String html, String encoding);
	
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
	void sendHtml(String from, List to, List cc, List bcc, String subject, String html, String encoding, boolean useTemplate, Map params, String templateFile);
	
}
