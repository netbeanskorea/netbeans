package ams.com.combbase.biz;

import java.util.Locale;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.OnlineContext;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;

import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.constants.Constants;
import ams.fwk.constants.DBNamingConstants;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/공통업무</li>
 * <li>단위업무명: [PU]로케일</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-09-11 17:11:18</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class PCOM101 extends ams.fwk.base.ProcessUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public PCOM101(){
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
	public IDataSet pCOM10101(IDataSet requestData, IOnlineContext onlineCtx){
	    Log log = getLog(onlineCtx);
	    IDataSet responseData = new DataSet();
	    AmsUserInfo userInfo = (AmsUserInfo)getAmsUserInfo(onlineCtx);
	    SharedBizComponent comSC = lookupSharedBizComponent("com.COMSBase");
	    try {
	    	String localeId = requestData.getField("LOCALE_ID");
	    	if(StringUtils.isEmpty(localeId)) {
	    		throw new BizRuntimeException("M1000002", new String[]{"로케일ID"});
	    	}
	    	Locale locale = BaseUtils.asLocale(localeId);
	    	userInfo.setLocale(locale);
	    	callSharedBizComponentByDirect(comSC, "fUpdateMenuTbActiveTime", requestData, onlineCtx);
	    } catch(BizRuntimeException e) {
		  	throw e;
	    } catch(Exception e) {
		    	throw new BizRuntimeException("M1000000", new String[]{"로케일변경처리"}, e);
	    }
	    // 처리 결과값을 responseData에 넣어서 리턴하십시오
	    responseData.setOkResultMessage("M3000000", null);
	    return responseData;
	 }
}
