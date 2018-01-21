package com.kang.myboard.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.orm.ibatis.SqlMapClientTemplate;

import com.kang.myboard.domain.Board;

public class BoardDAO {
	
	/////////////////// default member
	private SqlSession _sqlSession; //요상한것이 받는놈이랑 주는놈이달러. 상속관계인듯.
	public void setTemplate(SqlSession template)
	{
		this._sqlSession = template;
	}
	
	//////////////////////////////////////////////////
	
	
	public void add(Board board) {
		_sqlSession.insert("Board.add", board);
	}

	
	public Board get(int num) {
		return (Board) _sqlSession.selectOne("Board.select",num);
	}
	public List<Board> getList(int startRowIndex, int endRowIndex) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startRowIndex", startRowIndex);
		map.put("endRowIndex", endRowIndex);
		return _sqlSession.selectList("Board.selectList", map);
	}
	
	public List<Board> getAll() {
		return  _sqlSession.selectList("Board.selectAll");
	}

	
	//TODO: 정지한다 왜 그럴까.
	
	public void deleteAll() {
		_sqlSession.delete("Board.deleteAll");
	}

	
	public int getRowSize() {
		return (Integer) _sqlSession.selectOne("Board.rowCount");
	}

	public int getRowSize(String query) {
		return (Integer) _sqlSession.selectOne("Board.rowCountOfquery", query);
	}

	
	public void update(Board board) {
		_sqlSession.update("Board.update", board);
	}
	public void updateReadcount(Board board) {
		_sqlSession.update("Board.updateReadcount", board);
	}
	
	public void delete(int id) {
		_sqlSession.delete("Board.delete", id);
		
	}

	public List<Board> search(String query) {
		return search(query,null,null);
	}
	public List<Board> search(String query, Integer startRowIndex, Integer endRowIndex) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startRowIndex", startRowIndex);
		map.put("endRowIndex", endRowIndex);
		map.put("query", query);
		return _sqlSession.selectList("Board.search",map);
	}

}
