package com.sf.bie.service;

import java.util.List;

import com.sf.bie.domain.User;


public interface IUserService {
	
	public void add(String uname);
	
	public List<User> selectUser();
	
}
