package com.sf.bie.dao.impl;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

import com.sf.bie.common.CommonDao;
import com.sf.bie.dao.IUserDao;
import com.sf.bie.domain.User;

@Component(value=UserDao.DAO_BEANNAME)
public class UserDao extends CommonDao<User> implements IUserDao{
	
	public static final  String DAO_BEANNAME="BIE_USERDAO";
	
	/****
	 * 添加用户
	 * @param user
	 */
	public void addUser(User user){
		hibernateTemplate.save(user);
	}
	
	/****
	 * 查询所有用户
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<User> selectUser(String userIds){
		DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
		criteria.add(Restrictions.in("id", userIds.split(",")));
		return hibernateTemplate.findByCriteria(criteria);
	}
	
	/****
	 * 获取登录的用户
	 * @param password
	 * @param email
	 * @return
	 */
	public User getSingleUser(String email,String password){
		DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
		criteria.add(Restrictions.eq("email", email));
		criteria.add(Restrictions.eq("pwd", password));
		@SuppressWarnings("unchecked")
		List<User> lstUser = hibernateTemplate.findByCriteria(criteria);
		if(lstUser.isEmpty()){
			return null;
		}
		return lstUser.get(0);
	}
}
