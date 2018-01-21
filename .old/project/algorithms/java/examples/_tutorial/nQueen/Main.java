package _tutorial.nQueen;
import java.io.IOException;
import java.util.Scanner;
public class Main {
    public static void main(String[] args) throws IOException {
//        Scanner sc = new Scanner(Paths.get("examples/_tutorial/search/nQueen.txt"));
        Scanner sc = new Scanner(System.in);
        int cases = sc.nextInt();
        while(cases-- > 0) {
        	int n = sc.nextInt();
        	System.out.println(new nQueen(n).solve());
        }
    }
};
