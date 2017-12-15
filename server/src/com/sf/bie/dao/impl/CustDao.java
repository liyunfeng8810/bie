package com.sf.bie.dao.impl;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONObject;
import com.sf.bie.common.CommonDao;
import com.sf.bie.dao.ICustDao;
import com.sf.bie.domain.Cust;

@Component(value=CustDao.DAO_BEANNAME)
public class CustDao extends CommonDao<Cust> implements ICustDao{
	
	public static final  String DAO_BEANNAME="BIE_CUSTDAO";
	
	@Override
	public void add(Cust c){
		hibernateTemplate.save(c);
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<Cust> selectCust(JSONObject json){
		String custGroupId = json.getString("groupId");
		DetachedCriteria criteria = DetachedCriteria.forClass(Cust.class);
		criteria.add(Restrictions.eq("custGroupId", custGroupId));
		criteria.addOrder(Order.desc("loadTm")); //按时间升序	
		return hibernateTemplate.findByCriteria(criteria);
	}



}
