package ams.fwk.base;

import nexcore.framework.core.data.IOnlineContext;
import ams.fwk.common.user.IAmsUserInfo;

public class NormalUnit extends nexcore.framework.coreext.pojo.biz.NormalUnit {

	/**
	 * 사용자 정보취득
	 * @param onlineCtx
	 * @return
	 */
	public IAmsUserInfo getAmsUserInfo(IOnlineContext onlineCtx) {
		return (IAmsUserInfo)onlineCtx.getUserInfo();
	}
}
