package com.sf.bie.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="KING_CONVERGE_GROUP_INFO")
public class Group {
	
	@Id
	@GeneratedValue(generator = "generator")
	@GenericGenerator(name = "generator", strategy = "guid")
	@Column(name="GROUP_ID")
	private String groupId;
	
	@Column(name="GROUP_NAME")
	private String groupName;
	
	@Column(name="GROUP_MKT_ID")
	private String groupMktId;
	
	@Column(name="GROUP_MKT_NAME")
	private String groupMktName;
	
	@Column(name="GROUP_LIMIT")
	private String groupLimit;
	
	@Column(name="GROUP_STATUS")
	private int groupStatus;
	
	@Column(name="GROUP_TYPE")
	private int groupType;
	
	public Group() {
		//
	}

	public String getGroupId() {
		return groupId;
	}


	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}




	public String getGroupName() {
		return groupName;
	}


	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}


	public String getGroupMktId() {
		return groupMktId;
	}


	public void setGroupMktId(String groupMktId) {
		this.groupMktId = groupMktId;
	}


	public String getGroupMktName() {
		return groupMktName;
	}


	public void setGroupMktName(String groupMktName) {
		this.groupMktName = groupMktName;
	}


	public String getGroupLimit() {
		return groupLimit;
	}


	public void setGroupLimit(String groupLimit) {
		this.groupLimit = groupLimit;
	}


	public int getGroupStatus() {
		return groupStatus;
	}


	public void setGroupStatus(int groupStatus) {
		this.groupStatus = groupStatus;
	}


	public int getGroupType() {
		return groupType;
	}


	public void setGroupType(int groupType) {
		this.groupType = groupType;
	}


		
}
