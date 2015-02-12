/*
 * Copyright (c) 2006 SK C&C. All rights reserved.
 * 
 * This software is the confidential and proprietary information of SK C&C. You
 * shall not disclose such Confidential Information and shall use it only in
 * accordance wih the terms of the license agreement you entered into with SK
 * C&C.
 */

package ams.fwk.channel.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import nexcore.framework.core.Constants;
import nexcore.framework.core.log.LogManager;
import nexcore.framework.online.channel.core.IRequestContext;
import nexcore.framework.online.channel.core.IResponseContext;
import nexcore.framework.online.channel.core.RenderException;
import nexcore.framework.online.channel.web.AbstractWebView;

import org.apache.commons.logging.Log;

import ams.fwk.utils.BaseUtils;

import com.star.nexcore.foundation.util.StringUtils;

/**
 * <ul>
 * <li>업무 그룹명 : 금융 프레임워크 </li>
 * <li>서브 업무명 : 채널</li>
 * <li>설 명 : Web페이지를 포워딩하는 응답작성로직이다. 
 * <p>constructor로 설정된 url을 기본으로 하지만 request parameter에서 target을 지정할 경우
 * 이를 따른다. </p>
 * <p>url 앞에 "forward:" 를 붙이면 forward를, "redirect:" 를 붙이면 sendRedirect를 수행한다.
 * 설정하지 않으면 forward 이다. 
 * </p> </li>
 * <li>작성일 : 2007. 2. 24</li>
 * <li>작성자 : 김용석</li>
 * 
 * <li>설 명 : 엑셀 export시 properties에 저장된 엑셀export JSP에 forwarding하기 위해 수정. </li>
 * <li>수정일 : 2013. 4. 17</li>
 * <li>수정자 : 박세일</li>
 * 
 * </ul>
 */
public class AmsRequestView extends AbstractWebView {
    
    /**
     * Logger.
     */
    private Log logger = LogManager.getFwkLog();
    
    /**
     * Forward 될 Page.
     */
    private String target = null;
    
    public AmsRequestView(){
        this.target="/should/set/meaningful/page/for/view";
    }
    
    /**
     * Constructor.
     * @param target
     */
    public AmsRequestView(String target) {
        this.target = target;
    }
    
    private static String FORWARD_KEY = "forward:";
    
    private static String REDIRECT_KEY = "redirect:";

    /* (non-java)
     * @see nexcore.framework.online.channel.core.IView#render(nexcore.framework.online.channel.core.IRequestContext, nexcore.framework.online.channel.core.IResponseContext)
     */
    public void render(IRequestContext requestCtx, IResponseContext responseCtx) 
            throws RenderException {
        
        super.render(requestCtx, responseCtx);
        
        HttpServletRequest request = 
                (HttpServletRequest) responseCtx.getReadProtocol();
        
        HttpServletResponse response = 
                (HttpServletResponse) responseCtx.getWriteProtocol();
        
        /*
         * nc_target target 우선, 그 정보가 없을 경우 기존 설정 url을 따른다.
         * 정보가 있을 경우 properties에 저장된 path가 있는지 우선 점검 
         */
        String target = null;
        if (request.getParameter(Constants.TARGET) != null){
        	target = BaseUtils.getConfiguration(request.getParameter(Constants.TARGET));
        	if(StringUtils.isEmpty(target)) {
        		target = (String)request.getParameter(Constants.TARGET);
        	}
        }else {
            target = this.target;
        }

        /*
         * forward/redirect 구분작업.
         */
        boolean isForwarding = true;
        if(target.startsWith(FORWARD_KEY)){
            target = target.substring(FORWARD_KEY.length());
        }else if (target.startsWith(REDIRECT_KEY)){
            isForwarding = false;
            target = target.substring(REDIRECT_KEY.length());
        }
        
        try {
            if(isForwarding){
                request.getRequestDispatcher(target).forward(request, response);
            }else{
                String redirectPage = target.startsWith("/") ? request.getContextPath() +  target :  target;
                response.sendRedirect(response.encodeRedirectURL(redirectPage));
            }
        } catch (Exception e) {
            if (logger.isErrorEnabled()) {
                logger.error("Exception occurred while forward jsp to " + target, e);
            }
            e.printStackTrace();
            
            // 발생 가능한 예외
            // -. ServletException
            // -. IOException
            throw new RenderException("SKFS1010", new String[] {target, e.getLocalizedMessage()}, e);
        }
    }
    
    public String toString() {
        return "IView::" + getClass().getName();
    }

}