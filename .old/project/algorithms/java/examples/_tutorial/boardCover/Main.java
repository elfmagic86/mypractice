package _tutorial.boardCover;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Scanner;
public class Main {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(Paths.get("examples/_tutorial/boardCover/boardCover.txt"));
//        Scanner sc = new Scanner(System.in);
        int cases = sc.nextInt();
        while(cases-- > 0) {
        	int xLength = sc.nextInt();
        	int yLength = sc.nextInt();
        	int[][] board = new int[xLength][yLength];
        	
        	for(int x=0; x<xLength; ++x) {
        		char[] chars= sc.next().trim().toCharArray();
        		for(int y=0; y<yLength; ++y) {
        			char ch = chars[y];
        			if(ch =='.') ch = 1;
        			else 		 ch = 0;
        			board[x][y] = ch;
        		}
        	}
        	System.out.println(new BoardCover(board).solve());
        }
    }
};
