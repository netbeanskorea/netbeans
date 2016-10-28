package nexcore.sprout.showcase.etc.board.dao;

import java.util.List;

import nexcore.sprout.showcase.etc.board.vo.ShowcaseTranLogVO;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@SuppressWarnings("deprecation")
@Repository("tranLogDAO")
public class TranLogDAO {
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
    
    public List<ShowcaseTranLogVO> selectTranLogList(ShowcaseTranLogVO vo) {
        return sqlSessionTemplate.selectList("TranLog.selectTranLogList", vo);
    }
}

