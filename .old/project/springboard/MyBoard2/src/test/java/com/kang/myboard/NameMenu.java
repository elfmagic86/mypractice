package com.kang.myboard;

import java.util.Vector;

import oracle.sql.ARRAY;

public class NameMenu {
	Vector<String> names;
	public NameMenu() {//������
		names = new Vector<String>(5);
	}
	
	public void insert(String name){
		names.add(name);
	}	
	
	public void delete(String delName){
		
		for(int i=0, max = names.size(); i<max; ++i){//�迭�˻�
			String left = names.get(i);
			String right = delName;
			if(_equals(left, right))//�������̸��� ��ġ�ϴ� �̸��� �迭���� ã�� null�� �ʱ�ȭ
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
		for(int i=0, max = names.size(); i<max; ++i){//�迭�˻�
			String left = names.get(i);
			String right = oldName;
			if(_equals(left, right))//�������̸��� ��ġ�ϴ� �̸��� �迭���� ã�� null�� �ʱ�ȭ
			{
				names.set(i, newName);
				break;
			}
		}
	}//update
	
	public String[] selectAll(){//�迭���� ��� �����͸� �˻�
		String[] k = (String[])names.toArray();
		return k;
//		String[] strs = new String[10];
//		names.toArray(strs);
//		return strs;
	}

}








