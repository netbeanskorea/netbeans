package ams.fwk.channel.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import nexcore.framework.core.Constants;
import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.exception.BaseException;
import nexcore.framework.core.exception.BaseRuntimeException;
import nexcore.framework.core.ioc.ComponentRegistry;
import nexcore.framework.core.log.LogManager;
import nexcore.framework.core.service.IServiceComponentLocator;
import nexcore.framework.online.channel.core.ICommandViewMap;
import nexcore.framework.online.channel.core.IRequestContext;
import nexcore.framework.online.channel.core.IResponseContext;
import nexcore.framework.online.channel.core.command.AbstractCommand;

import org.apache.commons.logging.Log;

import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.common.user.CommonInfoParse;

public class AmsLoginCommand extends AbstractCommand {
	
	private Log    logger           = LogManager.getFwkLog();

	@Override
	public IResponseContext execute(IRequestContext requestCtx, ICommandViewMap cmdViewMap)
			throws BaseException, BaseRuntimeException {
		
		IDataSet requestData = (IDataSet) requestCtx.getBizData();
        IOnlineContext onlineCtx = requestCtx.getOnlineContext();
        HttpServletRequest request = (HttpServletRequest)requestCtx.getReadProtocol();
        HttpSession session = request.getSession(true);
        
        //로그아웃을 하지 않고 다시 다른 User 로 로그인을 하는 경우를 방지 하기 위해서 로그인할 때는 무조건 기존 session의 UserInfo를 제거한다.
        if (session != null) {
            session.removeAttribute(Constants.USER);
        }
        ///////////////////////////////////////
        // 로그인 처리 비즈니스로직을 호출한다. 	
        ///////////////////////////////////////
    	IServiceComponentLocator locator = (IServiceComponentLocator)ComponentRegistry.lookup("nc.DefaultComponentLocator");
        
        String txId = requestCtx.getOnlineContext().getTransaction().getTxId();
        
        if(txId == null){          
            if (logger.isDebugEnabled()) {
                logger.debug("txId is null");
            }
            return getResponseContext(requestCtx, new DataSet(), cmdViewMap);
        }
//        onlineCtx.setAttribute("__CONTEXT_PATH__", request.getContextPath());
        
        //업무처리에 필요한 정보를 HttpServletRequest로 부터 UserInfo에 넣는다. 
        CommonInfoParse.commonInfoIntoUserInfo(request, onlineCtx);
        IDataSet responseData = (IDataSet) locator.getServiceDelegator(txId).delegate(txId, requestData, onlineCtx);
        
        IResultMessage result = responseData.getResultMessage();
        
        if (result.getStatus() == IResultMessage.FAIL) { // 실패인 경우
        	// IUserInfo 를 Session 에서 날린다.
            if (request != null) {
                if (session != null) {
                    session.removeAttribute(Constants.USER);
                }
            }
        } else { // 성공인 경우
        	// 로그인 성공한 경우에는 추가정보를 IUserInfo 에 Setting 한다. 
	        if (logger.isDebugEnabled()) {
	            logger.debug("invoke Biz. Component with successfully.\n" + responseData);
	        }
	        
	        // 인증결과를 Session 에 저장한다.
	        if (request != null) {
	            if (session != null) {
	                session.setAttribute(Constants.USER, (AmsUserInfo)onlineCtx.getUserInfo());
	            }
	        }	        
        }
        
		return getResponseContext(requestCtx, responseData, cmdViewMap);
	}
}
