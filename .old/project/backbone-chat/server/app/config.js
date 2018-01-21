var ENV = process.env;
var path   = require('path')
  , _      = require('underscore');
//////////////
var config = module.exports = {};


// port and mode
config.port =  ENV.PORT || 3000; 
config.mode = (function() {
	var mode = { 'test': 'test', 'development' : 'development' };
	var modeEnv = mode[ENV.NODE_ENV] ? ENV.NODE_ENV : 'test'; //default
	
	mode = {}
	mode[modeEnv]=true
	return mode;
})()

// tempDir for multer ( multipart-formdata)
config.tempDir 		= __dirname + '/tempFiles';
config.resourceDir	= __dirname + '/resource';
config.clientDir	= path.join(__dirname + '../../../client');