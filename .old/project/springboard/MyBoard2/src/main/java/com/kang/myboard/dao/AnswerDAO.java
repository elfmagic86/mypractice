package com.kang.myboard.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.kang.myboard.domain.Answer;
import com.kang.myboard.domain.Board;

public class AnswerDAO {
	/////////////////// default member
	private SqlSession _sqlSession; //요상한것이 받는놈이랑 주는놈이달러. 상속관계인듯.
	public void setTemplate(SqlSession template)
	{
		this._sqlSession = template;
	}
	public List<Answer> getAll() {
		return _sqlSession.selectList("Answer.selectAll");
	}
	public List<Answer> getList(int num) {
		return _sqlSession.selectList("Answer.select",num);
	}
	public List<Integer> getCountsByBoards(List<Board> boards) {
		return _sqlSession.selectList("Answer.countsByBoards", boards);
	}
	
	public void delete(int id) {
		_sqlSession.delete("Answer.delete", id);
		
	}
	public void add(Answer answer) {
		_sqlSession.insert("Answer.add", answer);
	}
	public void update(Answer answer) {
		_sqlSession.update("Answer.update", answer);
		
	}

	
	
}
