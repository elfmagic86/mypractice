

(function(define, _) {
	//main.html에서 선로딩 함
	define(['SockJS'],function() {
		var SockJS = window.SockJS; //전역에 할당되어있다..
		if(!SockJS) return console.error('not exist window.SockJS');



		//sock 들을 관리하는 책임. 
		/*
		 	0. 가져오기. 오픈하기.
		 	var sock = socketManager.open('url')
		 	var sock = socketManager.get('url')

		 	1. 메시지 받기 콜백..
		 	sock.onmessage = func....{} // 직접 할당하던가..
		 	socketManager.onmessage('url', func....); // 이렇게 하던가.
			
			2. 메시지 보내기.
			sock.send(message) 사용은 이런식으로.
			socketManager.send('url', message);


		*/
		var socketManager = {}
		socketManager._socks = {};

		socketManager.open = function (baseUrl, onopen) {
			if(!baseUrl) return console.error('need baseUrl to open socket');

			var sock = new SockJS(baseUrl);
			this._socks[baseUrl] = sock;

			sock.onopen = onopen || function () {	console.log('['+baseUrl+']-open :', sock.protocol)}
			sock.onmessage = function (e) {console.log('['+baseUrl+']-message : ', e.data)}
			sock.onclose   = function () {console.log('['+baseUrl+']-close', sock.protocol)}

			return sock;
		}
		socketManager.get = function (baseUrl) {
			var sock = this._socks[baseUrl];
			if(!sock) return console.error('not exist sock of '+baseUrl);

			return sock;
		}
		socketManager.onmessage = function (baseUrl, onmessage) {
			var sock = this._socks[baseUrl];
			if(!sock) return console.error('not exist sock of '+baseUrl);			
			if(!_.isFunction(onmessage)) return console.error('need onmessage method');
			
			sock.onmessage = onmessage;
		}
		socketManager.send = function (baseUrl, messageStr) {
			var sock = this._socks[baseUrl];
			if(!sock) return console.error('not exist sock of '+baseUrl);			
			sock.send(messageStr);
		}

		socketManager.close = function (baseUrl) {
			var sock = this._socks[baseUrl];
			if(!sock) return console.error('not found sock to close');
			//TODO:  이거면 됨?
			sock.close();
		}
		socketManager.closeAll = function () {
			for(var key in this._socks) {
				this.close(key);
			}
		}

		return socketManager;
	})
})(define, _)