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
	
	// �������
	@Test
	public void test() {
		assertEquals(nq.isLastQueen(3), true); //������������
		assertEquals(nq.isLastQueen(4), false); //������������
		
		// 0,1,2...�����ϱ�.
		assertEquals(nq.isWrongRange(3), true); //�����������
		assertEquals(nq.isWrongRange(2), false); //����������� 
	}
	// pruning
//	@Test
	public void pruningTest() {
		// ����ġ���ؾ��ϴ���. ���� �Ϳ� ����.
		// ���� ����, �� �Ʒ�, �밢��, ������ ���� Ȯ��.
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
			System.out.println(" �ð�(ms) : "+(endTime-startTime));
		}
		
	}
}
