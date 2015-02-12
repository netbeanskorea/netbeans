package ams.fwk.sevlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import nexcore.framework.core.ioc.ComponentRegistry;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import ams.fwk.monitoring.server.ServerEnvMonitoringManager;

public class ServerMonitoringServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private ServerEnvMonitoringManager monitoringManager;
	private static final String CPU_MONITORING = "CPU_MONITORING";
	private static final String MEM_MONITORING = "MEM_MONITORING";
	private static final String FS_MONITORING = "FS_MONITORING";
	private static final String TRANS_MONITORING = "TRANS_MONITORING";
	private Log log;

	
	@Override
	public void init() throws ServletException {
		monitoringManager = (ServerEnvMonitoringManager) ComponentRegistry.lookup("ams.server.monitoring.Manager");
		log =  LogFactory.getLog(monitoringManager.MONITORING_LOG_NAME);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		process(req, res);
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		process(req, res);
	}

	private void process(HttpServletRequest req, HttpServletResponse res) {
		String cmd = req.getParameter("cmd");
		List cpuPercList = null;
		List memPercList = null;
		List transPerList = null;
		Map fsPerListMap = null;
		JSONObject responseObj = new JSONObject();
		String rawString = "";
		
		if(StringUtils.isEmpty(cmd)) {
			cpuPercList = monitoringManager.getCpuPercList();
			memPercList =monitoringManager.getMemPercList();
			fsPerListMap = monitoringManager.getFsPercListMap();
			responseObj.put(CPU_MONITORING, cpuPercList);
			responseObj.put(MEM_MONITORING, memPercList);
			responseObj.put(FS_MONITORING, fsPerListMap);
			rawString = responseObj.toString();
		} else {
			transPerList = monitoringManager.getTransPerList();
			responseObj.put(TRANS_MONITORING, transPerList);
			rawString = responseObj.toString();
		}
		
		res.setContentType("application/json;charset=UTF-8");
		res.setHeader("Pragma", "no-cache"); // Http1.0
		res.setHeader("Cache-Control", "no-cache"); // Http1.1
		res.setDateHeader("Expires", 0);

		PrintWriter out = null;

		try {
			out = res.getWriter();
		} catch (IOException e) {
			if (log.isErrorEnabled()) {
				log.error("Exception occurred while writing json to HttpServletResponse.",e);
			}
			//e.printStackTrace();
		}

		out.write(rawString);
		out.close();
	}

}
