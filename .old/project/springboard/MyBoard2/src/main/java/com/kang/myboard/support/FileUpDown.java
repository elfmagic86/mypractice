package com.kang.myboard.support;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.kang.myboard.domain.Board;

public class FileUpDown {
	public static final String LOCAL_FILEPATH = "WEB-INF/resources/files/";
	//2. 로컬파일 경로를 통해 파일 생성.	
	public static void writeFile(File file, OutputStream toOut) {
		FileInputStream fis = null;
        try {
            fis = new FileInputStream(file);
            FileCopyUtils.copy(fis, toOut);
             
        } catch(Exception e){
            throw new RuntimeException("파일 다운로드실패");
        }finally{
            if(fis != null){
                try{
                    fis.close();
                }catch(Exception e){}
            }
        }
	}
	//3.응답설정해서 올바른 스트림가져오기.
	public static OutputStream getOutputStreamBy(HttpServletResponse response, File file) {
		response.setContentType("Application/octet-stream");
        response.setContentLength((int)file.length());   
        try {
			response.setHeader("Content-Disposition", "attachment; filename=\"" +  URLEncoder.encode(file.getName(), "utf-8") + "\";");
		} catch (UnsupportedEncodingException e) {
            throw new RuntimeException("파일 전송 위한 인코딩실패");
		}
        response.setHeader("Content-Transfer-Encoding", "binary");
         
        OutputStream out;
		try {
			out = response.getOutputStream();
		} catch (IOException e1) {
			throw new RuntimeException("response outputstream 불러오기 실패");
		}
		return out;

	}
	//1. 한글깨짐 파일인코딩
	public static String decodeFileName(String fileName) {
		try {
			fileName = new String(fileName.getBytes("8859_1"), "utf-8");
		} catch (UnsupportedEncodingException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
		return fileName;
	}
	//4. 로컬의 파일 생성. 있으면 파일읽을 준비, 없으면 파일생성해서 쓸 준비.
	public static File createFile(String fileName, HttpServletRequest request) {
		String filepath = LOCAL_FILEPATH + fileName;
		String realFilepath = request.getSession().getServletContext().getRealPath(filepath);
		File file = new File(realFilepath);
		return file;
	}
	
	//5.
	public static String saveFileInLocal(MultipartFile uploadedFile, HttpServletRequest request) {
		String fileName = uploadedFile.getOriginalFilename().replace(" ", "_");
		File localFile = FileUpDown.createFile(fileName, request);
		
		try {
			uploadedFile.transferTo(localFile); //파일에 쓰기.
		} catch (IOException e) {
			throw new RuntimeException("로컬위치에 파일저장실패");
		}			
		return fileName;
	}
	public static String getUrlByLocalFileName(String fileName) {
		String fullName = LOCAL_FILEPATH+fileName;
		return fullName.substring(fullName.indexOf("/"));
	}
}
