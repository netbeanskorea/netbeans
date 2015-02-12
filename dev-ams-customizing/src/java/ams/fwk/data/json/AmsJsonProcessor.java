package ams.fwk.data.json;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import nexcore.framework.core.ServiceConstants;
import nexcore.framework.core.component.IBizComponentMetaDataRegistry;
import nexcore.framework.core.component.IDataSetMetaData;
import nexcore.framework.core.component.IIoMetaData;
import nexcore.framework.core.component.IMethodIoFieldMetaData;
import nexcore.framework.core.component.IMethodMetaData;
import nexcore.framework.core.component.IRecordSetMetaData;
import nexcore.framework.core.component.internal.FieldMetaData;
import nexcore.framework.core.component.internal.RecordSetMetaData;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecord;
import nexcore.framework.core.data.IRecordHeader;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.IValueObject;
import nexcore.framework.core.data.RecordHeader;
import nexcore.framework.core.data.RecordSet;
import nexcore.framework.core.data.json.JsonProcessor;
import nexcore.framework.core.ioc.ComponentRegistry;
import nexcore.framework.core.log.LogManager;
import nexcore.framework.core.message.IMessage;
import nexcore.framework.core.message.IMessageManager;
import nexcore.framework.core.util.BaseUtils;

import org.apache.commons.logging.Log;

import ams.fwk.common.user.AmsUserInfo;
import ams.fwk.constants.Constants;

/**
 * @author 박세일(2013.03.13)
 *AmsUserInfo 에 담겨있는 사용자 권한을 UI로 보내기 위한 작업을 하기 위해 상속을 받아 처리를 하려고 하였으나,
 *부모 클래스의 상당수의 메소드들이 private으로 묶여 있어 해당 메소드들은 그대로 복사하여 사용하도록 함.
 */
public class AmsJsonProcessor extends JsonProcessor {
	private Log         logger                                = LogManager.getFwkLog();
	public static final String ELM_MENU_INFO = "__MENU_INFO__";
	public static final String ELM_ROLE_INFO = "__ROLE_INFO__";
	public static final String ELM_MENU_TIMESTAMP = "__MENU_TIMESTAMP__";
	public static final String ELM_GUID = "__GUID__";
	public static final String ELM_PRD_GRD_INFO = "__PRD_GRD_INFO__";
	public static final String ELM_NOTICE_INFO = "__NOTICE_INFO__";
	@Override
	public JSONObject getResponseJson(IValueObject resultData,IOnlineContext onlineCtx) {
		JSONObject responseObj = new JSONObject();

		// <transaction>
		responseObj.put(ELM_TX, getResponseTransactionJson(onlineCtx));

		//    	 <attributes>
		//    	responseObj.put(ELM_ATTRIBUTES, getResponseAttributesJson(onlineCtx));

		if (resultData == null) {
			return responseObj;
		}
		AmsUserInfo userInfo  = (AmsUserInfo)onlineCtx.getUserInfo();
		
		 /*
		  * EmkUserInfo를 HTTPSession에 담고 다니기 때문에 전 거래에 대한 메시지가 남아있는 것을 방지하고자 추가함. (2013.05.02 by PSI)
		  */
		 userInfo.refreshMsg();
		 userInfo.removeFileSeqNo();
		 userInfo.removeFileSeqNoList();
		 
//		json.put("AUTH", "A");
//		json.put("T", new String[] {"1", "2", "3"});
//		hResponse.addHeader("EMK_AUTH", json.toString());
		JSONObject dsObj = getResponseDataSetJson(resultData, onlineCtx);
		responseObj.put(ELM_DS, dsObj);
		responseObj.put(ELM_ROLE_INFO, userInfo.getAmsRoleInfo());
		responseObj.put(ELM_MENU_TIMESTAMP, userInfo.getMenuTimeStamp());
		responseObj.put(ELM_GUID, onlineCtx.getTransaction().getRequestId());
		responseObj.put(ELM_PRD_GRD_INFO, userInfo.getPrdGrdInfo());
		
		List noticeList = userInfo.getNoticeList();
		ArrayList clonedNoticeList = null;
		if(noticeList != null) {
			clonedNoticeList = new ArrayList(noticeList);
			responseObj.put(ELM_NOTICE_INFO, clonedNoticeList.clone());
			userInfo.removeNoticeList();//userInfo에 있는 notice list를 삭제한다.
		}
		
		Object obj = onlineCtx.getAttribute(Constants.IS_NEW_MENU);
		boolean isNewMenu = false;
		if(obj != null) {
			isNewMenu = (Boolean)obj;
		}
		if(isNewMenu) {
			responseObj.put(ELM_MENU_INFO, userInfo.getAmsMenuInfo());
		}
		return responseObj;
	}
	
