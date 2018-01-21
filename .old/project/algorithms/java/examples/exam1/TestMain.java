package exam1;

import static org.junit.Assert.*;

import java.util.AbstractMap;
import java.util.List;
import java.util.function.IntFunction;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.junit.After;
import org.junit.Test;

import util.TextAreaReader;

public class TestMain {

	//같은 문자열로 순서바꾸기.
	@Test
	public void main() {
		TextAreaReader tr = new TextAreaReader("examples/exam1/input.txt");
		
		List<String> area= null;
		while( (area = tr.nextArea()) != null ) {

//			if(tr.count()==2) {
				String fromStr = area.get(0);
				String toStr   = area.get(1);
				StringShuffler ss  = new StringShuffler(fromStr, toStr);
				
				System.out.println('[');
				ss.shuffle();
				System.out.println(']');
//			}
			
		}
	}
	//기타
	// string -> list<Character>
//	@Test
	public void stringToCharcterList () {
		String str = "abcd";
		
		IntFunction<Character> toCharFn = (num) -> new Character((char) num);
		List<Character> chars = str.chars().mapToObj(toCharFn).collect(Collectors.toList());
		System.out.println(chars.size());
		chars.add('e');
		System.out.println(chars);
	}
	
//	@Test
//	public void lamdaTest () {
//		BiPredicate _isEqual   = (a,b) -> a==b;
//	}
//	@Test
	public void stateStackTest () {
		CheckedStack<Character> stack = new CheckedStack<Character>();
		stack.push('c');
		stack.checkedPush('s');
		stack.push('e');
		
		System.out.println(stack.popUntilChecked());
//		while(stack.size() != 0) {
//			System.out.println(stack.pop());
//		}
	};
}
