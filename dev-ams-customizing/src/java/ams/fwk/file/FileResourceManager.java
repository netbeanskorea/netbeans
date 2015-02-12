package ams.fwk.file;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.core.util.UUID;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.lang.SystemUtils;

/**
 * 파일 자원 관리
 */
public final class FileResourceManager {

	private final static long DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024; //10MB
	private final static int DEFAULT_DOWNLOAD_BUFFER_SIZE = 8192;

	private static String fileUploadEncoding;
	private static String fileUploadRootPath;
	private static String fileUploadTempPath;
	private static long fileUploadMaxSize;
	//	private static long fileUploadMaxSizeEach;
	private static int fileDownloadBufferSize;

	/**
	 * 업로드 파일 저장소
	 * 
	 * @return 업로드 파일 저장소
	 */
	public static String getFileUploadRootPath() {
		if (fileUploadRootPath == null) {
			fileUploadRootPath = BaseUtils.getConfiguration("file.upload.root.folder");
		}
		return fileUploadRootPath;
	}

	/**
	 * 업로드 파일 임시 저장소
	 * 
	 * @return 업로드 파일 임시 저장소
	 */
	public static String getFileUploadTempPath() {
		if (fileUploadTempPath == null) {
			fileUploadTempPath = BaseUtils.getConfiguration("file.upload.temp.folder");
		}
		return fileUploadTempPath;
	}

	/**
	 * 업로드 파일 최대 사이즈
	 */
	public static long getFileUploadMaxSize() {
		if (fileUploadMaxSize < 1) {
			long size = getLong(BaseUtils.getConfiguration("file.upload.max.size"));
			fileUploadMaxSize = size == -1 ? DEFAULT_MAX_FILE_SIZE : size;
		}
		return fileUploadMaxSize;
	}

	/**
	 * 파일 다운로드 버퍼 사이즈
	 */
	public static int getFileDownloadBufferSize() {
		if (fileDownloadBufferSize < 1) {
			int size = getInt(BaseUtils.getConfiguration("file.download.buffer.size"));
			fileDownloadBufferSize = size == -1 ? DEFAULT_DOWNLOAD_BUFFER_SIZE : size;
		}
		return fileDownloadBufferSize;
	}

	/**
	 * 파일 업로드 인코딩
	 */
	public static String getFileUploadEncoding() {
		if (fileUploadEncoding == null) {
			fileUploadEncoding = BaseUtils.getConfiguration("file.upload.encoding");
		}
		if (fileUploadEncoding == null) {
			fileUploadEncoding = BaseUtils.getDefaultEncoding();
		}
		return fileUploadEncoding;
	}

	/**
	 * 업로드된 파일을 영구저장소에 저장한다.
	 * 
	 * @param files
	 *            업로드파일목록
	 * @param applCd
	 *            어플리케이션 구분(CBM, CUS등) 어플리케이션 구분(CBM, CUS등)
	 * @return 저장된 파일정보
	 */
	public static List<FileResource> storeUploadFile(List<FileItem> files, String applCd) {
		List<FileResource> resources = null;
		if (files != null) {
			resources = new ArrayList<FileResource>();
			String uploadFilePath = getUploadFilePath(applCd);
			String uploadSubFolderPath = getUploadSubFolderPath(applCd);
			
			File file = null;

			if (files != null) {
				String isWrite = "FAIL";
				for (FileItem fi : files) {					
					file = createFile(makeUploadFileFullName(uploadFilePath));
					try {
						fi.write(file);
						isWrite = "SUCCESS";
					} catch (Exception e) {
						if (file != null && file.exists()) file.delete();
						isWrite = "FAIL";
					} finally {
						resources.add(createFileResource(fi, file, isWrite, uploadSubFolderPath));
					}
				}
			}
		}

		return resources;
	}

	/**
	 * 업로드된 모든 파일을 삭제한다.
	 * 
	 * @param resources
	 *            업로드 파일 목록
	 * @param applCd
	 *            어플리케이션 구분
	 */
	public static void removeForceUploadFile(List<FileResource> resources, String applCd) {
		if (resources != null) {
			File file = null;
			for (FileResource fr : resources) {
				if (fr instanceof FileResource) {
					file = new File(((FileResource) fr).getStoredFullName());
				} else {
					try {
						file = lookupUploadFile(fr.getStoredName(), applCd);
					} catch (Exception e) {
					}
				}
				if (file != null && file.exists()) {
					file.delete();
				}
			}
		}
	}
	
	/**
	 * 업로드된 모든 파일을 삭제한다.
	 * 
	 * @param files
	 *            업로드 파일 목록
	 * @param applCd
	 *            어플리케이션 구분
	 */
	public static void removeUploadFiles(List<FileItem> files, String applCd) {
		if (files != null) {
			File file = null;

			if (files != null) {
				for (FileItem fi : files) {
					file = lookupUploadFile(fi.getName(), applCd);
					if (file != null && file.exists()) {
						file.delete();
					}
				}
			}
		}
	}

