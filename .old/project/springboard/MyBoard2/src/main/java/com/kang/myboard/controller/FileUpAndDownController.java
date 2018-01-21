package com.kang.myboard.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.AbstractView;

import com.kang.myboard.support.FileUpDown;

@Controller
public class FileUpAndDownController {
	
	@RequestMapping(value="/download/{fileName:.+}", method=RequestMethod.GET)
	public void download(@PathVariable String fileName, HttpServletRequest request, HttpServletResponse response) {
		fileName = FileUpDown.decodeFileName(fileName);
		File file = FileUpDown.createFile(fileName, request);
		OutputStream out =  FileUpDown.getOutputStreamBy(response, file);
		FileUpDown.writeFile(file, out);
		//5. 응답닫기
        try {
			out.flush();
		} catch (IOException e) {
			throw new RuntimeException("response 연결 종료 실패");
		}
	}
	@ResponseBody
	@RequestMapping(value="/uploadImage", method=RequestMethod.POST)
	public String uploadImg(@RequestParam MultipartFile imageFile, HttpServletRequest request) {
		String fileName = FileUpDown.saveFileInLocal(imageFile, request);
		String url = FileUpDown.getUrlByLocalFileName(fileName);
		return url;
	}
	
};