    /**
     * IDataSet으로 부터 JSON 객체를 생성한다.
     */
    private JSONObject getResponseDataSetJson(IValueObject resultData, IOnlineContext onlineCtx) {
        String txId = onlineCtx.getTransaction().getTxId();

        // ---------------------------------------------------------------------
        // ComponentMetaData가 null 인 경우, IResultMessage만 존재할 수 있으므로
        // IResultMessage Element 생성 부분을 제일 먼저 수행함
        // ---------------------------------------------------------------------

        JSONObject dataSetObj = new JSONObject(); // <dataSet>

        // <dataSet> -- <message> 추가
        IResultMessage msg = resultData.getResultMessage();
        if (msg != null){
        	dataSetObj.put(ELM_DS_MSG, getResponseResultMessageJson(msg, onlineCtx));
        }

        IBizComponentMetaDataRegistry compRegistry = (IBizComponentMetaDataRegistry) ComponentRegistry.lookup(ServiceConstants.COMPONENT_METADATA_REGISTRY);
        IMethodMetaData mmd = compRegistry.getMethodMetaData(txId);
        if (mmd == null) { // IMethodMetaData가 존재하지 않으므로
            failToGetMethodMetaData(compRegistry, txId);
            return dataSetObj; // 더 아래 코드는 더 이상 수행하지 않음
            // TODO 그냥 리턴하지 말고 exception을 내야 하나?
        }

        IIoMetaData metaData = mmd.getOutputIoMetaData();
        if (metaData == null) {
            // IDataSetMetaData가 존재하지 않으면 아래 코드는 더 이상 수행하지 않음
            return dataSetObj;
        }

        if (metaData.getMetaDataType() == IIoMetaData.DATASET) {
            if (mmd.isFixedLengthed()) { // fixed length
                processDataSetFl(dataSetObj, (IDataSetMetaData) metaData, (IDataSet) resultData);
            } else {
                processDataSet(dataSetObj, (IDataSetMetaData) metaData, (IDataSet) resultData);
            }
        } else if (metaData.getMetaDataType() == IIoMetaData.OBJECT) {
//            processObject(dataSetElm, (IObjectMetaData) metaData, resultData);
        	throw new RuntimeException("Can not supprot OBJECT meta data type.");
        }

        return dataSetObj;
    }

    
    /**
     * IResultMessage로 부터 JSON 객체를 생성한다.
     */
    private JSONObject getResponseResultMessageJson(IResultMessage resultMsg, IOnlineContext onlineCtx) {

        // <message>
    	JSONObject resultMsgObj = new JSONObject(); // <message>

        // <message> - <result>
    	resultMsgObj.put(ELM_DS_MSG_RESULT, resultMsg.getStatus() == IResultMessage.OK ? IResultMessage.STR_OK : IResultMessage.STR_FAIL);

        // <message> - <messageId>
    	resultMsgObj.put(ELM_DS_MSG_ID, resultMsg.getMessageId());

        IMessageManager msgMGR = (IMessageManager) ComponentRegistry.lookup(ServiceConstants.MESSAGE);
        IMessage msgObj = msgMGR.getMessage(resultMsg.getMessageId(), onlineCtx.getUserInfo().getLocale());

        // <message> - <messageName>
        resultMsgObj.put(ELM_DS_MSG_NAME, msgObj.getName(resultMsg.getMessageParams()));

        // <message> - <messageReason> // <messageReason>
        resultMsgObj.put(ELM_DS_MSG_REASON, msgObj.getReason());

        // <message> - <messageRemark>
        resultMsgObj.put(ELM_DS_MSG_REMARK, msgObj.getRemark());

        // <message> - <recordSetId>
        String recordSetId = resultMsg.getErrorRecordSetId();
        if (recordSetId != null) {
        	resultMsgObj.put(ELM_DS_MSG_RECORDSET_ID, recordSetId);
        }

        // <message> - <recordId>
        String recordId = resultMsg.getErrorRecordId();
        if (recordId != null) {
        	resultMsgObj.put(ELM_DS_MSG_RECORD_ID, recordId);
        }
        
        // <message> - <affectedRowCount>
        int i = resultMsg.getAffectedRowCount();
        if (i >= 0) {
        	resultMsgObj.put(ELM_DS_MSG_AFFECTED_ROW_CNT, String.valueOf(i));
        }

        // <message> - <exceptionStackTrace>
        Throwable th = resultMsg.getThrowable();
        // 개발모드일 경우에만 예외 Trace 정보를 제공함.
        if (BaseUtils.isDevelopmentMode() && th != null) {
        	StringWriter sw = new StringWriter();
            th.printStackTrace(new PrintWriter(sw));
        	resultMsgObj.put(ELM_DS_MSG_EXCEPTION, sw.toString());
        }

        return resultMsgObj;
    }
    
    
    /**
     * IDataSet으로 부터 JSON 객체를 생성한다.
     */
    private void processDataSet(JSONObject dataSetObj, IDataSetMetaData dsMetaData, IDataSet resultDataSet) {
//    	JSONObject fieldsObj = new JSONObject();
    	JSONObject recordSetsObj = new JSONObject();

		// <dataSet> -- <fields> 추가
		List fieldMdList = dsMetaData.getFieldMetaDataList(); 
		dataSetObj.put(ELM_DS_FIELDS, getResponseFieldsJson(resultDataSet, fieldMdList));
		
		// <dataSet> -- <recordSet> 추가
		List rsmdList = dsMetaData.getRecordSetMetaDataList();
		if (rsmdList == null || rsmdList.size() == 0) {
			// Component RecordSet Meta 정보가 없을 경우...
			Iterator recordSets = resultDataSet.getRecordSets();
			while (recordSets.hasNext()) {
				IRecordSet recordSet = (IRecordSet)recordSets.next();
				JSONObject rSetObj = getResponseRecordSetJson(recordSet);
				recordSetsObj.put(recordSet.getId(), rSetObj);
			}
		} else {
			// Component RecordSet Meta 정보가 존재하는 경우...
			for (int i = 0; i < rsmdList.size(); i++) {
				// DOWNGRADED TO JAVA 1.4 - BEFORE :
				IRecordSetMetaData rsmd = (IRecordSetMetaData) rsmdList.get(i);
				JSONObject rSetObj = getResponseRecordSetJson(resultDataSet.getRecordSet(rsmd.getId()), rsmd);
				recordSetsObj.put(rsmd.getId(), rSetObj);
			}
		}
		
//    	dataSetObj.put(ELM_DS_FIELDS, fieldsObj); // <fields>
    	dataSetObj.put(ELM_DS_RECORDSETS, recordSetsObj); // <recordSets>
	}

