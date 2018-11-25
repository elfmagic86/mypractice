package com.kang.myboard.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class EncodingFilter implements Filter {

	private String encording = "euc-kr";
	
	//�׽�Ʈ��
	private int count=0;
	
	public void destroy() {
		// TODO Auto-generated method stub
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		//�׽�Ʈ��
		System.out.println(count++ +" : " + this);
		
		
		request.setCharacterEncoding(encording);
		
		chain.doFilter(request, response);
	}

	public void init(FilterConfig args) throws ServletException {
		//web.xml���� ������ encoding�� ���� ���������� ����ϴ� ignore�� �ִ�(�� ����.)
		//�Ƹ� �������� ignore�� ���͸� ����Ұ����� �Ǵ��ϴµ� �ϴ�.
/*		String encoding = args.getInitParameter("encoding");
		this.encording = encording;*/
		System.out.println("����");
	}

}
