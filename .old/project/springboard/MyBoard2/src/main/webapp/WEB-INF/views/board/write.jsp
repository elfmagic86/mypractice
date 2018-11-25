<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR" />
<title>::: �Խù� ��� ��</title>
<link rel="stylesheet" type="text/css"href="/resources/css/board/common.css" />
</head>
<body>
	<div align="center">
		<h3>:::�Խù� ���</h3>
		<form action="/board" method="post" enctype="multipart/form-data" name="writeForm">
			<table width="1000" border="1" cellpadding="0" cellspacing="0">
				<tr>
					<td width="160" class="titleTd">�ۼ���</td>
					<td width="540"><input type="text" size="20" maxlength="20" name="writer" /></td>
				</tr>
				<tr>
					<td class="titleTd">����</td>
					<td><input type="text" size="60" maxlength="100" name="subject" /></td>
				</tr>
				<tr>
					<td class="titleTd">�̸���</td>
					<td><input type="text" size="40" maxlength="100" name="email" />
					</td>
				</tr>
			</table>	
			<table width="1000" border="1" cellpadding="0" cellspacing="0">
				<tr>
					<jsp:include page="../common/editor/Editor.jsp"  flush="false"/>
					<textarea id="content_textarea" name="content" style="display:none"></textarea><!--/textarea�� ���������� �Ʒ� �±װ� �̻�����  -->
				</tr>
				
			</table>
			
			<table width="1000" border="1" cellpadding="0"	 cellspacing="0">
				<tr>
					<td class="titleTd">÷������</td>
					<td><input type="file" name="uploadedFile" size="60" /></td>
				</tr>
				<tr>
					<td class="titleTd">��й�ȣ</td>
					<td><input type="password" size="12" maxlength="12" name="passwd" /></td>
				</tr>
			</table>
			<br/>
			<table width="700">
				<tr>
					<td align="right">
					<input type="reset" value="�ٽþ���" class="boardBtn" /><br/>
					<input type="submit" value="�۾���" id="content_submit" class="boardBtn" /><br/> 
					
					<a class="boardBtn" href="/board">�������</a>
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
			//���� ����		
			var editor = new com.kang.editor.Editor();
			//����� ��ư�� ��鷯 ���
			var submitNode = document.getElementById(SUBMIT_ID);
			var bindedCallBack  = _callBack.bind(editor);
			submitNode.addEventListener("click", bindedCallBack, false);
		};
		
		function _callBack(e) {
			var editor = this;
			var textAreaNode = document.getElementById(TEXTAREA_ID);
			editor.contentToTextArea(textAreaNode);
			//�⺻���ۼ���
		};
	})();
	</script>
</body>
</html>