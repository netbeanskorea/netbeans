package ams.fwk.resolver;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import nexcore.framework.core.data.IChannel;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IOnlineContextAttributeCloneable;
import nexcore.framework.core.data.IRuntimeContext;
import nexcore.framework.core.data.ITerminal;
import nexcore.framework.core.data.ITransaction;
import nexcore.framework.core.data.OnlineContext;
import nexcore.framework.core.data.user.IUserInfo;
import nexcore.framework.coreext.pojo.resolver.impl.DefaultOnlineContextResolver;
import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.constants.Constants;
import ams.fwk.utils.AmsUtils;

public class AmsOnlineContextResolver extends DefaultOnlineContextResolver {

	 /**
     * 연동을 위해서 OnlineContext를 복제한다.
     *
     * @param callerOnlineCtx 현재 OnlineContext
     * @param txId 연동대상 거래코드
     * @param async 비동기여부
     * @param delayAsync 지연비동기여부
     * @param asyncKey 비동기아이디
     * @return 복제된 OnlineContext
     */
    protected IOnlineContext clone(IOnlineContext callerOnlineCtx, String txId, boolean async, boolean delayAsync, String asyncKey) {
        
        // **** ITransaction
        ITransaction transaction       = cloneTransaction(callerOnlineCtx, txId, async, delayAsync, asyncKey);
        
        // **** IChannel
        IChannel channel               = cloneChannel(callerOnlineCtx, txId, async, delayAsync, asyncKey);
        
        // **** ITerminal
        ITerminal terminal             = cloneTerminal(callerOnlineCtx, txId, async, delayAsync, asyncKey);

        // **** IRuntimeContext
        IRuntimeContext runtimeContext = cloneRuntimeContext(callerOnlineCtx, txId, async, delayAsync, asyncKey);

        // **** IUserInfo
        IUserInfo userInfo             = cloneUserInfo(callerOnlineCtx, txId, async, delayAsync, asyncKey);

        // **** IOnlineContext
        IOnlineContext calleeOnlineCtx = new OnlineContext(transaction, userInfo, runtimeContext, channel, terminal);
        
        // 부가 복제.
        cloneAdditional(callerOnlineCtx, calleeOnlineCtx, async, delayAsync, asyncKey);
        
        // 부가 항목 복제.
        cloneAttributes(callerOnlineCtx, calleeOnlineCtx);
        
        return calleeOnlineCtx;
    }
    
    /**
     * IUserInfo 복제
     * 
     *
     * @param callerOnlineCtx 현재 OnlineContext
     * @param txId 연동대상 거래코드
     * @param async 비동기여부
     * @param delayAsync 지연비동기여부
     * @param asyncKey 비동기아이디
     * @return 복제된 IUserInfo
     */
    protected IUserInfo cloneUserInfo(IOnlineContext callerOnlineCtx, String txId, boolean async, boolean delayAsync, String asyncKey){
        if(callerOnlineCtx.getUserInfo() instanceof IOnlineContextAttributeCloneable){
            IOnlineContextAttributeCloneable obj = (IOnlineContextAttributeCloneable)callerOnlineCtx.getUserInfo();
            return (AmsUserInfo)obj.cloneAttribute();
        }
        else {
            AmsUserInfo oriUserInfo = (AmsUserInfo)callerOnlineCtx.getUserInfo();
            AmsUserInfo copyUserInfo = new AmsUserInfo();
            AmsUtils.cloneUserInfoToOnlineCtxUserInfo(oriUserInfo.getMap(), copyUserInfo);
            return copyUserInfo;
        }
    }
    
    /**
     * 연동거래, 비동기 연동거래, 지연 비동기 연동거래를 호출하기 위해서 OnlineContext의 Attribute를 복제한다.
     * 복제 대상은 IOnlineContextAttributeCloneable 인터페이스를 구현한 Attribute만 해당된다. 
     *
     * @param callerOnlineCtx 현재 거래의 OnlineContext
     * @param calleeOnlineCtx 호출할 거래를 위해서 신규로 생성된 OnlineContext
     */
    private void cloneAttributes(IOnlineContext callerOnlineCtx, IOnlineContext calleeOnlineCtx){
        Map<String, Object> callerAttributesAll = callerOnlineCtx.getAttributesAll();
        if(callerAttributesAll != null){
            Iterator<Entry<String, Object>> callerEntrys  = callerAttributesAll.entrySet().iterator();
            while(callerEntrys.hasNext()){
                Entry<String, Object> callerEntry = callerEntrys.next();
                Object callerValue = callerEntry.getValue();
                if(callerValue != null && callerValue instanceof IOnlineContextAttributeCloneable){
                    calleeOnlineCtx.setAttribute(callerEntry.getKey(), ((IOnlineContextAttributeCloneable)callerValue).cloneAttribute());
                }
            }
        }
    }
    
    /**
     * SSO로 로그인이 될 경우는 SSO PM에서 업무로그인PM을 호출하는데 이때 SSO PM의 onlineCtx안에 로그인된 userInfo를 넘겨줘야 함. 
     */
    @Override
    protected void recoveryAdditional(IOnlineContext callerOnlineCtx, IOnlineContext calleeOnlineCtx) {
    	// TODO Auto-generated method stub
    	AmsUserInfo calleeUserInfo = (AmsUserInfo)calleeOnlineCtx.getUserInfo();
    	AmsUserInfo callerUserInfo = (AmsUserInfo)callerOnlineCtx.getUserInfo();
    	if(calleeUserInfo == null) {
    		return;
    	}
    	
    	AmsUtils.cloneUserInfoToOnlineCtxUserInfo(calleeUserInfo.getMap(), callerUserInfo);
    	callerOnlineCtx.setAttribute(Constants.IS_NEW_MENU, calleeOnlineCtx.getAttribute(Constants.IS_NEW_MENU));
    }
}
