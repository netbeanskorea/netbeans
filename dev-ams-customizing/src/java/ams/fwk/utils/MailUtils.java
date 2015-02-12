package ams.fwk.utils;

import java.util.List;
import java.util.Map;

import ams.fwk.mail.IMailManager;

public class MailUtils {

	
	public static void sendMail(  String from, List to, List cc, List bcc, 
														String subject, String html, String encoding ) {
		getMailManager().sendHtml(from, to, cc, bcc, subject, html, encoding, false, null, "");
	}
	public static void sendMail(	String from, List to, List cc, List bcc, 
														String subject,  String encoding, 
														boolean useTemplate, Map params, String templateFile) {
		getMailManager().sendHtml(from, to, cc, bcc, subject, "", encoding, useTemplate, params, templateFile);
	}
	
	private static IMailManager getMailManager() {
		IMailManager mm = ComponentLocator.getMailManager();
		return mm;
	}
}
