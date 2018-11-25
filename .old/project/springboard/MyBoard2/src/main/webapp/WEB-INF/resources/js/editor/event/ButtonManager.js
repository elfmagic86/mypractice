/**
 * ��â�� �̸����� �޸� �̺�Ʈ + ��� �ի��� ��ư���� �ʱ�ȭ�����ִ� ���Ҹ���.
 * Ű�����ʰ� ���ԵǾ����� ��ư�Ŵ����� �̸��� Ʋ����..
 */

(function () {
	/*
	 * private static field
	 */
	var ns = $$NameSpace("com.kang.editor.event"),
		INIT = "init"; //eventObject�� �ʱ�ȭ �Լ��̸�.
	
	ns.ButtonManager = function ButtonManager(editor) {
		//default field
		this._editor = editor;
		this._init();
	};
	ns.ButtonManager.prototype._init = function () {
		//�̺�Ʈ ��ü�� ��������.
		this._eventObjectList = this._createEventObjects();
		
		//�ʱ�ȭ �Ѵ�.�� �̺�Ʈ ��ü�� ��ư�� �Ƕ�� ��û�� �ϴ� ����.
		this._initEventObjects(this._eventObjectList, this._editor);
	};
	
	ns.ButtonManager.prototype._createEventObjects = function() {
		var result = [
	                    ns.button.Basic,
	                    ns.button.BackgroundColor,
	                    ns.button.FontSize,
	                    ns.button.FontColor,
	                    ns.button.UndoRedo,
	                    ns.button.InOutdent,
	                    ns.button.LineHeight,
	                    ns.button.LineStyle,
	                    ns.button.Image,
	                    
	                    ns.content.ImageListener,
	                    ns.content.KeyListner
	                    
	                    ];
		return result;
	},
	ns.ButtonManager.prototype._initEventObjects = function (eventObjects, editor) {
		for(var i in eventObjects) {
			var eventedNode = eventObjects[i];
			if(eventedNode[INIT]) {
				eventedNode[INIT](editor);
			};
		};
	};

})();