	/**
	 * 업로드 파일의 InputStream 조회
	 * 
	 * @param uploadFileId
	 *            업로드 파일 아이디
	 * @param applCd
	 *            어플리케이션 구분
	 * @return 업로드 파일의 InputStream
	 */
	public static InputStream getUploadFileInputStream(String uploadFileId, String applCd) {
		File file = lookupUploadFile(uploadFileId, applCd);
		if (!file.exists()) {
			throw new RuntimeException("File(" + uploadFileId + ") not found.");
		}

		FileInputStream fis = null;
		try {
			fis = new FileInputStream(file);
		} catch (FileNotFoundException e) {
			throw new RuntimeException("File(" + uploadFileId + ") not found.");
		}
		return fis;
	}

	/**
	 * 업로드 파일 삭제
	 * 
	 * @param uploadFileId
	 *            업로드 파일 아이디
	 * @param applCd
	 *            어플리케이션 구분
	 * @return 삭제여부
	 */
	public static boolean removeUploadFile(String uploadFileId, String applCd) {
		File file = lookupUploadFile(uploadFileId, applCd);
		if (!file.exists()) {
			throw new RuntimeException("File(" + uploadFileId + ") not found.");
		}
		return file.delete();
	}

	public static boolean removeUploadFile(String filePath) {
		String fileFullPath = lookupUploadFileFullName(filePath); 
		File file = new File(fileFullPath);
		if(!file.exists()) {
			throw new RuntimeException("File[ path="+filePath+"] is not exist");
		}
		return file.delete();
	}
	
	
	/**
	 * 업로드 파일 조회
	 * 
	 * @param uploadFileId
	 *            업로드 파일 아이디
	 * @param applCd
	 *            어플리케이션 구분
	 * @return 업로드 파일 객체
	 */
	public static File lookupUploadFile(String uploadFileId, String applCd) {
		String fileName = lookupUploadFileFullName(uploadFileId, applCd);
		return new File(fileName);
	}

	
	/**
	 * 물리파일의 디렉토리를 체크하여 디렉토리 생성
	 * 
	 * @param file
	 *            물리파일
	 */
	private static boolean mkdirs(File file) {
		if (!file.exists()) {
			File parent = file.getParentFile();
			if (parent != null && !parent.exists()) {
				return parent.mkdirs();
			}
		}
		return true;
	}
	
	/**
	 * 영구 저장소에 저장할 파일명 생성
	 * 
	 * @param storedPath
	 *                    저장소
	 * @return            영구 저장소에 저장할 파일명
	 */
	private static String makeUploadFileFullName(String storedPath) {
		StringBuilder sb = new StringBuilder();
		
		sb.append(storedPath);
		if (!storedPath.endsWith("/") && !storedPath.endsWith("\\")) {
			sb.append(SystemUtils.FILE_SEPARATOR);
		}
		
		sb.append(UUID.randomUUID().toString());
		
		return sb.toString();
	}

	/**
	 * 물리파일 생성
	 * 
	 * @param fileFullName
	 *            file path
	 * @return 생성된 물리파일
	 */
	private static File createFile(String fileFullName) {
		File file = new File(fileFullName);
		mkdirs(file);
		return file;
	}

	/**
	 * 영구 저장소에 저장된 업로드 파일 정보 생성
	 * 
	 * @param fi
	 *            업로드 파일 정보
	 * @param storedFile
	 *            서버에 저장된 물리파일
	 * @param resultInfo
	 *            업로드 성공/실패 여부 [SUCCESS/FAIL]
	 * @param subFolderPath
	 *            업무 구분 코드에 따른 Sub 폴더
	 * @return 영구 저장소에 저장된 업로드 파일 정보
	 */
	private static FileResource createFileResource(FileItem fi, File storedFile, String resultInfo, String subFolderPath) {
		FileResource fr = new FileResource();
		fr.setFieldName(fi.getFieldName());
		fr.setStoredName(storedFile.getName());
		fr.setStoredFullName(subFolderPath + storedFile.getName());
		fr.setOriginalFullName(fi.getName());
		fr.setSize(fi.getSize());
		fr.setContentType(fi.getContentType());
		fr.setResultInfo(resultInfo);
		return fr;
	}
	
	/**
	 * 업무 구분 코드에 따른 Sub 폴더 반환
	 * 
	 * @param applCd
	 *            업무 구분 코드
	 * @return Sub 폴더
	 */
	private static String getUploadSubFolderPath(String applCd) {
		StringBuilder sb = new StringBuilder();		
		// Application code 추가
		sb.append(applCd);
		sb.append(SystemUtils.FILE_SEPARATOR);
		
		return sb.toString();
	}
	
