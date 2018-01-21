package _tutorial.clocksync;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Scanner;
public class Main {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(Paths.get("examples/_tutorial/clocksync/clocksync.txt"));
//        Scanner sc = new Scanner(System.in);
        int cases = sc.nextInt();
        while(cases-- > 0) {
        	
        	int[] clocks = new int[16]; 
        	for( int i = 0; i < 16; ++i) {
        		clocks[i] = sc.nextInt();
        	}
        	System.out.println(new ClockSync(clocks).solve());
        }
    }
};
