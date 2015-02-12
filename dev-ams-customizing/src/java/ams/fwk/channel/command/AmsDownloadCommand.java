/*
 * Copyright (c) 2007 SK C&C. All rights reserved.
 * 
 * This software is the confidential and proprietary information of SK C&C. You
 * shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into with SK
 * C&C.
 */

package ams.fwk.channel.command;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import nexcore.framework.core.ServiceConstants;
import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.exception.BaseException;
import nexcore.framework.core.exception.BaseRuntimeException;
import nexcore.framework.core.exception.FwkRuntimeException;
import nexcore.framework.core.exception.SystemRuntimeException;
import nexcore.framework.core.ioc.ComponentRegistry;
import nexcore.framework.core.parameter.IConfigurationManager;
import nexcore.framework.online.channel.core.ICommandViewMap;
import nexcore.framework.online.channel.core.IRequestContext;
import nexcore.framework.online.channel.core.IResponseContext;
import nexcore.framework.online.channel.core.command.AbstractCommand;
import nexcore.framework.online.channel.util.WebUtils;
import ams.fwk.file.IAmsFileUploadManager;

/**
 * <ul>
 * <li>업무 그룹명 : 금융 프레임워크 </li>
 * <li>서브 업무명 : ONLINE - CHANNEL</li>
 * <li>설 명 : </li>
 * <li>작성일 : 2008. 05. 07</li>
 * <li>작성자 : 구진옥</li>
 * </ul>
 */
public class AmsDownloadCommand extends AbstractCommand {

    /**
     * Key of configuration which represents upload directory.
     */
    private static final String   UPLOAD_DIRECTORY        = "file.upload.root.folder";

    /**
     * Key of configuration which represents download buffer size.
     */
    private static final String   DOWNLOAD_BUFFER_SIZE    = "file.download.buffer.size";

    /**
     * Key of request parameter which represents a program id with which we can find the file uploaded.
     */
    protected static final String PROGRAM_ID          = "programId";
    
    /**
     * Key of request parameter which represents a doc id with which we can find the file uploaded.
     */
//    protected static final String DOC_ID          = "docId";
    protected static final String FILE_SEQ_NO          = "fileSeqNo";
    
    /**
     * Key of request parameter which represents a type id with which we can find the file uploaded.
     */
    protected static final String TYPE_ID          = "typeId";
    
    /**
     * Key of request parameter which represents a file id with which we can find the file uploaded.
     */
    protected static final String FILE_ID          = "fileId";
    
    /**
     * Key of request parameter representing an uploaded file path (relative to upload directory)
     * if a request parameter 'fileId' is given, this request will be ignored. 
     */
    protected static final String FILE_PARAMETER          = "file";

    /**
     * Key of request parameter representing an file name with which the uploaded file will be downloaded. 
     */
    protected static final String FILE_NAME_PARAMETER     = "fileName";

    /**
     * Key in ResponseContext which means the download command processed successfully.
     */
    private static final String   SUCCESS                 = "SUCCESS";

    /**
     * Key in ResponseContext which means the download command failed to process.
     */
    private static final String   FAIL                    = "FAIL";

    /**
     * IConfigurationManager component instance.
     */
    private IConfigurationManager configurationManager;

    /**
     * IFileUploadManager component instance.
     */
    /* no more use after 4.0 - hdjung       
    private IFileUploadManager fileUploadManager;
    */
    
    /**
     * Method for setting IConfigurationManager component to this Command (in ComponentRegistry)
     * 
     * @param configurationManager
     */
    public void setConfigurationManager(
                                        IConfigurationManager configurationManager) {
        this.configurationManager = configurationManager;
    }

    /**
     * Method for setting IFileUploadManager component to this command. 
     * 
     * @param fileUploadManager
     */
    /* no more use after 4.0 - hdjung       
    public void setFileUploadManager(IFileUploadManager fileUploadManager){
        this.fileUploadManager = fileUploadManager;
    }
    */
    
    /**
     * Get configuration from IConfigurationManager.
     * If method setConfigurationManager has not been called, it will take the default.   
     * @param key
     * @return
     */
    public String getConfiguration(String key) {
        if (this.configurationManager == null) {
            this.configurationManager = (IConfigurationManager) ComponentRegistry
                    .lookup(ServiceConstants.CONFIGURATION);
        }
        return this.configurationManager.getConfig(key);
    }

