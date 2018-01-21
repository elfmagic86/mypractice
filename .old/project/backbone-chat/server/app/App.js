//
var App = module.exports = function App() {
	//채팅 서버와 연결되기 위한 http 요청 주소. 당연히 클라이언트 소켓과 일치해야함.
	var url4chatServer    = '/connectChat'; 

	var HttpServer = require(__base + 'HttpServer')
	  , ChatServer = require(__base + 'chat/ChatServer');

	this._httpServer = new HttpServer();
	this._chatServer = new ChatServer(url4chatServer);

	//app와 생명주기 같은 지속되야하는 객체를 위한 초기 공간 할당. (나중에 영속성 고려.)
	this._initAppStore(); 
}
App.prototype._initAppStore = function () {
	var appStore = require(__base + 'appStore')
	  , Room     = require(__base + 'model/Room');

	// connects..rooms..chatServer에서 만들어야하나?
	appStore.makeMap('users'      , 'id'); 
	appStore.makeMap('connects'   , 'id');
	appStore.makeMap('rooms'      , 'num');
	//base room 및 초기룸.
	appStore.set('rooms', new Room({name : 'BaseRoom'})) 
	appStore.set('rooms', new Room({name : 'test1'})) 
	appStore.set('rooms', new Room({name : 'test2'}))
}

// listening httpServer && chatServer
App.prototype.run = function (callback) {
	//

	var httpListener = this._httpServer.listen()
	var chatListener = this._chatServer.listenBy(httpListener, callback);
}
