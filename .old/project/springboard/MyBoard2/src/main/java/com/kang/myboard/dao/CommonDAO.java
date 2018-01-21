package com.kang.myboard.dao;

import java.util.List;

public interface CommonDAO<T> {
	
	void add(T object);
	T get(int id);
	List<T> getAll();
	void deleteAll();
	void delete(int id);
	int getCount();
	void update(T object);
}
