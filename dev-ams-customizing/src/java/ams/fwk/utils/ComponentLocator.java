package ams.fwk.utils;

import nexcore.framework.core.ServiceConstants;
import nexcore.framework.core.ioc.ComponentRegistry;
import ams.fwk.file.IAmsFileUploadManager;
import ams.fwk.mail.IMailManager;

/**
 * 프로젝트에서 정의한 공통 모듈(ex : 메일 컴포넌트)을 가져온다.
 * Spring bean 환경설정파일인 <code>nexcore-customized.xml</code>에 등록된 bean 대상으로 하며,
 * 모든 method는 <code>static</code> method로 제공한다.
 * 
 * @version 0.1
 * @since 2012-11-12
 *
 */
public class ComponentLocator {
	
	private ComponentLocator() {
		// 객체 생성 방지
	}
	
	public static IMailManager getMailManager() {		
		return (IMailManager) ComponentRegistry.lookup("ams.common.IMailManager");
	}
	
	public static IAmsFileUploadManager getFileUploadManager() {
		return (IAmsFileUploadManager) ComponentRegistry.lookup(ServiceConstants.FILEUPLOAD);
	}

}
