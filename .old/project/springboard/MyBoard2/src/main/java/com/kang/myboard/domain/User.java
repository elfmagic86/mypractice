package com.kang.myboard.domain;

import java.util.Date;


public class User {
	
	private String id;
	private String pw;
	private String lastName;
	private String firstName;
	private String phoneNumber;
	private String birth;
	private Gender gender;

	
	public User(){};
	public User(String id, String pw, String lastName, String firstName,
			String phoneNumber, String birth, Gender gender) {
		this.id = id;
		this.pw = pw;
		this.lastName = lastName;
		this.firstName = firstName;
		this.phoneNumber = phoneNumber;
		this.birth = birth;
		this.gender = gender;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public int getGender() {
		return gender.getValue();
	}
	public void setGender(int gender) {
		this.gender = Gender.valueOf(gender);
	}

	

}
