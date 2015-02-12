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
private static final String LOCAL_DOWNLOAD_FOLDER = "C:\\Users\\08158\\Desktop\\temp";//���ÿ� ����� ��ġ. ȣ���� ���������� ����� ��θ� �Ķ���ͷ� ���� �� �ֵ��� �ϴ����� ������.

public void ftpDownload(FTPClient ftpClient, FTPFile ftpFile, String fullPath) throws IOException {//�ٿ�ε� �޼ҵ�
	FTPFile[]ftpFileArr = null;
	FTPFile file = null;
	if (ftpFile.isDirectory()) {
		String folderName = ftpFile.getName();
		ftpFileArr = ftpClient.listFiles(fullPath+"/"+folderName);
		if (ftpFileArr != null) {
			for(int i=0; i<ftpFileArr.length; i++) {
				file = ftpFileArr[i];
				ftpDownload(ftpClient, file, fullPath+"/"+folderName);//���ȣ��
			}
		}
		
	} else if (ftpFile.isFile()) {
		if (ftpFile.getName().indexOf(".sql") != -1 || ftpFile.getName().indexOf(".log") != -1) {
			File localFile = new File(LOCAL_DOWNLOAD_FOLDER , ftpFile.getName());
			OutputStream os  = new FileOutputStream(localFile);
			if (ftpClient.retrieveFile(fullPath, os)) {
				System.out.println(fullPath + " ���ϴٿ�ε� �Ϸ�");//�̷� �α��� ���忡 �°� �����ϼ���.
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
	ftpClient.setControlEncoding("euc-kr"); // �ѱ����ϸ� ������ ����Ʈ ���ڵ��� euc-kr�� �մϴ�
	ftpClient.connect("203.235.211.86"); // FTP������ �����մϴ�. ���忡 �°� �����ϼ���. 

	int reply = ftpClient.getReplyCode(); // �����ڵ尡 �������̸� �����մϴ�
	if (!FTPReply.isPositiveCompletion(reply)) {
		ftpClient.disconnect();
		System.out.println("FTP server refused connection.");
	} else {

		System.out.print(ftpClient.getReplyString()); // ���� �޼����� ���ô�

		ftpClient.setSoTimeout(10000); // ���� Ŀ�ؼ� timeout�� millisecond������ �Է��մϴ�
		ftpClient.login("administrator", "1111"); // �α��� ������� ��й�ȣ�� �Է� �մϴ�
		
		System.out.print(ftpClient.getReplyString()); // ���� �޼����� ���ô�. 230�ڵ尡 �ƴ� ��쿡�� �α��� ���� �޽��� �����ϸ� ��.
		
		FTPFile[] ftpfiles = ftpClient.listFiles("/"); // public ������ ��� ������ list �մϴ�
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