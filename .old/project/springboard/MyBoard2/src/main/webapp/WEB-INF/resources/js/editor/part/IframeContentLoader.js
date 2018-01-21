/**
 * iframe content load
 * 
 * EditorContent.css위치 변경시 externalCss 조절할것.
 */

(function() {
	var externalCss = '<link rel="stylesheet" href="/resources/css/editor/EditorContent.css">';
	var iframe = document.getElementsByTagName("iframe")[0],
		contentWindow = iframe.contentWindow,
		contentDoc = contentWindow.document,
		contentBody = contentWindow.document.body,
		wysiwygHTML = '<html lang="ko"><head>'
			+ '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'
			+ '<title>Wygiwyg Panel</title>'
			+ externalCss
			+ '</head>'
			+ '<body id="wygiwyg" contenteditable="true">'
			+ '<p>&#8203</p>'
			+ '</body></html>';
	
	contentDoc.write(wysiwygHTML);
	contentBody.focus();
	contentDoc.close(); //close 하지 않으면 로딩이 완료되지 않아..
})();