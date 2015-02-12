package ams.fwk.common.user.manager;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import ams.fwk.common.user.AmsUserInfo;

import nexcore.framework.core.Constants;
import nexcore.framework.core.data.user.IUserInfo;
import nexcore.framework.online.biz.auth.IWebUserManager;
import nexcore.framework.online.biz.auth.internal.DefaultUserManager;
import nexcore.framework.online.biz.role.ICommonRoleManager;

public class AmsUserManager extends DefaultUserManager implements
		IWebUserManager {
	
	private ICommonRoleManager crm = null;
	
	/**
     * set common role component.
     * @param crm
     */
    public void setCommonRoleManager(ICommonRoleManager crm){
        this.crm = crm;
    }

	@Override
	public IUserInfo getAnonymousUserInfo(HttpServletRequest request) {
		AmsUserInfo userInfo = new AmsUserInfo();
		/**
		 * uTest 거래여부를 확인하기 위해 미리 requestURI를 입력해놓음.
		 */
		userInfo.setRequestURI(request.getRequestURI());
		return userInfo;
	}

	@Override
	public IUserInfo getLoggedInUserInfo(HttpServletRequest request) {
		IUserInfo userInfo = null;
        if (request != null) {			
			HttpSession session = request.getSession(false);
			if (session != null) {
				userInfo = (IUserInfo) session.getAttribute(Constants.USER);
			} 	
		}
		return userInfo;
	}

	@Override
	public IUserInfo getUserInfo(HttpServletRequest request) {
		IUserInfo userInfo = getLoggedInUserInfo(request);
		
		// 만약 Session에 user 정보가 없다면 인스턴스생성.
		if (userInfo == null) {
			userInfo = getAnonymousUserInfo(request);
		}
		return userInfo;
	}

	@Override
	public void setUserInfo(HttpServletRequest request, IUserInfo userInfo) {
		if (request != null) {
			HttpSession session = request.getSession(true);
			session.setAttribute(Constants.USER, userInfo);
		}
	}

	@Override
	public IUserInfo getUser(String id) {
		AmsUserInfo userInfo  = new AmsUserInfo();
		userInfo.put("USER_ID", id);
		return userInfo;
	}
}
