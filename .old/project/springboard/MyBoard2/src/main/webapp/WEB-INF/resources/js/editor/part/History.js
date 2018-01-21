/**
 * 
 */

(function () {

	/*
	 * static field, dependency
	 */
	var ns = $$NameSpace("com.kang.editor.part"),
		MAX_LENGTH = 20;
	
	
	/*
	 * constructor , instance field
	 */
	ns.History = function History(editor) {
		this._editor = editor;
		
		this._undoList = [];
		this._redoList = [];
	};
	//----------------save
	ns.History.prototype.save = function save() {
		var caretedContent = this._editor.getCaretedContent();
		var histories = this._undoList,
			size = histories.length;
		if(size == MAX_LENGTH) {
			histories.shift(); // reverse pop()
		}
		console.log("undo : " + histories.join(','));
		this._undoList.push(caretedContent);
	};
	ns.History.prototype.saveRedo = function () {
		var caretedContent = this._editor.getCaretedContent();
		var histories = this._redoList,
			size = histories.length;
		if(size == MAX_LENGTH) {
			histories.shift(); // reverse pop()
		}
		console.log("redo : " + histories.join(','));
		this._redoList.push(caretedContent);
	};
	//--------------------do
	ns.History.prototype.undo= function undo() {
		if(this._undoList.length == 0) {return;};
		
		var currentContent = this._editor.getCaretedContent();
		this.saveRedo(currentContent);
		var data = this._undoList.pop();
		this._editor.replaceContent(data);
	};
	ns.History.prototype.redo= function redo() {
		if(this._redoList.length == 0) {return;};
		
		var currentContent = this._editor.getCaretedContent();
		this.save(currentContent);
		var data = this._redoList.pop();
		this._editor.replaceContent(data);
	};
	//---------------------isEmpty
	ns.History.prototype.undoIsEmpty= function () {
		if(this._undoList.length==0) 
			return true;
		else
			return false;
	};
	ns.History.prototype.redoIsEmpty= function () {
		if(this._redoList.length==0) 
			return true;
		else
			return false;		
	};

	
	
})();