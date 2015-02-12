package ams.fwk.channel.web;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import nexcore.framework.core.ServiceConstants;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordHeader;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.ITransaction;
import nexcore.framework.core.data.ResultMessage;
import nexcore.framework.core.ioc.ComponentRegistry;
import nexcore.framework.core.log.LogManager;
import nexcore.framework.core.message.IMessage;
import nexcore.framework.core.message.IMessageManager;
import nexcore.framework.online.channel.core.IRequestContext;
import nexcore.framework.online.channel.core.IResponseContext;
import nexcore.framework.online.channel.core.RenderException;
import nexcore.framework.online.channel.web.XPlatformView;

import org.apache.commons.logging.Log;

import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.constants.Constants;

import com.tobesoft.xplatform.data.DataTypes;
import com.tobesoft.xplatform.data.PlatformData;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformResponse;
import com.tobesoft.xplatform.tx.PlatformType;

/**
 * NEXCORE에서 제공하는 View인 XplatformView와 큰 차이는 없으나 
 * Xplatform용으로 데이터 전환하는 부분을 메소드로 분리하고 
 * 기타 AMS용 파라미터를 함께 넣어주기 위해 상속받아 처리함. 
 * @author 박세일
 *
 */
public class AmsXplatformView extends XPlatformView {

	private Log logger = LogManager.getFwkLog();
	public static final String ELM_MENU_INFO = "__MENU_INFO__";
	public static final String ELM_ROLE_INFO = "__ROLE_INFO__";
	public static final String ELM_MENU_TIMESTAMP = "__MENU_TIMESTAMP__";
	public static final String ELM_GUID = "__GUID__";
	public static final String ELM_PRD_GRD_INFO = "__PRD_GRD_INFO__";
	public static final String ELM_NOTICE_INFO = "__NOTICE_INFO__";
	
	@Override
	public void render(IRequestContext requestCtx, IResponseContext responseCtx) throws RenderException {
		
		HttpServletResponse httpResp = (HttpServletResponse)responseCtx.getWriteProtocol();
		IDataSet resp = (IDataSet)responseCtx.getBizData();
		ITransaction tr = requestCtx.getOnlineContext().getTransaction();
		IOnlineContext onlineCtx = responseCtx.getOnlineContext();
		AmsUserInfo userInfo = (AmsUserInfo)onlineCtx.getUserInfo();
		PlatformData xpData = new PlatformData();
		VariableList xpVars = xpData.getVariableList();
		
		//sets form variables
		xpVars.add(this.getTrIdVarName(), tr.getTxId());
		xpVars.add(this.getStartDateVarName(), tr.getStartTime());
		xpVars.add(this.getEndDateVarName(), tr.getEndTime());
		xpVars.add(ELM_ROLE_INFO, userInfo.getAmsRoleInfo());
		xpVars.add(ELM_MENU_TIMESTAMP, userInfo.getMenuTimeStamp());
		xpVars.add(ELM_GUID, onlineCtx.getTransaction().getRequestId());
		xpVars.add(ELM_PRD_GRD_INFO, userInfo.getPrdGrdInfo());
		
		Object obj = onlineCtx.getAttribute(Constants.IS_NEW_MENU);
		boolean isNewMenu = false;
		if(obj != null) {
			isNewMenu = (Boolean)obj;
		}
		if(isNewMenu) {
			xpVars.add(ELM_MENU_INFO, userInfo.getAmsMenuInfo());
		}
		
		
		IResultMessage resultMsg = (IResultMessage)(resp.getResultMessage());
		if(resultMsg == null){
			resultMsg = new ResultMessage(IResultMessage.FAIL, 
					"No message is set in the response dataset from server.", null);
		}
		
		//@fixme the following code should be enhanced to use dependency injection.
		IMessageManager msgMgr = (IMessageManager)(ComponentRegistry.lookup(ServiceConstants.MESSAGE));
		IMessage msg = msgMgr.getMessage(resultMsg.getMessageId(), requestCtx.getOnlineContext().getUserInfo().getLocale());
		String msgStr = msg.getName(resultMsg.getMessageParams());
		
		xpVars.add(this.getMsgIdVarName(), resultMsg.getMessageId());
		xpVars.add(this.getMsgVarName(), msgStr);
		
		//DataSet을 XPlatform parameter 양식으로 변환함.
		if(resultMsg.getStatus() == IResultMessage.OK){
			xpVars.add(this.getMsgFlagVarName(), "OK");
			xpVars.add(ERR_CODE_VARIABLE_NAME, "0");
			xpVars.add(ERR_MSG_VARIABLE_NAME, "OK");
			convertDataSetToXplatformDs(resp, xpData);
		} else{ // in case of failure at server application
			xpVars.add(this.getMsgFlagVarName(), "ERROR");
			xpVars.add(ERR_CODE_VARIABLE_NAME, "-1");
			xpVars.add(ERR_MSG_VARIABLE_NAME, "ERROR");
		}
		
		
		try{
			// request 의 타입을 판단하기 위해서 사용. (XML, BINARY, BINARY COMPRESS)
			HttpPlatformResponse xpResp = null;
			
			// BINARY, XML 여부에 따라서 Response 를 생성한다.
			if(PlatformType.CONTENT_TYPE_BINARY.equals(requestCtx.getOnlineContext().getAttribute("CONTENT_TYPE"))) // BINARY Response 생성
			{
				xpResp = new HttpPlatformResponse(httpResp, PlatformType.CONTENT_TYPE_BINARY, PlatformType.DEFAULT_CHAR_SET);
			}
			else // XML Response 생성
			{
				xpResp = new HttpPlatformResponse(httpResp, PlatformType.CONTENT_TYPE_XML, PlatformType.DEFAULT_CHAR_SET);
			}
			
			// COMPRESS Protocol Type을 추가한다.
			if(PlatformType.PROTOCOL_TYPE_ZLIB.equals(requestCtx.getOnlineContext().getAttribute("PROTOCOL_TYPE"))) // BINARY Response 생성
			{
				xpResp.addProtocolType(PlatformType.PROTOCOL_TYPE_ZLIB);
			}
						
			xpResp.setData(xpData);
			xpResp.sendData();
		}catch(Exception ex){
			logger.error("Exception at writing and sending response data", ex);
			throw new RenderException("SKFS1011", new String[] {ex.getLocalizedMessage()}, ex);
		}
	}
	