    /**
     * IDataSet 내 Fields 영역으로 부터 JSON 객체를 생성한다.
     */
    private JSONObject getResponseFieldsJson(IDataSet resultDataSet, List fieldMDList) {
    	JSONObject fieldsObject = new JSONObject();
    	
    	// 메타정보가 존재하지 않는 경우에는 DataSet의 전체 항목을 처리함.
        if (fieldMDList == null || fieldMDList.size() == 0) {
            Iterator keyIter = resultDataSet.getFieldKeys();

            while (keyIter.hasNext()) {
                String key = (String) keyIter.next();
                String[] values = resultDataSet.getFieldValues(key);
                if (values == null) {
                	fieldsObject.put(key, JSONNull.getInstance());
                }
                else {
                	for(String value : values){
                    	fieldsObject.put(key, value == null ? JSONNull.getInstance() : value);
                    }
                }
            }
        } else {
            for (int i = 0; i < fieldMDList.size(); i++) {
                IMethodIoFieldMetaData mIoFMData = (IMethodIoFieldMetaData) fieldMDList.get(i);
                String[] values = resultDataSet.getFieldValues(mIoFMData.getId());
                if (values == null) {
                	fieldsObject.put(mIoFMData.getId(), JSONNull.getInstance());
                } else {
                    for(String value : values){
                    	fieldsObject.put(mIoFMData.getId(), value);
                    }
                }
            }
        }

        return fieldsObject;
    }
    
