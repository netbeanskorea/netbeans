package ams.com.combbase.biz;

import java.util.Calendar;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.RecordSet;
import nexcore.framework.core.exception.BizRuntimeException;

import org.apache.commons.logging.Log;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/공통업무</li>
 * <li>단위업무명: [PU]달력관리</li>
 * <li>설  명 : STAR UI FWK Calendar 컴포넌트와 연동.
달력 정보를 반환 한다.</li>
 * <li>작성일 : 2013-09-30 14:50:48</li>
 * <li>작성자 : 성지호 (SungJiHo)</li>
 * </ul>
 *
 * @author 성지호 (SungJiHo)
 */
public class PCOM102 extends ams.fwk.base.DataUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PCOM102(){
		super();
	}

	/**
	 *
	 *
	 * @author 성지호 (SungJiHo)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pCOM10201(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    
	    // IN
	    // mindate : 달력 시작일
	    // maxdate : 달력 종료일
	    // OUT
	    // mindate : 달력 시작일
	    // maxdate : 달력 종료일
	    // recordSets
	    //  recordset명 [ 년 + 월 ] 동적 생성
	    //    record : year, month, date, day(0 ~ 6), holiday(true, false), data
	    
	    // DB에서 영업일을 조회해서 넘겨줘야 함.
	    // 지금은 DB연동이 되어 있지 않으니, string을 읽어와서 해당 값을 리턴하는 걸로 함
	    try {
	    	String minDate = requestData.getField("mindate");
	    	String maxDate = requestData.getField("maxdate");
	    	responseData.putField("mindate", minDate);
	    	responseData.putField("maxdate", maxDate);
	    	
	    	Calendar today = Calendar.getInstance();
	    	today.set(Integer.parseInt(minDate.substring(0, 4)),
	    			Integer.parseInt(minDate.substring(4, 6)) - 1,
	    			Integer.parseInt(minDate.substring(6, 8)));
	    	Calendar lastday = Calendar.getInstance();
	    	lastday.set(Integer.parseInt(maxDate.substring(0, 4)),
	    			Integer.parseInt(maxDate.substring(4, 6)) - 1,
	    			Integer.parseInt(maxDate.substring(6, 8)));
	    	
	    	int year = 0;
	    	int month = 0;
	    	int date = 0;
	    	int day = 0;
	    	String currentRsId = "";
	    	IRecordSet rs = null;
	    	while(true) {
	    		if(today.equals(lastday)) {
	    			break;
	    		}
	    		year = today.get(Calendar.YEAR);
	    		month = today.get(Calendar.MONTH) + 1;
	    		date = today.get(Calendar.DATE);
	    		day = today.get(Calendar.DAY_OF_WEEK) - 1;
	    		if(!currentRsId.equals(year + "" + month)) {
	    			if(rs!=null) {
	    				responseData.putRecordSet(currentRsId, rs);
	    			}
	    			currentRsId = year + "" + month;
	    			rs = new RecordSet(currentRsId, new String[]{"year", "month", "date", "day", "holiday", "data"});
	    		}
	    		IRecord r = rs.newRecord();
	    		r.set("year", year);
	    		r.set("month", month);
	    		r.set("date", date);
	    		r.set("day", day);
	    		if(day==0)
	    			r.set("holiday", true);
	    		else
	    			r.set("holiday", false);
	    		r.set("data", "");
	    		
	    		today.set(Calendar.DATE, date + 1);
	    	}
	    	responseData.putRecordSet(currentRsId, rs);
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }
}
