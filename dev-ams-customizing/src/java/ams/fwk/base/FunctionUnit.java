package ams.fwk.base;

import ams.fwk.common.user.IAmsUserInfo;
import nexcore.framework.core.data.IOnlineContext;

public class FunctionUnit extends nexcore.framework.coreext.pojo.biz.FunctionUnit {

	/**
	 * 사용자 정보취득
	 * @param onlineCtx
	 * @return
	 */
	public IAmsUserInfo getAmsUserInfo(IOnlineContext onlineCtx) {
		return (IAmsUserInfo)onlineCtx.getUserInfo();
	}
}
