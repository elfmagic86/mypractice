import static org.junit.Assert.*;

import java.util.Timer;

import org.junit.Before;
import org.junit.Test;

// 그냥 문제를풀자....
public class dfs {

	int[][] dp = new int[6][6];
	int count     = 0;
//	@Test
	// x,y까지의 모든 경로. 
	public void maxDfs() {
		int result = dfs(1,5);
		System.out.println("count : "+count);
		System.out.println("result :"+result );
	}
	//
	private int dfs(int x, int y) {
		if(x<0 || y<0) return 0;
		if(x==0 && y==0) return 1;
		
		if(dp[x][y] != 0) return dp[x][y];
		
		// 줄일수있음..
		int ret=0;
		ret = dp[x][y] = dfs(x-1, y)+ dfs(x, y-1);
		System.out.println(x+","+y+":"+ret);
		++count;
		return ret;
	}
	
	

}
