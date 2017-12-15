package com.sf.bie.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="KING_PRO_MARKET_BASE")
public class Market {
	
	@Id
	@GeneratedValue(generator = "generator")
	@GenericGenerator(name = "generator", strategy = "guid")
	@Column(name="MKT_ID")
	private String mktId;
	
	@Column(name="MKT_NAME_SHOW")
	private String mktNameShow;
	
	@Column(name="DAILY_MIN_PACKAGES")
	private String dailyMinPackages;
	
	@Column(name="WEIGHT_MIN")
	private String weightMin;
	
	@Column(name="WEIGHT_MAX")
	private String weightMax;
	
	@Column(name="BASE_PRICE")
	private String basePrice;
	
	@Column(name="BASE_WEIGHT")
	private String baseWeight;
	
	@Column(name="GROUP_LIMIT")
	private String groupLimit;
	
	@Column(name="GROUP_DURATION")
	private String groupDuration;
	
	@Column(name="USE_REQUIRE")
	private String useRequire;
	
	public Market() {
		//
	}

	public String getMktId() {
		return mktId;
	}

	public void setMktId(String mktId) {
		this.mktId = mktId;
	}

	public String getMktNameShow() {
		return mktNameShow;
	}

	public void setMktNameShow(String mktNameShow) {
		this.mktNameShow = mktNameShow;
	}

	public String getDailyMinPackages() {
		return dailyMinPackages;
	}

	public void setDailyMinPackages(String dailyMinPackages) {
		this.dailyMinPackages = dailyMinPackages;
	}

	public String getWeightMin() {
		return weightMin;
	}

	public void setWeightMin(String weightMin) {
		this.weightMin = weightMin;
	}

	public String getWeightMax() {
		return weightMax;
	}

	public void setWeightMax(String weightMax) {
		this.weightMax = weightMax;
	}

	public String getBasePrice() {
		return basePrice;
	}

	public void setBasePrice(String basePrice) {
		this.basePrice = basePrice;
	}

	public String getBaseWeight() {
		return baseWeight;
	}

	public void setBaseWeight(String baseWeight) {
		this.baseWeight = baseWeight;
	}

	public String getGroupLimit() {
		return groupLimit;
	}

	public void setGroupLimit(String groupLimit) {
		this.groupLimit = groupLimit;
	}

	public String getGroupDuration() {
		return groupDuration;
	}

	public void setGroupDuration(String groupDuration) {
		this.groupDuration = groupDuration;
	}

	public String getUseRequire() {
		return useRequire;
	}

	public void setUseRequire(String useRequire) {
		this.useRequire = useRequire;
	}
		
}
