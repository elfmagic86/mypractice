package _tutorial.tsp;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Scanner;
public class Main {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(Paths.get("examples/_tutorial/tsp/tsp1.txt"));
//        Scanner sc = new Scanner(System.in);
        int cases = sc.nextInt();
        while(cases-- > 0) {
        	int wpLength = sc.nextInt();
        	double[][] wp = new double[wpLength][wpLength];
        	
        	for(int i=0; i<wpLength; ++i) {
        		for(int j=0; j<wpLength; ++j) {
        			wp[i][j] = sc.nextDouble();
        		}
        	}
        	System.out.println(new Tsp(wp).solve());
        }
    }
};
