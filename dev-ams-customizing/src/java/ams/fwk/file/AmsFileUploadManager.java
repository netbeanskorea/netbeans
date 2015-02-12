package ams.fwk.file;

import java.io.File;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.parameter.IConfigurationManager;
import nexcore.framework.core.prototype.AbsFwkService;
import nexcore.framework.core.upload.FileUploadException;
import nexcore.framework.core.upload.IUploadHandler;
import nexcore.framework.core.util.DateUtils;
import nexcore.framework.integration.db.ISqlManager;

import org.apache.commons.lang.SystemUtils;

import ams.fwk.constants.Constants;

/**
 * 파일 업로드 구현 클래스
 * 
 * @version 0.1
 * @since 2012-12-04
 *
 */
public class AmsFileUploadManager extends AbsFwkService implements IAmsFileUploadManager {

	/**
	 * Serial Version UID
	 */
	private static final long serialVersionUID = -3258417392130375812L;
	
	/**
     * Configuration Key representing the upload directory root.
     */
    private static final String     UPLOAD_ROOT_DIRECTORY       = "file.upload.root.folder";

    /**
     * Configuration Key representing the default encoding for parsing multipart/form-data request.
     */
    private static final String     CONFIG_ENCODING_DEFAULT     = "file.upload.encoding";

    /**
     * Configuration Key representing the max size of each uploaded file.
     */
    private static final String     CONFIG_UPLOAD_MAX_SIZE_EACH = "file.upload.max.size.each";

    /**
     * Configuration Key representing the max size of whole multipart/form-data request.
     */
    private static final String     CONFIG_UPLOAD_MAX_SIZE      = "file.upload.max.size";
	
	/**
     * ISqlManager component.
     */
    protected ISqlManager sqlManager;
    
    /**
     * Set ISqlManager
     * @param sm  the SqlManager to set
     */
    public void setSqlManager(ISqlManager sm) {
        this.sqlManager = sm;
    }
    
    /**
     * upload handler
     */
    protected IUploadHandler        handler;

    /**
     * Configuration Manager component.
     */
    protected IConfigurationManager configurationManager;

    /**
     * default encoding.
     */
    protected String                defaultEncoding             = null;

    /**
     * method for setting configuration manager component.
     * 
     * @param cm
     */
    public void setConfigurationManager(IConfigurationManager cm) {
        this.configurationManager = cm;
    }

    /**
     * set default encoding for parsing parameters. if setDefaultEncoding method
     * was not called, then value for configuration
     * "framework.config.defaultEncoding" would be chosen.
     * 
     * @param defaultEncoding
     */
    public void setDefaultEncoding(String defaultEncoding) {
        this.defaultEncoding = defaultEncoding;
    }

    /**
     * method for setting IUploadHandler.
     * 
     * @param handler
     */
    public void setHandler(IUploadHandler handler) {
        this.handler = handler;
    }

    /**
     * get default encoding.
     * @see slms.common.file.ISlmsFileUploadManager#getDefaultEncoding()
     */
	public String getDefaultEncoding() {
		// if component has its own defaultEncoding, it will be used first.
        // if not, the value registered to configurationManager will be used.
        if (this.defaultEncoding != null) {
            return this.defaultEncoding;
        }
        return configurationManager.getConfig(CONFIG_ENCODING_DEFAULT);
	}
	
	/**
     * return the root directory where uploaded files locate. it must have an
     * absolute path.
     * 
     * @return
     */
    protected String getRootDirectory() {
        String rootDirectory = configurationManager
                .getConfig(UPLOAD_ROOT_DIRECTORY);
        if (rootDirectory == null) {
            // return default value as "/" or "C:/"
            rootDirectory = "/";
        }
        return rootDirectory;
    }

	/**
     * get uploaded file information by file id.
     * @see slms.common.file.ISlmsFileUploadManager#getUploadedFileInfoById(java.lang.String)
     */
	public Map getUploadedFileInfoById(String fileId) {
		return (Map)sqlManager.queryForObject("core.upload.getUploadedFileById", fileId);
	}
	
