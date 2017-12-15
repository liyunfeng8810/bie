package com.sf.bie.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="KING_CUST")
public class Cust {
	
	@Id
	@GeneratedValue(generator = "generator")
	@GenericGenerator(name = "generator", strategy = "guid")
	@Column(name="CUST_ID")
	private String custId;
	
	@Column(name="CUST_USER_ID")
	private String custUserId;
	
	@Column(name="CUST_NAME")
	private String custName;
	
	@Column(name="CUST_PHONE")
	private String custPhone;
	
	@Column(name="CUST_PRE_NUM")
	private String custPreNum;
	
	@Column(name="CUST_PRE_WEIGHT")
	private String custPreWeight;
	
	@Column(name="CUST_ADDRESS_PT1")
	private String custAddressPt1;
	
	@Column(name="CUST_ADDRESS_PT2")
	private String custAddressPt2;
	
	@Column(name="cust_group_id")
	private String custGroupId;
	
	@Column(name="CUST_GROUP_NAME")
	private String custGroupName;
	
	@Column(name="CUST_STATUS")
	private int custStatus;
	
	@Column(name="LOAD_TM")
	@DateTimeFormat(pattern="yyyy-MM-dd")  
	private Date loadTm;
	
	
	public Cust() {
		//
	}
	
	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustUserId() {
		return custUserId;
	}

	public void setCustUserId(String custUserId) {
		this.custUserId = custUserId;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustPhone() {
		return custPhone;
	}

	public void setCustPhone(String custPhone) {
		this.custPhone = custPhone;
	}

	public String getCustPreNum() {
		return custPreNum;
	}

	public void setCustPreNum(String custPreNum) {
		this.custPreNum = custPreNum;
	}

	public String getCustPreWeight() {
		return custPreWeight;
	}

	public void setCustPreWeight(String custPreWeight) {
		this.custPreWeight = custPreWeight;
	}

	public String getCustAddressPt1() {
		return custAddressPt1;
	}

	public void setCustAddressPt1(String custAddressPt1) {
		this.custAddressPt1 = custAddressPt1;
	}

	public String getCustAddressPt2() {
		return custAddressPt2;
	}

	public void setCustAddressPt2(String custAddressPt2) {
		this.custAddressPt2 = custAddressPt2;
	}

	public String getCustGroupId() {
		return custGroupId;
	}

	public void setCustGroupId(String custGroupId) {
		this.custGroupId = custGroupId;
	}

	public String getCustGroupName() {
		return custGroupName;
	}

	public void setCustGroupName(String custGroupName) {
		this.custGroupName = custGroupName;
	}

	public int getCustStatus() {
		return custStatus;
	}

	public void setCustStatus(int custStatus) {
		this.custStatus = custStatus;
	}

	public Date getLoadTm() {
		return loadTm;
	}

	public void setLoadTm(Date loadTm) {
		this.loadTm = loadTm;
	}
	
}