    /**
     * Get download buffer size from IConfigurationManager component.
     * @return
     */
    protected int getDownloadBufferSize() {
        int downloadBufferSize = new Integer(
                getConfiguration(DOWNLOAD_BUFFER_SIZE)).intValue();
        return (downloadBufferSize < 1) ? 4096 : downloadBufferSize;
    }

    /**
     * Get the value for upload directory from IConfigurationManager component. 
     * @return
     */
    protected String getDirectory() {
        return getConfiguration(UPLOAD_DIRECTORY);
    }

    /**
     * Perform download.
     * If the parameter 'fileId' exists then it will find a file with the file id.
     * If not, then it will find al fiel with the 'file' and 'fileName'.
     * @see nexcore.framework.online.channel.core.ICommand#execute(nexcore.framework.online.channel.core.IRequestContext,
     *      nexcore.framework.online.channel.core.ICommandViewMap)
     */
    public IResponseContext execute(IRequestContext requestCtx,
                                    ICommandViewMap cmdViewMap)
            throws BaseException, BaseRuntimeException {

        HttpServletRequest hrequest = (HttpServletRequest) (requestCtx
                .getReadProtocol());
        HttpServletResponse hresponse = (HttpServletResponse) requestCtx
                .getWriteProtocol();
        
        String programId = hrequest.getParameter(PROGRAM_ID);
//        String docId = hrequest.getParameter(DOC_ID);
        String fileId = hrequest.getParameter(FILE_ID);
        String seqNo = hrequest.getParameter(FILE_SEQ_NO);

        if (fileId == null)
            throw new SystemRuntimeException("fileId is needed !");
        
        IAmsFileUploadManager fileUploadManager = (IAmsFileUploadManager) ComponentRegistry.lookup(ServiceConstants.FILEUPLOAD);
        Map info = fileUploadManager.getUploadedFileInfo(seqNo, fileId);

        String fileName = (String) info.get("FILE_NAME");
        String fullFilePath = null;        
        String filePath = (String) info.get("FILE_PATH");
        filePath = ((filePath.startsWith("/")) ? "" : "/") + filePath;
        fullFilePath = getDirectory() + filePath;
        
        /*
         * no more use after 4.0 - hdjung   
        String fileName = hrequest.getParameter(FILE_NAME_PARAMETER);
        String filePath = hrequest.getParameter(FILE_PARAMETER);
        String fullFilePath = null;         * 
        if(fileId != null){
            Map info = fileUploadManager.getUploadedFileInfoById(fileId);
            fileName = (String) info.get("FILE_NAME");
            fullFilePath = (String) info.get("FILE_PATH");
        }else{
            if (filePath == null || filePath.equals("")) {
                throw new BaseRuntimeException("Request Parameter '"
                        + FILE_PARAMETER + "' is needed.");
            }
            filePath = ((filePath.startsWith("/")) ? "" : "/") + filePath;
            fullFilePath = getDirectory() + filePath;
    
            if (fullFilePath.matches(".*[\u002E]+/.*")) {
                throw new BaseRuntimeException(
                        "The path requested is not of the form allowed.");
            }
        }
        */
        
        IDataSet responseData = new DataSet();
        try {
            downloadFileByNameAndPath(hrequest, hresponse, fileName, fullFilePath);
        } catch (Exception e) {
            if (logger.isErrorEnabled()) {
                logger.error("Exception Caughted "
                        + "during downloading file '" + fullFilePath + "'.", e);
            }
            hrequest.setAttribute("nexcore.bizlogic.exception", e);
            return getResponseContext(FAIL, requestCtx, responseData,
                    cmdViewMap);
        }
        return getResponseContext(SUCCESS, requestCtx, responseData, cmdViewMap);
    }

    /**
     * Perform download with parameter 'file' and 'fileName'
     * 
     * @param req
     * @param res
     * @param fileName
     * @param filePath
     * @throws IOException
     */
    protected void downloadFileByNameAndPath(HttpServletRequest req, HttpServletResponse res,
                             String fileName, String filePath) throws IOException{
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

}
