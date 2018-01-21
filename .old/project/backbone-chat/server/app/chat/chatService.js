
var U = require(__base + 'common/util'),
    _ = U._,
    Q = U.Q;  

var appStore      = require(__base + 'appStore');
var User          = require(__base + 'model/User');
var Room          = require(__base + 'model/Room');

var chatService = module.exports = {};

// -----  user
//새접속시 새로만들거나,  세션과 같은곳에 저장된 유저가있다면. 사용.(그것이 나라는 것을 어떻게 구분하지?)
chatService.createOrSessionUser = function (connectId) {
	if(U.notExist(connectId)) return console.info('not exist connectId : ', connectId)
	//TODO: 쿠키사용못하는데... 세션과 같은 것을 이용할방법이 필요함. 통신에 나라는 상태를남기려면..
	
	// connectId와 일치하는 것 있으면 그것 넘기삼.
	var user = appStore.get('users',{connectId : connectId})
	if(user) return user;
	// 현재는 익명유저. 챗커넥션과 1:1인.. 연결해제시 제거되는.
	var annoyUser = User.makeAnnoymous({connectId : connectId});
	appStore.set('users',annoyUser);
	return annoyUser;
}
chatService.getUsers = function (roomNum) {
	if(!roomNum) return _.values(appStore.get('users')); //list

	var room = chatService.findRoom(roomNum);
	return room.users;
}
chatService.findUser = function (id) {
	return appStore.get('users', id)
}
chatService.removeUser = function (id) {
	return appStore.remove('users', id)
}

// ---------- room
chatService.getRooms = function (roomNum) {
	if(roomNum) return []; // 안씀.

	return _.values(appStore.get('rooms')); //list
}
chatService.createRoom = function (ownerId, datas) {
	var room = new Room(_.extend({ownerId:ownerId}, datas));
	appStore.set('rooms',room);
	return room;
}
chatService.cloneRoom = function (room) {
   var toRoom = _.clone(room);
	return Room.excludePassword(toRoom); //hasPassword만남ㄱ김.  
}
chatService.removeRoom = function (password, user) {
	var room = appStore.get('rooms', roomNum)
	// if(room.beAbleToRemove(password, user))
}
chatService.userOutRoom = function (user) {
	var roomNum = user.roomNum
	if(U.notExist(roomNum)) return ;

	var room = appStore.get('rooms', roomNum)
	room.outUser(user)
	return room;
}
chatService.userInRoom = function (user, roomNum) {
	user.roomNum = roomNum
	var room = appStore.get('rooms', roomNum)
	room.inUser(user)
	return room;
}
chatService.findRoom  = function (id) {
	return appStore.get('rooms', id)
}
// ------------connect
chatService.getConnects = function () {
	return _.values(appStore.get('connects'));
}
chatService.saveConnect = function (connect) {
	return appStore.set('connects', connect);
}
chatService.findConnect  = function (id) {
	return appStore.get('connects', id)
}
chatService.removeConnect = function (id) {
	return appStore.remove('connects', id)
}