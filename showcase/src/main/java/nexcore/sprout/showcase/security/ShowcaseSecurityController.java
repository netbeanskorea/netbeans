package nexcore.sprout.showcase.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ShowcaseSecurityController {

	@RequestMapping(value="/taglibviewsss")
	public String taglibGetView() {
        return "/security/loginSuccess";
	}
	
	
}
