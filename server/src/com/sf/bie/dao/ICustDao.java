package com.sf.bie.dao;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.sf.bie.domain.Cust;

public interface ICustDao {
	
	public void add(Cust c);
	
	public List<Cust> selectCust(JSONObject json);
}