	/**
	 * 업무 구분 코드에 따른 영구 저장소 반환
	 * 
	 * @param applCd
	 *            업무 구분 코드
	 * @return 영구 저장소
	 */
	private static String getUploadFilePath(String applCd) {
		StringBuilder sb = new StringBuilder();
		String uploadRootPath = getFileUploadRootPath();
		sb.append(uploadRootPath);
		if (!uploadRootPath.endsWith("/") && !uploadRootPath.endsWith("\\")) {
			sb.append(SystemUtils.FILE_SEPARATOR);
		}
		
		// Application code 추가
		sb.append(applCd);
		sb.append(SystemUtils.FILE_SEPARATOR);
		
		return sb.toString();
	}

	/**
	 * 업로드 파일 전체 경로
	 * 
	 * @param uploadFileId
	 *            업로드 파일 아이디
	 * @param applCd
	 *            어플리케이션 구분
	 * @return 업로드 파일 전체 경로
	 */
	public static String lookupUploadFileFullName(String uploadFileId, String applCd) {
		String uploadRootPath = getFileUploadRootPath();
		if (!uploadRootPath.endsWith("/") && !uploadRootPath.endsWith("\\")) {
			uploadRootPath += SystemUtils.FILE_SEPARATOR;
		}		

		StringBuilder sb = new StringBuilder();
		sb.append(uploadRootPath);
		if (!uploadRootPath.endsWith("/") && !uploadRootPath.endsWith("\\")) {
			sb.append(SystemUtils.FILE_SEPARATOR);
		}
		
		// Application code 추가
		sb.append(applCd);
		sb.append(SystemUtils.FILE_SEPARATOR);
		    
		sb.append(uploadFileId);
		return sb.toString();
	}

	/**
	 * 업로드된 파일에 대한 삭제(파일이 존재하는 위치에 대한 full path를 직접입력받는 경우)
	 * @param filePath
	 * @return
	 */
	public static String lookupUploadFileFullName(String filePath) {
		String uploadRootPath = getFileUploadRootPath();
		if (!uploadRootPath.endsWith("/") && !uploadRootPath.endsWith("\\")) {
			uploadRootPath += SystemUtils.FILE_SEPARATOR;
		}		
		StringBuilder sb = new StringBuilder();
		sb.append(uploadRootPath);
		if (!uploadRootPath.endsWith("/") && !uploadRootPath.endsWith("\\")) {
			sb.append(SystemUtils.FILE_SEPARATOR);
		}
		sb.append(filePath);
		return sb.toString();
	}
	
	private static long getLong(String str) {
		if (str != null) {
			String s = str.toUpperCase();
			long multiplier = 1L;
			int index;
			if ((index = s.indexOf("KB")) != -1) {
				multiplier = 1024L;
				s = s.substring(0, index);
			} else if ((index = s.indexOf("MB")) != -1) {
				multiplier = 1048576L;
				s = s.substring(0, index);
			} else if ((index = s.indexOf("GB")) != -1) {
				multiplier = 1073741824L;
				s = s.substring(0, index);
			}
			try {
				return Long.valueOf(s).longValue() * multiplier;
			} catch (NumberFormatException e) {
			}
		}
		return -1;
		//		return DEFAULT_MAX_FILE_SIZE;
	}

	private static int getInt(String str) {
		if (str != null) {
			String s = str.toUpperCase();
			int multiplier = 1;
			int index;
			if ((index = s.indexOf("KB")) != -1) {
				multiplier = 1024;
				s = s.substring(0, index);
			} else if ((index = s.indexOf("MB")) != -1) {
				multiplier = 1048576;
				s = s.substring(0, index);
			} else if ((index = s.indexOf("GB")) != -1) {
				multiplier = 1073741824;
				s = s.substring(0, index);
			}
			try {
				return Integer.valueOf(s).intValue() * multiplier;
			} catch (NumberFormatException e) {
			}
		}
		return -1;
		//		return DEFAULT_MAX_FILE_SIZE;
	}

	public static void main(String[] args) throws IOException {
		//		Date currentDate = new Date();
		//		System.out.println(FileResourceManager.getDailyPermanenceStoredPath(tranId, currentDate));
		//
		//		System.out.println(FileResourceManager.makePermanenceStoredFileFullName(FileResourceManager.getDailyPermanenceStoredPath(tranId, currentDate), FileResourceManager.getDailyFilePrefix(tranId, currentDate)));
		//
		//		System.out.println(FileResourceManager.lookupFileFullName("EX_20080529_ozVbDmv6EeA29p"));
		//		System.out.println(FileResourceManager.lookupFileFullName("EXER_20080529_ozVbDmv6EeA29p"));
		//
		//		File file = new File("C:\\Temp\\v3init.log");
		//		System.out.println(file.getAbsolutePath());
		//		System.out.println(file.getCanonicalPath());
		//		System.out.println(file.getName());

	}
}