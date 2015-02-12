package ams.fwk.filter;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IValueObject;
import nexcore.framework.core.exception.BaseException;
import nexcore.framework.core.log.LogManager;
import nexcore.framework.core.service.filter.AbsServiceFilter;
import nexcore.framework.core.service.filter.IServiceFilterChain;
import nexcore.framework.coreext.pojo.biz.base.BizComponentCaller;

import org.apache.commons.logging.Log;

import com.star.nexcore.foundation.util.StringUtils;

import ams.fwk.common.user.IAmsUserInfo;
import ams.fwk.constants.DBNamingConstants;

public class UTestUserInfoProcessor extends AbsServiceFilter {

	private Log log = LogManager.getFwkLog();
	private String commandId;//uTest시 commandId
    private String componentFqId;// 로그인 componentFqId
    private String loginMethodName;//로그인 메소드명
    
	public void setCommandId(String commandId) {
		this.commandId = commandId;
	}

	public void setComponentFqId(String componentFqId) {
		this.componentFqId = componentFqId;
	}

	public void setLoginMethodName(String loginMethodName) {
		this.loginMethodName = loginMethodName;
	}

	@Override
	public IValueObject doFilter(IValueObject requestData, IOnlineContext onlineCtx,
			IServiceFilterChain chain) throws BaseException {

		IAmsUserInfo userInfo = (IAmsUserInfo)onlineCtx.getUserInfo();
		String requestURI = userInfo.getRequestURI();
		if(StringUtils.isEmpty(userInfo.getLoginId())) {
			/**
			 * uTest거래일 경우는 로그인하여 사용자정보가 OnlineContext안의 AmsUserInfo에 먼저 설정되도록 한다.  
			 */
			if(commandId.equals(requestURI)) {
				IDataSet ds = new DataSet();
				setLoginParam(ds, onlineCtx);
				BizComponentCaller.callBizComponentByDirect("", componentFqId, loginMethodName, ds, onlineCtx);
			}
		}
		
		IValueObject responseData = chain.doFilter(requestData, onlineCtx);
		return responseData;
	}

	private void setLoginParam(IDataSet requestData, IOnlineContext onlineCtx) {
		requestData.putField(DBNamingConstants.USER_ID, onlineCtx.getAttribute("USER_ID"));
		requestData.putField(DBNamingConstants.USER_PASSWORD, onlineCtx.getAttribute("USER_PASSWORD"));
	}
}
