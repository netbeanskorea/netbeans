package ams.fwk.sevlet;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import nexcore.framework.core.ServiceConstants;
import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.exception.FwkRuntimeException;
import nexcore.framework.core.exception.SystemRuntimeException;
import nexcore.framework.core.ioc.ComponentRegistry;
import nexcore.framework.core.log.LogManager;
import nexcore.framework.core.parameter.IConfigurationManager;
import nexcore.framework.core.util.StringUtils;
import nexcore.framework.online.channel.core.IApplicationController;
import nexcore.framework.online.channel.util.WebUtils;
import nexcore.framework.online.channel.web.helper.MultipartRequestWrapper;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.logging.Log;

import ams.fwk.constants.Constants;
import ams.fwk.file.FileResource;
import ams.fwk.file.FileResourceManager;
import ams.fwk.file.IAmsFileUploadManager;
import ams.fwk.utils.BaseUtils;


/**
 * NEXCORE FWK와 STAR UI간의 파일 업/다운로드 서블릿
 * 향후  DF 사원인력이 개발한다는 전제하에 최대한 복잡하지 않게 만듦(command 따로 안태움)
 * 2013.09.02
 * @author 박세일
 *
 */
public class NexcoreStarFileServlet extends HttpServlet {

	private static final long serialVersionUID = -394123515080095653L;
	private static final String   UPLOAD_DIRECTORY        = "file.upload.root.folder";	
    private static final String   DOWNLOAD_BUFFER_SIZE    = "file.download.buffer.size";
    private final static String APP_CONTROLLER_ID = "ApplicationControllerId";
    private final static String AUTH_EXT_FILENAME_LIST = "AuthorizedExtentionFileNameList";
    private Log logger = LogManager.getFwkLog();
    protected IApplicationController controller;
    private String[] authorizedExtFileNmArr;
    
