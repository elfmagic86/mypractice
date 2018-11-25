/**
 * 
 */

/**
 * 
 */
(function() {
	var ns = $$NameSpace("com.kang.editor.event.button"), 
		BASIC = ".basic-btn";

	ns.Basic = {
			init : function(editor) {
				this._editor = editor;
				this._basicList = editor.getEditorElementsByClassName(BASIC);
				this._eventHelper = com.kang.editor.event.EventHelper;
				
				var eventType = this._eventHelper.EVENT.click;
				this.addAction(eventType);
			},
			
			addAction : function(eventType) {
				var	basicList = this._basicList,
					useCapture = false;
				for(var i=0, max= basicList.length; i<max; ++i) {
					var basicBtn = basicList[i],
						data = {args:[basicBtn.id, false, null]},
						bindedCallBack = this._callBack.bind(this, data);
					
					basicBtn.addEventListener(eventType, bindedCallBack, useCapture);
				};
			},
			
			_callBack : function(data, e) {
				var event =e || window.event,
					editor = this._editor,
					target = e.target || e.srcElement,
					eventHelper = this._eventHelper;
		
				if(!(target.id)) { //�ڽ��̴�.�׷��ٸ�
					target = target.parentNode;
				}
				if(target.id.indexOf('Justify') != -1 ) {
					editor.updateSelectedNodeByExecCommand.apply(editor,data.args);
					editor.saveAndFocus();
				} else {
					var style = target.style.cssText;
					editor.updateSelectedNodes(style);		
					editor.saveAndFocus();
				}

				
				eventHelper.stop(event);
			}
	};
})();
