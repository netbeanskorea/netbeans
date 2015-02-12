package ams.fwk.utils;

import nexcore.framework.core.Constants;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IRecordSet;

/**
 * 페이징 처리에 사용하는 Util 클래스
 * 
 * @version 0.1
 * @since 2012-10-30
 *
 */
public class PagenateUtils {
	
	/**
	 * 페이지 번호 관리키
	 */
	public final static String PAGE_NO = "page";
	
	/**
	 * 목록 수 관리키
	 */
	public final static String RC_COUNT_PER_PAGE = "page_size";
	
	private PagenateUtils() {
		// 객체 생성 방지
	}

	/**
	 * 페이징처리를 하기 위한 방법을 제공한다. 입력 DataSet에 반드시 "page" 와 "page_size" 값이 있어야
	 * 한다.
	 * 
	 * @param requestData
	 */
	public static void setPagenatedParamsToDataSet(IDataSet requestData) {
		int pageNo = getPageNo(requestData);
        int recordCountPerPage = getRecordCountPerPage(requestData);
		
        requestData.putField(Constants.PAGE_NO, pageNo);
        requestData.putField(Constants.RC_COUNT_PER_PAGE, recordCountPerPage);
        requestData.putField("nc_firstRowIndex", (pageNo - 1) * recordCountPerPage + 1);
        requestData.putField("nc_lastRowIndex", pageNo * recordCountPerPage);
	}
	
	/**
	 * 페이징처리를 하기 위한 방법을 제공한다. 출력 RecordSet에 필요한 필드를 설정한다.
	 * 
	 * @param recordSet
	 * @param requestData
	 * @param totalCount
	 */
	public static void setPagenatedParamToRecordSet(IRecordSet recordSet, IDataSet requestData, int totalCount) {
		recordSet.setPageNo(requestData.getIntField(Constants.PAGE_NO));
		recordSet.setRecordCountPerPage(requestData.getIntField(Constants.RC_COUNT_PER_PAGE));
		recordSet.setTotalRecordCount(totalCount);
	}
	
	/**
     * 페이징처리를 하기 위한 방법을 제공한다. 현재 page 번호를 반환한다.
     * 
     * @param requestData
     * @return
     */
	private static int getPageNo(IDataSet requestData) {        
        return requestData.getIntField(PAGE_NO, 1);
	}
	
	/**
     * 페이징처리를 하기 위한 방법을 제공한다. 목록 수를 반환한다.
     * 
     * @param requestData
     * @return
     */
	private static int getRecordCountPerPage(IDataSet requestData) {        
        return requestData.getIntField(RC_COUNT_PER_PAGE, 20);
	}
	
}
