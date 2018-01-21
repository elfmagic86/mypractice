<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR" />
<title>::: 게시물 등록 폼</title>
<link rel="stylesheet" type="text/css"href="/resources/css/board/common.css" />
</head>
<body>
	<div align="center">
		<h3>:::게시물 등록</h3>
		<form action="/board" method="post" enctype="multipart/form-data" name="writeForm">
			<table width="1000" border="1" cellpadding="0" cellspacing="0">
				<tr>
					<td width="160" class="titleTd">작성자</td>
					<td width="540"><input type="text" size="20" maxlength="20" name="writer" /></td>
				</tr>
				<tr>
					<td class="titleTd">제목</td>
					<td><input type="text" size="60" maxlength="100" name="subject" /></td>
				</tr>
				<tr>
					<td class="titleTd">이메일</td>
					<td><input type="text" size="40" maxlength="100" name="email" />
					</td>
				</tr>
			</table>	
			<table width="1000" border="1" cellpadding="0" cellspacing="0">
				<tr>
					<jsp:include page="../common/editor/Editor.jsp"  flush="false"/>
					<textarea id="content_textarea" name="content" style="display:none"></textarea><!--/textarea로 닫지않으면 아래 태그가 이상해짐  -->
				</tr>
				
			</table>
			
			<table width="1000" border="1" cellpadding="0"	 cellspacing="0">
				<tr>
					<td class="titleTd">첨부파일</td>
					<td><input type="file" name="uploadedFile" size="60" /></td>
				</tr>
				<tr>
					<td class="titleTd">비밀번호</td>
					<td><input type="password" size="12" maxlength="12" name="passwd" /></td>
				</tr>
			</table>
			<br/>
			<table width="700">
				<tr>
					<td align="right">
					<input type="reset" value="다시쓰기" class="boardBtn" /><br/>
					<input type="submit" value="글쓰기" id="content_submit" class="boardBtn" /><br/> 
					
					<a class="boardBtn" href="/board">목록으로</a>
					</td>
				</tr>
			</table>
			
		</form>
	</div>
	<script type="text/javascript">
 	(function() {
		var SUBMIT_ID = 'content_submit';
		var TEXTAREA_ID = 'content_textarea';
		window.onload = function() {
			//실제 동작		
			var editor = new com.kang.editor.Editor();
			//서브밑 버튼에 헨들러 등록
			var submitNode = document.getElementById(SUBMIT_ID);
			var bindedCallBack  = _callBack.bind(editor);
			submitNode.addEventListener("click", bindedCallBack, false);
		};
		
		function _callBack(e) {
			var editor = this;
			var textAreaNode = document.getElementById(TEXTAREA_ID);
			editor.contentToTextArea(textAreaNode);
			//기본동작수행
		};
	})();
	</script>
</body>
</html>