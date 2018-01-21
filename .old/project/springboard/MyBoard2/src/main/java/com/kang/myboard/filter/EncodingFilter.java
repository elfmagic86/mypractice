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
	
	//테스트용
	private int count=0;
	
	public void destroy() {
		// TODO Auto-generated method stub
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		//테스트용
		System.out.println(count++ +" : " + this);
		
		
		request.setCharacterEncoding(encording);
		
		chain.doFilter(request, response);
	}

	public void init(FilterConfig args) throws ServletException {
		//web.xml에서 전달한 encoding값 말고 내부적으로 사용하는 ignore가 있다(난 무시.)
		//아마 설정에서 ignore로 필터를 사용할것인지 판단하는듯 하다.
/*		String encoding = args.getInitParameter("encoding");
		this.encording = encording;*/
		System.out.println("필터");
	}

}
