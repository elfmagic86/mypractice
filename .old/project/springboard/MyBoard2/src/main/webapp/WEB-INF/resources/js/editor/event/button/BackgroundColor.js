/**
 * 
 */

/**
 * 
 */
(function() {
	var ns = $$NameSpace("com.kang.editor.event.button"), 
		ID = "#backgroundColor";
	
	ns.BackgroundColor = {
		init : function(editor) {
			this._editor = editor;
			this._btnNode = editor.getEditorElementById(ID);
			this._dropHelper = ns.DropHelper;
			this._menuNode = this._dropHelper.getMenuElement(this._btnNode);
			this._eventHelper = com.kang.editor.event.EventHelper;
			
			var eventType = this._eventHelper.EVENT.click;
			this.addAction(eventType);
		},
		addAction : function(eventType) {
			var btnNode = this._btnNode,
				data = {self:btnNode,
						menu:this._menuNode};
				bindedCallBack = this.callBack.bind(this, data);
				useCapture = false;
				
			btnNode.addEventListener(eventType, bindedCallBack, useCapture);	
		},
		callBack : function(data, e) {
			var event =e || window.event, 
				target = e.target || e.srcElement,
				style =target.style.cssText,
				editor = this._editor,
				dropHelper = this._dropHelper;
			
			if(dropHelper.isTitleNode(target)) {//title클릭시
				editor.updateSelectedNodes(style);
				editor.saveAndFocus();
			} else {//title아닌 버튼클릭.
				dropHelper.openAndClose(data.menu);//열거나 닫음.
				
				if(dropHelper.isItemNode(target)) { //하위메뉴에서 전파되었을경우.
					editor.updateSelectedNodes(style);
					editor.saveAndFocus();
					dropHelper.updateBtnTitle(data.self, style);
				};
			}
			//전파종료.
			this._eventHelper.stop(event);
		}
	};
})();
