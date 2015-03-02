package com.kjblink.totoro;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HController {
	
	@RequestMapping("/hello")
	public String hello(@RequestParam(value="name", required=false, defaultValue="world") String name, Model model) {
		model.addAttribute("name", name);
		return "helloworld";
	}

}
