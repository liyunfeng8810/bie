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
	
	/****
	 * 添加用户
	 * @param user
	 */
	@Override
	public void addUser(User user){
		userDao.add(user);
	}
	
	/****
	 * 获取登录的用户
	 * @param password
	 * @param email
	 * @return
	 */
	@Override
	public User getLoginUser(String email,String password){
		return userDao.getSingleUser(email, password);
	}
	
	/****
	 * 获取登录的用户
	 * @param userName
	 * @param password
	 * @return
	 */
	@Override
	public List<User> selectUser(){
		return userDao.selectUser();
	}
}
