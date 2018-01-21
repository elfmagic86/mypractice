var _ = require('underscore')


var U = module.exports = {};

U._ = _; // 편의.
U.Q = require('q');

// method
U.exist = function(o) {
	if(o != null || o != undefined) return true;
	else return false;
}
U.notExist = function (o) {
	return !U.exist(o);
}
U.isNotEmpty = function (o) {
	return !_.isEmpty(o)
}
