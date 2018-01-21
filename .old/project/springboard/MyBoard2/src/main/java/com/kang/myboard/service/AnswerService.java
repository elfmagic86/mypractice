package com.kang.myboard.service;

import java.util.List;

import com.kang.myboard.dao.AnswerDAO;
import com.kang.myboard.domain.Answer;

public class AnswerService {
	private AnswerDAO answerDAO;
	
	
	//////////get /set
	
	public AnswerDAO getAnswerDAO() {
		return answerDAO;
	}

	public void setAnswerDAO(AnswerDAO AnswerDAO) {
		this.answerDAO = AnswerDAO;
	}

	public List<Answer> getList(int num) {
		return answerDAO.getList(num);
	}

}
