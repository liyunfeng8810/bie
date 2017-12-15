package com.sf.bie.dao.impl;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONObject;
import com.sf.bie.common.CommonDao;
import com.sf.bie.dao.IGroupDao;
import com.sf.bie.domain.Group;

@Component(value=GroupDao.DAO_BEANNAME)
public class GroupDao extends CommonDao<Group> implements IGroupDao{
	
	public static final  String DAO_BEANNAME="BIE_GROUPDAO";
	
	@Override
	public void add(Group g){
		hibernateTemplate.save(g);
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<Group> selectGroup(JSONObject json){
		String groupMktId = json.getString("mktId");
		DetachedCriteria criteria = DetachedCriteria.forClass(Group.class);
		criteria.add(Restrictions.eq("groupMktId", groupMktId));
		criteria.addOrder(Order.desc("groupId")); //按groupId 降序		
		return hibernateTemplate.findByCriteria(criteria);
	}


}
