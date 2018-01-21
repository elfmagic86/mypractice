package com.kang.myboard.support;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class ResourceNameHelperTest {
	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() {
		String date = "2014-04-18";
		String title = "www  eee  ff ";
		String url = ResourceNameHelper.transferPartOfUrl(date, title);
		System.out.println(url);
		fail("Not yet implemented");
	}

}
