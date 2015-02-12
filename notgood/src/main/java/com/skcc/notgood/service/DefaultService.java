package com.skcc.notgood.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Transactional(propagation=Propagation.REQUIRED)
public interface DefaultService {

	public Map<String, Object> select(Map<String, Object> dataMap);
	public List<Object> selectAll(Map<String, Object> dataMap);
	public void insert(Map<String, Object> dataMap);

}
