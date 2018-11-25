package com.kang.myboard.dao;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.kang.myboard.domain.User;

public class UserDAO implements CommonDAO<User> {

	//JDBC�� ����.
	private JdbcTemplate jdbcTemplate;
	
	public void setJdbcTemplate(DataSource datasource)
	{
		this.jdbcTemplate = new JdbcTemplate(datasource);
	}
	//User�� ���� rowMapper
	private RowMapper<User> userMapper = new RowMapper<User>() {
		public User mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException 
		{
			User user = new User();
			user.setId(rs.getString("id"));
			user.setPw(rs.getString("pw"));
			user.setLastName(rs.getString("lastName"));
			user.setFirstName(rs.getString("firstName"));
			user.setPhoneNumber(rs.getString("phoneNumber"));
			user.setBirth(rs.getString("birth"));
			user.setGender(rs.getInt("gender"));
			return user;
			
		};
	};
	
	
	
	//���̵�(email),���,��(lastName), �̸�(firstName),  �޴�����ȣ, �������, ��/��
	@Override
	public void add(User object) {
		StringBuilder sql = new StringBuilder("insert into userTable values(?,?,?,?,?,?,?)");
		this.jdbcTemplate.update(sql.toString(),
				object.getId(),object.getPw(),object.getLastName(),object.getFirstName(),
				object.getPhoneNumber(),object.getBirth(),object.getGender());
	}

	public User get(String id) {
		StringBuilder sql = new StringBuilder("select * from userTable where id=?");
		return this.jdbcTemplate.queryForObject(sql.toString(),new Object[] {id}, this.userMapper);
	}

	@Override
	public List<User> getAll() {
		StringBuilder sql = new StringBuilder("select * from userTable order by id");
		return this.jdbcTemplate.query(sql.toString(), this.userMapper);
	}

	@Override
	public void deleteAll() {
		StringBuilder sql = new StringBuilder("delete from userTable ");
		this.jdbcTemplate.update(sql.toString());
	}

	@Override
	public int getCount() {
		StringBuilder sql = new StringBuilder("select count(*) from userTable");
		return this.jdbcTemplate.queryForInt(sql.toString());
	}

	@Override
	public void update(User object) {
		StringBuilder sql = new StringBuilder("update userTable set pw=?,lastName=?,firstName=?,phoneNumber=?,birth=?,gender=? ");
		sql.append("where id=?");
		this.jdbcTemplate.update(sql.toString(), object.getPw(),object.getLastName(),object.getFirstName(),
				object.getPhoneNumber(),object.getBirth(),object.getGender(),object.getId());
		
		
	}

	@Override
	public User get(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		
	}

}
