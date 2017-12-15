package com.sf.bie.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.alibaba.fastjson.JSONObject;
import com.sf.bie.dao.ICustDao;
import com.sf.bie.dao.IGroupDao;
import com.sf.bie.dao.IMarketDao;
import com.sf.bie.dao.IUserDao;
import com.sf.bie.dao.impl.CustDao;
import com.sf.bie.dao.impl.GroupDao;
import com.sf.bie.dao.impl.MarketDao;
import com.sf.bie.dao.impl.UserDao;
import com.sf.bie.domain.Cust;
import com.sf.bie.domain.Group;
import com.sf.bie.domain.Market;
import com.sf.bie.domain.User;
import com.sf.bie.service.IUserService;

@Service(UserService.SERVICE_BEANNAME)
public class UserService implements IUserService{
	
	public static final String  SERVICE_BEANNAME="BIE_USER_SERVICE";
	
	@Autowired
	@Qualifier(UserDao.DAO_BEANNAME)
	private IUserDao userDao;
	
	@Autowired
	@Qualifier(MarketDao.DAO_BEANNAME)
	private IMarketDao marketDao;
	
	@Autowired
	@Qualifier(GroupDao.DAO_BEANNAME)
	private IGroupDao groupDao;
	
	@Autowired
	@Qualifier(CustDao.DAO_BEANNAME)
	private ICustDao custDao;
	
	/****
	 * 添加用户
	 * @param user
	 */
	@Override
	public void addUser(User user){
		userDao.addUser(user);
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

	@Override
	public JSONObject queryJihuoxq(JSONObject json) {
		JSONObject data = new JSONObject();
		List<Market> lstMkt = marketDao.selectMarket(json);
		if(!CollectionUtils.isEmpty(lstMkt)) {
			Market market = lstMkt.get(0);	
			data.put("market", market);
		}
		
		List<Group> lstGroup = groupDao.selectGroup(json);
		if(!CollectionUtils.isEmpty(lstGroup)) {
			Group group = lstGroup.get(0);	
			data.put("group", group);
		}
		
		
		JSONObject jsonCust = new JSONObject();
		String groupId = data.getJSONObject("group").getString("groupId");
		jsonCust.put("groupId", groupId);
		List<Cust> lstCust = custDao.selectCust(jsonCust);
		int custSize = 0;
		if(!CollectionUtils.isEmpty(lstCust)) {
			custSize = lstCust.size();	
			data.put("custList", lstCust);		
		}
		data.put("custSize", custSize);
		
		return data;
	}

	@Override
	public void saveJjianxx(JSONObject json) {
		String custUserId = json.getString("userId");
		String custGroupId = json.getString("groupId");
		String custAddressPt1 = json.getString("custAddressPt1");
		String custAddressPt2 = json.getString("custAddressPt2");
		String custName = json.getString("custName");
		String custPhone = json.getString("custPhone");
		String custPreNum = json.getString("custPreNum");
		String custPreWeight = json.getString("custPreWeight");
		Cust c = new Cust();
		c.setCustUserId(custUserId);
		c.setCustGroupId(custGroupId);
		c.setCustAddressPt1(custAddressPt1);
		c.setCustAddressPt2(custAddressPt2);
		c.setCustName(custName);
		c.setCustPhone(custPhone);
		c.setCustPreNum(custPreNum);
		c.setCustPreWeight(custPreWeight);
		//c.setLoadTm(new Date());
		custDao.add(c);
	}

	@Override
	public JSONObject queryMarket(JSONObject json) {
		JSONObject data = new JSONObject();
		List<Market> lstMkt = marketDao.selectMarket(json);
		if(!CollectionUtils.isEmpty(lstMkt)) {
			Market market = lstMkt.get(0);	
			data.put("market", market);
		}
		
		return data;
	}
}
