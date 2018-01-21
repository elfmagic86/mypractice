

//1. 절대 위치로 require 사용하기 위해 제공.
global.__base = __dirname + '/app/';


// 2. server start
var App = require(__base + 'App.js');
var app =new App();

// run.
app.run()
