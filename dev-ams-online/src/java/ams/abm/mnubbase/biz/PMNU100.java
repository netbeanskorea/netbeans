package ams.abm.mnubbase.biz;

import java.util.Locale;
import java.util.Map;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.ResultMessage;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;

import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.constants.DBNamingConstants;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>단위업무명: [PU]메뉴관리</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-07-09 10:42:22</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class PMNU100 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PMNU100(){
		super();
	}

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pMNU10001(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.MNUSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
			
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectMenuList", requestData, onlineCtx);
		 
	    	responseData.putRecordSet(ds.getRecordSet(DBNamingConstants.AMS_MENU));
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"메뉴목록조회"}, e);
		 }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pMNU10002(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.MNUSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectMenu", requestData, onlineCtx);
		 
	    	responseData.putFieldMap(ds.getFieldMap());
	    	
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"메뉴상세조회"}, e);
		 }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pMNU10003(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.MNUSBase");
	    SharedBizComponent comSC = lookupSharedBizComponent("com.COMSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "updateMenu", requestData, onlineCtx);
	    	callSharedBizComponentByDirect(comSC, "fUpdateMenuTbActiveTime", requestData, onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"메뉴수정"}, e);
		 }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pMNU10004(IDataSet requestData, IOnlineContext onlineCtx){
	    SharedBizComponent sc = lookupSharedBizComponent("abm.MNUSBase");
	    SharedBizComponent comSC = lookupSharedBizComponent("com.COMSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "deleteMenu", requestData, onlineCtx);
	    	callSharedBizComponentByDirect(comSC, "fUpdateMenuTbActiveTime", requestData, onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"메뉴삭제"}, e);
		 }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pMNU10005(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.MNUSBase");
		SharedBizComponent comSC = lookupSharedBizComponent("com.COMSBase");
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    try {
	    	callSharedBizComponentByDirect(sc, "insertMenu", requestData, onlineCtx);
	    	callSharedBizComponentByDirect(comSC, "fUpdateMenuTbActiveTime", requestData, onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
	    	throw new BizRuntimeException("M1000000", new String[]{"메뉴등록"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 강훈기 (hunkee)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pMNU10006(IDataSet requestData, IOnlineContext onlineCtx){
		SharedBizComponent sc = lookupSharedBizComponent("abm.MNUSBase");
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	
	    //DM개발시에는 이 try-catch를 제거해도 무관함.
	    try {
	    	IDataSet ds = callSharedBizComponentByDirect(sc, "selectMenuDisplayIndexCount", requestData, onlineCtx);
			 
	    	int disp_index = Integer.valueOf(ds.getField(DBNamingConstants.DISPLAY_INDEX));
	    	
	    	responseData.putField(DBNamingConstants.DISPLAY_INDEX, disp_index + 1);
		 
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"메뉴정렬순서취득"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }

	/**
	 *
	 *
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet pMNU10007(IDataSet requestData, IOnlineContext onlineCtx){
		Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    SharedBizComponent comSC = lookupSharedBizComponent("com.COMSBase");
	    try {
	    	callSharedBizComponentByDirect(comSC, "fUpdateMenuTbActiveTime", requestData, onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"메뉴refresh"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }
}
