
public class HelloWorld2 {
	public static void main(String[] args) throws Exception {
		int count = 100;
		while(--count > 0) {
			System.out.println(count + ": sleep 1");
			Thread.sleep(1000);
		}
		System.out.println("helloworld2");
	}
}
