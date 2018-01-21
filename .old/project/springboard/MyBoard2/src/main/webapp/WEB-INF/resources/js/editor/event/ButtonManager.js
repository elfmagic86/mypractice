/**
 * 거창한 이름과는 달리 이벤트 + 노드 합쳥서 버튼으로 초기화시켜주는 역할만함.
 * 키리스너가 포함되었으니 버튼매니저란 이름이 틀리지..
 */

(function () {
	/*
	 * private static field
	 */
	var ns = $$NameSpace("com.kang.editor.event"),
		INIT = "init"; //eventObject의 초기화 함수이름.
	
	ns.ButtonManager = function ButtonManager(editor) {
		//default field
		this._editor = editor;
		this._init();
	};
	ns.ButtonManager.prototype._init = function () {
		//이벤트 객체를 가져오고.
		this._eventObjectList = this._createEventObjects();
		
		//초기화 한다.각 이벤트 객체에 버튼이 되라는 요청을 하는 것임.
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