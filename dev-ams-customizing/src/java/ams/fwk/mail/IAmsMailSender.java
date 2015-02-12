package ams.fwk.mail;

import java.util.List;

/**
 * 메일 전송 클라이언트를 위한 인터페이스
 * 
 * @version 0.1
 * @since 2013-03-06
 *
 */
public interface IAmsMailSender {

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
	
}
