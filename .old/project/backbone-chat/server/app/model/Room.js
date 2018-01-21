///
var U = require(__base + 'common/util')
  , _ = U._;
//

var ANNOY_NAME_PREFIX = 'annoyRoom'
  , BASE_NUM          = 0;
var roomCount = BASE_NUM;

var Room = module.exports = function Room(datas) {
	this.num        = (roomCount++) //0부터시작.
	this.name       = datas.name || ANNOY_NAME_PREFIX + this.num
	this.date   	= new Date() //Date.now로할까.
	this.headCount  = 0;
	this.ownerId      = datas.ownerId || ''
	//private 
	//TODO: 매번 함수생성방법말고.. 프로토타입으로 넣는것 어찌하더라?
	var _users  = []; 
	this.getUsers = function () { return _users;}
	this.inUser = function (user) {
		var originUser = _.find(_users, function(_user){
			return _user.id === user.id; 
		})
		if(U.exist(originUser)) return;

		this.headCount = ++this.headCount
		_users.push(user);
		return user;
	}
	this.outUser = function (targetUser) { 
		var targetUserId        = targetUser.id
		  , targetUserConnectId = targetUser.connectId;

		var removeIndex;
		for(var i in _users) {
			var _user = _users[i]

			if(_user.connectTargetId == targetUserConnectId) { _user.connectTargetId = null;}
			if(_user.id == targetUserId) { removeIndex = i}
		}
		_users[removeIndex] = null;
		_users = _.compact(_users)   //null제거.
		this.headCount = --this.headCount
		
		return this;
	}

	var password   = datas.password || null;
	this.getPassword = function () { return password}
	return this;
}

Room.BASE_NUM = BASE_NUM;

// Room.excludePassword = function (room) {
// 	if(room.password) {
// 		room.hasPassword = true;	
// 		room.password    = undefined;
// 	} else { room.hasPassword = false };
// 	return room
// }
// Room.prototype.isEmpty = function () {
// 	return _.isEmpty(this.users)
// }
Room.prototype.outUser = function (outUser) {

}
