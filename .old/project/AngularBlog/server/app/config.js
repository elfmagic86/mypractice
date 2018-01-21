/*
 * config 공통으로 사용되는 환경설정.

 * 
 */

/*
 *   test config, development config 구분 방법.
 * 1. 이용 원리
 *   - express는 초기화시 암시적으로 app.set('env', process.env.Node_ENV || 'development')를 해준다. 
 *   - express초기화 전에 precess.env.NODE_ENV 값을 변경하거나 설정해줌으로써
 *     어떤 환경으로 시작할 것인지 구분할 수 있다. 
 *   - express에서 app.get('env')를 읽어서 필요한 구분을 해준다.
 * 2. 값 변경 방법
 *    - 콘솔에서 NODE_ENV=test node app  실행할때 변경시키기.
 *    - 직접 변경하려면 process.env.NODE_ENV 값을 express초기화 전에 변경하면 된다.
 */

var _path = require('path')
var _env = process.env
///
var config = {}
// host
config.isLocal = false;
config.port = _env.PORT || 3000; //
config.host = _env.HOST || 'localhost:3000'
// db
config.db = _env.MONGOLAB_PATH || 'mongodb://mongo/test';

// express
config.resourceDir = _path.join(__dirname, '../../client')
config.staticDir = config.resourceDir +'/static'
config.tempFilesDir = './tempFiles'  //local에서 multer를 위한장소. 파일 임시 저장폴더.
config.imgDir = '' // use cloudinary ..local은 하단에서 따로.


// passport api key 
var wrongIdAndPw = 'canNotUsePassportIfUseThis';   
config.passport = {}
config.passport.facebook = {'id' : _env.LOCAL_PASSPORT_FACEBOOK_ID || wrongIdAndPw, 'secret': _env.LOCAL_PASSPORT_FACEBOOK_SECRET || wrongIdAndPw}
config.passport.twitter = {'id' : _env.LOCAL_PASSPORT_TWITTER_ID || wrongIdAndPw, 'secret': _env.LOCAL_PASSPORT_TWITTER_SECRET || wrongIdAndPw}
config.passport.github = {'id' : _env.LOCAL_PASSPORT_GITHUB_ID || wrongIdAndPw, 'secret': _env.LOCAL_PASSPORT_GITHUB_SECRET || wrongIdAndPw}
config.passport.google = {'id' : _env.LOCAL_PASSPORT_GOOGLE_ID || wrongIdAndPw, 'secret': _env.LOCAL_PASSPORT_GOOGLE_SECRET || wrongIdAndPw}
config.passport.linkedin = {'id' : _env.LOCAL_PASSPORT_LINKEDIN_ID || wrongIdAndPw, 'secret': _env.LOCAL_PASSPORT_LINKEDIN_SECRET || wrongIdAndPw}

// cloudinary
config.cloudinary = {'name' : _env.CLOUDINARY_NAME, 'key' : _env.CLOUDINARY_KEY, 'secret' : _env.CLOUDINARY_SECRET }

// sequenceId
config.sequenceIdMap = {}
config.sequenceIdMap.post = 'post'
config.sequenceIdMap.answer = 'answer'

// mode별 설정
if (process.env.NODE_ENV == 'production') {
} else {
	config.isLocal = true;
	config.imgDir = config.staticDir + '/img'; // local
}

// exports
module.exports = config
