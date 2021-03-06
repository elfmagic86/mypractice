/**
 *  �⑥������吏�� 臾몄���異����� 湲곕�.
 *   - http:://.......html?debug= true; ���洹몃え��� 寃쎌�留�������濡�
 *   - ���硫�false;
 */


(function() {
	var s = '';
	if(window.$$namespace) {
		$$namespace.include(function(require, module) {
			htmlLoger(module.exports)
		})
	} else {
		htmlLoger(this.window);
	}
	
	
	function htmlLoger(parentModule) {
		var location = window.location;
		
		parentModule.log = log1(normalNewDiv);
		parentModule.debug = debugLog1(errNewDiv); 

		//�쇰���� html 濡�렇
		function normalNewDiv (strings) {
			return $('<div>').append(strings);
		}
		//���濡�렇 (�밸���寃�� ��� 洹몃� ������寃�
		function errNewDiv(htmlString) {
			return $('<div>').text('DEBUG >>> ')
							 .css({
							      "background-color": "yellow",
							      "font-weight": "bolder"
							 })
							 .append(htmlString);
		}
		
		
		function debugLog1(errNewDiv) {
			if(!isDebugMode()) return function() {};
			return log1(errNewDiv);
		}
		function log1(newDivFn) {
			var $div = $('<div>');
			$div.prependTo('body');
			
			return function log() {
				var list = []
				  , args = Array.prototype.slice.apply(arguments);
				
				getStrings1(list)(args);
				
				var strings =  decorateHTML(list.toString())
				  , newDiv = newDivFn(strings);
				
				$div.append(newDiv);
				return list;
			}
		}
		var count = 0;
		function decorateHTML(str) {
			str = str.replace(/","/g, '<B style="background-color:blue">","</B>')
					 .replace(/":"/g, '<B style="background-color:yellow">:</B>');
			return '('+(++count)+')'+ ' : '+str;
		}
		function isDebugMode() {
			var qs = getQueryString();
			if(qs.debug) return true
			else return false;
		}
			
		function getStrings1(list) {
			return function getStrings(o) {
				if(o == undefined || o == null) {{return getStrings('arg is not exist');}}
				if(isElement(o)) {return getStrings(o.outerHTML);}				
				if(isJquery(o)) { return getStrings(o.toArray());}
				if(isArray(o)) {
					for(var i in o) {
						var v = o[i];
						getStrings(v);
					}
					return ;
				}
				if(isObjectAndNotElseType(o)) { 
					return getStrings(JSON.stringify(o, function(key, value) {
						if(isFunction(value)) {
							return (''+value).replace(/[\n\r\t]+/g, "")
												  .replace('function','[FN] ')
												  .slice(0,4);
						}
						return value;
					}));
				}
				
				// else
				return list.push(o);
			}
		}
		
		function isFunction(o) {
			if(o instanceof Function) return true;
			else return false;
		}
		function isElement(o) {
			if(o.nodeType != undefined && o.nodeType != null )
				return true;					
			else 
				return false;
		}
		function isJquery(o) {
			if(o instanceof $) return true;
			else return false;
		}
		function isArray(o) {
			if(o instanceof Array)  return true;
			else return false;
		}
		function isObjectAndNotElseType(o) {
			if(!(isElement(o) || isJquery(o) || isArray(o))) {
				if(o instanceof Object) return true;
			}
			return false;
		}
		////
		function getQueryString() {
			  var result = {}, queryString = location.search.slice(1),
			      re = /([^&=]+)=([^&]*)/g, m;

			  while (m = re.exec(queryString)) {
			    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
			  }

			  return result;
		}

	};

})()

//@ sourceURL=util/htmlLoger.js