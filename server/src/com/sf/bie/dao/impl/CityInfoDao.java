package com.sf.bie.dao.impl;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

import com.sf.bie.common.CommonDao;
import com.sf.bie.dao.ICityInfoDao;
import com.sf.bie.domain.CityInfo;

@Component(value=CityInfoDao.DAO_BEANNAME)
public class CityInfoDao extends CommonDao<CityInfo> implements ICityInfoDao{
	
	public static final  String DAO_BEANNAME="BIE_CITYINFO";
	
	/****
	 * 获取城市信息
	 * @return
	 */
	@Override
	public CityInfo getCityMsg(){
		DetachedCriteria criteria = DetachedCriteria.forClass(CityInfo.class);
		criteria.add(Restrictions.eq("cityId", "fb7c24de-e16d-11e7-b732-28d244b2a9a4"));
		return (CityInfo)hibernateTemplate.findByCriteria(criteria).get(0);
	}
}
