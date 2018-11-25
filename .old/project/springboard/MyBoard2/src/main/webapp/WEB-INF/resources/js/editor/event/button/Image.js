/**
 * 
 */

/**
 * 
 */
(function(jquery) {
	var ns = $$NameSpace("com.kang.editor.event.button"),
		$ = jquery,
		BTN_ID = "#imageUpload",
		FILE_NODE_ID = "#nodeOfInputFile";

	ns.Image = {
			init : function(editor) {
				this._editor = editor;
				this._imageButton = editor.getEditorElementById(BTN_ID);
				this._nodeOfInputFile = editor.getEditorElementById(FILE_NODE_ID);
				this._eventHelper = com.kang.editor.event.EventHelper;
				
				var eventType = this._eventHelper.EVENT.click;
				this.addAction(eventType);
			},
			
			addAction : function(eventType) {
				var	imageButton = this._imageButton,
					nodeOfInputFile = this._nodeOfInputFile,
					useCapture = false;
				
				var	data = {nodeOfInputFile:nodeOfInputFile},
					dispatchBindedCallBack = this._dispatchFileCallBack.bind(this, data),
					uploadBindedCallBack = this._uploadCallBack.bind(this, data);
				imageButton.addEventListener(eventType, dispatchBindedCallBack, useCapture);
				nodeOfInputFile.addEventListener("change", uploadBindedCallBack, useCapture); //���ε��� ���� ���ÿϷ��ϸ� �ݹ�ȣ���
			},
			_dispatchFileCallBack : function(data, e) {
				var event =e || window.event,
					nodeOfInputFile = data.nodeOfInputFile,
					eventHelper = this._eventHelper;
				//1. input Ŭ��
				var dispatchEvent = document.createEvent("MouseEvents");
				dispatchEvent.initEvent("click", false, true);
				nodeOfInputFile.dispatchEvent(dispatchEvent);	

				eventHelper.stop(event);
			},
			_uploadCallBack : function (data, e) {
				var event =e || window.event,
					nodeOfInputFile = data.nodeOfInputFile,
					eventHelper = this._eventHelper;
				
				var formData = new FormData();
				formData.append('imageFile', nodeOfInputFile.files[0]);
				var bindedCallback = this._insertImageToTree.bind(this);
				//ȣ��
			    $.ajax({
			        url: "/uploadImage",
			        type: 'POST',
			        data: formData,
			        processData: false,
			        contentType: false,
			        success: bindedCallback
			    });
			    
				eventHelper.stop(event);
			},
			_insertImageToTree : function(responseData) {
				var imageUrl = window.location.origin+responseData;
				var editor = this._editor;
	            var rangeManager = editor.getRangeManager(); 
	        	var range = rangeManager.getCurrentRange();			
	        	
	        	var imgNode = document.createElement("img");
	        	imgNode.setAttribute("src",imageUrl);
	        	imgNode.setAttribute("style","width:100px;");
	        	
	        	range.commonAncestorContainer.parentNode.appendChild(imgNode);
			} 
	};
})($);
