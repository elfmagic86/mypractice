/**
 * 
 */

/**
 * 
 */
(function() {
	var ns = $$NameSpace("com.kang.editor.event.button"),
		UNDO = "undo",
		REDO = "redo",
		NON_CLICK = "nonClick",
		UNDOREDO = ".undoRedo-btn";

	ns.UndoRedo = {
			init : function(editor) {
				this._editor = editor;
				this._undoRedoList = editor.getEditorElementsByClassName(UNDOREDO);
				this._eventHelper = com.kang.editor.event.EventHelper;
				
				var eventType = this._eventHelper.EVENT.click;
				this.addAction(eventType);
			},
			
			addAction : function(eventType) {
				var undoList = this._undoRedoList,
					useCapture = false;
				for(var i=0, max= undoList.length; i<max; ++i) {
					var undoBtn = undoList[i],
						data = {self:undoBtn},
						bindedCallBack = this._callBack.bind(this, data);
					
					undoBtn.addEventListener(eventType, bindedCallBack, useCapture);
				};
			},
			_callBack : function(data, e) {
				var event = e || window.event,
					target = e.target || e.srcElement,
					self = data.self,
					editor = this._editor,
					history = editor.getHistory(),
					eventHelper = this._eventHelper;
				
				if(!(target.id)) { //자식이다.그렇다면
					target = target.parentNode;
				}
				
				if(target.id == UNDO) { //undo
					if(history.undoIsEmpty()) {
						eventHelper.addClass(self,NON_CLICK);
					} else {
						eventHelper.removeClass(self, NON_CLICK);
						history.undo();
					}
					
				} else if(target.id == REDO) { //redo
					if(history.redoIsEmpty()) {
						eventHelper.addClass(self,NON_CLICK);
					} else {
						eventHelper.removeClass(self, NON_CLICK);
						history.redo();
					}
				}
				
				editor.focus();
				
				eventHelper.stop(event);
			}
	};
})();
