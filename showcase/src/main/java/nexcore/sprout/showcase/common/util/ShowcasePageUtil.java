package nexcore.sprout.showcase.common.util;

import java.util.HashMap;
import java.util.Map;

import nexcore.sprout.foundry.constants.SproutConstants;
import nexcore.sprout.showcase.common.vo.PageVO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service("ShowcasePageUtil")
public class ShowcasePageUtil{
	/** 기본 페이지당 조회건수,client 에서 rowPerPage 를 전송하지 않을 경우 사용함  */
	private static int defaultRowPerPage = 10;
	/** 기본 페이지 개수, 없으면  */
	private static int defaultPageSize = 10;
	
    /**
     * getPageInfo
     * <pre>
     * 조회된 총건수, VO를 바탕으로 
     *   PageNo(SproutConstants.PAGE_NO), PageSize(SproutConstants.PAGE_SIZE)
     * , TotalCnt(SproutConstants.TOTAL_CNT),TotalPage(SproutConstants.TOTAL_PAGE)를 구성하여 Map 을 Return 하며 
     * PageVO 에 ,firstRow,lastRow,totalCnt,totalPage 를 세팅한다 .
     * </pre>
     * @param totalCnt
     * @param vo
     * @return Map<String,Integer> (firstRow,lastRow,totalCnt,totalPage)
     */
    public static Map<String, Integer> getPageInfo(int totalCnt, PageVO vo) {
    	// Page 정보 구성
        Map<String, Integer> pageInfo = new HashMap<String, Integer>();
        if(vo.getRowPerPage() < 1){// 0 또는 음수라면
        	vo.setRowPerPage(defaultRowPerPage);
        }
        if(vo.getPageSize() < 1){
        	vo.setPageSize(defaultPageSize);
        }
        
//        int totalPage = (int)Math.ceil((double)totalCnt / (double)vo.getPageSize());
//        int firstRow = (vo.getPageNo() - 1) * vo.getPageSize() + 1;
//    	int lastRow = vo.getPageNo() * vo.getPageSize();    	
//    	int endPageNo = totalPage + (1 - (totalPage % 1)) % 1;
    	
        // 총 페이지 수
    	int totalPage = (int)Math.ceil((double)totalCnt / (double)vo.getRowPerPage());
    	/* 첫번째 row번호*/
    	int firstRow = (vo.getPageNo() - 1) * vo.getRowPerPage() + 1;
    	/* 마지막 row번호*/
    	int lastRow = 	vo.getPageNo() * vo.getRowPerPage();
    	 /* 한 화면의 시작 페이지 번호 */
    	int startPageNo = ((vo.getPageNo()) / vo.getPageSize())  * vo.getPageSize() + 1;
    	/* 한 화면의 끝 페이지 번호 */
    	int endPageNo = ((startPageNo + vo.getPageSize()-1) > totalPage) ? totalPage :  (firstRow + vo.getPageSize()-1);
    	
    	pageInfo.put(SproutConstants.FIRST_ROW_INDEX, firstRow);
    	pageInfo.put(SproutConstants.LAST_ROW_INDEX, lastRow);
    	pageInfo.put(SproutConstants.TOTAL_CNT, totalCnt);
    	pageInfo.put(SproutConstants.TOTAL_PAGE, totalPage);
    	pageInfo.put(SproutConstants.PAGE_NO, vo.getPageNo());
    	pageInfo.put(SproutConstants.PAGE_SIZE, vo.getPageSize());
    	pageInfo.put(SproutConstants.START_PAGE_NO, startPageNo);
    	pageInfo.put(SproutConstants.END_PAGE_NO, endPageNo);
    	pageInfo.put(SproutConstants.ROW_PER_PAGE, vo.getRowPerPage());
    	
        vo.setFirstRowIndex(firstRow);
        vo.setLastRowIndex(lastRow);
        vo.setTotalCnt(totalCnt);
        vo.setTotalPage(totalPage);
        vo.setEndPageNo(endPageNo);
        return pageInfo;
    }
    
