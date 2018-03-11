package com.practice.basic;

import static java.util.concurrent.Executors.newFixedThreadPool;

import java.math.BigInteger;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ThreadFactory;

import com.google.common.util.concurrent.ThreadFactoryBuilder;

import io.reactivex.Observable;
import io.reactivex.Scheduler;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Basic {
	public static void main(String[] args) throws Exception {
		Basic b = new Basic();
		
		runner(() -> {
	    	Observable<Integer> ints = b.single_int();
	    	
	    	// !! cache는 항상 메모리 주의, 무한스트림에 사용한다면..
	    	ints = ints.cache();
	    	ints.subscribe(i -> log.info("EL a: {}", i));
	    	ints.subscribe(i -> log.info("EL b: {}", i));			
		});
		
		runner(() -> {
	    	Observable<Integer> ints = b.single_int();    			
	    	
	    	ints.subscribe(i -> log.info("EL a: {}", i));
	    	ints.subscribe(i -> log.info("EL b: {}", i));
		});
		runner(() -> {
			Observable<Integer> ints = b.infinite_async_int();
			
			Disposable d = ints
				.subscribe(i -> log("int {}", i),
						   error -> log("error {}", error),
						   () -> log("-complete-"));			
			
			sleep(200);
			
			d.dispose();
		});
		
	}
	
	// ---------------------------------------------------------------
	// target
	// ---------------------------------------------------------------
	private Observable<Integer> single_int() {
		return Observable.create(s -> {
			log.info("Create");
			s.onNext(42);
			s.onComplete();
		});
	}
	
	private Observable<Integer> infinite_async_int() {
		return Observable.create(s -> {
			Runnable r = () -> {
				BigInteger i = BigInteger.ZERO;
				
				while (!s.isDisposed()) {
					s.onNext(i.intValue());
					
					i = i.add(BigInteger.ONE);
					
					// 1000이면 강제완료
					if (i.intValue() == 1000) {						
						s.onComplete();
//						break; //break가 없더라도 isDisposed() 체크가 되므로 문제없다. 
					}
				}
			};
			
			new Thread(r).start();
		});
	}
	
	
	// 나중에 따로떼어냄
	static Integer scedulerNumber = 0; 
    private static Scheduler createScheduler() {
    	ThreadFactory tf = new ThreadFactoryBuilder()
    			.setNameFormat("Sched-" + (++scedulerNumber) + "-%d")
    			.build();
    	
		ExecutorService pool = newFixedThreadPool(10, tf);
		Scheduler s = Schedulers.from(pool);
		
		return s;
	}
	// ---------------------------------------------------------------
	// help
	// ---------------------------------------------------------------
	private static void runner(Runnable r) {
		log.info("\n\n#start {}", r.getClass().getSimpleName());
		
		r.run();
		
		log.info("#end\n");
	}
	
	private static void sleep(long m) {
		log("sleep {}", m);
		try {
			Thread.sleep(m);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	private static void log(String m, Object ...o) {
		log.info(m, o);
	}
}
