package com.kang.myboard;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class NameMenuTest {//메뉴출력(View)
	
   public static void main(String[] args) throws IOException{
	 BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
	 int num;
	 NameMenu menu = new NameMenu();
	 
  do{   
	   System.out.println("<이름메뉴>"); 
	   System.out.println("1.추가 2.삭제 3.수정 4.검색 5.종료"); 
	   System.out.print("번호입력==> ");  
	    //String str = in.readLine();//"1"
	    //int num = Integer.parseInt(str);//"1"---> 1	   
	    num= Integer.parseInt(in.readLine());
	    
	    System.out.println();
	    
	    switch(num){
	      case 1: System.out.print("#추가할 이름 입력: ");
	                 String name=in.readLine();
	    	         menu.insert(name); break;
	      case 2: 
	    	         System.out.print("#삭제할 이름 입력: ");
	    	         String delName = in.readLine();
	    	         menu.delete(delName);//배열에 입력된 데이터를 삭제: 배열의 값을 원래 null값으로 초기화
	                 break;
	                 
	      case 3: 
	    	          System.out.print("#수정할 이름 입력: ");
	    	          String oldName=in.readLine();
	    	          System.out.print("  변경할 이름 입력: "); 
	    	          String newName=in.readLine();
	    	          
	                  menu.update(oldName, newName);//배열에 입력된 데이터를 수정(old--->new변경)
                      break;
	      
	      
	      case 4: String names[]=menu.selectAll();
	                 System.out.println("#이름목록");
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







