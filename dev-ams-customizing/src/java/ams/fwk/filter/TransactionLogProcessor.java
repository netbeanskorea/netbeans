package ams.fwk.filter;

import java.util.ArrayList;
import java.util.List;

import nexcore.framework.core.data.DataSet;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IValueObject;
import nexcore.framework.core.exception.BaseException;
import nexcore.framework.core.exception.SystemRuntimeException;
import nexcore.framework.core.log.LogManager;
import nexcore.framework.core.service.filter.AbsServiceFilter;
import nexcore.framework.core.service.filter.IServiceFilterChain;
import nexcore.framework.coreext.pojo.biz.base.BizComponentCaller;

import org.apache.commons.logging.Log;

import ams.fwk.common.TrtmRsltMsg;
import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.utils.MessageUtils;

public class TransactionLogProcessor extends AbsServiceFilter {

	private String componentFqId;
    private String trLogMethodName;
    private String errLogMethodName;
    
    private Log log;
    private boolean availableTrLog;
    private boolean availableErrLog;

    public void setComponentFqId(String componentFqId) {
        this.componentFqId = componentFqId;
    }

    public void setTrLogMethodName(String trLogMethodName) {
        this.trLogMethodName = trLogMethodName;
    }

    public void setErrLogMethodName(String errLogMethodName) {
        this.errLogMethodName = errLogMethodName;
    }
    
    public void init(){
        if (componentFqId != null && componentFqId.trim().length() > 0) {
            availableTrLog = trLogMethodName != null && trLogMethodName.trim().length() > 0;
            availableErrLog = errLogMethodName != null && errLogMethodName.trim().length() > 0;
        }
        log = LogManager.getFwkLog();
        log.info("["+ desc  + "] : componentFqId=" + componentFqId + ", trLogMethodName=" + trLogMethodName + ", errLogMethodName=" + errLogMethodName);
    }
    
	@Override
	public IValueObject doFilter(IValueObject requestData,IOnlineContext onlineCtx, IServiceFilterChain chain) throws BaseException {
		 // IDataSet으로 받는다고 간주
        IDataSet requestDataSet = null;
        IDataSet responseDataSet = null;
        boolean isSuccess = false;
        try {
            responseDataSet = (IDataSet)chain.doFilter(requestData, onlineCtx);
            isSuccess = true;
            
            requestDataSet = (IDataSet)requestData;

            //거래로그 호출
            if(availableTrLog){
                IDataSet logDataSet = new DataSet();
                logDataSet.putField("requestDataSet", requestDataSet);
                logDataSet.putField("responseDataSet", responseDataSet);
                BizComponentCaller.callBizComponentByDirect(null, BizComponentCaller.lookupSharedBizComponent(null, componentFqId), trLogMethodName, logDataSet, onlineCtx);
            }
        } catch(Exception e){
            // 거래로그 호출 중 에러
            if(isSuccess){
                //sequence 결번확인을 위한 로그처리
                LogManager.getFwkLog().error("trlog fail!!! guid=" + onlineCtx.getTransaction().getRequestId(), e);
            }

            //에러로그 호출
            if(availableErrLog){
            	AmsUserInfo userInfo = (AmsUserInfo)onlineCtx.getUserInfo();
            	List<TrtmRsltMsg>msgList = userInfo.getMsgList();
            	if(msgList == null || userInfo.getMsgCnt() < 1){
            		userInfo.setMsgList(new ArrayList<TrtmRsltMsg>(10));
        	    	MessageUtils.addMessage(userInfo.getMsgList(), e);
    	    	}
    	    	
                try{
                    IDataSet logDataSet = new DataSet();
                    logDataSet.putField("requestDataSet", requestDataSet);
                    logDataSet.putField("responseDataSet", responseDataSet);
                    logDataSet.putField("isTrLogError", isSuccess);
                    logDataSet.putField("exception", e);
                    BizComponentCaller.callBizComponentByDirect(null, BizComponentCaller.lookupSharedBizComponent(null, componentFqId), errLogMethodName, logDataSet, onlineCtx);
                }catch(Exception ex){
                    LogManager.getFwkLog().error("error trlog fail!!! guid=" + onlineCtx.getTransaction().getRequestId(), ex);
                }
            }
            
            if(e instanceof RuntimeException ){
                throw (RuntimeException)e;
            }
            else{
                throw new SystemRuntimeException("SKFS1005", e);
            }
        }
        return responseDataSet;
	}
}
