/**
 * 
 */
(function() {
	var ns = $$NameSpace("com.kang.editor.event.button"), 
		ID = "#lineStyle";
	
	ns.LineStyle = {
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
				data = {self:btnNode, menu:this._menuNode},
				bindedCallBack = this.callBack.bind(this, data),
				useCapture = false;
				
			btnNode.addEventListener(eventType, bindedCallBack, useCapture);	
		},
		callBack : function(data, e) {
			var event =e || window.evnet, 
				target = e.target || e.srcElement,
				editor = this._editor,
				dropHelper = this._dropHelper;
			
			
			//�����޴����� ���ĵǾ������.
			if(dropHelper.isItemNode(target)) {
				var pNode = target.firstChild,
					spanNode = pNode.firstChild;
				var pNodeStyle = pNode.style.cssText,
					spanNodeStyle = spanNode.style.cssText;
				var lines = editor.updateSelectedLine(pNodeStyle);
				
				editor.saveAndFocus();
				editor.updateNodesInLines(lines,spanNodeStyle);
				dropHelper.openAndClose(data.menu);//menuâ �ݰ�,����. �⺻������.
			} else {
				dropHelper.openAndClose(data.menu);//menuâ �ݰ�,����. �⺻������.
			};
			
			
			//��������.
			this._eventHelper.stop(event);
		}
		
	};
})();
