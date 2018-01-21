<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR" />
<title>::: 게시물 보기</title>
<link rel="stylesheet" type="text/css" href="/resources/css/board/common.css"/>
<link rel="stylesheet" type="text/css" href="/resources/css/board/answer.css"/>
</head>
<body>
<div align="center">
<h3>:::게시물 보기</h3>
<table width="700" border="1">
	<tr height="30">
		<td width="125" class="titleTd">번호</td>
		<td width="225">${board.num}</td>
		<td width="125" class="titleTd">조회</td>
		<td width="225">${board.readcount}</td>
	</tr>
	<tr height="30">
		<td class="titleTd">작성자</td>
		<td>${board.writer}</td>
		<td class="titleTd">등록일</td>
		<td>${board.reg_date}</td>
	</tr>
	<tr>
		<td class="titleTd">제목</td>
		<td colspan="3">${board.subject}</td>
	</tr>
	 <c:if test="${!empty board.filename}">
	<tr>
		<td class="titleTd">첨부파일</td>
		<td colspan="3">
		
		<a href="/download/${board.filename}">
		${board.filename}</a>
		</td>
	</tr>
	</c:if>
	<tr>
		<td class="titleTd">내용</td>
		<td colspan="3"><pre>${board.content}</pre></td>
	</tr>
</table>
<br/>
<table width="700">
				<tr>
					<td align="right">
					<form:form action="${board.url}" method="put">
    					<input type="submit" value="수정"/><br/>
					</form:form>
					<form:form action="/board/${board.num}" method="delete">
    					<input type="submit" value="삭제"/><br/>
					</form:form>
			 
					
					<a class="boardBtn" href="/board">목록으로</a>
					</td>
				</tr>
</table>
				<table width="300" border="1" cellpadding="0" cellspacing="0">
					<c:forEach var="answer" items="${answers}">
						<tr class="row">
							<td>${answer.writer}</td>
							<td>${answer.content}</td>
							<td>${answer.reg_date}</td>
							<td align="right">
							<form:form action="/answer/${answer.a_id}" method="delete">
								<input type="hidden" name="b_num" value="${board.num}" />
		    					<input type="submit" value="삭제"/><br/>
							</form:form>
						</tr>
					</c:forEach>
						<tr class="row">
						<form action="/answer" method="post" enctype="multipart/form-data" name="wirte">
							<td><input placeholder="name"  width="50" height="400" type="text" name="writer" /></td>
							<td><textarea placeholder="content"  rows="10" cols="60" type="text" name="content" ></textarea></td>
							<input type="hidden" name="b_num" value="${board.num}" />
							<td><input type="submit" value="입력"/></td>
						</form>
						</tr>
				</table>
</div>
</body>
</html>