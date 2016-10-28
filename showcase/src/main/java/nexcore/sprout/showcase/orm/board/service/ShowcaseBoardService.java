package nexcore.sprout.showcase.orm.board.service;

import java.util.List;

import nexcore.sprout.showcase.orm.board.dao.ShowcaseBoardDAO;
import nexcore.sprout.showcase.orm.board.vo.ShowcaseBoardVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("showcaseBoardService")
public class ShowcaseBoardService {

    @Autowired
    private ShowcaseBoardDAO showcaseBoardDAO;
    
    public List<ShowcaseBoardVO> getBoardList(ShowcaseBoardVO vo) {
    	return showcaseBoardDAO.selectBoardList(vo);
    }
    
    public int getTotalBoardCnt(ShowcaseBoardVO vo) {
        return showcaseBoardDAO.selectTotalBoardCnt(vo);
    }	
    
   
}