    /**
     * fixed length 기반으로 DataSet을 JSON 객체로 변환한다.
     */
    private void processDataSetFl(JSONObject dataSetObj, IDataSetMetaData dsMetaData, IDataSet resultDataSet) {
    	JSONObject fieldsObj = new JSONObject();
    	JSONObject recordSetsObj = new JSONObject();
    	
    	Iterator fmds = dsMetaData.getFlMetaDataList().iterator();
		while(fmds.hasNext()) {
			Object md = fmds.next();
			if (md instanceof FieldMetaData) {
				// #### 필드 처리.
				FieldMetaData fmd = (FieldMetaData)md;
				// fixed length 이므로 getFieldValues()호출할 필요없음
				String value = resultDataSet.getField(fmd.getId());
				fieldsObj.put(fmd.getId(), value == null ? JSONNull.getInstance() : value);
			} else if (md instanceof RecordSetMetaData) {
				// #### RecordSet 처리.
				IRecordSetMetaData rsmd = (IRecordSetMetaData)md;
				IRecordSet rs = resultDataSet.getRecordSet(rsmd.getId());
				if (rs == null) {
					continue;
				}
				JSONObject rSetObj = getResponseRecordSetJson(resultDataSet.getRecordSet(rsmd.getId()), rsmd);
				recordSetsObj.put(rsmd.getId(), rSetObj);
			}
		}
		
    	dataSetObj.put(ELM_DS_FIELDS, fieldsObj); // <fields>
    	dataSetObj.put(ELM_DS_RECORDSETS, recordSetsObj); // <recordSets>
	}
    
    /**
     * IRecordSet 객체 내용을 JSON 객체로 변환한다.
     */
    private JSONObject getResponseRecordSetJson(IRecordSet recordSet) {
    	JSONObject recordSetObj = new JSONObject();
    	JSONArray recordSetListObj = new JSONArray();

        if (recordSet == null) { // 기존 코드 recordSet != null
            return recordSetObj;
        }
        
        recordSetObj.put(ELM_DS_RECORDSET_NC_RECORD_CNT, String.valueOf(recordSet.getRecordCount()));  // <recordCount>
        recordSetObj.put(ELM_DS_RECORDSET_NC_PAGE_NO, String.valueOf(recordSet.getPageNo())); // <pageNo>
        recordSetObj.put(ELM_DS_RECORDSET_NC_RECORD_CNT_PER_PAGE, String.valueOf(recordSet.getRecordCountPerPage())); // <recordCountPerPage>
        recordSetObj.put(ELM_DS_RECORDSET_NC_TOTAL_RECORD_CNT, String.valueOf(recordSet.getTotalRecordCount())); // <totalRecordCount>

        for (int i = 0; i < recordSet.getRecordCount(); i++) {
            IRecord record = recordSet.getRecord(i);
        	JSONObject recordObj = new JSONObject();
            int recordSize = record.size(); // IRecord 컬럼(Field) 갯수
            for (int k = 0; k < recordSize; k++) {
                IRecordHeader header = recordSet.getHeader(k);
                Object o = record.getObject(k);
                if(o instanceof IRecordSet){
                    recordObj.put(header.getName(), getResponseRecordSetJson((IRecordSet)o));
                }
                else{
                	Object v =  record.get(k);
                	recordObj.put(header.getName(), v == null ? JSONNull.getInstance() : v);
                }
            }
            recordSetListObj.add(recordObj);
        }

        recordSetObj.put(ELM_DS_RECORDSET_NC_LIST, recordSetListObj);
        return recordSetObj;
    }
    
