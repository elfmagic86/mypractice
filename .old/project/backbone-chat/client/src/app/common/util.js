

(function (define, _, $) {
	define([], function () {
		var U = {};
		// method
		U.exist = function(o) {
			if(o != null || o != undefined) return true;
			else return false;
		}
		U.notExist = function (o) {
			return !U.exist(o);
		}
		U.cssId = function (str) {
			if(str.indexOf('#') === 0) return str;
			else return '#' + str
		}
		U.cssClass = function (str) {
			if(str.indexOf('.') === 0) return str;
			else return '.' + str
		}
		U.textForHtml = function (text) {
			return text.replace(/\r\n/g,'<br>')
					   .replace(/\n/g,'<br>')
					   .replace(/ /g,'&nbsp;');
		}

		//findById로 바꾸자.
		U.findBy = function (id, $baseEl) {
			var $el = $baseEl.find(U.cssId(id))
			if($el.length === 0) return console.error(U.cssId(id) + ' el not found by $baseEl' );
			else return $el;
		}
		// 단순히 자식 삭제하고 새로운 자식붙이는것.
		U.replaceChild = function (idOr$el , el) {
			var $area 	   = _.isString(idOr$el) ? $(U.cssId(idOr$el)) : idOr$el,
			    $children  = $area.children();
			$children.remove();
			$area.append(el);
		}
		//
		U.isKey = (function() {

			var CHAR_CODE = {
							  'enter' : 13
			}
			return function (keyName, charCode) {//숫자 문자 변환가능하게.
				if(CHAR_CODE[keyName] && CHAR_CODE[keyName] == charCode) return true;
				else false;
			}
		})()
		
		return U;
	})
})(define, _, $)
