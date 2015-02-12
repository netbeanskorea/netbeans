package com.skcc.notgood.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;

import com.ibatis.sqlmap.client.SqlMapClient;

@Repository
public class DefaultDao extends SqlMapClientDaoSupport {
	//public class DefaultDao extends	EgovAbstractDAO {

	@Resource(name="sqlMapClient") 
    public void setSuperSqlMapClient(SqlMapClient client){ 
        super.setSqlMapClient(client); 
    } 
	
	public Map<String, Object> select(Map<String, Object> dataMap) {
		System.out.println(getSqlMapClientTemplate().queryForObject((String)dataMap.get("queryId"), dataMap));
		return (Map<String, Object>)getSqlMapClientTemplate().queryForObject((String)dataMap.get("queryId"), dataMap);
	}
	
	public List<Object> selectAll(Map<String, Object> dataMap) {
		System.out.println(getSqlMapClientTemplate().queryForList((String)dataMap.get("queryId"), dataMap));
		return (List<Object>)getSqlMapClientTemplate().queryForList((String)dataMap.get("queryId"), dataMap);
	}
	

	public void insert(Map<String, Object> dataMap) {
		System.out.println("queryId:"+(String)dataMap.get("queryId"));
		System.out.println("dataMap"+dataMap);
		System.out.println(getSqlMapClientTemplate().insert((String)dataMap.get("queryId"), dataMap));//null
		getSqlMapClientTemplate().insert((String)dataMap.get("queryId"), dataMap);
    }
	

}
