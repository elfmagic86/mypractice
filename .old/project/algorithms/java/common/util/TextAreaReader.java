package util;

import java.io.IOException;	
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class TextAreaReader {
	List< List<String> > _areas     = new ArrayList< List<String> >();
	int					 _areaIndex = 0;
	
	public TextAreaReader(String _path) {
		Path path 			 = Paths.get(_path).toAbsolutePath();
		
		this._saveLines(path);
	};
	private void _saveLines(Path path) {
		Stream<String> _lines = null;
		try {
			_lines 				   = Files.lines(path);
			
			List<String> lineList  = _lines.collect(Collectors.toList());
			int			 length	   = lineList.size();
			int          lastIndex = length-1;
			List<String> aArea 	   = new ArrayList<String>();
			boolean preLineIsExist = true;
			
			for(int i=0; i<length; ++i) {
				String  line		   = lineList.get(i);
				boolean curLineIsExist = !line.isEmpty();
				if(curLineIsExist) { aArea.add(line.trim());}
				if(preLineIsExist && !curLineIsExist || (i == lastIndex) ) {
					if(!aArea.isEmpty()) {
						this._areas.add(aArea);
//						System.out.println(aArea);
						aArea = new ArrayList<String>();
					}
				}
				
				if(curLineIsExist) preLineIsExist = true;
				else			   preLineIsExist = false;
			};
							  
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			_lines.close();
		};
	}
	
	///
	public List<String> nextArea() {
		if(this._areaIndex >= this._areas.size()) return null;
		
		List<String> area = this._areas.get(this._areaIndex++);
		if(area.isEmpty()) return null;
		else 			   return area;
	}
	public int count() { 	return this._areaIndex;}
	public void reset() { 	this._areaIndex = 0; 	}
	public List< List<String> > getAreas() { 	return this._areas; 	}
	
}
