package ams.fwk.sevlet.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import nexcore.framework.core.Constants;
import nexcore.framework.core.data.IResultMessage;
import nexcore.framework.core.data.json.JsonProcessor;
import nexcore.framework.core.log.LogManager;
import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.core.util.StringUtils;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;

import ams.fwk.common.user.AmsUserInfo;

public class SessionChkFilter implements Filter {

	/**
	 * 로그를 기록하는 멤버 필드
	 */
	Log log = LogManager.getFwkLog();

	/**
	 * FilterConfig 객체.
	 */
	protected FilterConfig config;

	/**
	 * byPass 페이지 목록
	 */
	public String[] byPassPageList;

	private Map<String, AmsUserInfo> sessionMap;

	@Override
	public void init(FilterConfig config) throws ServletException {
		this.config = config;
		String byPassStr = config.getInitParameter("BYPASS_PAGE_LIST");
		this.byPassPageList = StringUtils.stringToArray(byPassStr, ';');
		sessionMap = new HashMap<String, AmsUserInfo>();
		if (log.isInfoEnabled()) {
			log.info(this.config.getFilterName() + " Filter created.");
			log.info(this.config.getFilterName() + " byPassPageStr : "
					+ byPassStr);
		}
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest hRequest = (HttpServletRequest) request;
		HttpServletResponse hResponse = (HttpServletResponse) response;

		String contextRoot = hRequest.getContextPath();
		boolean isCheckSession = Boolean.parseBoolean(config
				.getInitParameter("SESSION_CHECK"));
		String redirectUrl = config.getInitParameter("REDIRECT_URL");

		AmsUserInfo requestedUserInfo = null;
		AmsUserInfo savedUserInfo = null;
		HttpSession session = hRequest.getSession(false);
		// 사용자 세션 체크 수행
		if (isCheckSession && !checkByPassPage(hRequest.getServletPath())) {
			if (session == null || session.getAttribute(Constants.USER) == null) {
				if (log.isInfoEnabled()) {
					log.info("Session Expired!!");
				}
				invalidSessionError(hRequest, hResponse, contextRoot, redirectUrl);
				return;
			} else { // session이 있는 경우 캐쉬된 세션의 정보와 비교하여 변조가 되었는지 확인한다.
				requestedUserInfo = (AmsUserInfo) session
						.getAttribute(Constants.USER);
				String userId = requestedUserInfo.getLoginId();
				// if(sessionMap.containsKey((userId))) {//사용자ID로 저장된
				// AmsUserInfo 유무를 확인한다.
				// savedUserInfo =(AmsUserInfo) sessionMap.get(userId);
				// if(!requestedUserInfo.getIp().equals(savedUserInfo.getIp()))
				// {//Map에 저장된 AmsUserInfo IP와 request로 들어온 AmsUserInfo IP가 틀린
				// 경우
				// if (log.isInfoEnabled()) {
				// log.info("cached UserInfo IP and requested UserInfo IP are different");
				// }
				// invalidSessionError(response, contextRoot, redirectUrl);
				// sessionMap.remove(userId);
				// return;
				// }
				// } else {//sessionMap에 사용자ID로 저장된 AmsUserInfo 없는 경우.
				// if(!("/main.jsp").equals(hRequest.getServletPath())) { //
				// command가 '/main.jsp'일 경우는 제외
				// if (log.isInfoEnabled()) {
				// log.info("There are no AmsUserInfo Object in Map");
				// }
				// invalidSessionError(response, contextRoot, redirectUrl);
				// return;
				// }
				// }
			}
		}
		if (log.isInfoEnabled())
			log.info("Session validation is OK");
		chain.doFilter(request, response);

		// 업무호출이 정상적으로 처리된 경우는 sessionMap에 AmsUserInfo가 저장함.
		if (session != null) {// 직접 URL을 치고 들어오는 경우에는 session이 존재하지 않으므로 skip하도록
								// 처리
			// 로그아웃이 되면 Session이 expired된 것을 확인할 방법이 없어 illegaStateException이
			// 발생하면 catch하도록 함.(향후 다른 방법으로 처리해야함)
			try {
				savedUserInfo = (AmsUserInfo) session
						.getAttribute(Constants.USER);
				if (savedUserInfo != null) {
					sessionMap.put(savedUserInfo.getLoginId(), savedUserInfo);
				}
				if (log.isInfoEnabled())
					log.info("UserInfo put the Map Object ");
			} catch (java.lang.IllegalStateException e) {
				if (log.isInfoEnabled())
					log.info("Session is expired");
			}
		}
	}

	@Override
	public void destroy() {
		if (log.isInfoEnabled()) {
			log.info(this.config.getFilterName() + " Filter destroyed.");
		}

	}

	protected String getContentType(String contentType) {
		return contentType + "; charset=" + BaseUtils.getDefaultEncoding();
	}

	protected boolean checkByPassPage(String servletPath) {
		for (int i = 0; i < byPassPageList.length; i++) {
			if (byPassPageList[i].trim().equals(servletPath.trim())) {
				return true;
			}
		}

		return false;
	}

	private void invalidSessionError(HttpServletRequest request,
			HttpServletResponse response, String contextRoot, String redirectUrl)
			throws IOException {
		PrintWriter out = null;
		if (!response.isCommitted()) {
			response.resetBuffer();
		}
		String rawString = IOUtils.toString(request.getInputStream(), "UTF-8");
		JSONObject jObj = null;
		try {
			jObj = JSONObject.fromObject(rawString);
			JSONObject txObj = jObj.getJSONObject(JsonProcessor.ELM_TX);
			String txId = txObj.getString(JsonProcessor.ELM_TX_ID);
			JSONObject responseObj = new JSONObject();
			JSONObject trObj = new JSONObject();
			JSONObject dsObj = new JSONObject();
			JSONObject resultMsgObj = new JSONObject();
			//거래코드 입력
	        trObj.put(JsonProcessor.ELM_TX_ID, txId);
			responseObj.put(JsonProcessor.ELM_TX, trObj);
			
			resultMsgObj.put(JsonProcessor.ELM_DS_MSG_RESULT, IResultMessage.STR_FAIL);
			resultMsgObj.put(JsonProcessor.ELM_DS_MSG_ID, "M1000020");
			resultMsgObj.put(JsonProcessor.ELM_DS_MSG_NAME, BaseUtils.getMessage("M1000020"));
			dsObj.put(JsonProcessor.ELM_DS_MSG, resultMsgObj);
			
			responseObj.put(JsonProcessor.ELM_DS, dsObj);
			String resRawStr = responseObj.toString();
			
			response.setContentType("application/json;charset=UTF-8");
	        response.setHeader("Pragma", "no-cache");            // Http1.0
	        response.setHeader("Cache-Control", "no-cache");     // Http1.1
	        response.setDateHeader("Expires", 0);
	        out = response.getWriter();
	        out.write(resRawStr);
	        out.print( "<script>window.location.href='" + contextRoot + redirectUrl+ "';</script>");
	        out.close();
		}catch (JSONException e){//오류가 나면 JSON으로 수행된 업무가 아님.
			response.setContentType(getContentType("text/html"));
			out = response.getWriter();
			out.print("<script>alert('"+BaseUtils.getMessage("M1000020")+"');"
					+ "window.location.href='" + contextRoot + redirectUrl
					+ "';</script>");
		}
	}
}
