package com.sf.bie.dao;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.sf.bie.domain.Group;

public interface IGroupDao {
	
	public void add(Group g);
	
	public List<Group> selectGroup(JSONObject json);
}
