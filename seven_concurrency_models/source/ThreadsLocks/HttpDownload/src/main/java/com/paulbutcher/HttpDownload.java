package com.paulbutcher;

import java.net.URL;

public class HttpDownload {

  public static void main(String[] args) throws Exception {
	  try {
		  run();
	  } catch (Exception e) {
		  System.out.println(e);
	  }
  }
  public static void run() throws Exception {
      // URL from = new URL("http://download.wikimedia.org/enwiki/latest/enwiki-latest-pages-articles.xml.bz2");
  	URL from = new URL("https://github.com/dcevm/dcevm/archive/light-jdk8u152.zip");
  	Downloader downloader = new Downloader(from, "download.out");
	System.out.println("1---");
  	downloader.start();
  	downloader.addListener(new ProgressListener() {
  		public void onProgress(int n) { System.out.print("\r"+n); System.out.flush(); }
  		public void onComplete(boolean success) {}
  	});
	System.out.println("---");
  	downloader.join();
  }
}