    /**
     * IRecordSetMetaData 내용을 참조하여 IRecordSet 객체 내용을JSON 객체로 변환한다.
     */
    private JSONObject getResponseRecordSetJson(IRecordSet recordSet, IRecordSetMetaData rsmd) {
    	JSONObject recordSetObj = new JSONObject();
    	JSONArray recordSetListObj = new JSONArray();

        if (recordSet == null) { // 기존 코드 recordSet != null
            return recordSetObj;
        }
        
        recordSetObj.put(ELM_DS_RECORDSET_NC_RECORD_CNT, String.valueOf(recordSet.getRecordCount()));  // <recordCount>
        recordSetObj.put(ELM_DS_RECORDSET_NC_PAGE_NO, String.valueOf(recordSet.getPageNo())); // <pageNo>
        recordSetObj.put(ELM_DS_RECORDSET_NC_RECORD_CNT_PER_PAGE, String.valueOf(recordSet.getRecordCountPerPage())); // <recordCountPerPage>
        recordSetObj.put(ELM_DS_RECORDSET_NC_TOTAL_RECORD_CNT, String.valueOf(recordSet.getTotalRecordCount())); // <totalRecordCount>

        List recordFmdList = rsmd.getFieldMetaDataList();
        for (int i = 0; i < recordSet.getRecordCount(); i++) {
            IRecord record = recordSet.getRecord(i);
        	JSONObject recordObj = new JSONObject();
            for (int k = 0; k < recordFmdList.size(); k++) {
                Object metadata = recordFmdList.get(k);
                
                if(metadata instanceof IMethodIoFieldMetaData){
                    IMethodIoFieldMetaData fmd = (IMethodIoFieldMetaData)metadata;
                    // IRecordSet 내 Header Name이 존재하는 경우만 headerElm 내 값을 설정
                    if (recordSet.getHeaderIndex(fmd.getId()) != -1) { // Header
                    	String value = record.get(fmd.getId());
                    	recordObj.put(fmd.getId(), value == null ? JSONNull.getInstance() : value);            	
                    }
                    else {
                    	recordObj.put(fmd.getId(), JSONNull.getInstance());      
                    }
                }
                else if(metadata instanceof IRecordSetMetaData){
                    IRecordSetMetaData childRsmd = (IRecordSetMetaData)metadata;
                    recordObj.put(childRsmd.getId(), getResponseRecordSetJson(record.getRecordSet(childRsmd.getId()), childRsmd));
                } else {
                    throw new RuntimeException("IoMetaData error. Invalid class=" + rsmd.getClass() + "");
                }
            }
            recordSetListObj.add(recordObj);
        }

        recordSetObj.put(ELM_DS_RECORDSET_NC_LIST, recordSetListObj);
        return recordSetObj;
    }
    
    private void processRequestDataSetRecordSets(JSONObject recordSetsObj, IDataSet ds){
    	Iterator<Entry<String, JSONObject>> entrys = recordSetsObj.entrySet().iterator();
		while(entrys.hasNext()){
			Entry<String, JSONObject> entry = entrys.next();
			IRecordSet recordSet = getRecordSet(entry.getKey(), entry.getValue().getJSONArray(ELM_DS_RECORDSET_NC_LIST));
			if(recordSet != null){
				ds.putRecordSet(recordSet);
			}
		}
    }
    
