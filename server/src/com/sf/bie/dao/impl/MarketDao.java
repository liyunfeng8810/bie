package com.sf.bie.dao.impl;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONObject;
import com.sf.bie.common.CommonDao;
import com.sf.bie.dao.IMarketDao;
import com.sf.bie.domain.Market;

@Component(value=MarketDao.DAO_BEANNAME)
public class MarketDao extends CommonDao<Market> implements IMarketDao{
	
	public static final  String DAO_BEANNAME="BIE_MARKETDAO";
	
	@Override
	public void add(Market m){
		hibernateTemplate.save(m);
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<Market> selectMarket(JSONObject json){
		String mktId = json.getString("mktId");
		DetachedCriteria criteria = DetachedCriteria.forClass(Market.class);
		criteria.add(Restrictions.eq("mktId", mktId));
		return hibernateTemplate.findByCriteria(criteria);
	}


}
