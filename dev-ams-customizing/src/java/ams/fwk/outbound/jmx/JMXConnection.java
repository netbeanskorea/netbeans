package ams.fwk.outbound.jmx;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.management.MBeanAttributeInfo;
import javax.management.MBeanInfo;
import javax.management.MBeanOperationInfo;
import javax.management.MBeanParameterInfo;
import javax.management.MBeanServerConnection;
import javax.management.ObjectName;
import javax.management.remote.JMXConnector;
import javax.management.remote.JMXConnectorFactory;
import javax.management.remote.JMXServiceURL;

public class JMXConnection {

	public static final String CONNECTION_TIMEOUT = "jmx.remote.x.server.connection.timeout";
	public static final String READ_TIMEOUT = "jmx.remote.x.request.waiting.timeout";
	
	JMXServiceURL url;
	JMXConnector jmxc;
	MBeanServerConnection mbsc;

	public static void close(JMXConnection conn) {
		if (conn != null) {
			conn.shutdown();
		}
	}

	public JMXConnection(String urlStr) throws Exception {
		this(urlStr, null);
	}

	public JMXConnection(String urlStr, Map<String,?> environment) throws Exception {
		try {
			url = new JMXServiceURL(urlStr);
			jmxc = JMXConnectorFactory.connect(url, environment);
			mbsc = jmxc.getMBeanServerConnection();
		} catch (Exception e) {
			shutdown();
			throw e;
		}
	}

	public List<JMXBeanInfo> getMBeanAll() throws Exception {
		return getMBeanAll("*:*");
	}

	public List<JMXBeanInfo> getMBeanAll(String name) throws Exception {
		List<JMXBeanInfo> list = new ArrayList<JMXBeanInfo>();
		if (name.indexOf("*") > 0) {
			Set<?> objectNames = mbsc.queryNames(new ObjectName(name), null);
			if (objectNames != null) {
				ObjectName objectName = null;
				for (Iterator<?> i = objectNames.iterator(); i.hasNext();) {
					objectName = (ObjectName) i.next();
					list.add(toJMXBeanInfo(objectName));
				}
			}
		} else {
			list.add(toJMXBeanInfo(new ObjectName(name)));
		}
		return list;
	}

	public JMXBeanInfo getMBean(String mbeanName) throws Exception {
		return toJMXBeanInfo(new ObjectName(mbeanName));
	}

	public Object invoke(String mbeanName, String operationName, Object[] parameters, String[] parameterTypes) throws Exception {
		return mbsc.invoke(new ObjectName(mbeanName), operationName, parameters, parameterTypes);
	}

	private JMXBeanInfo toJMXBeanInfo(ObjectName mbeanName) throws Exception {
		MBeanInfo beanInfo = mbsc.getMBeanInfo(mbeanName);

		JMXBeanInfo entity = new JMXBeanInfo();
		entity.name = mbeanName.toString();
		entity.className = beanInfo.getClassName();
		entity.description = beanInfo.getDescription();
		entity.attributes = new ArrayList<JMXBeanAtrribute>();
		entity.operations = new ArrayList<JMXBeanOperation>();

		MBeanAttributeInfo[] attributes = beanInfo.getAttributes();
		MBeanOperationInfo[] operations = beanInfo.getOperations();

		if (attributes != null) {
			for (MBeanAttributeInfo attr : attributes) {
				entity.attributes.add(toJMXBeanAtrribute(attr, mbeanName));
			}
		}

		if (operations != null) {
			for (MBeanOperationInfo oper : operations) {
				entity.operations.add(toJMXBeanOperation(oper));
			}
		}
		return entity;
	}

	private JMXBeanAtrribute toJMXBeanAtrribute(MBeanAttributeInfo attr, ObjectName mbeanName) throws Exception {
		JMXBeanAtrribute entity = new JMXBeanAtrribute();
		entity.name = attr.getName();
		entity.type = attr.getType();
		entity.description = attr.getDescription();

		try {
			if (attr.isReadable()) {
				entity.value = mbsc.getAttribute(mbeanName, attr.getName());
			} else {
				entity.value = "[attribute is not readable].";
			}
		} catch (Exception e) {
			entity.exception = e.getMessage();
		}
		return entity;
	}

	private JMXBeanOperation toJMXBeanOperation(MBeanOperationInfo oper) {
		JMXBeanOperation entity = new JMXBeanOperation();
		entity.name = oper.getName();
		entity.returnType = oper.getReturnType();
		entity.paramters = new ArrayList<JMXBeanOperationParameter>();

		MBeanParameterInfo[] parameters = oper.getSignature();
		if (parameters != null) {
			for (MBeanParameterInfo param : parameters) {
				entity.paramters.add(toJMXBeanOperationParameter(param));
			}
		}

		return entity;
	}

	private JMXBeanOperationParameter toJMXBeanOperationParameter(MBeanParameterInfo param) {
		JMXBeanOperationParameter entity = new JMXBeanOperationParameter();
		entity.name = param.getName();
		entity.type = param.getType();
		entity.description = param.getDescription();
		return entity;
	}

	public void shutdown() {
		if (jmxc != null) {
			try {
				jmxc.close();
			} catch (IOException e) {
			}
		}
	}

}
