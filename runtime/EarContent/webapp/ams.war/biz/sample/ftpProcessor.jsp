<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FileOutputStream" %>
<%@ page import="java.io.IOException" %>
<%@ page import="java.io.OutputStream" %>
<%@ page import="org.apache.commons.net.ftp.FTPClient" %>
<%@ page import="org.apache.commons.net.ftp.FTPFile" %>
<%@ page import="org.apache.commons.net.ftp.FTPReply" %>

<%!
private static final String LOCAL_DOWNLOAD_FOLDER = "C:\\Users\\08158\\Desktop\\temp";//로컬에 저장될 위치. 호출한 페이지에서 저장될 경로를 파라미터로 받을 수 있도록 하는편이 좋을듯.

public void ftpDownload(FTPClient ftpClient, FTPFile ftpFile, String fullPath) throws IOException {//다운로드 메소드
	FTPFile[]ftpFileArr = null;
	FTPFile file = null;
	if (ftpFile.isDirectory()) {
		String folderName = ftpFile.getName();
		ftpFileArr = ftpClient.listFiles(fullPath+"/"+folderName);
		if (ftpFileArr != null) {
			for(int i=0; i<ftpFileArr.length; i++) {
				file = ftpFileArr[i];
				ftpDownload(ftpClient, file, fullPath+"/"+folderName);//재귀호출
			}
		}
		
	} else if (ftpFile.isFile()) {
		if (ftpFile.getName().indexOf(".sql") != -1 || ftpFile.getName().indexOf(".log") != -1) {
			File localFile = new File(LOCAL_DOWNLOAD_FOLDER , ftpFile.getName());
			OutputStream os  = new FileOutputStream(localFile);
			if (ftpClient.retrieveFile(fullPath, os)) {
				System.out.println(fullPath + " 파일다운로드 완료");//이런 로깅은 현장에 맞게 변경하세요.
			}
			os.close();
		}
	}
}
%>
<%
FTPClient ftpClient = null;

try {
	ftpClient = new FTPClient();
	ftpClient.setControlEncoding("euc-kr"); // 한글파일명 때문에 디폴트 인코딩을 euc-kr로 합니다
	ftpClient.connect("203.235.211.86"); // FTP서버에 접속합니다. 현장에 맞게 변경하세요. 

	int reply = ftpClient.getReplyCode(); // 응답코드가 비정상이면 종료합니다
	if (!FTPReply.isPositiveCompletion(reply)) {
		ftpClient.disconnect();
		System.out.println("FTP server refused connection.");
	} else {

		System.out.print(ftpClient.getReplyString()); // 응답 메세지를 찍어봅시다

		ftpClient.setSoTimeout(10000); // 현재 커넥션 timeout을 millisecond값으로 입력합니다
		ftpClient.login("administrator", "1111"); // 로그인 유저명과 비밀번호를 입력 합니다
		
		System.out.print(ftpClient.getReplyString()); // 응답 메세지를 찍어봅시다. 230코드가 아닐 경우에는 로그인 실패 메시지 구성하면 됨.
		
		FTPFile[] ftpfiles = ftpClient.listFiles("/"); // public 폴더의 모든 파일을 list 합니다
		if (ftpfiles != null) {
			for (int i = 0; i < ftpfiles.length; i++) {
				FTPFile file = ftpfiles[i];
//				System.out.println(file.getName()); // file.getName(), file.getSize()
				ftpDownload(ftpClient, file, "");
			}
		}
		ftpClient.logout();
	}
} catch (Exception e) {
	System.out.println(e);
	e.printStackTrace();
} finally {
	if (ftpClient != null && ftpClient.isConnected()) {
		try {
			ftpClient.disconnect();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}
}
%>