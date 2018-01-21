package _tutorial.nQueen;

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class nQueenTest {

	nQueen nq;
	@Before
	public void setup() {
		nq = new nQueen(3);
	}
	
	// 경계조건
	@Test
	public void test() {
		assertEquals(nq.isLastQueen(3), true); //마지막퀸인지
		assertEquals(nq.isLastQueen(4), false); //마지막퀸인지
		
		// 0,1,2...까지니까.
		assertEquals(nq.isWrongRange(3), true); //범위벗어나는지
		assertEquals(nq.isWrongRange(2), false); //범위벗어나는지 
	}
	// pruning
//	@Test
	public void pruningTest() {
		// 가지치기해야하는지. 현재 것에 대해.
		// 퀸을 놓고, 그 아래, 대각선, 가능한 곳을 확인.
		nq.setQueen(0,0);
		assertEquals(nq.beAblePruning(1,0), true);
		assertEquals(nq.beAblePruning(1,1), true);
		assertEquals(nq.beAblePruning(2,2), true);
		
		assertEquals(nq.beAblePruning(2,1), false);
	}
	
	//solve
	@Test
	public void solve() {
		for(int i = 0; i<=12; ++i) {
//			if(i != 9) continue;
			
			long startTime = System.currentTimeMillis();
			
			int nQueenCase = new nQueen(i).solve();
			System.out.println(i+" : "+nQueenCase);	
			long endTime = System.currentTimeMillis();
			System.out.println(" 시간(ms) : "+(endTime-startTime));
		}
		
	}
}
