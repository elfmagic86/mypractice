package _tutorial.boardCover;

import java.util.Arrays;
import java.util.List;

public class Block {

//	Position standardPos;
	final Position _leftWeight; 
	final Position _rightWeight; 
	Block(Position leftWeight, Position rightWeight) {
		this._leftWeight  = leftWeight;
		this._rightWeight = rightWeight;
	}
	
	// 점 세개.가진 블락이고. 기준을 중심으로.. 가중치 점만...
	static List<Block> _allBlock = Arrays.asList(
											  new Block(new Position(1,0), new Position(1,1) )
											 ,new Block(new Position(1,0), new Position(1,-1) )
											 ,new Block(new Position(0,1), new Position(1,1) )
											 ,new Block(new Position(1,0), new Position(0,1) )
											 );
	public static List<Block> getAllBlock() {
		return _allBlock;
	}
	public List<Position> getWeights() {
		return Arrays.asList(this._leftWeight, this._rightWeight);
	}
	
	
}
