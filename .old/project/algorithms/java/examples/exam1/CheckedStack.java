package exam1;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class CheckedStack<E> extends Stack<E> {
	
	List<Integer> _checkedList = new ArrayList<Integer>();
	
	
	public CheckedStack () {  
		super();
	};
	
	public E checkedPush(E item) {
		if(this.isEmpty()) _checkedList = new ArrayList<Integer>();
		this.push(item);
		this.checkTop();		
		return item;
		
	}
	public boolean isPushed(E item) {
		if(this.search(item) > 0) return true;
		else return false;
	}

	
	public void checkTop() {
		_checkedList.add(this.size()-1); //len
	}
	
	// 마지막 체크된것 없어짐.
	public List<E> popUntilChecked() {
		if(this.isEmpty()) return null;
		Integer lastCheckedIndex = _getLastCheckedIndex();
		if(lastCheckedIndex == null) lastCheckedIndex = 0; // 끝까지.
		
		List<E> list = new ArrayList<E>();
		int len = this.size() - 1;
		while(len >= lastCheckedIndex) {
			list.add(this.pop());
			
			--len;
		}
		
		return list;
	}
	@Override
	public E pop() {
		System.out.print("o ");
		return super.pop();
	}
	@Override
	public E push(E item) {
		System.out.print("i ");
		return super.push(item);
	}
	
	private Integer _getLastCheckedIndex () {
		if(_checkedList.isEmpty()) return null;
		int len   = _checkedList.size()-1;
		int index = _checkedList.get(len);
		_checkedList.remove(len);
		
		return index;
	}
	
}
