package com.sf.bie.common;

import javax.annotation.Resource;

import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateTemplate;

public class CommonDao<T>{
	
	@Resource
	protected HibernateTemplate hibernateTemplate;
	
	public Session getSession() {
		return hibernateTemplate.getSessionFactory().getCurrentSession();
	}

	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}
	
	/****
	 * 执行保存
	 * @param obj
	 */
	public void save(T obj){
		hibernateTemplate.save(obj);
	}
	
	/****
	 * 执行更新
	 * @param obj
	 */
	public void update(T obj){
		hibernateTemplate.update(obj);
	}
	
	
	/****
	 * 执行删除
	 * @param obj
	 */
	public void delete(T obj){
		hibernateTemplate.delete(obj);
	}
	
	/****
	 * 执行删除
	 * @param obj
	 */
	public void load(String id){
		hibernateTemplate.load(this, id);
	}
}
