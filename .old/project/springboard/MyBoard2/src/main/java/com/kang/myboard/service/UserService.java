package com.kang.myboard.service;

import java.util.List;

import com.kang.myboard.dao.UserDAO;
import com.kang.myboard.domain.User;

public class UserService {
	public UserService() {
	};

	private UserDAO dao;

	public void setUserDAO(UserDAO dao) {
		this.dao = dao;
	}

	public void add(User user) {
	};

	public void deleteAll() {
	};

	public void update(User user) {
	};

	/* @Transactional(readOnly=true) */
	public User get(String id) {
		return null;
	};

	/* @Transactional(readOnly=true) */
	public List<User> getAll() {
		List<User> users= dao.getAll();
		return users;
	};

}
