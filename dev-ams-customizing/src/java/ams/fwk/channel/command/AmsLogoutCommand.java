package ams.fwk.channel.command;

import javax.servlet.http.HttpServletRequest;

import nexcore.framework.core.ServiceConstants;
import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.exception.BaseException;
import nexcore.framework.core.exception.BaseRuntimeException;
import nexcore.framework.core.ioc.ComponentRegistry;
import nexcore.framework.core.service.IServiceComponentLocator;
import nexcore.framework.online.biz.auth.IAuthManager;
import nexcore.framework.online.channel.core.ICommandViewMap;
import nexcore.framework.online.channel.core.IRequestContext;
import nexcore.framework.online.channel.core.IResponseContext;
import nexcore.framework.online.channel.core.command.AbstractCommand;

public class AmsLogoutCommand extends AbstractCommand {

	@Override
	public IResponseContext execute(IRequestContext requestCtx, ICommandViewMap cmdViewMap)
			throws BaseException, BaseRuntimeException {
		
		IDataSet requestData = (IDataSet) requestCtx.getBizData();
        IOnlineContext onlineCtx = requestCtx.getOnlineContext();
        HttpServletRequest request = (HttpServletRequest)requestCtx.getReadProtocol();

        ///////////////////////////////////////
        // 로그아웃 처리 비즈니스로직을 호출한다. 	
        ///////////////////////////////////////
    	IServiceComponentLocator locator = (IServiceComponentLocator)ComponentRegistry
            .lookup("nc.DefaultComponentLocator");
        
        String txId = requestCtx.getOnlineContext().getTransaction().getTxId();
        
        if(txId == null){          
            if (logger.isDebugEnabled()) {
                logger.debug("txId is null");
            }
            return getResponseContext(requestCtx, new DataSet(), cmdViewMap);
        }

        IDataSet responseData = (IDataSet) locator.getServiceDelegator(txId).delegate(txId, requestData, onlineCtx);
        
        ///////////////////////////////////////
        IResultMessage result = responseData.getResultMessage();
        
        if (result.getStatus() == IResultMessage.FAIL) { // 실패인 경우
        	
        } else {                                         // 성공인 경우
        	IAuthManager authManager = (IAuthManager) ComponentRegistry.lookup(ServiceConstants.BIZ_AUTH);
            authManager.logout(requestCtx.getReadProtocol(), requestCtx.getWriteProtocol());
        }
        
		return getResponseContext(requestCtx, responseData, cmdViewMap);
	}

}
