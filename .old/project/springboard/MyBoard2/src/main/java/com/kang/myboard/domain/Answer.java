package com.kang.myboard.domain;

public class Answer {
	
	private int a_id = 0;
	private String writer = "";
	private String content = "";
	private String reg_date = "";
	private int b_num = 0;
	
	public Answer() {};
	public Answer(String writer,String content, int b_num) {
		this.writer = writer;
		this.content = content;
		this.b_num = b_num;
	}
	public int getA_id() {
		return a_id;
	}
	public void setA_id(int num) {
		this.a_id = num;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	public String getReg_date() {
		return reg_date;
	}
	public void setReg_date(String reg_date) {
		this.reg_date = reg_date;
	}
	public int getB_num() {
		return b_num;
	}
	public void setB_num(int b_num) {
		this.b_num = b_num;
	}
	@Override
	public String toString() {
		return "Answer [a_id=" + a_id + ", writer=" + writer + ", content="
				+ content + ", reg_date=" + reg_date + ", b_id=" + b_num + "]";
	}
	
}
