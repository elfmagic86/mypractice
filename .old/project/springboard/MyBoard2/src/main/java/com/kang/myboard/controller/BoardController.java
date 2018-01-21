package com.kang.myboard.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.kang.myboard.dao.AnswerDAO;
import com.kang.myboard.dao.BoardDAO;
import com.kang.myboard.domain.Answer;
import com.kang.myboard.domain.Board;
import com.kang.myboard.service.AnswerService;
import com.kang.myboard.service.BoardService;
import com.kang.myboard.support.FileUpDown;

@Controller
public class BoardController {
	
	@Autowired
	private BoardService _boardService;
	
	// / view names
	private static String BOARD = "board/";
	private static final String LIST = BOARD + "list";
	private static final String SEARCH_LIST = BOARD + "searchList";
	private static final String DETAIL = BOARD + "detail";
	private static final String WRITE = BOARD + "write";
	private static final String UPDATE = BOARD + "update";

	//mainPageNum 1
	private static final int MAIN_PAGE_INDEX = 1;
	/*
	 * get //read
	 */
	@RequestMapping(value = "/board", method = RequestMethod.GET)
	public ModelAndView listView(@RequestParam(value="page", required=false) Integer page) { //reqeustparm사용시 형식주의
		if(page == null) {page = MAIN_PAGE_INDEX;}
		
		ModelAndView mav = new ModelAndView();
		Map<String,?> modelMap = _boardService.getDataOfListAt(page);
		mav.addAllObjects(modelMap);
		mav.setViewName(LIST);
		return mav;
	}

	@RequestMapping(value = "/board/{num}/{title}" , method = RequestMethod.GET)
	public ModelAndView detailView(@PathVariable int num) {
		ModelAndView mav = new ModelAndView();
		Map<String,?> modelMap = _boardService.getDataOfDetail(num);
		mav.addAllObjects(modelMap);
		mav.setViewName(DETAIL);
		return mav;
	}
	@RequestMapping(value = "/board/{num}" , method = RequestMethod.GET)
	public String detailView2(@PathVariable int num) {
		String redirectUrl = _boardService.getRedirectUrlOf(num);
		return redirectUrl;
	}

	/*
	 * post //write
	 */
	@RequestMapping(value = "/board/new", method = RequestMethod.GET)
	public String writeView() {
		return WRITE;
	}

	@RequestMapping(value = "/board", method = RequestMethod.POST)
	public ModelAndView write(Board board, HttpServletRequest request) {
		_boardService.saveBoardToLocal(board, request);
		return listView(MAIN_PAGE_INDEX);
	}

	////////////////update
	@RequestMapping(value = "/board/{num}/{title}", method = RequestMethod.PUT)
	public ModelAndView updateView(@PathVariable int num) {
		ModelAndView mav = detailView(num);
		mav.setViewName(UPDATE);
		return mav;
	}
	@RequestMapping(value ="/board", method=RequestMethod.PUT) 
	public ModelAndView update(Board board, HttpServletRequest request) {
		_boardService.updateBoardToLocal(board, request);
		return listView(MAIN_PAGE_INDEX);
	}
	//////////////delete
	@RequestMapping(value="/board/{num}", method=RequestMethod.DELETE)
	public ModelAndView delete(@PathVariable int num) {
		_boardService.delete(num);
		return listView(MAIN_PAGE_INDEX);
	}

	/////////////search
	//TODO: /search?query=?&page=1; 이런식으로 따로빼야함.
	@RequestMapping(value="/board/search", method=RequestMethod.GET)
	public ModelAndView search(@RequestParam String query,
							   @RequestParam(value="page", required=false) Integer page) { //reqeustparm사용시 형식주의
		if(page == null) {page = MAIN_PAGE_INDEX;}
	
		ModelAndView mav = new ModelAndView();
		Map<String,?> modelMap = _boardService.getSearchedDataBy(query, page);
		mav.addAllObjects(modelMap);
		if(modelMap.get("boards") == null) 
			mav.setViewName("redirect:/board");
		else
			mav.setViewName(SEARCH_LIST);
		return mav;
	}

}
