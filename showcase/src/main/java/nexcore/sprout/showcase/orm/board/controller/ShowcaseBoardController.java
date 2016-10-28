 
package nexcore.sprout.showcase.orm.board.controller;

import java.util.Map;

import javax.validation.Valid;

import nexcore.sprout.showcase.common.util.ShowcasePageUtil;
import nexcore.sprout.showcase.orm.board.service.ShowcaseBoardService;
import nexcore.sprout.showcase.orm.board.vo.ShowcaseBoardVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
 
@Controller
@RequestMapping("/ormBoard")
public class ShowcaseBoardController {
    
    @Autowired
    private ShowcaseBoardService showcaseBoardService;
        
    @RequestMapping("/getBoardList")
    public String getBoardList(ShowcaseBoardVO vo, Model model) {
    	int totalCount=showcaseBoardService.getTotalBoardCnt(vo);
    	
    	// get Page Info (총건수, Page 번호, Page 크기,total page) and set PageVo
    	Map<String, Integer> returnPagingInfo=ShowcasePageUtil.getPageInfo(totalCount, vo);
        model.addAttribute("pager", returnPagingInfo);
        
        model.addAttribute("boardList", showcaseBoardService.getBoardList(vo));
        return "orm/pageList";
    }
    
    @RequestMapping("/goBoardEdit")
    public String goBoardEdit(ShowcaseBoardVO vo, Model model) {
        return "orm/boardWrite";
    }
    
    //@Transactional
    @RequestMapping("/addBoard")
    public String addBoard(@Valid ShowcaseBoardVO vo,  BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "orm/boardWrite";            
        }        
     //   model.addAttribute("addBoardCnt", boardService.addBoard(vo));
    	return "redirect:/ormBoard/getBoardList.frag";
    }

    
  
}