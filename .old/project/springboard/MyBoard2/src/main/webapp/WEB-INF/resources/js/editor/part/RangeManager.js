/**
 * 캐럿과 범위 둘을 컨트롤.
 */

(function () {

	/*
	 * static field, dependency
	 */
	var ns = $$NameSpace("com.kang.editor.part"),
		S_CARET_ID = "S_CARET_ID",
		E_CARET_ID = "E_CARET_ID";
	
	/*
	 * constructor , instance field
	 */
	ns.RangeManager = function History(editor) {
		this._editor = editor;
		this._contentDoc = editor.getContentDoc();
		this._cachedCarets = null;
	};


	
	//------------------update---------------------------------
	ns.RangeManager.prototype.updateRange = function (range) {
		if(range instanceof Array) {
			range = this._getRangeByTextNodes(range);
		}
		if(range.isCaretedRange) {
			range = this._getRangeByCaretedRange(range);
			this.deleteCarets();
		}
		var	selection = this.getCurrentSelection(),
			newRange = document.createRange();
//		if(range.isSingleCaret) {
//			newRange.selectNodeContents(range.sNode);//단일노드, 범위선택 
//			newRange.collapse(false); //위에서 범위를 캐럿으로(마지막 위치)
//		} else {
			newRange.setStart(range.sNode, range.sOffset);
			newRange.setEnd(range.eNode, range.eOffset);			
//		}

		selection.removeAllRanges();
		selection.addRange(newRange);
	};
	//------------------------------------------------------
	
	//------------------getxxx method--------------
	ns.RangeManager.prototype.getTemperalyCaretedContent = function () {//임시적으로 캐럿된 컨텐츠
		this.insertCarets(); //before
		var htmlData = this._editor.getContentBody().innerHTML;
		var rangeData = this.getCaretedRange();
		this.deleteCarets(); //after
		return {innerHTML:htmlData, range: rangeData };
	};
	ns.RangeManager.prototype.getCaretedRange = function () {
		if(this._cachedCarets == null) {
			this.insertCarets();
		}
		var range = this.getCurrentRange();
		return this._createRange(null, null,range.startOffset, range.endOffset);
	};
	ns.RangeManager.prototype.getDefaultRange= function(defaultNode) {
		var node = defaultNode || this._editor.getContentBody();
		return this._createRange(node);
	};
	ns.RangeManager.prototype.getCurrentSelection= function() {
		return this._contentDoc.getSelection();
	};
	ns.RangeManager.prototype.getCurrentRange = function() {
		var	selection = this.getCurrentSelection();
			rangeCount = selection.rangeCount;
			if(rangeCount) {
				return selection.getRangeAt(0);
			};
	};
	// ------------------------caret insert, delete
	ns.RangeManager.prototype.deleteCarets = function () {
		var carets = this._getCachedCaretsOrCurrentCarets(),
			sCaret = carets.sCaret,
			eCaret = carets.eCaret;
		console.log("de"+sCaret +","+ eCaret);
		if(sCaret) sCaret.parentNode.removeChild(sCaret);
		if(eCaret) eCaret.parentNode.removeChild(eCaret);
		this._cachedCarets = null;
	};
	ns.RangeManager.prototype.insertCarets = function () {
		var range = this.getCurrentRange();
		var sNode = range.startContainer,
			eNode = range.endContainer;
		var sCaret = __insertCaret(sNode, S_CARET_ID),
			eCaret = null;
		if(sNode!=eNode) {
			eCaret = __insertCaret(eNode, E_CARET_ID);
		}
		this._cachedCarets = {sCaret:sCaret, eCaret:eCaret};
		console.log("in"+sCaret +","+ eCaret);
		
		function __insertCaret(refNode, id) {
			var result = document.createElement("span");
			result.setAttribute("id",id);
			refNode.parentNode.insertBefore(result,refNode); //result의  next가 타겟임.
			return result;
		};
		
	};		
	/*
	 *=================helper
	 */
	//-----------------create
	ns.RangeManager.prototype._createRange= function(sNode,eNode,sOffset,eOffset) {
		var result = {sNode: sNode, eNode: eNode || sNode,
					  sOffset: sOffset || 0, eOffset:eOffset || sOffset, 
					  isCaretedRange:false,
					  isSingleCaret:false};
		result.isSingleCaret = __isSingleCaret(result);
		result.isCaretedRange = __isCaretedRange(result);
		return result;
		function __isCaretedRange(r) {
			if(r.sNode == null && r.eNode == null) 
				return true;
			else
				return false;
		};
		function __isSingleCaret(r) {
			if(r.sNode == r.eNode && r.sOffset==r.eOffset)
				return true;
			else
				return false;
		};
	};
	//--------------------get
	ns.RangeManager.prototype._getRangeByTextNodes = function(nodes) {  
		if((nodes.length == 0)) {
			return this.getDefaultRange();
		}
		var sTextNode = nodes[0],
			eTextNode = nodes[nodes.length-1],
			sOffset =0, eOffset = eTextNode.nodeValue.length;
		
		return this._createRange(sTextNode, eTextNode, sOffset, eOffset);
	};

	ns.RangeManager.prototype._getRangeByCaretedRange = function(offset) {
		var carets = this._getCachedCaretsOrCurrentCarets(),
			sCaret = carets.sCaret,
			eCaret = carets.eCaret;
		var sNode = sCaret.nextSibling,
			eNode = sNode;
		if(eCaret) {
			eNode = eCaret.nextSibling;
		}
		return this._createRange(sNode, eNode, offset.sOffset, offset.eOffset);
	};

	ns.RangeManager.prototype._getCachedCaretsOrCurrentCarets = function () {
		var carets = this._cachedCarets;
		if(!(carets)) {
			carets = {sCaret:null, eCaret:null};
			carets.sCaret = this._editor.getContentElementById(S_CARET_ID);
			carets.eCaret = this._editor.getContentElementById(E_CARET_ID);			
		};			
		return carets;
	};

//	selection.collapse(afterRange.sNode.parentNode,0);
//	selection.extend(afterRange.sNode.parentNode,1);	
//	selection.setBaseAndExtent(afterRange.sNode, afterRange.sOffset, afterRange.eNode, afterRange.eOffset);	
})();