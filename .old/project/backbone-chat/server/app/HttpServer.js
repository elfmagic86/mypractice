var _  		= require('underscore'),
    express = require('express');

//
var HttpServer = module.exports = function HttpServer() {
	this._config		 = require(__base + 'config');
	this._httpServer	 = express();
	this._routeManager   = require(__base + 'route/routeManager');
	
	//
	this._setup();
}

HttpServer.prototype.listen = function (callback) {
	var config = this._config,
		http   = require('http');

	var httpServer = http.createServer(this._httpServer).listen(config.port, function(err) {
		if(err) {
			console.error('=== fail HttpServer run ====')
			return console.error(err);
		}
		
		console.log('=== HttpServer start and listening ===');
		console.log('HttpServer port : ' + config.port + ', mode : ' + _.keys(config.mode));

		if(callback) return callback();
	});

	return httpServer;
}

// 순서주의
HttpServer.prototype._setup = function () {
	this._parseReq();   
	this._setupEjs(); // *.ejs 파일 전달시.
	// 파싱된 req가 적절한 경로에 전달됨.
	this._routeManager.routeAll(this._httpServer);

}
HttpServer.prototype._setupEjs = function () {
	this._httpServer.set('view engine', 'ejs');
	this._httpServer.set('views', this._config.clientDir);
	this._httpServer.engine('html'      , require('ejs').renderFile);
}
// req 파싱.
HttpServer.prototype._parseReq = function () {
	var tempDir 	    = this._config.tempDir;

	// 1. body
	var bodyParser 	    = require('body-parser'),  
	    multer			= require('multer');
	    // methodOverride  = require('method-override'), // 이건 RESTfull 지원안할시. 하고 아니면 그냥.

	this._httpServer.use(bodyParser.json()); // for parsing HttpServerlication/json
	this._httpServer.use(bodyParser.urlencoded({ extended: true })); // for parsing HttpServerlication/x-www-form-urlencoded
	this._httpServer.use(multer({dest:tempDir})); // for parsing multipart/form-data

	// 2. cookie 및 세션.
	this._setupSessionStore()

	//3. 로깅
	this._httpServer.use(_.bind(this._reqLogging, this));

}
HttpServer.prototype._setupSessionStore = function () {
	var redis = require('redis'),
		cookieParser = require('cookie-parser'),
		expressSession = require('express-session');

	//secret code 역할이 뭔지 모르니 일단두고보기.
	this._httpServer.use(cookieParser('yoursecretcode')); 
	//TODO: sockjs에서 안됨..짜잉...나.
	this._httpServer.use(expressSession(
		{
			secret: 'yourothersecretcode', 
			saveUninitialized: true, // false : don't create session until something stored,
			resave: true //false: save session if unmodified
		}
	));
}

// etc
// 요청 자체에 에러가 있을시 에러 메시지 보내고 종료.
HttpServer.prototype._reqLogging = function (req, res, next) {
	var mode = this._config.mode;
	if(mode.test) {
	// this._httpServer.disable('ETag'); //express는 HTTP 캐쉬..를 ETag를 사용함.
		if(__reqIsNotStaticResource(req.path)) {
		// console.log('redis store')
		// console.log(req.session.redSession)
		console.log('['+req.ip+']['+req.path+']-params : ', _.union(req.params, req.query, req.body));
		}
	}
	
	next(); // 뭐 전달안하고 이렇게만 해도되나? err있을 경우만 첫 파라미터로 전달.

	function __reqIsNotStaticResource (path) {
		if(path.indexOf('/client/') === 0 || path.indexOf('/resource/') === 0) return false;
		else return true;
	}
}