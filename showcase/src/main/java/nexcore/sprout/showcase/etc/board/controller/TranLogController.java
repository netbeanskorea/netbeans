package nexcore.sprout.showcase.etc.board.controller;

import nexcore.sprout.showcase.etc.board.service.TranLogService;
import nexcore.sprout.showcase.etc.board.vo.ShowcaseTranLogVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TranLogController {
    @Autowired
    TranLogService tranLogService;

    @RequestMapping("/etc/getTranLogList.json")
    public Model getBoardList(@RequestBody(  required=false)  ShowcaseTranLogVO vo, Model model) {
      try{
    	  System.out.println("/etc/getTranLogList.json");
    	  model.addAttribute("boardList", tranLogService.getTranLogList(vo));
      } catch(Exception e) {
            e.printStackTrace();
      }
      return model;
    }
    
    
    @RequestMapping("/etc/getTranLogList.frag")
    public ModelAndView getBoardList(@RequestBody(  required=false)  ShowcaseTranLogVO vo, ModelAndView model) {
      try{
    	  System.out.println("/etc/getTranLogList.frag");
    	  model.addObject("boardList", tranLogService.getTranLogList(vo));
    	  model.setViewName("etc/tranlogView");
      } catch(Exception e) {
            e.printStackTrace();
      }
      return model;
    }
}
