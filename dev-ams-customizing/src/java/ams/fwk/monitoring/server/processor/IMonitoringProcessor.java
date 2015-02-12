package ams.fwk.monitoring.server.processor;

import java.math.BigDecimal;

public interface IMonitoringProcessor {

	public ServerInfo getServerInfoObj();
	public  void sendMail(String wasInstanceId, BigDecimal cpuPerc, String mountOnName);
}
