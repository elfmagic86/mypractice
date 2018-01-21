package _tutorial.nQueen;

public class nQueen {
    
	int[][] board;
    int maxRowI, maxColumnI, queenCount;
    
    
    public nQueen(int n) { 
    	this.setUp(n);
    };
    private void setUp(int n) {
    	this.maxRowI    = n;
    	this.maxColumnI = n;
    	this.queenCount = n;
    	
    	this.board = new int[n][n];
	}

	int caseCount = 0;
    // n*n 
	public int solve() {
		
		for(int i =0; i < this.maxColumnI; ++i) {
			dfs(0, i, 1); //첫번째 행의 각 요소가 현재노드가 됨. 모든경우확인.. 
		};
		// caseCount는 dfs중. 일치할경우.
		return caseCount;
	}
	private void dfs(int curRowI, int curColumnI	, int curQueenCount) {
		//범위 넘어가면 암것도안함.
		if(curRowI > this.maxRowI || curColumnI > this.maxColumnI) return; 
		
		// 현재 노드에 대해 가지치기 가능하면 암것도 안함
		if(beAblePruning(curRowI, curColumnI)) { return; } // 가지치기되면 넘겨버리고.
		
		this.setQueen(curRowI, curColumnI); //깊이우선탐색을위해.. 현재 것 기록.
		
		if(this.isLastQueen(curQueenCount) ) {
			//확인용
//			for(int i=0; i<this.board.length; ++i) {
//				for(int j=0; j<this.board.length; ++j) {
//					if(this.board[i][j]==1) System.out.print("["+i+":"+j+"], ");
//				}
//			}
//			
//			System.out.println();
			++this.caseCount;
		}
		
		
		// 모든 자식행에 대해 깊이 우선 탐색
		int childRowI 		= curRowI + 1;
		int childQueenCount = curQueenCount + 1;
		for(int childColumnI = 0; childColumnI < this.maxColumnI; ++childColumnI) {
			dfs(childRowI, childColumnI, childQueenCount); //다음것에 대해서도.
		}
		//모든 자식확인 후 해제.
		this.unSetQueen(curRowI, curColumnI);
		return ;
	}
	//가로열, 세로열, 대각선열 확인. .// 여기서 가로열은 확인안해도됨.
							 // 현재 row..를 기준으로. 그 이전 로우 전부 확인해보면됨.
	boolean beAblePruning(int rowI, int columnI) {
		int rowCount = 0; // 몇번째 행 확인하는지. 현재행은 확인안함.
		
		for(int curRowI = rowI-1; curRowI >= 0; --curRowI) {
			++rowCount; 
			int center = columnI;
			int left   = center-rowCount;
			int right  = center+rowCount;
			
//			System.out.println(curRowI+" : "+center+", "+left+","+right);
			if( (board[curRowI][center] ==1) ||
				(left >=0 && board[curRowI][left] ==1) ||
				(right < this.maxColumnI && board[curRowI][right] ==1)
			   ) return true; //세로열확인..
			
		} 
		return false;
	}
	public boolean isLastQueen(int i) {
		if(i == this.queenCount) return true; 
		else return false;
	}
	public Object isWrongRange(int i) {
		if(i >= this.maxColumnI || i >= this.maxRowI) return true;
		else return false;
	}
	public void setQueen(int i, int j) {
		this.board[i][j] = 1;
	}
	public void unSetQueen(int i, int j) {
		this.board[i][j] = 0;
	}
}