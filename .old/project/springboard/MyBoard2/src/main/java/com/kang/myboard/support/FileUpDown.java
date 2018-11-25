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
	//2. �������� ��θ� ���� ���� ����.	
	public static void writeFile(File file, OutputStream toOut) {
		FileInputStream fis = null;
        try {
            fis = new FileInputStream(file);
            FileCopyUtils.copy(fis, toOut);
             
        } catch(Exception e){
            throw new RuntimeException("���� �ٿ�ε����");
        }finally{
            if(fis != null){
                try{
                    fis.close();
                }catch(Exception e){}
            }
        }
	}
	//3.���伳���ؼ� �ùٸ� ��Ʈ����������.
	public static OutputStream getOutputStreamBy(HttpServletResponse response, File file) {
		response.setContentType("Application/octet-stream");
        response.setContentLength((int)file.length());   
        try {
			response.setHeader("Content-Disposition", "attachment; filename=\"" +  URLEncoder.encode(file.getName(), "utf-8") + "\";");
		} catch (UnsupportedEncodingException e) {
            throw new RuntimeException("���� ���� ���� ���ڵ�����");
		}
        response.setHeader("Content-Transfer-Encoding", "binary");
         
        OutputStream out;
		try {
			out = response.getOutputStream();
		} catch (IOException e1) {
			throw new RuntimeException("response outputstream �ҷ����� ����");
		}
		return out;

	}
	//1. �ѱ۱��� �������ڵ�
	public static String decodeFileName(String fileName) {
		try {
			fileName = new String(fileName.getBytes("8859_1"), "utf-8");
		} catch (UnsupportedEncodingException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
		return fileName;
	}
	//4. ������ ���� ����. ������ �������� �غ�, ������ ���ϻ����ؼ� �� �غ�.
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
			uploadedFile.transferTo(localFile); //���Ͽ� ����.
		} catch (IOException e) {
			throw new RuntimeException("������ġ�� �����������");
		}			
		return fileName;
	}
	public static String getUrlByLocalFileName(String fileName) {
		String fullName = LOCAL_FILEPATH+fileName;
		return fullName.substring(fullName.indexOf("/"));
	}
}
