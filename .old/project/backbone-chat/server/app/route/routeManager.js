var U = require(__base + 'common/util'),
    _ = U._;


//
var routeManager = module.exports = {};

//라우팅 경로 세팅~ next는 없다. 여기서 끝내.
routeManager.routeAll = function (app) {
	this._routeMain(app);
	this._routeChat(app);	
}

//   /, /home 등 메인 경로.
routeManager._routeMain = function (app) {
	var express = require('express'),
	    config  = require(__base + 'config');

	app.use('/resource',express.static(config.resourceDir)); // 서버 자원 
	app.use('/client',express.static(config.clientDir));
	app.get('/', function (req, res) { 
		// console.log(req.session)
		return res.render('./main.html');
	})
}

//   /chat  /chat/1  등.
routeManager._routeChat = function (app) {
	app.get('/test', function (req, res) { 
		return res.send('test');
	})	
}