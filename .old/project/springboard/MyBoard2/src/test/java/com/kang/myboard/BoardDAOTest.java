package com.kang.myboard;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.kang.myboard.dao.BoardDAO;
import com.kang.myboard.domain.Board;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:/META-INF/spring/root-context.xml")
public class BoardDAOTest {

	@Autowired
	BoardDAO boardDao;

	@Test
	public void deleteAndAdd() {
		boardDao.deleteAll();
		for(int i=0,max=100; i<max; ++i) {
			Board board = new Board(i,"writer"+i,"email"+i,"su b jec3 3t "+i, "passwd"+i, "dd",0,"content"+i);
			boardDao.add(board);
		}
	}

//	@Test
	public void selectAll() {
		List<Board> boards = boardDao.getAll();
		for(Board board : boards) { 
			System.out.println(board);
		}
	}
	
	
	//페이지 인덱스를 통해서 디스플레이할 startRowIndex~endRowIndex의 인덱스.
	// 1   - 1,12  // 2   - 13,24 / 3- 25,36  /....9 - 97,100
//	@Test
	public void selectList() {
		int rowCount = boardDao.getRowSize();
		int maxCount = 12;
		Board.setMaxRowSizeOfOnePage(maxCount);
		int pageCount = Board.getPageSizeBy(rowCount);
		
		int pageIndex = 10;
		int endRowNum = Board.getEndRowIndexOf(pageIndex, rowCount);
		int startRowNum = Board.getStartRowIndexOf(pageIndex);
		
		System.out.println("rowCount" + rowCount);
		System.out.println("maxCount" + maxCount);
		System.out.println("pageCount"+pageCount);
		System.out.println("-------------");
		System.out.println("pageindex" + pageIndex);
		System.out.println("endRowNum" + endRowNum);
		System.out.println("startRowNum" + startRowNum);
	}
	@Test
	public void pageNumberOfrowNumber() {
		int rowNumber = 7;
		System.out.println("pageNumber" +Board.getPageNumberBy(rowNumber));
	}
}