	/**
	 * DataSet을 XPlatform 양식으로 변환하기 위한 작업을 실시.
	 * @param resultMsg
	 * @param resp
	 * @param xpData
	 * @param xpVars
	 */
	protected void convertDataSetToXplatformDs(IDataSet resp, PlatformData xpData) {
		Set keys = null;
		com.tobesoft.xplatform.data.DataSet xpDataset = null;
		
		//convert field-map.
		Map fields = resp.getFieldMap();
		if(fields != null && fields.size() > 0){
			keys = fields.keySet();
			xpDataset = new com.tobesoft.xplatform.data.DataSet(this.getLinearDatasetName());
			byte []byteArrClass = {0x00};
		    String blobName = byteArrClass.getClass().getName();
			for(Object key: keys){ //builds column headers for XPlatform dataset
				Object value = fields.get((String)key);
				if(value == null || !blobName.equals(value.getClass().getName())){
					xpDataset.addColumn((String)key, DataTypes.STRING, 255);
				}
				else {
					xpDataset.addColumn((String)key, DataTypes.BLOB, 255);
				}
			}
			
			int no = xpDataset.newRow(); //this can be non-zero ?
			for(Object key: keys){ //appends a single row for XPaltform dataset
				Object value = fields.get((String)key);
				if(value == null || !blobName.equals(value.getClass().getName())){
					xpDataset.set(no, (String)key, value);
				}
				else {
					xpDataset.set(no, (String)key, (byte[])value);
				}
			}
			xpData.addDataSet(xpDataset);
		}
		
		//convert record-sets one after another
		Iterator recordSetIds = resp.getRecordSetIds();
		String recordSetId = null;
		IRecordSet recordSet = null;
		IRecord record = null;
		IRecordHeader header = null;
		while(recordSetIds.hasNext()){ //for each record-set
			recordSetId = (String)(recordSetIds.next());
			
			recordSet = resp.getRecordSet(recordSetId);
			xpDataset = new com.tobesoft.xplatform.data.DataSet(recordSetId);
			
			//builds headers for XPlatform dataset
			for(int i = 0, n = recordSet.getHeaderCount(); i < n; i++){
				header = recordSet.getHeader(i);
				
				xpDataset.addColumn(header.getName(), 
						this.getXPlatformDataType(header.getType()),
						this.getXPatformDataSize(header.getType()));
			}
			
			//builds rows for XPlatform dataset
			for(int i = 0, n = recordSet.getRecordCount(); i < n; i++){ //for each record
				record = recordSet.getRecord(i);
				
				int no = xpDataset.newRow();
				for(int j = 0, m = recordSet.getHeaderCount(); j < m; j++){ //for each column
					header = recordSet.getHeader(j);
					
					if(this.getXPlatformDataType(header.getType()) != DataTypes.BLOB)
					{
						xpDataset.set(no, header.getName(), record.get(j));
					}
					else
					{
						xpDataset.set(no, header.getName(), record.getByteArray(j));
					}
				}
			}
			xpData.addDataSet(xpDataset);
		}
	}
}
