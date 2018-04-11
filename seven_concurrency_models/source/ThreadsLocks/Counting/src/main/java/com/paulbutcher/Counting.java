package com.paulbutcher;

// START:main
public class Counting {
  public static void main(String[] args) throws InterruptedException {
    class Counter {
      private int count = 0;

	  // 접근동기화(synchronize)
      // public synchronized void increment() {
      public void increment() {
		  // 바이트코드
		  // 읽기 수정하기 쓰기
		  // getfield #2
		  // iconst_1
		  // iadd
		  // 위에서 생성한 임시값을 이시점에 쓴다, 공유메모리 문제
		  // putfield #2
		  ++count;
	  }
      public int getCount() { return count; }
    }
    final Counter counter = new Counter();
    class CountingThread extends Thread {
      public void run() {
        for(int x = 0; x < 10000; ++x)
          counter.increment();
      }
    }

    CountingThread t1 = new CountingThread();
    CountingThread t2 = new CountingThread();
    t1.start(); t2.start();
    t1.join(); t2.join();
    System.out.println(counter.getCount());
  }
}
// END:main
