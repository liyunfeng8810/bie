package com.sf.bie.dao;

import java.util.List;

import com.sf.bie.domain.User;

public interface IUserDao {
	
	public void add(User u);
	
	public List<User> selectUser();
}