    /**
     * getPageInfo  
     * <pre>
     * Vo 미사용시 사용 
     * 조회된 총건수, RequestMap을 바탕으로 
     *   PageNo(SproutConstants.PAGE_NO), PageSize(SproutConstants.PAGE_SIZE)
     * , TotalCnt(SproutConstants.TOTAL_CNT),TotalPage(SproutConstants.TOTAL_PAGE)를 구성하여 Map 을 Return 하며 
     * Map 에 ,firstRow,lastRow,totalCnt,totalPage 를 세팅한다 .
     * </pre>
     * @param totalCnt
     * @param requestMap
     * @return Map<String,Integer> (firstRow,lastRow,totalCnt,totalPage)
     */
 
    public Map<String, Integer> getPageInfo(int totalCnt, Map<String, Integer> requestMap) {
    	int pageNo=1;
    	if(requestMap.containsKey(SproutConstants.PAGE_NO)){
    		pageNo=(Integer)requestMap.get(SproutConstants.PAGE_NO);
    	}
    	int rowPerPage=defaultRowPerPage;
    	if(requestMap.containsKey(SproutConstants.ROW_PER_PAGE)){
    		rowPerPage=(Integer)requestMap.get(SproutConstants.ROW_PER_PAGE);
    	}
    	int pageSize = defaultPageSize;
    	if(requestMap.containsKey(SproutConstants.PAGE_SIZE)){
    		pageSize=(Integer)requestMap.get(SproutConstants.PAGE_SIZE);
    	}
    	
//    	int totalPage = (int)Math.ceil((double)totalCnt / (double)pageSize);
//    	int firstRow = (pageNo - 1) * pageSize + 1;
//    	int lastRow = pageNo * pageSize;
//    	int endPageNo = totalPage + (1 - (totalPage % 1)) % 1;
        
        // 총 페이지 수
    	int totalPage = (int)Math.ceil((double)totalCnt / (double)rowPerPage);
    	/* 첫번째 row번호*/
    	int firstRow = (pageNo - 1) * rowPerPage + 1;
    	/* 마지막 row번호*/
    	int lastRow = 	pageNo * rowPerPage;
    	 /* 한 화면의 시작 페이지 번호 */
    	int startPageNo = (pageNo / pageSize)  * pageSize + 1;
    	/* 한 화면의 끝 페이지 번호 */
    	int endPageNo = ((startPageNo + pageSize -1) > totalPage) ? totalPage :  (firstRow + pageSize - 1);
    	
    	// Page 정보 구성 (client return 할 값)
    	Map<String, Integer> pageInfo=new HashMap<String,Integer>();
    	pageInfo.put(SproutConstants.FIRST_ROW_INDEX, firstRow);
    	pageInfo.put(SproutConstants.LAST_ROW_INDEX, lastRow);
    	pageInfo.put(SproutConstants.TOTAL_CNT, totalCnt);
    	pageInfo.put(SproutConstants.TOTAL_PAGE, totalPage);
    	pageInfo.put(SproutConstants.PAGE_NO, pageNo);
    	pageInfo.put(SproutConstants.END_PAGE_NO, endPageNo);
    	pageInfo.put(SproutConstants.ROW_PER_PAGE, rowPerPage);
    	
    	requestMap.put(SproutConstants.FIRST_ROW_INDEX, firstRow);
    	requestMap.put(SproutConstants.LAST_ROW_INDEX, lastRow);
    	requestMap.put(SproutConstants.TOTAL_CNT, totalCnt);
    	requestMap.put(SproutConstants.TOTAL_PAGE, totalPage);
    	requestMap.put(SproutConstants.END_PAGE_NO, endPageNo);
    	requestMap.put(SproutConstants.ROW_PER_PAGE, rowPerPage);
    	
    	return pageInfo;
    }
    
    @Value("${paging.defaultRowPerPage:10}")
	public void setDefaultRowPerPage(int defaultRowPerPage) {
            this.defaultRowPerPage = defaultRowPerPage;
	}
}
