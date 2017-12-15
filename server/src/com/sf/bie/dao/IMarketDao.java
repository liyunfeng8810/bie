package com.sf.bie.dao;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.sf.bie.domain.Market;

public interface IMarketDao {
	
	public void add(Market m);
	
	public List<Market> selectMarket(JSONObject json);
}