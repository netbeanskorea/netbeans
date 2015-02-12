package ams.fwk.common.user;

import javax.servlet.http.HttpServletRequest;

import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.util.BaseUtils;

public class CommonInfoParse {

	public static void  commonInfoIntoUserInfo(HttpServletRequest request, IOnlineContext onlineCtx) {
		AmsUserInfo userInfo  =  (AmsUserInfo)onlineCtx.getUserInfo();
		userInfo.setContextPath(request.getContextPath());
		userInfo.setRequestURI(request.getRequestURI());
		userInfo.setIp(request.getRemoteAddr());
		userInfo.setLocale(BaseUtils.getDefaultLocale());
	}
}
