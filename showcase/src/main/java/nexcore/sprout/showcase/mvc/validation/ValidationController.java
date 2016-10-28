package nexcore.sprout.showcase.mvc.validation;

import javax.validation.Valid;

import nexcore.sprout.showcase.orm.board.vo.ShowcaseBoardVO;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ValidationController {

	// enforcement of constraints on the JavaBean arg require a JSR-303 provider on the classpath
	
	@RequestMapping("/validate")
	public @ResponseBody String validate(@Valid JavaBean bean, BindingResult result) {
		if (result.hasErrors()) {
			return "Object has validation errors";
		} else {
			return "No errors";
		}
	}
	
	@RequestMapping("webmvc/validation")
	public String getValicationForm(ShowcaseBoardVO vo, Model model) {
		return "webmvc/validation";
	}

}
