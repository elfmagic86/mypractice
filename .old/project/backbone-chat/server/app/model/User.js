///
var U = require(__base + 'common/util')
  , _ = U._;
//

var User = module.exports = function User(datas) {
	if(U.notExist(datas.id)) return console.info(' not exist id ', datas);
	if(U.notExist(datas.connectId)) return console.info(' not exist connectId ', datas);

	this.id   = datas.id

	this.name = datas.name || ''
	this.connectId = datas.connectId || ''
	this.created = new Date() //Date.now로할까.

	this.roomNum =  ''
	this.connectTargetId = '';
}

//static
var ANNOY_ID_PREFIX = 'annoy';
var annoyCount = 0;
User.makeAnnoymous = function (datas) {
	var annoy = ANNOY_ID_PREFIX + (++annoyCount);
	return new User(_.extend({id : annoy, name : annoy}, datas));
}

// instance method
User.prototype.isAnnoymous = function () {
	if(U.notExist(this.id)) return false;

	if(this.id && this.id.indexOf(ANNOY_ID_PREFIX) === 0 ) return true;
	else return false;
}
User.prototype.setRoomNum = function (roomNum) { 
	this.roomNum = roomNum 
};
User.prototype.getRoomNum = function () {return this.roomNum };
User.prototype.isEqual = function (user) {
	if(this.id === user.id) return ture;
	else  return false;
}
