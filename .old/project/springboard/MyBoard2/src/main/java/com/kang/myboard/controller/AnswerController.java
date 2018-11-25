package com.kang.myboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.kang.myboard.dao.AnswerDAO;
import com.kang.myboard.domain.Answer;

@Controller
public class AnswerController {
	@Autowired
	private AnswerDAO _answerDAO;
	
	@RequestMapping(value="/answer/{id}", method=RequestMethod.DELETE)
	public String delete(@PathVariable int id,
						 @RequestParam int b_num) {
		_answerDAO.delete(id);
		//����ΰ����ϴµ�... �߰������� �ʿ��ϴٴ°��ε�... �ƴϸ� ajax
		return "redirect:/board/"+b_num;
	}
	
	@RequestMapping(value="/answer", method=RequestMethod.POST)
	public String write(Answer answer) {
		_answerDAO.add(answer);
		//����ΰ����ϴµ�... �߰������� �ʿ��ϴٴ°��ε�... �ƴϸ� ajax
		int id = answer.getB_num();
		return "redirect:/board/"+id;
	}
	
}
