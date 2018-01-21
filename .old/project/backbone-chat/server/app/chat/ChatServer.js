//TODO: 얘도 클라이언트처럼 이벤트에미터로 on, emit 하면 좀더 간단해질듯?   
//      그리고 채팅 라우터, 컨트롤러 만들어도 괜찮을듯. 클라이언트쪽도 만들어야겠지만말야.
//      코드가 깔끔해질텐데.
var U = require(__base + 'common/util')
   ,_ = U._
   ,Q = U.Q;

var chatService = require(__base + 'chat/chatService')
  , ChatController = require(__base + 'chat/ChatController');
//
var ChatServer = module.exports = function ChatServer(baseUrl) {
	if(U.notExist(baseUrl)) return console.error('not exist baseUrl for chatServer');
	this._baseUrl  		 = baseUrl;
	this._chatController = new ChatController(this);
	//
	return this;
}

// 1. http서버를 이용하여 채팅서버 리스닝, 2. 이벤트 핸들러 바인딩
ChatServer.prototype.listenBy = function (httpListener, callback) {
	if(U.notExist(httpListener)) return console.error('chatServer need based httpListener to listen httpRequest');

	var sockjs 		 = require('sockjs'),
	    options      = this._getSockJSOptions(), //sockjs 기본옵션
	    chatListener = sockjs.createServer(options); //callback이 없음.

	//  prefix 붙은 경로를 chatServer로 사용함. http get 요청시 하면 sockjs 내부의 텍스트 보내줌.
	chatListener.installHandlers(httpListener, {prefix : this._baseUrl});  

	this._onConnectTo(chatListener);
	
}
ChatServer.prototype._getSockJSOptions = function () {
	// sockjs_url.. 크로스 도메인을  위해서. 라는데...나중에 다시봐야. 클라이언트랑 일치해야하는것같은데. 지금은 일치하지 않아.
	// prefix.. http 요청을 chatServer에게 넘겨주기 위한.. 주소.
	// 나머지는 https://github.com/sockjs/sockjs-node 참고.
	return {
			 sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js',
			 jsessionid: true,
			 log	   : function (level, message) {
			 		console.log('['+level+'] : ' + message);
			 }
	};
}
// 처음 접속시 저장만.
ChatServer.prototype._onConnectTo = function (chatListener) {
	if(U.notExist(chatListener)) return console.error('not exist chatListener for connect');

	var self = this;
	chatListener.on('connection', function (connect) {
		console.log('[con:'+connect.remoteAddress+':'+connect.remotePort+']');

		self._onDataTo(connect)
		self._onCloseTo(connect)
		//저장.
		chatService.createOrSessionUser(connect.id);
		chatService.saveConnect(connect);
    });
}

// 메시지 push, pull.
ChatServer.prototype._onDataTo = function (connect) {
	var chatController = this._chatController
	connect.on('data', function (messageStr) { // string 이네.
		var message   = JSON.parse(messageStr)
		  , type	  = message.type
		  , data      = message.data;
		
		console.log('[receved message :', messageStr, ']')
		chatController.emit(type, connect, data, messageStr);
	})
}

ChatServer.prototype._onCloseTo = function (connect) {
	var chatController = this._chatController

	connect.on('close', function () {
		chatController.emit('close:connect', connect);

		console.log('[close connect :', connect.id, ']');
	})
}

// broadcast/ muticast 둘다 나를 제외.
ChatServer.prototype.unicast = function (connect, messageStr) {
	if(_.isEmpty(messageStr)) return; //안보냄.
	if(_.isString(connect)) connect = chatService.findConnect(connect);

	// console.log('[unicast : '+messageStr+']');
	if(connect) return connect.write(messageStr)
	else		return console.info('connect not exist : ', connect, messageStr);
}

ChatServer.prototype.broadcast = function (messageStr, excludeId) {
	var connects   = chatService.getConnects()
	  , excludeId  = excludeId || ''; //걍 널회피. 

	for(var i in connects) {
		var connect = connects[i];
		if(U.notExist(connect) || connect.id === excludeId) continue;
		else connect.write(messageStr);

		console.log('[broadcast : '+messageStr+']');
	}
}
ChatServer.prototype.multicast = function (room, messageStr, excludeId) {
	if(U.notExist(room)) return console.info('[multicast] fail : not exist room');
	var users = room.getUsers()

	for(var i in users) {
		var user = users[i]
		  , connect = chatService.findConnect(user.connectId);

		if(U.notExist(connect) || connect.id === excludeId) continue;
		else connect.write(messageStr);

		console.log('[muticast : '+messageStr+']');
	}
};