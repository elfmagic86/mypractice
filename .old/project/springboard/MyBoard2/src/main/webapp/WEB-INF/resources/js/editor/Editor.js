
/**
 * class Editor
 * 에디터의 내용조작은 여기서하자.
 */

(function () {
	/*
	 * private static field
	 */
	var ns = $$NameSpace("com.kang.editor");
	
	var DEFAULT_ID = "editor",
		DEFAULT_FRAME_ID = "editorContent";
	/**
	 * constructor , instance fields
	 */ 
	
	ns.Editor = function Editor(id,frameId) {
		this._id = id || DEFAULT_ID;
		this._frameId = frameId || DEFAULT_FRAME_ID;
		
		this._contentFrame = document.getElementById(this._frameId);
		if(!(this._contentFrame)) throw id+" must be id of frame";
		
		this._contentDoc = this._contentFrame.contentDocument;
		this._contentBody = this._contentDoc.body;
		
		this._decorator = ns.part.NodeDecorator;
		
		this._history = new ns.part.History(this);
		this._rangeManager = new ns.part.RangeManager(this);
		this._btnManager = new ns.event.ButtonManager(this); //TODO: 일관성. 생성시 누구는 new누구는 그냥이라니.
		
		
		this._init();
	};
	/*
	 * public method getXX
	 */
	ns.Editor.prototype.getContentFrame = function() {return this._contentFrame;	};
	ns.Editor.prototype.getContentDoc = function() {return this._contentDoc;	};
	ns.Editor.prototype.getContentBody = function() {return this._contentBody;	};
	
	ns.Editor.prototype.getHistory = function() {return this._history;	};
	ns.Editor.prototype.getDecorator = function() {return this._decorator;	};
	ns.Editor.prototype.getRangeManager = function() {return this._rangeManager;	};
	
	ns.Editor.prototype.getCaretedContent = function() {
		return this._rangeManager.getTemperalyCaretedContent(); //단어 확인 해야함..
	};
	ns.Editor.prototype.getEditorElementsByClassName = function (className) {
		var editorId = "#"+this._id;
		return document.querySelectorAll(editorId +" "+className);
	};
	ns.Editor.prototype.getEditorElementById = function (id) {
		var editorId = "#"+this._id;
		return document.querySelector(editorId +" "+id);
	};
	ns.Editor.prototype.getContentElementById = function (id) {
		return this._contentDoc.getElementById(id);
	};

	//	public method function
	ns.Editor.prototype.focus = function() {
		this._contentBody.focus();
	};
	//-------------update selectedNode ----------------
	ns.Editor.prototype.updateSelectedNodeByExecCommand = function (cmd, bool, value) {
		this._contentDoc.execCommand(cmd, bool, value);
	};
	ns.Editor.prototype.updateNodesInLines = function(lines,style) {
		var	rangeManager = this._rangeManager;
		//1. 데코레이트,
		var range = rangeManager.getCaretedRange();
		this._decorator.decorateAllNodeInLines(lines,style);
		rangeManager.updateRange(range); 
	};
	ns.Editor.prototype.updateSelectedLine = function(style) {
		var	rangeManager = this._rangeManager;
		//1. 데코레이트, 
		var range = rangeManager.getCurrentRange();
		var lines = this._decorator.decorateLineBy(range,style);
		
		return lines;
	};
	ns.Editor.prototype.updateSelectedNodes = function(style) {
		var	rangeManager = this._rangeManager;
		//1. 데코레이트, 
		var range = rangeManager.getCurrentRange();
		var textNodes = this._decorator.decorateNodesBy(range,style);
		
//		2. 범위 업데이트
		rangeManager.updateRange(textNodes);
	};
	//------------------------------------------------
	ns.Editor.prototype.saveAndFocus = function() {
		this._history.save();
		this.focus();
	};
	//------------------ content update--------------------
	ns.Editor.prototype.replaceContent = function(contentData) {
		this._contentBody.innerHTML = contentData.innerHTML;
		this._rangeManager.updateRange(contentData.range);
	};
	//--------------------------------------------------
	
	//------------------------helper	
	ns.Editor.prototype._init = function _init() {
		var node = this._contentDoc.getElementsByTagName('p')[0];
		var range =this._rangeManager.getDefaultRange(node);
		this._rangeManager.updateRange(range);
		this.focus();
	};
	
	//------------------ 외부에서 사용되는 도우미함수 ------------------	
	ns.Editor.prototype.contentToTextArea = function (textAreaNode) {
		var bodyNode = this.getContentBody();
		var text = bodyNode.innerHTML;
		textAreaNode.value = text;
	};

})();
