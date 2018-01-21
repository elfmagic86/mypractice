
//TODO: 이걸 빼버릴꺼야. 

(function(define, _) {
	//main.html에서 선로딩 함
	define(['common/util'],function(U) {

		// 대부분 받고 서버에 푸쉬는 현재는 몇 종류 없으니... push붙여서 하지뭐.
		// new:message에다가 push:new:message이런식으로만.
		// push는 지워서 보내야지.
		var TYPES = {
					  'new:user'   : 'new:user'
					 ,'get:user'  :  'get:user'
					 ,'new:message': 'new:message'
					 ,'new:room'   : 'new:room'
					 ,'remove:user' : 'remove:user'
					 ,'select:room' : 'select:room'
					 // push인넘들.
					 ,'push:new:message':  'push:new:message'
					 ,'push:new:room'   :  'push:new:room'
					 ,'push:select:room'   :  'push:select:room'
					}
		//
		var messageParser = {}
		messageParser.parse = function (jsonStr) {
			var message = JSON.parse(jsonStr);
			if(messageParser.isNotExistType(message.type)) console.info('not exist type message', message);
			return message;
		}
		messageParser.types = function () {
			return TYPES;
		}
		messageParser.isNotExistType = function (types) {
			if(U.notExist(types)) return true;

			if(!_.isArray(types)) types = [types];

			for(var i in types) {
				var type = types[i];
				if(!TYPES[type]) return true;
			}

			return false; //이게 존재한다는것.
		}
		messageParser.toString = function(type, data1, data2, data3) {
			if(messageParser.isNotExistType(type)) return console.error('not exist type', type);

			if(TYPES['push:new:message'] === type) return __message(data1, data2);
			if(TYPES['new:room'] === type) return __room(data1);
			if(TYPES['select:room'] === type) return __selectRoom(data1);
		}
		/// toString.
		function __message(message, targetConnectId) {
			var r = { type : TYPES['new:message'], message: message}
			if(targetConnectId) r.targetConnectId = targetConnectId;
			return JSON.stringify(r);
		}
		//이름, 패스워드
		function __room() {
			var r = { type : TYPES['new:room']}
			return JSON.stringify(r);
		}
		function __selectRoom(roomNum) {
			var r = { type : TYPES['select:room'] , roomNum : roomNum}
			return JSON.stringify(r);
		}


		return messageParser;
	})
})(define, _)