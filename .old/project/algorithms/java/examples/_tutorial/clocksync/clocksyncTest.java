package _tutorial.clocksync;

import static org.junit.Assert.*;

import java.util.Arrays;

import org.junit.Before;
import org.junit.Test;

public class clocksyncTest {

	ClockSync cs;
	@Before
	public void setup() {
		int[] line = {12,9,3,12,6,6,9,3,12,9,12,9,12,12,6,6};
//		int[] line = {12,6,6,6,6,6,12,12,12,12,12,12,12,12,12,12};
//		int[] line = {12,9,3,12,6,6,9,3,3,3,3,9,12,3,6,6};
		cs = new ClockSync(line);
		
	}
	
	//스위치 누른 경우. 시간변동  %12..이걸로.
	@Test
	public void test() {
		//012     ->  0, 9, 9 6 .... 
		int[] times = cs.pressSwitch(0, new int[]{0,3,9});
		
		assertEquals(3, times[0]);
		assertEquals(6, times[1]);
		assertEquals(0, times[2]);
	};
	
	@Test
	public void solve() {
		long startTime = System.currentTimeMillis();
		System.out.println("solve : "+cs.solve());
		System.out.println(System.currentTimeMillis()-startTime+"ms");
	}

}
