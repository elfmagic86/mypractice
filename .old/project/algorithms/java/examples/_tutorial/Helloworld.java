package _tutorial;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Scanner;
public class Helloworld {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(Paths.get("examples/_tutorial/helloworld.txt"));
//        Scanner sc = new Scanner(System.in);
        int cases = sc.nextInt();
        while(cases-- > 0) {
        	System.out.println("Hello, "+sc.next()+"!");
        }
    }
}