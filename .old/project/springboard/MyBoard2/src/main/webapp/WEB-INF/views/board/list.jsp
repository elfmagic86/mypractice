<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/board/list.css">
</head>
<body>

	<!--board table  -->
	<div class="board_container">
		<!--검색창 , 카테고리창 -->
		<div class="search-container">
             <form id="search" action="/board/search" method="get" autocomplete="off">
                 <input name="query" type="text" placeholder="search" value="" tabindex="1" autocomplete="off" maxlength="240" style="width: 188px; max-width: 188px;">
                 <input type="submit" value="search"/>
             </form>
		</div>
		<!-- 글목록  -->
		<div class="board">
			<c:forEach var="board" items="${boards}" varStatus="status">
			<div class="row_container">
				<div class="prefix_container">
<!-- 					<div class="votes">
						<span style="display:block">xx</span>
						<span style="display:block">votes</span>	
					</div> -->
					<div class="answers">
						<span style="display:block">${answerCounts[status.index]}</span>
						<span style="display:block">answers</span> 
					</div>
					<div class="views">
						<span style="display:block">${board.readcount}</span>
						<span style="display:block">views</span> 
					</div>
				</div>
				<div class="writting_container">
					<div class="content_container">
						<a href="${board.url}">
							<div class="title">${board.subject}</div>
							<div class="content">${board.content}</div>
						</a>						
					</div>
					<div class="bottom_container">
						<div class="left">댓글</div>
						<div class="right">${board.reg_date}</div>
						<div class="right" style="font-weight:bold">${board.writer}</div>

					</div>
				</div>
			</div>
			</c:forEach>
		</div>
		<!-- 번호 리스트??  갯수제한시켜야함. <  1 2 ..... 10 > 이런식으로.   -->
		<div class="numbering_container">
			<c:forEach var="i" begin="1" end="${pageSize}">
				<a href="/board?page=${i}"><div class="number">${i}</div></a>
			</c:forEach>
		</div>
			<!-- 새글쓰기 -->
		<div class="button_container">
			<form action="/board/new" method="get">
				<input type="submit" value="write content" />
			</form> 

		</div>
	</div>

	



	
</body>
</html>