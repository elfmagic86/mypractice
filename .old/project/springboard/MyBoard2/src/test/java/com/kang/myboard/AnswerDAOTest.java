package com.kang.myboard;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.kang.myboard.dao.AnswerDAO;
import com.kang.myboard.domain.Answer;
import com.kang.myboard.domain.Board;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:/META-INF/spring/root-context.xml")
public class AnswerDAOTest {

	@Autowired
	private AnswerDAO dao;
	
//	@Test
	public void getAll() {
		List<Answer> answers = dao.getAll();
		for(Answer answer : answers) {
			System.out.println(answer);
		}
	}
//	@Test
	public void get() {
		int rowNumber = 4027;
		List<Answer> answers =  dao.getList(rowNumber);
		for(Answer answer : answers) {
			System.out.println(answer);
		}
	}
//	@Test
	public void delete() {
		dao.delete(22);
		getAll();
	}
//	@Test
	public void add() {
		Answer answer1 = new Answer("123writer","123content",4022);
		dao.add(answer1);
		getAll();
	}
	
//	@Test
	public void update() {
		Answer answer1 = new Answer("123wefwefwriter","123wefwefecontent",4022);
		answer1.setA_id(29);
		
		dao.update(answer1);
		getAll();
	}
	
	@Test
	public void getCount() {
		List<Board> boards = new ArrayList<Board>();
		Board b1 = new Board(); b1.setNum(4020); boards.add(b1); 
		Board b2 = new Board(); b2.setNum(4023); boards.add(b2);
		Board b3 = new Board(); b3.setNum(4030); boards.add(b3);
		List<Integer> results = dao.getCountsByBoards(boards);
		System.out.println(results);
		
	}

}

