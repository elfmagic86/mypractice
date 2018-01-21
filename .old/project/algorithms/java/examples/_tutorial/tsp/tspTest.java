package _tutorial.tsp;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class tspTest {

	public Tsp tsp;
	@Before
	public void setUp() throws Exception {
		double[][] wp = {
			                {0.0000000000,326.0008994586,503.1066076077,290.0250922998}
	                       ,{326.0008994586,0.0000000000,225.1785728436,395.4019367384}
	                       ,{503.1066076077,225.1785728436,0.0000000000,620.3945520632}
	                       ,{290.0250922998,395.4019367384,620.3945520632,0.0000000000}
                        };
		tsp = new Tsp(wp);
	}

	@Test
	public void test() {
		System.out.println(tsp.solve());
	}

}
