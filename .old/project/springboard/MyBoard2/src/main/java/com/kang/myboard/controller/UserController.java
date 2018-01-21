package com.kang.myboard.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.kang.myboard.service.UserService;


@Controller
@RequestMapping(value="/users")
public class UserController {
	
	private UserService service;
	
	@RequestMapping(value="/list")
	public String getList(ModelMap model)	{
		model.put("users", service.getAll());
		String viewName = "list";
		return viewName;
	}
}
