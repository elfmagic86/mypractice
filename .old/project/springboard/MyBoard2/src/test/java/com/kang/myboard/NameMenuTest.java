package com.kang.myboard;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class NameMenuTest {//�޴����(View)
	
   public static void main(String[] args) throws IOException{
	 BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
	 int num;
	 NameMenu menu = new NameMenu();
	 
  do{   
	   System.out.println("<�̸��޴�>"); 
	   System.out.println("1.�߰� 2.���� 3.���� 4.�˻� 5.����"); 
	   System.out.print("��ȣ�Է�==> ");  
	    //String str = in.readLine();//"1"
	    //int num = Integer.parseInt(str);//"1"---> 1	   
	    num= Integer.parseInt(in.readLine());
	    
	    System.out.println();
	    
	    switch(num){
	      case 1: System.out.print("#�߰��� �̸� �Է�: ");
	                 String name=in.readLine();
	    	         menu.insert(name); break;
	      case 2: 
	    	         System.out.print("#������ �̸� �Է�: ");
	    	         String delName = in.readLine();
	    	         menu.delete(delName);//�迭�� �Էµ� �����͸� ����: �迭�� ���� ���� null������ �ʱ�ȭ
	                 break;
	                 
	      case 3: 
	    	          System.out.print("#������ �̸� �Է�: ");
	    	          String oldName=in.readLine();
	    	          System.out.print("  ������ �̸� �Է�: "); 
	    	          String newName=in.readLine();
	    	          
	                  menu.update(oldName, newName);//�迭�� �Էµ� �����͸� ����(old--->new����)
                      break;
	      
	      
	      case 4: String names[]=menu.selectAll();
	                 System.out.println("#�̸����");
	                 for(int i=0; i<names.length; i++){//0~4
	                	 if(names[i] != null)
	                	   System.out.println(" "+names[i]);
	                 }
	    }
	    
	    System.out.println();
	 }while(num != 5);
  
     System.out.println("--END--");
	
	
  }
}







