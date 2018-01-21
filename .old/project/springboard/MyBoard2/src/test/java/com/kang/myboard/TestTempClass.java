package com.kang.myboard;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class TestTempClass {

	@Before
	public void setUp() throws Exception {
	}

	
	//1.문자열 str응ㄹ 숫자로 변환해서 su변수에 입력하시오.
	@Test
	public void test() {
		String str = "1234";
		int su = Integer.parseInt(str);
	//2. 문자열 str에 숫자 아닌 값이 있는지 확인하시오.
		String str1="1234";
		String str2 = "12a34";
		
		
		 if(_containsNotNumber(str2))
			 System.out.println("숫자아닌거 포함됨");
		 else
			 System.out.println("숫자만있음");
	}
	private boolean _containsNotNumber(String str) {
		for(int i=0,max=str.length(); i<max; ++i) {
			char ch = str.charAt(i);
			if(Character.isLetter(ch))
				return true;
		}
		return false;
	}
	

}