    private IRecordSet getRecordSet(String recordSetId, JSONArray recordSetListObj){
    	if(recordSetListObj.size() < 1){
			return null;
		}
		
		IRecordSet recordSet = new RecordSet(recordSetId);

		for(int i=0; i<recordSetListObj.size(); i++){
			JSONObject recordObj = (JSONObject)recordSetListObj.get(i);
			
			// 헤더 생성
			if(i == 0){
				Iterator<String> columnNames = recordObj.keys();
				while(columnNames.hasNext()){
					recordSet.addHeader(new RecordHeader(columnNames.next()));
				}
			}
			
			IRecord record = recordSet.newRecord();
			
			Iterator<Entry<String, Object>> columns = recordObj.entrySet().iterator();
			while(columns.hasNext()){
				Entry<String, Object> column = columns.next();
				String columnName = column.getKey();
				Object columnValue = column.getValue();
				
				if(columnValue == null){
					record.set(columnName, columnValue);
				}
				else if(columnValue instanceof JSONObject){
					JSONObject jColumnValue = (JSONObject)columnValue;
					if(jColumnValue.isNullObject()){
						record.set(columnName, (String)null);
					}
					else {
						Set<Entry<String, JSONObject>> childEntrySet = jColumnValue.entrySet();
						if(childEntrySet.size() == 1){
							Iterator<Entry<String, JSONObject>> childEntrys = childEntrySet.iterator();
							Entry<String, JSONObject> childEntry = childEntrys.next();
							IRecordSet childRecordSet = getRecordSet(childEntry.getKey(), childEntry.getValue().getJSONArray(ELM_DS_RECORDSET_NC_LIST));
							if(childRecordSet != null){
								record.set(columnName, childRecordSet);
							}
						}
//						else if(childEntrySet.size() > 1){
//							throw new RuntimeException("");
//						}
					}
				}
				else {
					record.set(columnName, columnValue);
				}
			}
		}
		
		return recordSet;
	}
    
    private void processRequestDataSetFields(JSONObject fieldsObj, IDataSet ds) {
		Iterator<Entry<String, Object>> entrys = fieldsObj.entrySet().iterator();
		while(entrys.hasNext()){
			Entry<String, Object> entry = entrys.next();
//			if(entry.getValue() != null && entry.getValue() instanceof JSONArray){
//				JSONArray fieldArray = (JSONArray)entry.getValue();
//				String[] values = new String[fieldArray.size()];
//				for(int i=0; i<fieldArray.size(); i++){
//					values[i] = fieldArray.getString(i);
//				}
//				ds.putField(entry.getKey(), values);
//			}
//			else {
//				ds.putField(entry.getKey(), getJSONValue(entry.getValue()));
//			}
			ds.putField(entry.getKey(), getJSONValue(entry.getValue()));
		}
    }

    
    private void failToGetMethodMetaData(IBizComponentMetaDataRegistry mdRegistry, String txId){
        StringBuffer sb = new StringBuffer();
        sb.append("\nCould not Found MethodMetaData from MetaDataRegistry with txId = " + txId + "\n");
        // DOWNGRADED TO JAVA 1.4 - BEFORE :
        // List<IComponentMetaData> mdList = mdRegistry.getAllComponentMetaData();
        List mdList = mdRegistry.getAllComponentMetaData();
        if (mdList == null){
            sb.append("Where the Registry has not initiated!");
        }else{
            sb.append("Where the Registry has " + mdList.size() + " ComponentMetaData.");
        }
        logger.info(sb.toString());
    }
    
    private Object getJSONValue(Object value){
    	if(value == null){
    		return value;
    	}
		if(value instanceof JSONArray){
			JSONArray fieldArray = (JSONArray)value;
			return fieldArray.toArray(new String[fieldArray.size()]);
		}
		else if(value instanceof JSONObject){
			JSONObject jObject = (JSONObject)value;
			return jObject.isNullObject() ? null : value.toString();
		}
		else {
			return value.toString();
		}
	}
    
}
