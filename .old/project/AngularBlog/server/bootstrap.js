/**
 * 
 */
var H 	   			= require('./app/common/helper')

var config 			= require('./app/config')
  , app    			= require('./app/app')
  , initDataCreater = require('./app/initDataCreater');

(function bootstrap() {

  console.log('::::: NODE_ENV  ' + process.env.NODE_ENV);

  //1.  *** server start
  app.start(function(err, data) {
    if(err) {
    }else {

      initDataCreater.create()
        .then(function dataFn () {
          console.log('::::: init data create success')	
          console.log('--------- start success ----------')
        })
        .catch(function(err) {
          console.error('----init data create fail-----')
          console.error(err)
        })

    }
  });
})()

