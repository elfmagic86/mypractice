package exam1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Stack;
import java.util.function.BiPredicate;
import java.util.function.IntConsumer;
import java.util.function.IntFunction;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import javax.lang.model.type.ErrorType;

// fromString -> toString 으로 스택을 이용하여 재배치함.

public class StringShuffler {
	Stack<Integer> _stack = new Stack<Integer>();
	List<Integer> _fromIndexes;
	
	public StringShuffler(String fromStr, String toStr) {
		this._fromIndexes = _getFromIndexes(fromStr, toStr);
	}
	//목표인 toString을 1,2,3...의 '정렬된상태'로 보고, fromStr을 그에 부합되는 인덱스 리스트로 만든다.
	private List<Integer> _getFromIndexes(String fromStr, String toStr) {
		List<Integer> fromIndexes   = new ArrayList<Integer>();
		List<Integer> cachedIndexes = new ArrayList<Integer>(); //toStr
		//index, 값, 셀렉트.
		Integer max = fromStr.length();
		for(Integer i = 0; i<max; ++i) {
			char fromChar = fromStr.charAt(i);
			
			Integer fromIndex = _machedIndexWithCached(cachedIndexes, fromChar, toStr);
			fromIndexes.add(fromIndex);
		}
		
		return fromIndexes;
	}
	// -1은 일치하지않는것.
	private int _machedIndexWithCached(List<Integer> cachedIndexes, char fromChar, String toStr) {
		Integer       prevCachedIndex = -1;
		if(!cachedIndexes.isEmpty()) {
			prevCachedIndex = cachedIndexes.get(cachedIndexes.size()-1);
		}
		//역순으로 비교해야해.
		List<Integer> temps = new ArrayList<Integer>();
		for(Integer i=toStr.length()-1; i>-1; --i ) {
			char toChar = toStr.charAt(i);
			
			if(cachedIndexes.contains(i)) continue;
			
			if(toChar == fromChar) {
				temps.add(i);
			}
		}
		
		Integer mostCloseToIndex = _mostCloser(temps, prevCachedIndex);
		cachedIndexes.add(mostCloseToIndex);
		return mostCloseToIndex;
	}
	// 후보들 중 가장가까운것. //후보들..역순저장되어있음. 
	private int _mostCloser(List<Integer> candidates, Integer prevCachedIndex) {
		if(candidates.isEmpty()) return -1;
		
		Integer firstCandidate  = candidates.get(candidates.size()-1);  
		Integer lastCandidate   = candidates.get(0);  
		if(prevCachedIndex == -1) prevCachedIndex = lastCandidate;
		
		if(lastCandidate  <= prevCachedIndex) return lastCandidate;
		if(firstCandidate >= prevCachedIndex) return lastCandidate;
		
		// 중간일경우.
		Integer leftCandidate = -1;
		for(Integer candidate : candidates) {
			if(candidate > prevCachedIndex) continue; 
				
			if(candidate <= prevCachedIndex) {leftCandidate = candidate; break;}; 
		}
		return leftCandidate;
	}
	public void shuffle() {
		if(this._fromIndexes.contains(-1)) { System.out.println(""); return;};
		
		int count = 8;
		List<Integer> fromIndexes = this._fromIndexes;
		do {
			System.out.print(fromIndexes);
			fromIndexes = _aShuffle(fromIndexes);
			System.out.print(fromIndexes);
			System.out.println("");
		} while(_isNotOrderedFromIndexes(fromIndexes) && (--count >0));
		
	}

	private boolean _isNotOrderedFromIndexes(List<Integer> fromIndexes) {
		for(int i = 0; i < fromIndexes.size(); ++i) {
			if(i != fromIndexes.get(i)) return true;
		}
		return false;
	}
	private List<Integer> _aShuffle(List<Integer> fromIndexes) {
		List<Integer> shuffledFromIndexes = new ArrayList<Integer>();
		
		for(int i=0; i<fromIndexes.size(); ++i) {
			Integer currentFromIndex = fromIndexes.get(i);
			if(_stack.isEmpty()) {_push(currentFromIndex); continue; };
			
			Integer prevFromIndex = _stack.peek();
			
			if(_isSequence(prevFromIndex, currentFromIndex)) {_push(currentFromIndex); continue; }
			
			if(!_isSequence(prevFromIndex, currentFromIndex)) {
					Integer popedFromIndex;
				do {
					popedFromIndex = _pop();
					shuffledFromIndexes.add(popedFromIndex);
				} while(_isPrevSequenceOf(popedFromIndex) );
			}
			
			_push(currentFromIndex);
		}
		
		while(!_stack.isEmpty()) {
			shuffledFromIndexes.add(_pop());
		}
		return shuffledFromIndexes;
	}
	
	//역순. popedFromIndex과, 현재 top를 비교하여. top이 poped의 '바로이전'순서라면 t, 아니면 f
	private boolean _isPrevSequenceOf(Integer popedFromIndex) {
		if(_stack.isEmpty()) return false;
		
		Integer topFromIndex = _stack.peek();
		if(topFromIndex -1 == popedFromIndex) return true; 
		else return false;
	}
	// 마찬가지 역순일때...
	private boolean _isSequence(Integer prev, Integer current) {
		if(prev > current) return true; 
		else return false;
	}
	
	private void _push (Integer item) {
		System.out.print("i ");
		_stack.push(item);
	}
	private Integer _pop () {
		System.out.print("o ");
		return _stack.pop();
	}
}