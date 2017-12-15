package com.sf.bie.dao;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.sf.bie.domain.Cust;
import com.sf.bie.domain.Market;
import com.sf.bie.domain.User;

public interface ICustDao {
	
	public void add(Cust c);
	
	public List<Cust> selectCust(JSONObject json);
}