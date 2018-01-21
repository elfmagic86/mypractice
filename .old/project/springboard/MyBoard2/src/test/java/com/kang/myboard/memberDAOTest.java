/*package com.myCompany.daoTest;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.myCompany.dao.UserDAO;
import com.myCompany.domain.Gender;
import com.myCompany.domain.User;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="/META-INF/spring/root-context.xml")
public class memberDAOTest {
	
	@Autowired
	UserDAO dao;

	
	
	private User user1;
	private User user2;
	private User user3;
	
	@Before
	public void setUp() {
		
		this.user1 = new User("id1","pw1","lastname1","firstname1","0101111111","1998-01-01",Gender.MAN);
		this.user2 = new User("id2","pw2","lastname2","firstname2","0202222222","1998-02-02",Gender.MAN);
		this.user3 = new User("id3","pw3","lastname3","firstname3","0303333333","1998-03-03",Gender.MAN);
		
	}
	
	@Test
	public void addAndGet() {
		//처음은 값을 초기화..(트랜잭션하면좋을텐데.)
		dao.deleteAll();
		assertThat(dao.getRowSize(), is(0));
		
		//1. add
		dao.add(user1);
		dao.add(user2);
		assertThat(dao.getRowSize(),is(2));
		
		
		//2. get
		User userGet1 = dao.get(user1.getId());
		checkSameUser(userGet1,user1);
		User userGet2 = dao.get(user2.getId());
		checkSameUser(userGet2,user2);
	}
	
	@Test(expected=EmptyResultDataAccessException.class)
	public void getUserFailure() throws SQLException {
		dao.deleteAll();
		assertThat(dao.getRowSize(), is(0));
		dao.get("unknown_id");
	}
	
	@Test(expected=DuplicateKeyException.class)
	public void duplciateKey() {
		dao.deleteAll();
		
		dao.add(user1);
		dao.add(user1);
	}
	
	@Test
	public void count() {
		dao.deleteAll();
		assertThat(dao.getRowSize(), is(0));
		
		dao.add(user1);
		assertThat(dao.getRowSize(), is(1));
		dao.add(user2);
		assertThat(dao.getRowSize(), is(2));
		dao.add(user3);
		assertThat(dao.getRowSize(), is(3));
	}
	
	@Test
	public void getAll() {
		dao.deleteAll();
		assertThat(dao.getRowSize(), is(0));
		
		List<User> source = new ArrayList<User>();
		List<User> target = new ArrayList<User>();
		source = dao.getAll();
		assertThat(source.size(),is(0));
		assertThat(target.size(),is(0));
		
		source.add(user1);
		source.add(user2);
		source.add(user3);
		
		dao.add(user1);
		dao.add(user2);
		dao.add(user3);
		target = dao.getAll();
		assertThat(target.size(), is(3));
		for(int i=0; i<3; ++i) {
			checkSameUser(source.get(i),target.get(i));
		}
	}
	
	@Test
	public void update()
	{
		dao.deleteAll();
		assertThat(dao.getRowSize(),is(0));
		
		dao.add(user1); //수정할 사용자
		dao.add(user2); //수정하지 않을 사용자
		
		user1 = new User("id1","pw4","lastname4","firstname4","0404444444","1998-04-04",Gender.MAN);
		
		dao.update(user1);
		
		User updatedUser = dao.get("id1");
		checkSameUser(updatedUser, user1);
		User sameUser = dao.get("id2");
		checkSameUser(sameUser, user2);
	}
	
	
	
	
	
	//[도우미] 1,2가 같은지 확인.
	private void checkSameUser(User source,User target)
	{
		assertThat(source.getId(),is(target.getId()));
		assertThat(source.getPw(),is(target.getPw()));
		assertThat(source.getFirstName(),is(target.getFirstName()));
		assertThat(source.getLastName(),is(target.getLastName()));
		assertThat(source.getPhoneNumber(),is(target.getPhoneNumber()));
		assertThat(source.getBirth(),is(target.getBirth()));
		assertThat(source.getGender(),is(target.getGender()));
	}

}
*/