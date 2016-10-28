package nexcore.sprout.showcase.etc.board.service;

import java.util.List;

import nexcore.sprout.showcase.etc.board.dao.TranLogDAO;
import nexcore.sprout.showcase.etc.board.vo.ShowcaseTranLogVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;


@Service("tranLogService")
public class TranLogService {

	@Autowired
    TranLogDAO tranLogDAO;
    
    public List<ShowcaseTranLogVO> getTranLogList(ShowcaseTranLogVO vo) {
    	List<ShowcaseTranLogVO> tranLogList = null;
        try {
        	tranLogList = tranLogDAO.selectTranLogList(vo);
        }catch(Exception e) {
            e.printStackTrace();
        }
        return tranLogList;
    }
   
  
}