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
			dfs(0, i, 1); //ù��° ���� �� ��Ұ� �����尡 ��. �����Ȯ��.. 
		};
		// caseCount�� dfs��. ��ġ�Ұ��.
		return caseCount;
	}
	private void dfs(int curRowI, int curColumnI	, int curQueenCount) {
		//���� �Ѿ�� �ϰ͵�����.
		if(curRowI > this.maxRowI || curColumnI > this.maxColumnI) return; 
		
		// ���� ��忡 ���� ����ġ�� �����ϸ� �ϰ͵� ����
		if(beAblePruning(curRowI, curColumnI)) { return; } // ����ġ��Ǹ� �Ѱܹ�����.
		
		this.setQueen(curRowI, curColumnI); //���̿켱Ž��������.. ���� �� ���.
		
		if(this.isLastQueen(curQueenCount) ) {
			//Ȯ�ο�
//			for(int i=0; i<this.board.length; ++i) {
//				for(int j=0; j<this.board.length; ++j) {
//					if(this.board[i][j]==1) System.out.print("["+i+":"+j+"], ");
//				}
//			}
//			
//			System.out.println();
			++this.caseCount;
		}
		
		
		// ��� �ڽ��࿡ ���� ���� �켱 Ž��
		int childRowI 		= curRowI + 1;
		int childQueenCount = curQueenCount + 1;
		for(int childColumnI = 0; childColumnI < this.maxColumnI; ++childColumnI) {
			dfs(childRowI, childColumnI, childQueenCount); //�����Ϳ� ���ؼ���.
		}
		//��� �ڽ�Ȯ�� �� ����.
		this.unSetQueen(curRowI, curColumnI);
		return ;
	}
	//���ο�, ���ο�, �밢���� Ȯ��. .// ���⼭ ���ο��� Ȯ�ξ��ص���.
							 // ���� row..�� ��������. �� ���� �ο� ���� Ȯ���غ����.
	boolean beAblePruning(int rowI, int columnI) {
		int rowCount = 0; // ���° �� Ȯ���ϴ���. �������� Ȯ�ξ���.
		
		for(int curRowI = rowI-1; curRowI >= 0; --curRowI) {
			++rowCount; 
			int center = columnI;
			int left   = center-rowCount;
			int right  = center+rowCount;
			
//			System.out.println(curRowI+" : "+center+", "+left+","+right);
			if( (board[curRowI][center] ==1) ||
				(left >=0 && board[curRowI][left] ==1) ||
				(right < this.maxColumnI && board[curRowI][right] ==1)
			   ) return true; //���ο�Ȯ��..
			
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