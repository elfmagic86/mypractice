package com.kang.myboard;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class TestTempClass {

	@Before
	public void setUp() throws Exception {
	}

	
	//1.���ڿ� str���� ���ڷ� ��ȯ�ؼ� su������ �Է��Ͻÿ�.
	@Test
	public void test() {
		String str = "1234";
		int su = Integer.parseInt(str);
	//2. ���ڿ� str�� ���� �ƴ� ���� �ִ��� Ȯ���Ͻÿ�.
		String str1="1234";
		String str2 = "12a34";
		
		
		 if(_containsNotNumber(str2))
			 System.out.println("���ھƴѰ� ���Ե�");
		 else
			 System.out.println("���ڸ�����");
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
