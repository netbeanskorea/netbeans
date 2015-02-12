package ams.fwk.file;

import javax.servlet.http.HttpServletRequest;

import nexcore.framework.core.upload.internal.DefaultUploadHandler;

import org.apache.commons.lang.SystemUtils;

/**
 * 업로드 할 파일 저장 경로를 결정하는 구현 클래스
 * 
 * @version 0.1
 * @since 2012-12-04
 *
 */
public class AmsFileUploadHandler extends DefaultUploadHandler {
	
	private final static String UPLOAD_PATH_SUFFIX = "zip";
	private final static String UPLOAD_PATH_CRDT_SUFFIX = "zip_crdt";

	@Override
	public String getDirectoryPath(HttpServletRequest request) {
		System.out.println("Request info : " + request.getParameterMap());
		String uploadFilePath = getUploadFilePath(request.getParameter("program_id"));
		return uploadFilePath;
	}
	
	/**
	 * 업무 구분 코드에 따른 영구 저장소 반환
	 * 
	 * @param applCd
	 *            업무 구분 코드
	 * @return 영구 저장소
	 */
	private String getUploadFilePath(String applCd) {
		StringBuilder sb = new StringBuilder();
		sb.append(SystemUtils.FILE_SEPARATOR);
		
		// Suffix 추가
		sb.append(getUploadSuffix(applCd));		
		sb.append(SystemUtils.FILE_SEPARATOR);
		
		// Application code 추가
		sb.append(applCd);
		
		return sb.toString();
	}
	
	/**
	 * 저장소 접두어 반환
	 * 
	 * @param applCd
	 *            업무 구분 코드
	 * @return
	 */
	private static String getUploadSuffix(String applCd) {
		String suffix = UPLOAD_PATH_SUFFIX;
		if ("CrdtReport".equals(applCd)) {
			suffix = UPLOAD_PATH_CRDT_SUFFIX;
		}
		return suffix;
	}
	
}