	/**
     * get uploaded file information.
     * @see slms.common.file.ISlmsFileUploadManager#getUploadedFileInfo(java.lang.String, java.lang.String, java.lang.String)
     */
	public Map getUploadedFileInfo(String seqNo, String fileId) {
		Map fileInfoMap = new HashMap();
		fileInfoMap.put("SEQ_NO", seqNo);
		fileInfoMap.put("FILE_ID", fileId);
		return (Map)sqlManager.queryForObject("core.upload.getUploadedFileInfo", fileInfoMap);
	}

	/**
     * Get informations of uploaded files with keys : program_id and doc_id
     * @see slms.common.file.ISlmsFileUploadManager#getUploads(java.lang.String, java.lang.String, nexcore.framework.core.data.IDataSet, nexcore.framework.core.data.IOnlineContext)
     */
	public List getUploads(String seqNo,	IDataSet requestData, IOnlineContext onlineCtx) {
		Map param = new HashMap();
        param.put("SEQ_NO", seqNo);
        return sqlManager.queryForList("core.upload.getUploads", param);
	}

	/**
     * Save informations for uploaded files to disk. 
     */
	public void createUpload(String seqNo, String programId,  IDataSet fileData, IOnlineContext onlineCtx) {
		IRecordSet fileRs = fileData.getRecordSet(Constants.FILE_LIST);

        if (fileRs != null){
            for (Iterator it = fileRs.getRecordMaps().iterator(); it.hasNext();) {
                Map fileInfoMap = (Map)it.next();
                fileInfoMap.put("TX_DT", DateUtils.getCurrentDate());
                fileInfoMap.put("SEQ_NO", seqNo);
                fileInfoMap.put("PROGRAM_ID", programId);
                fileInfoMap.put("USER_ID", onlineCtx.getUserInfo().getLoginId());
                fileInfoMap.put("CREATE_USER", onlineCtx.getUserInfo().getLoginId());               
                fileInfoMap.put("CREATE_TIME", DateUtils.getCurrentDate("yyyyMMddHHmmss"));
                sqlManager.insert("core.upload.createUpload", fileInfoMap);
            }    
        }
		
	}

	/**
	 * 파일업로드시 각각의 seqNo에 맞는 RecordSet
	 * @param seqNo
	 * @param programId
	 * @param fileRs
	 * @param onlineCtx
	 */
	public void createUpload(String seqNo, String programId,  IRecord fileRecord, IOnlineContext onlineCtx) {
            Map fileInfoMap = new HashMap();
            fileInfoMap.put("TX_DT", DateUtils.getCurrentDate());
            fileInfoMap.put("SEQ_NO", seqNo);
            fileInfoMap.put("PROGRAM_ID", programId);
            fileInfoMap.put("USER_ID", onlineCtx.getUserInfo().getLoginId());
            fileInfoMap.put("TYPE_ID", fileRecord.get("TYPE_ID"));
            fileInfoMap.put("FILE_ID", fileRecord.get("FILE_ID"));
            fileInfoMap.put("FILE_NAME", fileRecord.get("FILE_NAME"));
            fileInfoMap.put("FILE_PATH", fileRecord.get("FILE_PATH"));
            fileInfoMap.put("FILE_SIZE", fileRecord.get("FILE_SIZE"));
            fileInfoMap.put("CREATE_USER", onlineCtx.getUserInfo().getLoginId());               
            fileInfoMap.put("CREATE_TIME", DateUtils.getCurrentDate("yyyyMMddHHmmss"));
            sqlManager.insert("core.upload.createUpload", fileInfoMap);
            
	}
	/**
     * Update informations for uploaded files to disk.
     * @see slms.common.file.ISlmsFileUploadManager#updateUpload(java.lang.String, java.lang.String, java.lang.String, nexcore.framework.core.data.IDataSet, nexcore.framework.core.data.IOnlineContext)
     */
	public void updateUpload(String seqNo, String programId, IDataSet fileData,
			IOnlineContext onlineCtx) {
		List uploads = getUploads(seqNo, null , null);
        IRecordSet fileDeleteRS = fileData.getRecordSet("FILE_DELETE_LIST");
        String[] fileIdsToDelete = null;
        if (fileDeleteRS != null) {
        	int cnt = fileDeleteRS.getRecordCount();
        	fileIdsToDelete = new String[cnt];
        	for (int i = 0; i < cnt; i++) {
        		fileIdsToDelete[i] = fileDeleteRS.getRecord(i).get("file_id");
        	}
        }
        //long totalUploadedSize =  Long.parseLong(requestData.getField("CONTENT_LENGTH"));
        long maxUploadSize = getMaxFileSize();

        int uploadedSize = 0;
        
        /* checking size */
        for (int i = 0; i < uploads.size(); i++) {
            Map file = (Map) uploads.get(i);
            
            if (!isIncluded(fileIdsToDelete, file.get("FILE_ID")))
                uploadedSize += ((BigDecimal) file.get("FILE_SIZE")).longValue();

        }
        
        if (maxUploadSize < uploadedSize)
            throw new FileUploadException("Max size is limited to [" + NumberFormat.getNumberInstance().format(maxUploadSize) + "] bytes");

        /* after size checking, we can delete files */ 
        for (int i = 0; i < uploads.size(); i++) {
            Map file = (Map) uploads.get(i);
            
            if (isIncluded(fileIdsToDelete, file.get("FILE_ID"))){
                
                File file0 = new File(getRootDirectory() + SystemUtils.FILE_SEPARATOR + file.get("FILE_PATH"));
                if (file0.exists()) {
                    file0.delete();
                }
                sqlManager.delete("core.upload.deleteUpload", file.get("FILE_ID"));                
            }
        }
        
        createUpload(seqNo, programId, fileData, onlineCtx);
		
	}

