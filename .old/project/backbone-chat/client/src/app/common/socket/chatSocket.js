(function(define, _, $, Backbone) {
	//main.html에서 선로딩 함
	define([
		    'common/util'
		   ,'common/socket/socketManager'
		   ,'common/socket/messageParser']
  ,function(
  	        U
  	       ,socketManager
  	       ,messageParser
  	       ){

  		// - http, ajax..같은 것이. url을 이용하여 전역적으로 사용가능한것처럼.
  		//   오픈을했다면. 싱글톤인 chatSocket을 이용하여 전역적으로 접근가능. 

  		var chatSocket = _.extend({}, Backbone.Events);

  		chatSocket.chatUrl    = null; // open시 할당됨.

		chatSocket.open = function open(chatUrl) {
			var deferred = $.Deferred()

			this.chatUrl = chatUrl;

			this.on('push:new:message', _.bind(this.push, this) ) //이벤트 트리거하거나..직접호출하거나.
			//이벤트 핸들러 ,, 전파역할.
			socketManager.open(chatUrl	   , _.bind(this._onopen, this, deferred))
			socketManager.onmessage(chatUrl, _.bind(this._onmessage, this));

			return deferred.promise();
		}

		// 이벤트 핸들러 전파역할. 오픈완료 알림.
		chatSocket._onopen = function (deferred) {
			console.log('open')
			deferred.resolve('open')
		}
		// 
		chatSocket._onmessage = function (e) {
			var parsedData  = JSON.parse(e.data)
			  , type        = parsedData.type
			  , data        = parsedData.data;

			if(U.notExist(type)) return console.error('received message not exist type : ', type);
			//구독자에게 전파.
			console.log('[received message] : ', parsedData);
			return this.trigger(type, data); //구독자가 알아서 해석.
		}
		// chatSocket.trigger('push', type, data);
		chatSocket.push = function (type, data) {
			if(!type) return console.error('type not exist', type);

			var message = { type : type} 

			if(data) message['data'] = data;
			var messageStr = JSON.stringify(message);
			
			this.send(messageStr);

			console.log('[pused message] : ', messageStr);
		}

		// 요건
		chatSocket.send = function (messageStr) {
			socketManager.send(this.chatUrl, messageStr);
		}
		chatSocket.close = function () {
			socketManager.close(this.chatUrl);
		}


		return chatSocket;
	})
})(define, _, $, Backbone)