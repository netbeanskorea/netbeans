package nexcore.sprout.showcase.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class WebmvcController {
	
	@Autowired
	private SomeBean someBean;
	
	@RequestMapping(value="/webmvc/taglibview", method=RequestMethod.GET)
	public ModelAndView taglibGetView() {
		ModelAndView mav = new ModelAndView();                   
        mav.setViewName("taglib/taglibview");
        mav.addObject("someBean", someBean);
        return mav;
	}
	
	@RequestMapping(value="/{path1}/{path2}")
	public String simple(Model model,@PathVariable String path1,@PathVariable String path2) {
		return path1 + "/" + path2;	
	}
	
	
	@RequestMapping(value = "webmvc/tilesview", method = RequestMethod.GET)
    public String a() {
        return "tiles/tilesview";
    }
}
