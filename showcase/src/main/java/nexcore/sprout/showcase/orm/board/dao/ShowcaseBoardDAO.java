package nexcore.sprout.showcase.orm.board.dao;

import java.util.List;

import nexcore.sprout.showcase.orm.board.vo.ShowcaseBoardVO;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("showcaseBoardDAO")
public class ShowcaseBoardDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
    
	public List<ShowcaseBoardVO> selectBoardList(ShowcaseBoardVO vo) {
        return sqlSessionTemplate.selectList("board.selectBoardList", vo);
    }
    
	 public int selectTotalBoardCnt(ShowcaseBoardVO vo) {
        return sqlSessionTemplate.selectOne("board.selectTotalBoardCnt", vo);
    }
 
}