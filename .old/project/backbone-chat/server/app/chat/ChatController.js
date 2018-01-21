
var U = require(__base + 'common/util'),
    _ = U._,
    Q = U.Q;

var Room        = require(__base + 'model/Room')    
var chatService = require(__base + 'chat/chatService')

var EventEmitter = require('events').EventEmitter;
// message. push, pull 역할.
var ChatController = module.exports = function(server) {
		EventEmitter.call(this) 

		this.server = server;
		
		////////  -----이벤트 구독.
		// init 시리즈.
		this.on('init:home', _.bind( this.initHome, this) )
		this.on('join:room', _.bind( this.joinRoom, this) )

		// .
		this.on('new:message', _.bind( this.pushMessage, this) )

		this.on('new:room', _.bind( this.createRoom, this) )

		this.on('select:user', _.bind( this.selectUser, this) )
		this.on('update:user', _.bind( this.updateUser, this) )

		this.on('close:connect', _.bind( this.closeConnect, this) )


		return this;
}
ChatController.prototype = Object.create( EventEmitter.prototype );

ChatController.prototype.initHome = function (connect, data, originStr) {
	this.joinRoom(connect, Room.BASE_NUM, originStr);
}
ChatController.prototype.joinRoom = function (connect, roomNum, originStr) {
	var currentRoom  = chatService.findRoom(roomNum);
	if(U.notExist(currentRoom)) return ;

	var connectId      = connect.id
	  , currentUser    = chatService.findUser({connectId : connectId })
	  , prevRoom       = chatService.findRoom(currentUser.roomNum)
	
	if(prevRoom && roomNum != currentUser.roomNum) { //이전과 다른 방번호라면.
		prevRoom.outUser(currentUser)
		this.server.multicast(prevRoom, __jsonToStr('remove:user', currentUser), connectId)

	}
	//방에 유저, 유저에 방번호 추가.
	currentRoom.inUser(currentUser)
	currentUser.setRoomNum(roomNum)
	currentUser.connectTargetId = null; //귓속말상대 초기화.

	var existingRooms  = chatService.getRooms()
	  , existingUsers  = currentRoom.getUsers();

    var currentUserStr    = __jsonToStr('new:user', currentUser)
      , existingUsersStr = __jsonToStr('get:user', existingUsers)
      , existingRoomsStr = __jsonToStr('new:room', existingRooms);

	// 현재 접속자들에게  새 유저 접속 알리고.
    this.server.multicast(currentRoom, currentUserStr, connectId)
	// 나에게 초기정보 전달.
	this.server.unicast(connect, __jsonToStr('new:user', _.extend(_.clone(currentUser), {me: true}) ) );
	this.server.unicast(connect, existingUsersStr);
	this.server.unicast(connect, existingRoomsStr);
    
}
ChatController.prototype.closeConnect = function (connect) {
	var connectId   = connect.id
	  , currentUser = chatService.findUser({connectId : connectId})
	  , room        = chatService.findRoom(currentUser.roomNum)

	if(room) room.outUser(currentUser)
	chatService.removeConnect(connectId);
	chatService.removeUser(currentUser)

	var removeUserStr = __jsonToStr('remove:user', currentUser);
	this.server.multicast(room, removeUserStr, connectId)
}


ChatController.prototype.selectUser  = function (connect, selectedUserId) {
	var connectId       = connect.id
	  , currentUser     = chatService.findUser({connectId: connectId}) || {} 
	var selectedUser    = chatService.findUser(selectedUserId) 		   || {} 
	var connectTargetId = currentUser.connectTargetId

	currentUser.connectTargetId = connectTargetId ? '' : selectedUser.connectId ;
}
ChatController.prototype.updateUser = function (connect, updateUser, originStr) {
	var connectId       = connect.id
	  , currentUser     = chatService.findUser({connectId: connectId}) || {}
	  , currentRoom     = chatService.findRoom(currentUser.roomNum);

	currentUser.name = updateUser.name;
	currentUser.me   = '';   
	this.server.multicast(currentRoom, __jsonToStr('update:user', currentUser), connectId)
}
ChatController.prototype.createRoom = function (connect, roomName) {
	var connectId       = connect.id
	  , currentUser     = chatService.findUser({connectId: connectId}) || {}

	var room = chatService.createRoom(currentUser.id, {name : roomName})

	this.server.broadcast(__jsonToStr('new:room', room))
}
ChatController.prototype.pushMessage = function (connect, message, originStr) {
	var connectId       = connect.id
	  , currentUser     = chatService.findUser({connectId: connectId}) || {} 
	  , currentRoom     = chatService.findRoom(currentUser.roomNum) || {} 
	  , connectTargetId = currentUser.connectTargetId
	  , messageStr      = __messageStr(currentUser.name, message);

	//1;1d은 방도상관없지.
	if(U.isNotEmpty(connectTargetId)) return this.server.unicast(connectTargetId, messageStr);

	this.server.multicast(currentRoom, messageStr, connectId)
}

// helper
function __messageStr(userName, message) {
	return __jsonToStr('new:message','['+userName+'] : '+message);
}

function __jsonToStr(type, data) {
	var message = {type : type}
	if(data) message['data'] = data
	return JSON.stringify(message);
}

