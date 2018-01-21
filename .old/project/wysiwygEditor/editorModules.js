(function() {
	
	// 
	var modules = [
	                  "./editor/js/iframeContent.js",

	                  "./editor/js/util/helper.js",
	                  
	                  "./editor/js/part/treeSearcher.js",
	                  "./editor/js/part/styleAppender.js",//
	                  "./editor/js/part/nodeDecorator.js",
	                  "./editor/js/part/rangeDecorator.js",
	                  "./editor/js/part/History.js",//
	                  "./editor/js/part/RangeManager.js",//
	                  
	                  "./editor/js/event/eventHelper.js",// 
	                  "./editor/js/event/dropHelper.js",// 
	                  "./editor/js/event/ButtonManager.js",

	                  "./editor/js/event/content/keyUtil.js",//
	                  "./editor/js/event/content/keyListener.js",//
	                  "./editor/js/event/content/imageWrapper.js",//
	                  "./editor/js/event/content/imageListener.js",//
	                  
	                  "./editor/js/event/button/basic.js",
	                  "./editor/js/event/button/undoRedo.js",
	                  "./editor/js/event/button/fontSize.js",
	                  "./editor/js/event/button/fontColor.js",
	                  "./editor/js/event/button/backgroundColor.js",
	                  "./editor/js/event/button/inOutdent.js",
	                  "./editor/js/event/button/imageUpload.js",
	                  "./editor/js/event/button/lineHeight.js",
	                  "./editor/js/event/button/lineStyle.js",
//	                  
	                  "./editor/js/Editor.js"
	                  
	                  ];
	$$namespace.load(modules, function (require, loadedModules) {
		// image upload 클릭시 수행되어야 할 핸들러를 외부에서 가져온다.
		var callback = $$nodeblog.getImageUploadCallback() 
		//editor의 content에 초기 값을 주기 위한 textarea의 이름(updateView..호출시 사용)
		var textareaName = 'content' 
		
		var Editor = require('/js/Editor')
		
//		textarea에 editor의 내용을 삽입할 시점을 외부에 노출하기 위해 전역변수로 설정.
//		$$editor.insertContentToTextarea()
		window.$$editor = new Editor(textareaName, callback); //
	});
	
})()
//@ sourceURL=editor/editorModules.js