package com.kang.myboard.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.kang.myboard.dao.AnswerDAO;
import com.kang.myboard.dao.BoardDAO;
import com.kang.myboard.domain.Answer;
import com.kang.myboard.domain.Board;
import com.kang.myboard.support.FileUpDown;

public class BoardService {
	
	private BoardDAO _boardDAO;
	private AnswerDAO _answerDAO;

	//////get set 
	public AnswerDAO getAnswerDAO() {
		return _answerDAO;
	}
	public void setAnswerDAO(AnswerDAO answerDAO) {
		this._answerDAO = answerDAO;
	}
	public BoardDAO getBoardDAO() {
		return _boardDAO;
	}
	public void setBoardDAO(BoardDAO boardDAO) {
		this._boardDAO = boardDAO;
	}
/////////// getData
	public Map<String, Object> getDataOfListAt(Integer page) {
		int rowSize = _boardDAO.getRowSize();
		int pageSize = Board.getPageSizeBy(rowSize);
		int startRowIndex = Board.getStartRowIndexOf(page);
		int endRowIndex = Board.getEndRowIndexOf(page, rowSize);		
		List<Board> boards = _boardDAO.getList(startRowIndex, endRowIndex);
		List<Integer> answerCounts = _answerDAO.getCountsByBoards(boards);
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("pageSize",pageSize);
		map.put("boards", boards);
		map.put("answerCounts", answerCounts);
		return map;
	}	
	public Map<String, ?> getDataOfDetail(int rowNumber) {
		Board board = _boardDAO.get(rowNumber);
		// viewcount를 증가시켜야함.
		//TODO : 댓글쓸때 증가시키면안됨.. 결국 코드 정리를 해야지 어느정도 싸이즈가 나올듯.
		_increaseReadcount(board);
		List<Answer> answers = _answerDAO.getList(rowNumber);
			
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("board",board);
		map.put("answers", answers);
		return map;
	}

	public Map<String, ?> getSearchedDataBy(String query, int page) {
		String machingQuery = "%"+query+"%";
		int rowSize = _boardDAO.getRowSize(machingQuery);
		int pageSize = Board.getPageSizeBy(rowSize);
		int startRowIndex = Board.getStartRowIndexOf(page);
		int endRowIndex = Board.getEndRowIndexOf(page, rowSize);
		List<Board> boards = _boardDAO.search(machingQuery,startRowIndex,endRowIndex);
		List<Integer> answerCounts = _answerDAO.getCountsByBoards(boards);
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("pageSize",pageSize);
		map.put("boards",boards);
		map.put("query",query);
		map.put("answerCounts", answerCounts);
		return map;
	}
	public String getRedirectUrlOf(int boardNum) {
		Board board = _boardDAO.get(boardNum);
		return "redirect:"+board.getUrl();
	}
	public void saveBoardToLocal(Board board, HttpServletRequest request) {
		if (board.hasUploadedFile()) {
			//1.파일저장 및 board
			MultipartFile uploadedFile = board.getUploadedFile();
			String fileName = FileUpDown.saveFileInLocal(uploadedFile, request);
			board.setFilename(fileName);
		}
		//2. DB에저장
		_boardDAO.add(board);
	}
	public void updateBoardToLocal(Board board, HttpServletRequest request) {
		if (board.hasUploadedFile()) {
			//1.파일저장 및 board
			MultipartFile uploadedFile = board.getUploadedFile();
			String fileName = FileUpDown.saveFileInLocal(uploadedFile, request);
			board.setFilename(fileName);
		}
		//2. DB에업데이트
		_boardDAO.update(board);
	}	
	public void delete(int boardNumber) {
		_boardDAO.delete(boardNumber);
	}

	
	
	/*
	 * helper
	 */
	private void _increaseReadcount(Board board) {
		int preCount = board.getReadcount();
		board.setReadcount(++preCount);
		_boardDAO.updateReadcount(board);
	}

}
