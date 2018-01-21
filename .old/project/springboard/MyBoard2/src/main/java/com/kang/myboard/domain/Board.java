package com.kang.myboard.domain;

import org.springframework.web.multipart.MultipartFile;

public class Board {
	
	//num , writer, email, subject, passwd, reg_date, readcount, content;
	private int num=0; // 'board_seq.nextval'
	private String writer="";
	private String email="";
	private String subject="";
	private String passwd="";
	private String reg_date=""; //어떻게 DB와의 일관성을 지킬 것인가. 현재데이터   'sysdate'
	private int readcount=0;
	private String content="";
	private MultipartFile uploadedFile=null;
	private String filename="";
//	기타정보

	private static int MAXROWSIZE_OF_ONEPAGE = 3;
	/////////////////////// constructor
	public Board() {};
	public Board(int number, String writer, String email, String subject,
			String passwd, String reg_date, int readcount, String content) {
		this.num = number;
		this.writer = writer;
		this.email = email;
		this.subject = subject;
		this.passwd = passwd;
		this.reg_date = reg_date;
		this.readcount = readcount;
		this.content = content;
	}
	public String getUrl() {
//		String date = this.reg_date; 
		String title = this.subject;
		
/*		if(date.indexOf(" ") != -1) {
			date = reg_date.substring(0,reg_date.indexOf(" "));
		}
		date = "/" + date.replace("-","/");*/
		String num = "/"+this.num;
		title = "/"+ title.replace(" ","_");
		return "/board"+num + title;
	}
	/////////////////////// get,set
	public String getFilename() {
		return filename;
	}
	public void setFilename(String fileName) {
		this.filename = fileName;
	}
	public MultipartFile getUploadedFile() {
		return this.uploadedFile;
	}
	public void setUploadedFile(MultipartFile uploadedFile) {
		this.uploadedFile = uploadedFile;
	}

	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		subject = subject.trim();
		this.subject = subject;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public String getReg_date() {
		return reg_date;
	}
	public void setReg_date(String reg_date) {
		this.reg_date = reg_date;
	}
	public int getReadcount() {
		return readcount;
	}
	public void setReadcount(int readcount) {
		this.readcount = readcount;
}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	@Override
	public String toString() {
		return "Board [num=" + num + ", writer=" + writer + ", email=" + email
				+ ", subject=" + subject + ", passwd=" + passwd + ", reg_date="
				+ reg_date + ", readcount=" + readcount + ", content="
				+ content + "]";
	}
	
	/*
	 * helper
	 */
	public boolean hasUploadedFile() {
		if(this.uploadedFile != null && !(this.uploadedFile.isEmpty())) 
			return true; 
		else 
			return false;
	}
	
	public static void setMaxRowSizeOfOnePage(int maxSize) {
		Board.MAXROWSIZE_OF_ONEPAGE = maxSize;
	}
	public static int getPageSizeBy(int rowSize) {
		int maxSizeOfOnePage = MAXROWSIZE_OF_ONEPAGE;
		int pageSize = rowSize / maxSizeOfOnePage;
		if(rowSize%maxSizeOfOnePage!=0) {	++pageSize;}
		return pageSize;
	}
	public static int getEndRowIndexOf(int pageIndex, int rowSize) {
		int endRowNum = MAXROWSIZE_OF_ONEPAGE * pageIndex;
		if(endRowNum > rowSize) {endRowNum = rowSize;}
		return endRowNum;
	}
	public static int getStartRowIndexOf(int pageIndex) {
		int startRowIndex = (pageIndex-1)* MAXROWSIZE_OF_ONEPAGE +1;
		return startRowIndex;
	}
	public static int getPageNumberBy(int rowNumber) {
		int pageNumber = (rowNumber / MAXROWSIZE_OF_ONEPAGE);
		if(rowNumber % MAXROWSIZE_OF_ONEPAGE != 0) 
			pageNumber = pageNumber+1;
		return pageNumber;
	}

}
