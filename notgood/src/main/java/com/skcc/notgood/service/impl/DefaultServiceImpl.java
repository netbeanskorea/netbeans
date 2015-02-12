package com.skcc.notgood.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skcc.notgood.dao.DefaultDao;
import com.skcc.notgood.service.DefaultService;

@Service
public class DefaultServiceImpl implements DefaultService {

	@Autowired
	private DefaultDao dao;

	@Override
	public Map<String, Object> select(Map<String, Object> dataMap) {
		
		return dao.select(dataMap);
	}

	@Override
	public List<Object> selectAll(Map<String, Object> dataMap) {
		return dao.selectAll(dataMap);
	}

	@Override
	public void insert(Map<String, Object> dataMap) {
		System.out.println("impl dataMap"+dataMap);
		dao.insert(dataMap);
	}
	
}
