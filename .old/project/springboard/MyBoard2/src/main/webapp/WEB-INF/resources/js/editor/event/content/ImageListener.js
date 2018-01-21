/**
 * 
 */

(function () {

	/*
	 * static field, dependency
	 */
	var ns = $$NameSpace("com.kang.editor.event.content");
	/*
	 * constructor , instance field
	 */
	ns.ImageListener = {
			_mustBeRemovedCallBacks : null,
			init: function(editor) {
				this._editor = editor;
				this._contentBody = editor.getContentBody();
				this._imageWrapper = ns.ImageWrapper;
				this._eventHelper = com.kang.editor.event.EventHelper;
				
				this.addActions();
			},
			addActions: function() {
				//이미지클릭시 span으로 warpping하기 위해 컨텐츠영역에 전역적으로 주는 이벤트~
				this.addAction(this._eventHelper.EVENT.mousedown, this._downCallBack);
				this.addAction(this._eventHelper.EVENT.mouseup, this._upCallBack);//이건 전역적인 공간에서의 이벤트 제거!				
				//이제 warpped span영역에 대해서...그런데 동적으로 생기는 엘리먼트이므로 마찬가지로 컨텐츠영역에 이벤트를줘야함.
				
			},
			addAction:function(eventType, callBack, target) {
				var targetNode = target || this._contentBody;
				var self = this;
				var useCapture = false;
				var	bindedCallBack = function bindedCallBack(e) {
						callBack.call(self,e);
					};
				
			
			this._saveCallBackmustBeRemoved(eventType, bindedCallBack, targetNode);	
			targetNode.addEventListener(eventType, bindedCallBack, useCapture);
			},
			_saveCallBackmustBeRemoved : function (eventType, callBack, target) {
				if(!(this._mustBeRemovedCallBacks)) {this._mustBeRemovedCallBacks= {};};
				this._mustBeRemovedCallBacks[eventType] = [target,callBack];
			},
			removeAction:function(eventType) {
				var entryMap = this._mustBeRemovedCallBacks;
				var key = eventType;
				if(entryMap[key]) {
					var targetAndCallBack = entryMap[key];
					if(targetAndCallBack != null) {
						var target = targetAndCallBack[0], callBack = targetAndCallBack[1]; 
						target.removeEventListener(eventType, callBack, false); //useCapture를..저장했어야하나.
						entryMap[key] = null;
						return;
					}
				};
			},			
			_downCallBack: function (e) {
				var event = e || window.event,
					target = e.target || e.srcElement,
					imgWrapper = this._imageWrapper;
				
//				imgWrapper.dispose(); //혹시나 wappedImgNode가 남아있다면 없에자.
//				this.removeAction(this._eventHelper.EVENT.mousemove);
				
				if(imgWrapper.isImageNode(target)) {
					imgWrapper.wrapImgNodeToSpanNode(target);
				}; 
				if(imgWrapper.isPartOfWrappedImage(target)) { //조정자 클릭시 마우스무브이벤트를줘야함
					imgWrapper.saveNodesMustBeUpdatedByPart(target);
					this.addAction(this._eventHelper.EVENT.mousemove, this._moveCallBack);
				};
				//기본동작해야하므로 stop하면안됨.
				
			},
			_moveCallBack: function _moveCallBack(e) {
				var event = e || window.event,
					target = e.target || e.srcElement,
					imgWrapper = this._imageWrapper,
					eventHelper = this._eventHelper;
				var	currentX = event.clientX;
				//마우스이동 거리 계산해서 플러스 || 마이너스 1
				
				var movedWidth = imgWrapper.getMovedWidthByX(currentX);
				console.log("mousemove  " + movedWidth);
				imgWrapper.setPrevX(currentX);
				imgWrapper.updateSavedNodesWith(movedWidth);
				eventHelper.stop(event);
			},
			_upCallBack: function (e) { //TODO:컨텐츠영역 밖에서 업되었을경우에도 이동작이 수행되야함.
				var event = e || window.event,
				target = e.target || e.srcElement,
				imgWrapper = this._imageWrapper,
				eventHelper = this._eventHelper;
				
				if(!(imgWrapper.isImageNode(target))) {
					imgWrapper.dispose();
				}
				this.removeAction(this._eventHelper.EVENT.mousemove);
				//stop하면 기본동작이 안됨.(이미지를 포함해서 블록하고 문자를 클릭하면 캐럿이 클릭한 위치로 이동이안됨
			}
			
			
	};
	
	
	
})();