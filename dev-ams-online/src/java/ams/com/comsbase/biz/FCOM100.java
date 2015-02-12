package ams.com.comsbase.biz;

import java.util.Map;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.ResultMessage;
import nexcore.framework.core.exception.BizRuntimeException;
import nexcore.framework.coreext.pojo.biz.SharedBizComponent;

import org.apache.commons.logging.Log;

import ams.fwk.constants.DBNamingConstants;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/공통업무</li>
 * <li>단위업무명: [FU]공통업무함수</li>
 * <li>설  명 : </li>
 * <li>작성일 : 2013-09-12 13:26:28</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class FCOM100 extends ams.fwk.base.FunctionUnit  {

	/**
	 * 이 클래스는 Singleton 객체로 수행됩니다. 
	 * 여기에 필드를 선언하여 사용하면 동시성 문제를 일으킬 수 있습니다.
	 */

	/**
	 * Default Constructor
	 */
	public FCOM100(){
		super();
	}

	/**
	 *
	 * 메뉴테이블용 Active Time시간을 update한다. 
	 * @author 박세일 (ParkSeIl)
	 *
	 * @param requestData 요청정보 DataSet 객체
	 * @param onlineCtx   요청 컨텍스트 정보
	 * @return 처리결과 DataSet 객체
	 */
	public IDataSet fUpdateMenuTbActiveTime(IDataSet requestData, IOnlineContext onlineCtx){
		DAMS_ACTIVE_TIMECHK_00 dAMS_ACTIVE_TIMECHK_00  = (DAMS_ACTIVE_TIMECHK_00)lookupDataUnit(DAMS_ACTIVE_TIMECHK_00.class);
		IDataSet responseData = new DataSet();
		IDataSet selectSecretCdDSReq = new DataSet(); 
		selectSecretCdDSReq.putField("TABLE_NAME", DBNamingConstants.AMS_MENU);
		dAMS_ACTIVE_TIMECHK_00.upddateAcvtiveTimeByTableName(selectSecretCdDSReq, onlineCtx);
	    return responseData;
	 }
  
}
