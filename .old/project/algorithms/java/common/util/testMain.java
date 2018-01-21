package util;

import static org.junit.Assert.*;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.function.Predicate;

import org.junit.Test;

public class testMain {

	@Test
	public void readFile() {
		String     path = "common/util/exam.txt";
		TextAreaReader tr   = new TextAreaReader(path);
	
		List<String> list;
		while((list = tr.nextArea()) != null) {
			if(tr.count()==1) assertEquals(list.get(0), "madam");
		};
	}
}
