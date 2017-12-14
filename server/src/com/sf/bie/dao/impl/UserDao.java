package com.sf.bie.dao.impl;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.stereotype.Component;

import com.sf.bie.common.CommonDao;
import com.sf.bie.dao.IUserDao;
import com.sf.bie.domain.User;

@Component(value=UserDao.DAO_BEANNAME)
public class UserDao extends CommonDao<User> implements IUserDao{
	
	public static final  String DAO_BEANNAME="BIE_USERDAO";
	
	public void add(User u){
		System.out.println("UserDao.add()");
		hibernateTemplate.save(u);
	}
	
	@SuppressWarnings("unchecked")
	public List<User> selectUser(){
		System.out.println("UserDao.add()");
		DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
		//criteria.add(Restrictions.eq("id", ""));
		return hibernateTemplate.findByCriteria(criteria);
	}
}
