package _tutorial.boardCover;

import java.util.List;

public class BoardCover {
	Board _board;
	
	public BoardCover(int[][] board) {
		this._board = new Board(board);
	}

	public int solve() {
		Position curPos = this._board.nextOpenPositionBy(new Position(0,-1));
		
		return this.allCoverCaseCount(curPos, this._board);
	}
	
	public int allCoverCaseCount(Position curPos, Board curBoard) {
		if(curBoard.isCompletePosition(curPos)) return 1; // 한번 성공.
		
		int sum = 0; //  실패시.
		List<Block> enableBlocks = curBoard.getEnableBlocksBy(curPos);
		for(Block enableBlock : enableBlocks) {
			
			curBoard.setBlock(enableBlock, curPos);
			Position nextOpenPos = curBoard.nextOpenPositionBy(curPos); 
			sum += this.allCoverCaseCount(nextOpenPos, curBoard);
			curBoard.unSetBlock(enableBlock, curPos);
		}
		return sum;
	}

}
