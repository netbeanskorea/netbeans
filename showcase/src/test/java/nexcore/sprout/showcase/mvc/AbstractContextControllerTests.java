package nexcore.sprout.showcase.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.context.WebApplicationContext;

@WebAppConfiguration
@ContextConfiguration(locations = {"file:src/main/resources/META-INF/spring/sprout-root.xml"
		,"file:src/main/resources/META-INF/spring/sprout-root-datasource.xml"
		,"file:src/main/resources/META-INF/spring/sprout-main.xml"})
public class AbstractContextControllerTests {

	@Autowired
	protected WebApplicationContext wac;

}
