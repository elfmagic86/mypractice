import java.util.List;
import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;
import io.reactivex.Observable.*;

/*
 * This Java source file was generated by the Gradle 'init' task.
 */
public class App {
    public void hello(String ...names) {
		Observable.fromArray(names).subscribe((v) -> System.out.println(v));
    }

    public static void main(String[] args) throws Exception {
		App app = new App();
		
		app.hello("Hello", "World");
		
		Observable.just("one", "two2", "three3")
			.delay(w -> Observable.timer(w.length(), TimeUnit.SECONDS))
			.subscribe(System.out::println);
		
		Observable.just("11one", "two2", "three3")
			.flatMap(w -> Observable.timer(w.length(), TimeUnit.SECONDS).map(x -> w))
			.subscribe(System.out::println);
			
		
		Observable.just(0, 1).startWith(100).subscribe(System.out::println);
		
		Thread.sleep(13000);
    }


}
