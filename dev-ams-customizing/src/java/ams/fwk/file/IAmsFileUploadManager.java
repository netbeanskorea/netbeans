package ams.fwk.file;

import java.util.List;
import java.util.Map;

import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;

/**
 * 파일 업로드 인터페이스
 * 
 * @version 0.1
 * @since 2012-12-17
 *
 */
public interface IAmsFileUploadManager {
	
	/**
     * 컴포넌트의 기본 인코딩을 반환한다.
     * 
     * @return 컴포넌트의 기본 인코딩
     */
    String getDefaultEncoding();
	
	/**
	 * 업로드한 파일의 정보를 저장한다.
	 * 
	 * @param programId
	 *            프로그램 아이디=>E-Market에서는 JSP파일이 있는 경로로 ProgramId가 들어감 ex)/web/EUC/EUC001.jsp 라면 programId는 'web/EUC/EUC001' 임
	 * @param userId
	 *            파일을 저장한 사용자의 아이디
	 * @param fileData
	 *            파일 정보 DataSet
	 * @param onlineCtx
	 *            인프라 정보
	 */
	void createUpload(String programId, String userId, IDataSet fileData, IOnlineContext onlineCtx);
	
	/**
	 * 업로드한 파일의 정보를 갱신한다.
	 * 
	 * @param programId
	 *            프로그램 아이디=>E-Market에서는 JSP파일이 있는 경로로 ProgramId가 들어감 ex)/web/EUC/EUC001.jsp 라면 programId는 'web/EUC/EUC001' 임
	 * @param userId
	 *            파일을 저장한 사용자의 아이디
	 * @param fileData
	 *            파일 정보 DataSet
	 * @param onlineCtx
	 *            인프라 정보
	 */
	void updateUpload(String seqNo, String programId,  IDataSet fileData, IOnlineContext onlineCtx);
	
	/**
	 * 업로드한 파일의 정보를 삭제한다.
	 * 
	 * @param programId
	 *            프로그램 아이디=>E-Market에서는 JSP파일이 있는 경로로 ProgramId가 들어감 ex)/web/EUC/EUC001.jsp 라면 programId는 'web/EUC/EUC001' 임
	 * @param userId
	 *            파일을 저장한 사용자의 아이디
	 * @param fileData
	 *            파일 정보 DataSet
	 * @param onlineCtx
	 *            인프라 정보
	 */
	void deleteUpload(String seqNo, IDataSet fileData, IOnlineContext onlineCtx);
	
	/**
     * return the informations of an uploaded file by file id.
     * @return  the informations of an uploaded file.
     */
    Map getUploadedFileInfo(String seqNo, String fileId);
    
    /**
     * 업로드한 파일의 정보를 SEQ NO 단위로 조회한다.
     * 
     * @param seqNo
     *            파일업로드를 하기 위한 채번 정보         
     * @param onlineCtx
     *            파일의 정보를 갖는 IOnlineContext
     * @return List 파일 정보 List
     */
   List getUploads(String seqNo, IDataSet requestData, IOnlineContext onlineCtx);

}
