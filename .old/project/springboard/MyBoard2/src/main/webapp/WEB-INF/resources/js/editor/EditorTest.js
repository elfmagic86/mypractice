/**
 * 
 */

describe("Editor", function() {
	var editor = new com.kang.editor.Editor();
	window.$editor = editor;
	window.$disp = _disp;
	window.$range = function() {return editor._contentDoc.getSelection().getRangeAt(0);};
	window.$sel = function() {return editor._contentDoc.getSelection();};
	
	window.$test = function(start, end) {
	    var caretOffset = 0;
	    var doc = editor._contentDoc;
	    var win = doc.defaultView || doc.parentWindow;
	    var sel;
	    var element = editor.getContentFrame();
	    if (typeof win.getSelection != "undefined") {
	        var range = win.getSelection().getRangeAt(0);
	        var preCaretRange = range.cloneRange();
	        
	        preCaretRange.selectNodeContents(element);
	        preCaretRange.setEnd(range.endContainer, range.endOffset);
	        caretOffset = preCaretRange.toString().length;
	    } else if ( (sel = doc.selection) && sel.type != "Control") {
	        var textRange = sel.createRange();
	        var preCaretTextRange = doc.body.createTextRange();
	        preCaretTextRange.moveToElementText(element);
	        preCaretTextRange.setEndPoint("EndToEnd", textRange);
	        caretOffset = preCaretTextRange.text.length;
	    }
	    return caretOffset;
		
//	    if(!end) end = start; 
//	    return thise.each(function() {
//	        if (this.setSelectionRange) {
//	            this.focus();
//	            this.setSelectionRange(start, end);
//	        } else if (this.createTextRange) {
//	            var range = this.createTextRange();
//	            range.collapse(true);
//	            range.moveEnd('character', end);
//	            range.moveStart('character', start);
//	            range.select();
//	        }
//	    });
	};
	it("editor new initialize", function() {
		expect(editor).toBe(editor);
		/*expect(a).toEqual(b);*/
	});
	//현재 선택된 노드 가져와서 span태그를 부모로 넣기.
	it("test",function () {
//		var s = editor.updateSelectedNodes();
		
		/*var s = editor.getSeletedNode();
		console.log(s);*/
		
	});
});
function _disp(s) {
	for(var i in s) {
		if((typeof i) =="function") {
			var str = "function: " +i +"  : "+ s[i]();
			console.log(str);
		}else if((typeof i)=="object") {
			
		} else {
			var value = s[i];
/*			if(value.toString) {
				value = value.toString();
			}*/
			var field = "field :" + i + "  : "+ value;
			
		console.log(field);
		};
	};
};
