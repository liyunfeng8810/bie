package com.sf.bie.dao;

import java.util.List;

import com.sf.bie.domain.User;

public interface IUserDao {
	
	/****
	 * 添加用户
	 * @param user
	 */
	public void addUser(User user);
	
	/****
	 * 查询所有用户
	 * @return
	 */
	public List<User> selectUser();
	
	/****
	 * 获取登录的用户
	 * @param password
	 * @param email
	 * @return
	 */
	public User getSingleUser(String email,String password);
}