    public void init(ServletConfig servletConfig) throws ServletException {
    	super.init(servletConfig);
    	String applicationControllerId =getServletConfig().getInitParameter(APP_CONTROLLER_ID);
    	controller = (IApplicationController) BaseUtils.lookupWebComponent(applicationControllerId, getServletContext());
    	
    	String extFileNames = getServletConfig().getInitParameter(AUTH_EXT_FILENAME_LIST);
    	authorizedExtFileNmArr = StringUtils.tokenizeToStringArray(extFileNames, ",");
    }
    
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doProcess(req, res);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doProcess(req, res);
	}
	
	private void doProcess(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		MultipartRequestWrapper wrapper = null;
		String cmd = "";
		try {
			wrapper = new MultipartRequestWrapper(req, FileResourceManager.getFileUploadRootPath(), FileResourceManager.getFileUploadMaxSize(), "utf-8");
			cmd = wrapper.getParameter("cmd");
			
			if ("download".equals(cmd)) {
				fileDownload(req, res, wrapper);
			} else if("delete".equals(cmd)) {
				fileDelete(req, res, wrapper);
			} else if("getFileInfo".equals(cmd)){
				fileInfoSearch(req, res);
			} else if("imgDirectDownload".equals(cmd)){
				picImgDirectDownload(req,res);
			} else {
				fileUpload(req, res, wrapper);
			}
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		} catch (FileUploadException e) {
			e.printStackTrace();
			throw new ServletException(e);
		}
	}
	
	private void fileInfoSearch(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String fileSeqNo = req.getParameter(Constants.FILE_SEQ_NO);
		IAmsFileUploadManager fum = (IAmsFileUploadManager) ComponentRegistry.lookup(ServiceConstants.FILEUPLOAD);
		List<Map> fileList =   fum.getUploads(fileSeqNo, null, null);
		
		StringBuffer result = new StringBuffer();
		int i=0;
		result.append("[");
		for(Map fileMap : fileList) {
			if (i > 0) result.append(",");
			
			result.append("{");
			result.append("\"SEQ_NO\":\""+ fileMap.get("SEQ_NO") + "\"");
			result.append(",\"FILE_ID\":\""+fileMap.get("FILE_ID") + "\"");
			result.append(",\"TYPE_ID\":\""+fileMap.get("TYPE_ID") + "\"");
			result.append(",\"FILE_NAME\":\""+fileMap.get("FILE_NAME") + "\"");
			result.append(",\"FILE_PATH\":\""+StringUtils.replaceAll((String)fileMap.get("FILE_PATH"), "\\", "/") + "\"");
			result.append(",\"FILE_SIZE\":\""+fileMap.get("FILE_SIZE") + "\"");
			result.append("}");
			i++;
		}
		result.append("]");
		
		res.setContentType("application/json;charset=UTF-8");
        res.setHeader("Pragma", "no-cache");            // Http1.0
        res.setHeader("Cache-Control", "no-cache");     // Http1.1
        res.setDateHeader("Expires", 0);
		PrintWriter out = res.getWriter();
		out.print(result.toString());
	}
	
	private void fileDownload(HttpServletRequest req, HttpServletResponse res, MultipartRequestWrapper wrapper) throws IOException  {
		String fileId = req.getParameter(Constants.FILE_ID);
		String seqNo = req.getParameter(Constants.FILE_SEQ_NO);

		if (fileId == null)
			throw new SystemRuntimeException("fileId is needed !");

		IAmsFileUploadManager fileUploadManager = (IAmsFileUploadManager) ComponentRegistry
				.lookup(ServiceConstants.FILEUPLOAD);
		Map info = fileUploadManager.getUploadedFileInfo(seqNo, fileId);

		String fileName = (String) info.get("FILE_NAME");
		String fullFilePath = null;
		String filePath = (String) info.get("FILE_PATH");
		filePath = ((filePath.startsWith("/")) ? "" : "/") + filePath;
		fullFilePath = getConfiguration(UPLOAD_DIRECTORY) + filePath;

		IDataSet responseData = new DataSet();
		try {
			downloadFileByNameAndPath(req, res, fileName, fullFilePath);
		} catch (IOException e) {
			if (logger.isErrorEnabled()) {
				logger.error("Exception Caughted "
						+ "during downloading file '" + fullFilePath + "'.", e);
			}
			throw e;
		}
	}
	
	private void fileDelete(HttpServletRequest req, HttpServletResponse res, MultipartRequestWrapper wrapper) throws IOException {
		String id = wrapper.getParameter(Constants.FILE_ID);
		String filePath = wrapper.getParameter(Constants.FILE_PATH);
		
		FileResourceManager.removeUploadFile(filePath);
		
		//FileResourceManager.removeUploadFiles(files, applCd);
		PrintWriter out = res.getWriter();
		int delCnt = BaseUtils.deleteUploadedFile(id);
		String delOk = delCnt==1?"Y":"N";
		StringBuffer result = new StringBuffer();
		result.append("[");
		result.append("{");
		result.append("\"DEL_YN\":\"" + delOk + "\"");
		result.append("}");
		result.append("]");
		
		out.print(result.toString());
	}
	
	private void fileUpload(HttpServletRequest req, HttpServletResponse res, MultipartRequestWrapper wrapper) throws IOException {
		String applCd = wrapper.getParameter("program_id"); // Application code
		String[] typeId = wrapper.getParameterValues("type_id"); // Type Id
		res.setContentType("text/html;charset=UTF-8"); 
		PrintWriter out = res.getWriter();
		List<FileItem> files = wrapper.getFiles();
		
		
		try {
			//파일 확장자 체크로직 추가(2014.02.13 by PSI)
			checkExtFileName(files);
			List<FileResource> resources = FileResourceManager.storeUploadFile(files, applCd);
			StringBuffer result = new StringBuffer();
			result.append("[");
	
			int i = 0;
	
			if (resources != null) {
				for (FileResource fr : resources) {
					if (i > 0)
						result.append(",");
	
					result.append("{");
					result.append("\"program_id\":\"" + applCd + "\"");
					result.append(",\"type_id\":\"" + typeId[i] + "\"");
					result.append(",\"file_id\":\"" + fr.getStoredName() + "\"");
					result.append(",\"file_name\":\"" + fr.getOriginalName() + "\"");
					result.append(",\"file_path\":\"" + StringEscapeUtils.escapeJavaScript(fr.getStoredFullName()) + "\"");
					result.append(",\"file_size\":" + fr.getSize());
					result.append("}");
	
					i++;
				}
			}
			result.append("]");
			out.print(result.toString());
			//out.flush();
			//return;
		} catch (RuntimeException e) {
			out.print("<script>alert('허가된 파일확장자명이 아닙니다.');</script>");
			e.printStackTrace();
		}
	}
	
	
	/**
	 * UI로부터 받은 파일의 확장자를 체크하는 로직(2013.02.13 by PSI)
	 * @param files
	 * @throws ServletException
	 */
	private void checkExtFileName(List<FileItem>files) throws RuntimeException {
		String fileName= "";
		int lastIndex = 0;
		boolean authorizedFileNameFlag = false; 
		for(FileItem fi : files) {
			fileName = fi.getName();
			lastIndex = fileName.lastIndexOf(".")+1;
			for(String extName :authorizedExtFileNmArr) {
				if(extName.equals(fileName.substring(lastIndex).toLowerCase())) {//대소문자 구분없이 확장자 체크를 하도록 함. 
					authorizedFileNameFlag = true;
					break;
				}
			}
			if(!authorizedFileNameFlag) {
				throw new RuntimeException("This file's extension name isn't authorized");
			}
		}
	}
	
	private void picImgDirectDownload(HttpServletRequest request, HttpServletResponse response) throws IOException {
		IConfigurationManager configurationManager = (IConfigurationManager) ComponentRegistry.lookup(ServiceConstants.CONFIGURATION);
		String filePath = (String)request.getParameter("filePath");
		//String fileId = (String)request.getParameter("fileId");
		String fileName = (String) request.getParameter("fileName");
		filePath = ((filePath.startsWith("/")) ? "" : "/") + filePath;
		String fullPath = configurationManager.getConfig("file.upload.root.folder") + filePath;
		int downloadBufferSize = new Integer(configurationManager.getConfig("file.download.buffer.size")).intValue();

		IDataSet responseData = new DataSet();
		File file = new File(fullPath);

		if (!file.exists()) {
		    throw new FwkRuntimeException("The " + file.getName()  + " file does not exist.");
		}

		BufferedInputStream in = null;
		try {
		    in = new BufferedInputStream(new FileInputStream(file));
		    WebUtils.presetForDownload(request, response, fileName);

		    byte[] buffer = new byte[downloadBufferSize];
		    int num = 0;
		    ServletOutputStream sout = response.getOutputStream();
		    while ((num = in.read(buffer)) != -1) {
		    	sout.write(buffer, 0, num);
		    	sout.flush();
		    }
		} catch (Exception e) {
			
		} finally {
		    if (in != null)
		        in.close();
		}
	}
	
    private String getConfiguration(String key) {
        return BaseUtils.getConfiguration(key);
    }
    
	protected void downloadFileByNameAndPath(HttpServletRequest req, HttpServletResponse res, String fileName, String filePath) throws IOException {
		File file = new File(filePath);

		if (!file.exists()) {
			throw new FwkRuntimeException("The " + file.getName()
					+ " file does not exist.");
		}

		BufferedInputStream in = null;
		try {
			in = new BufferedInputStream(new FileInputStream(file));
			WebUtils.presetForDownload(req, res, fileName);

			byte[] buffer = new byte[getDownloadBufferSize()];
			int num = 0;
			ServletOutputStream out = res.getOutputStream();
			while ((num = in.read(buffer)) != -1) {
				out.write(buffer, 0, num);
				out.flush();
			}
		} finally {
			if (in != null)
				in.close();
		}
	}

	private int getDownloadBufferSize() {
		int downloadBufferSize = new Integer(getConfiguration(DOWNLOAD_BUFFER_SIZE)).intValue();
		return (downloadBufferSize < 1) ? 4096 : downloadBufferSize;
	}
}
