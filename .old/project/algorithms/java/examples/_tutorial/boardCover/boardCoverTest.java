package _tutorial.boardCover;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class boardCoverTest {

	BoardCover bc;
	@Before
	public void setUp() throws Exception {
	    int[][] board = {
		                   {0,0,0,0,0, 0,0,0,0,0}
		                  ,{0,1,1,1,1, 1,1,1,1,0}
		                  ,{0,1,1,1,1, 1,1,1,1,0}
		                  ,{0,1,1,1,1, 1,1,1,1,0}
		                  ,{0,1,1,1,1, 1,1,1,1,0}
		                  ,{0,1,1,1,1, 1,1,1,1,0}
		                  ,{0,1,1,1,1, 1,1,1,1,0}
		                  ,{0,0,0,0,0, 0,0,0,0,0}
		                };
		bc = new BoardCover(board);
	}

	@Test
	public void test() {
		System.out.println(bc.solve());
	}

}
