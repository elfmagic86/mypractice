<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR" />
<title>::: �Խù� ���� ��</title>
<link rel="stylesheet" type="text/css"
	href="resources/css/board/common.css" />
</head>
<body>
	<div align="center">
		<h3>:::�Խù� ����</h3>
		<form:form action="/board" method="put" enctype="multipart/form-data" name="updateForm">
			<table width="700" border="1" cellpadding="0" cellspacing="0">
			
				<tr>
					
					<td width="160" class="titleTd">�ۼ���</td>
					<td width="540"><input type="text" size="20" maxlength="20" name="writer" value="${board.writer}" /></td>
				</tr>
				<tr>
					<td class="titleTd">����</td>
					<td><input type="text" size="60" maxlength="100" name="subject" value="${board.subject}"/></td>
				</tr>
				<tr>
					<td class="titleTd">�̸���</td>
					<td><input type="text" size="40" maxlength="100" name="email" value="${board.email}" />
					</td>
				</tr>
				<tr>
					<td class="titleTd">����</td>
					<td><textarea name="content" rows="10" cols="60" >${board.content}</textarea></td>
				</tr>
				<tr>
					<td class="titleTd">÷������</td>
					<td><input type="file" name="uploadedFile" size="60"/>
					<c:if test="${!empty board.filename}">
						<tr>
							<td class="titleTd">÷������</td>
							<td colspan="3">
							
							<a href="/download/${board.filename}">
							${board.filename}</a>
							</td>
						</tr>
					</c:if>
					</td>
				</tr>
				<tr>
					<td class="titleTd">��й�ȣ</td>
					<td><input type="password" size="12" maxlength="12" name="passwd" value="${board.passwd}"/></td>
				</tr>
			</table>
			<br/>
			<table width="700">
				<tr>
					<td align="right">
					<input type="reset" value="�ٽþ���" class="boardBtn" /><br/>
					<input type="hidden" size="20" maxlength="20" name="num" value="${board.num}" />
					<input type="submit" value="�����ϱ�" class="boardBtn" /><br/>
					 
					
					<a class="boardBtn" href="/board">�������</a>
					</td>
				</tr>
			</table>
		</form:form>
	</div>
</body>
</html>