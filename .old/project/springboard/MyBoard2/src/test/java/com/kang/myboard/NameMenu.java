package com.kang.myboard;

import java.util.Vector;

import oracle.sql.ARRAY;

public class NameMenu {
	Vector<String> names;
	public NameMenu() {//생성자
		names = new Vector<String>(5);
	}
	
	public void insert(String name){
		names.add(name);
	}	
	
	public void delete(String delName){
		
		for(int i=0, max = names.size(); i<max; ++i){//배열검색
			String left = names.get(i);
			String right = delName;
			if(_equals(left, right))//삭제할이름과 일치하는 이름을 배열에서 찾아 null로 초기화
			{
				names.remove(i);  
				break;
			}
		}		
	}//delete
	
	private boolean _equals(String left, String right) {
		left = left.toLowerCase();
		right = right.toLowerCase();
		if(left.equals(right))
			return true;
		else
			return false;
	}

	public void update(String oldName,String newName){
		for(int i=0, max = names.size(); i<max; ++i){//배열검색
			String left = names.get(i);
			String right = oldName;
			if(_equals(left, right))//삭제할이름과 일치하는 이름을 배열에서 찾아 null로 초기화
			{
				names.set(i, newName);
				break;
			}
		}
	}//update
	
	public String[] selectAll(){//배열내의 모든 데이터를 검색
		String[] k = (String[])names.toArray();
		return k;
//		String[] strs = new String[10];
//		names.toArray(strs);
//		return strs;
	}

}








