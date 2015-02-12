package ams.fwk.channel.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import nexcore.framework.core.data.IValueObject;
import nexcore.framework.core.log.LogManager;
import nexcore.framework.online.channel.core.IRequestContext;
import nexcore.framework.online.channel.core.IResponseContext;
import nexcore.framework.online.channel.core.RenderException;
import nexcore.framework.online.channel.web.JSONView2;

import org.apache.commons.logging.Log;

import ams.fwk.data.json.AmsJsonProcessor;

/**
 * @author 박세일
 * JSONView2에서 호출하는 JsonProcessor에 customizing할 내용이 있어 EmkJsonProcessor를 생성하고 JSONView2를 상속받음.
 */
public class AmsJSONView extends JSONView2 {

	private AmsJsonProcessor jsonProcessor;
	private Log logger = LogManager.getFwkLog();
	public void setJsonProcessor(AmsJsonProcessor jsonProcessor) {
		this.jsonProcessor = jsonProcessor;
	}

	public AmsJSONView(String target) {
		super(target);
	}
	
	@Override
	public void render(IRequestContext requestCtx, IResponseContext responseCtx) throws RenderException {
		 IValueObject resultData = responseCtx.getBizData();
	        
	        JSONObject responseJson  = jsonProcessor.getResponseJson(resultData, responseCtx.getOnlineContext());
	        String rawString = responseJson.toString();
	        
//	        Document responseDoc = new Document(responseElm);
//	        String rawXml = JdomUtil.JDOMDocument2String(responseDoc, encoding);
	        
	        if (logger.isDebugEnabled()) {
	            logger.debug("Response JSON is below.\n"  + rawString);
	        }
	        
	        //
	        // JSON 문자열을 클라이언트에게 보내준다.
	        //
	        
	        HttpServletResponse response = (HttpServletResponse) responseCtx.getWriteProtocol();
	        response.setContentType("application/json;charset=UTF-8");
	        
	        response.setHeader("Pragma", "no-cache");            // Http1.0
	        response.setHeader("Cache-Control", "no-cache");     // Http1.1
	        response.setDateHeader("Expires", 0);

	        PrintWriter out = null;
	        
	        try {
	            out = response.getWriter();
	        } catch (IOException e) {
	            if (logger.isErrorEnabled()) {
	                logger.error("Exception occurred while writing json to HttpServletResponse.", e);
	            }
	            
	            e.printStackTrace();
	            
	            throw new RenderException("SKFS1011", new String[] {e.getLocalizedMessage()}, e);
	        } 
	        
	        out.write(rawString);
	        out.close();
	}
	

}
