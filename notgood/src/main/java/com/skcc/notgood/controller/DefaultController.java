package com.skcc.notgood.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.skcc.notgood.service.DefaultService;

@Controller
public class DefaultController {

	@Autowired
	private DefaultService service;

	@RequestMapping("/select")
	@ResponseBody
	public ModelAndView select(@RequestBody Map<String, Object> dataMap) {
		ModelAndView mav = new ModelAndView("jsonView");
		Map<String, Object> map = service.select(dataMap);
		mav.addObject("data", map);
		return mav;
	}

	@RequestMapping("/selectAll")
	@ResponseBody
	public ModelAndView selectAll(@RequestBody Map<String, Object> dataMap) {
		ModelAndView mav = new ModelAndView("jsonView");
		List<Object> map = service.selectAll(dataMap);
		mav.addObject("data", map);
		return mav;
	}

	@RequestMapping("/insert")
	@ResponseBody
	public ModelAndView insert(@RequestBody Map<String, Object> dataMap) {
		ModelAndView mav = new ModelAndView("jsonView");
		System.out.println("mv dataMap"+dataMap );
		service.insert(dataMap);
		if (dataMap == null) {
			mav.addObject("data", "failed");
		} else {
			mav.addObject("data", "success");
		}
		return mav;
	}

}
