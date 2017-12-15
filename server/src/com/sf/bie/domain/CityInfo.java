package com.sf.bie.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="KING_CITY_INFO")
public class CityInfo {
	
	@Id
	@GeneratedValue(generator = "generator")
	@GenericGenerator(name = "generator", strategy = "guid")
	@Column(name="city_id")
	private String cityId;
	
	@Column(name="city_info")
	private String cityInfo;
	
	public CityInfo() {
		//
	}

	public String getCityId() {
		return cityId;
	}

	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	public String getCityInfo() {
		return cityInfo;
	}

	public void setCityInfo(String cityInfo) {
		this.cityInfo = cityInfo;
	}
}
