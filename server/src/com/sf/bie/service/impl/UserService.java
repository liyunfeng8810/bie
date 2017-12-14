package com.sf.bie.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.sf.bie.dao.IUserDao;
import com.sf.bie.dao.impl.UserDao;
import com.sf.bie.domain.User;
import com.sf.bie.service.IUserService;

@Service(UserService.SERVICE_BEANNAME)
public class UserService implements IUserService{
	
	public static final String  SERVICE_BEANNAME="BIE_USER_SERVICE";
	
	@Autowired
	@Qualifier(UserDao.DAO_BEANNAME)
	private IUserDao userDao;
	
	public void add(String uname){
		System.out.println("UserService.add()");
		User u = new User();
		u.setUname(uname);
		userDao.add(u);
	}
	
	public List<User> selectUser(){
		return userDao.selectUser();
	}
}
