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
				//�̹���Ŭ���� span���� warpping�ϱ� ���� ������������ ���������� �ִ� �̺�Ʈ~
				this.addAction(this._eventHelper.EVENT.mousedown, this._downCallBack);
				this.addAction(this._eventHelper.EVENT.mouseup, this._upCallBack);//�̰� �������� ���������� �̺�Ʈ ����!				
				//���� warpped span������ ���ؼ�...�׷��� �������� ����� ������Ʈ�̹Ƿ� ���������� ������������ �̺�Ʈ�������.
				
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
						target.removeEventListener(eventType, callBack, false); //useCapture��..�����߾���ϳ�.
						entryMap[key] = null;
						return;
					}
				};
			},			
			_downCallBack: function (e) {
				var event = e || window.event,
					target = e.target || e.srcElement,
					imgWrapper = this._imageWrapper;
				
//				imgWrapper.dispose(); //Ȥ�ó� wappedImgNode�� �����ִٸ� ������.
//				this.removeAction(this._eventHelper.EVENT.mousemove);
				
				if(imgWrapper.isImageNode(target)) {
					imgWrapper.wrapImgNodeToSpanNode(target);
				}; 
				if(imgWrapper.isPartOfWrappedImage(target)) { //������ Ŭ���� ���콺�����̺�Ʈ�������
					imgWrapper.saveNodesMustBeUpdatedByPart(target);
					this.addAction(this._eventHelper.EVENT.mousemove, this._moveCallBack);
				};
				//�⺻�����ؾ��ϹǷ� stop�ϸ�ȵ�.
				
			},
			_moveCallBack: function _moveCallBack(e) {
				var event = e || window.event,
					target = e.target || e.srcElement,
					imgWrapper = this._imageWrapper,
					eventHelper = this._eventHelper;
				var	currentX = event.clientX;
				//���콺�̵� �Ÿ� ����ؼ� �÷��� || ���̳ʽ� 1
				
				var movedWidth = imgWrapper.getMovedWidthByX(currentX);
				console.log("mousemove  " + movedWidth);
				imgWrapper.setPrevX(currentX);
				imgWrapper.updateSavedNodesWith(movedWidth);
				eventHelper.stop(event);
			},
			_upCallBack: function (e) { //TODO:���������� �ۿ��� ���Ǿ�����쿡�� �̵����� ����Ǿ���.
				var event = e || window.event,
				target = e.target || e.srcElement,
				imgWrapper = this._imageWrapper,
				eventHelper = this._eventHelper;
				
				if(!(imgWrapper.isImageNode(target))) {
					imgWrapper.dispose();
				}
				this.removeAction(this._eventHelper.EVENT.mousemove);
				//stop�ϸ� �⺻������ �ȵ�.(�̹����� �����ؼ� ����ϰ� ���ڸ� Ŭ���ϸ� ĳ���� Ŭ���� ��ġ�� �̵��̾ȵ�
			}
			
			
	};
	
	
	
})();