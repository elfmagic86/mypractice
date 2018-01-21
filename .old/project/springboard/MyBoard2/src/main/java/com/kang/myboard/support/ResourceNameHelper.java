package com.kang.myboard.support;

public class ResourceNameHelper {

	public static String transferPartOfUrl(String date, String title) {
		date = "/" + date.replace("-","/");
		
		title = title.trim().replace("  ", " ").replace("   ", " ");
		title = "/"+ title.replace(" ","_");
		return date + title;
	}

	
}
