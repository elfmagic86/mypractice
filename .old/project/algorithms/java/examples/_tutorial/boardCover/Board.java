package _tutorial.boardCover;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Board {

	Position    _completePosition;
	int[][] _board;
	
	public Board(int[][] board) {
		this._board = board;
		this._completePosition = new Position(-1,-1);
	}
	public Position nextOpenPositionBy(Position pos) {
		int nextX = pos.x;
		int nextY = pos.y;
		Position nextOpenPos = null;
		while(nextOpenPos == null) {
			// 현재 위치에서 y증가시키는데.
			nextY += 1;
			//만약 y범위 넘어가면. 다음열 처음위치로
			if(this._isOverHeight(nextX, nextY)) {
				nextY  = 0;
				nextX += 1;
			}
			//만약 x범위 넘어갔다면. 모든 칸이 블락으로 덮어진것임.
			if(this._isOverWidth(nextX)) {
				nextOpenPos = this._getCompletePosition();
				continue;
			}
			//칸의 값이 1이면 맞음.
			if(this._isOpenPosition(nextX, nextY)) {
				nextOpenPos = new Position(nextX, nextY);
				continue;
			}
		}
		return nextOpenPos;
	}
	private boolean _isOpenPosition(int x, int y) {
		if(this._board[x][y] == 1) return true;
		else return false;
	}

	private Position _getCompletePosition() {
		return this._completePosition;
	}
	private boolean _isOverWidth(int x) {
		if(x >= this._board.length || x<0) return true;
		else return false;
	}
	private boolean _isOverHeight(int x, int y) {
		if(this._isOverWidth(x)) return false; 
		
		if(y >= this._board[x].length || y<0) return true;
		else return false;
	}
	public boolean isCompletePosition(Position pos) {
		if(_completePosition.equals(pos)) return true;
		else return false;
	}
	public List<Block> getEnableBlocksBy(Position pos) {
		List<Block> enableList = new ArrayList<Block>(); 
		List<Block> allList = Block.getAllBlock();
		for(Block block : allList) {
			if(this._isEnableBlock(block, pos)) enableList.add(block);
		}
		
		return enableList;
	}
	private boolean _isEnableBlock(Block block, Position pos) {
		int x = pos.x; int y = pos.y;
		for(Position weight : block.getWeights()) {
			int posX = x + weight.x;
			int posY = y + weight.y;
			
			if(this._isOverHeight(posX, posY)) return false;
			if(this._isOverWidth(posX)) return false;
			if(!this._isOpenPosition(posX, posY)) return false;
		}
		
		return true;
	}
	public void unSetBlock(Block block, Position pos) {
		this._setBlockValue(block, pos, 1);
	}
	public void setBlock(Block block, Position pos) {
		this._setBlockValue(block, pos, 0);
	}
	public void _setBlockValue(Block block, Position pos, int value) {
		int x = pos.x; int y = pos.y;
		for(Position weight : block.getWeights()) {
			int posX = x + weight.x;
			int posY = y + weight.y;
			
			this._board[posX][posY] = value;
		}
	}

}
