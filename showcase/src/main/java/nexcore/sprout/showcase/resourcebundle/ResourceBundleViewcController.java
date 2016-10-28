package nexcore.sprout.showcase.resourcebundle;

import nexcore.sprout.foundry.resourcebundle.code.CodeSourceAccessor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ResourceBundleViewcController {
	@Autowired
	private CodeSourceAccessor codeSourceAccessor;
	
	@RequestMapping(value="/resourcebundle/codesourceView", method=RequestMethod.GET)
	public @ResponseBody  String getCodeSoureView() {
        return  codeSourceAccessor.getCode("SYS","C010","C0101").toString();
	}
}
