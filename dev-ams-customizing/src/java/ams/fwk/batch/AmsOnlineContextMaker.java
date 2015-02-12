package ams.fwk.batch;

import java.util.Date;
import java.util.Locale;

import nexcore.framework.bat.IBatchContext;
import nexcore.framework.bat.base.IOnlineContextMaker;
import nexcore.framework.bat.base.impl.DefaultOnlineContextMaker;
import nexcore.framework.bat.util.Util;
import nexcore.framework.core.data.Channel;
import nexcore.framework.core.data.IChannel;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRuntimeContext;
import nexcore.framework.core.data.ITerminal;
import nexcore.framework.core.data.ITransaction;
import nexcore.framework.core.data.OnlineContext;
import nexcore.framework.core.data.RuntimeContext;
import nexcore.framework.core.data.Terminal;
import nexcore.framework.core.data.Transaction;
import nexcore.framework.core.log.LogManager;
import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.constants.DBNamingConstants;

public class AmsOnlineContextMaker implements IOnlineContextMaker {

	private static IOnlineContextMaker instance = new AmsOnlineContextMaker();
	
	public static IOnlineContextMaker getInstance() {
		return instance;
	}
	
	public void init() {
	}
	
	public void destroy() {
	}
	
	@Override
	public IOnlineContext makeOnlineContext(IBatchContext context) {
		IOnlineContext onlineCtx = null;

    	if (context.getJobExecution().isOnDemand() && context.getJobExecution().getOptionalData()!=null) { // (온디맨드일때는 OnlineContext를 재사용)
    		onlineCtx = (IOnlineContext)Util.bytesToObject(context.getJobExecution().getOptionalData());
    	}else {
    		// **** ITransaction
	        ITransaction transaction    = new Transaction(
	        		context.getJobExecution().getJobExecutionId(),     // request id
	        		context.getJobExecution().getJobId(),              // tx id
	        		false,                                             // is deferred
	        		new Date(context.getJobExecution().getStartTime()),// start time 
	        		true);                                             // is main
	
	        // **** IChannel
	        IChannel channel            = new Channel("BATCH", "BATCH", IChannel.PROTOCOL_OTHER, IChannel.MSG_XML); // 메세지 타입은 정확하지 않다.
	
	        // **** ITerminal
	        ITerminal terminal          = new Terminal("BATCH", "BATCH", 1000);

	        // **** IUserInfo
	        AmsUserInfo userInfo          = new AmsUserInfo();
	        userInfo.setIp( context.getOperatorIp());   // BATCH ADMIN IP를 여기에 밖는다.
	        userInfo.setLocale(Locale.getDefault());
	        userInfo.put(DBNamingConstants.USER_ID, context.getOperatorId());
	        
	
	        // **** IRuntimeContext
	        IRuntimeContext runtimeContext = new RuntimeContext(null, null);

	        onlineCtx = new OnlineContext(transaction, userInfo, runtimeContext, channel, terminal);
        }
    	
   		onlineCtx.setAttribute(LogManager.THIS_DEV_LOGGER_KEY, context.getLogger());

		return onlineCtx;
	}

}
