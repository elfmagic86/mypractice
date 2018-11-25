/**
 * 
 */

/**
 * TODO:BackgroundColor�� ���� ����. �ߺ��� ���� �����?
 */
(function() {
	var ns = $$NameSpace("com.kang.editor.event.button"), 
	ID = "#fontColor";

	ns.FontColor = {
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
				data = {self : btnNode,	menu : this._menuNode},
				bindedCallBack = this.callBack.bind(this, data),
				useCapture = false;

			btnNode.addEventListener(eventType, bindedCallBack, useCapture);
		},
		callBack : function(data, e) {
			var event = e || window.evnet,
				target = e.target || e.srcElement,
				style = target.style.cssText,
				editor = this._editor,
				dropHelper = this._dropHelper;

			style = style.replace("background-color", "color"); //�̺κи��ٸ���..
			
			if (dropHelper.isTitleNode(target)) {// titleŬ����
				editor.updateSelectedNodes(style);
				editor.saveAndFocus();
			} else {// title�ƴ� ��ưŬ��.
				dropHelper.openAndClose(data.menu);// ���ų� ����.
				
				if (dropHelper.isItemNode(target)) { // �����޴����� ���ĵǾ������.
					editor.updateSelectedNodes(style);
					dropHelper.updateBtnTitle(data.self, style);
					editor.saveAndFocus();
				}
			}
			// ��������.
			this._eventHelper.stop(event);
		}
	};
})();