	/**
     * Delete informations of uploaded files.
     * @see slms.common.file.ISlmsFileUploadManager#deleteUpload(java.lang.String, java.lang.String, nexcore.framework.core.data.IDataSet, nexcore.framework.core.data.IOnlineContext)
     */
	public void deleteUpload(String seqNo, IDataSet fileData,
			IOnlineContext onlineCtx) {
		List filesToDelete = getUploads(seqNo, fileData, onlineCtx);
        for (Iterator all = filesToDelete.iterator(); all.hasNext();) {
            Map each = (Map) all.next();
            File file = new File(getRootDirectory() + SystemUtils.FILE_SEPARATOR + each.get("FILE_PATH"));
            if (file.exists()) {
                file.delete();
            }
            sqlManager.delete("core.upload.deleteUploads", each);
        }
	}
	
	/**
	 * 파일ID를 이용하여 저장된 파일을 삭제한다. 
	 * @param fileId
	 */
	public int deleteUpload(String fileId) {
		return sqlManager.delete("core.upload.deleteUpload",fileId);                
	}
	
	/**
     * 한번에 업로드할 수 있는 최대 크기 (파일 여러개일 경우 총합) get the size limit of whole uploaded
     * files(not each file). can override this method to take another way to get
     * this value.
     * 
     * @param request
     * @return
     */
    protected long getMaxFileSize() {
        String value = configurationManager.getConfig(CONFIG_UPLOAD_MAX_SIZE);
        if (value == null) {
            // return default value as 10MB
            return 10485760L;
        }
        return Long.parseLong(value);
    }

    /**
     * 업로드되는 각 파일의 허용 크기. get the size limit of each uploaded file. can override
     * this method to take another way to get this value.
     * 
     * @return
     */
    protected int getMaxEachFileSize() {
        String value = configurationManager
                .getConfig(CONFIG_UPLOAD_MAX_SIZE_EACH);
        if (value == null) {
            // return default value as 1MB
            return 1048576;
        }
        return Integer.parseInt(value);
    }
    
    private boolean isIncluded(Object[] objGroup, Object forObj){
        boolean rtnValue = false;
        
        if (objGroup != null && forObj != null) {
            for (int i=0;i<objGroup.length;i++){
                if (forObj.equals(objGroup[i])){
                    rtnValue = true;
                    break;
                }
            }
        }
        return rtnValue;
    }

}
