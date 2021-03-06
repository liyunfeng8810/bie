package com.sf.bie.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.sf.bie.domain.CityInfo;
import com.sf.bie.domain.User;


public interface IUserService {
	
	/****
	 * 添加用户
	 * @param user
	 */
	public void addUser(User user);
	
	/****
	 * 查询所有用户
	 * @return
	 */
	public List<User> selectUser(String userIds);
	
	/****
	 * 获取登录的用户
	 * @param email
	 * @param password
	 * @return
	 */
	public User getLoginUser(String email,String password);
	
	public JSONObject queryMarket(JSONObject json);
	
	public JSONObject queryJihuoxq(JSONObject json);
	
	public void saveJjianxx(JSONObject json);
	
	/****
	 * 获取城市信息
	 * @return
	 */
	public CityInfo getCityInfo();
}
