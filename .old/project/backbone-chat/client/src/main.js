/***
 * 	main
 * 
 */
(function(require, $){

	//1. require 기본 패스 및 플러그인 경로 설정
	var libDir = '../../bower_components/' //baseUrl 상대적인.
	require.config({
				     'baseUrl' : "/client/src/app",
				     'paths'   : {
				     			   'text'    : libDir+'requirejs-text/text',
				     			   'Spinner' : libDir+'spinjs/spin',
				     			   'SockJS'  : libDir+'sockjs-client/dist/sockjs' 
				      			 }

				   });
	// 2. main run. // text플러그인 의존성때문에 로딩후사용해야함.
	require(['text'], function main() {
		// 1. 선 로딩 .. 속도 향상을 위해..
		require([
				 'common/spinner',
				 'common/util',
				 'App',
				 'chat/view/ChatView',
				 //
				 'text!view/template/layout.html',
				 'text!view/template/top.html'
				]);

		// 2.dom 준비되면 spinner
		require(['common/spinner'], function(spinner){
			$(document).ready(function() { spinner.makeSingle().spin(); });
		});
		require(['common/spinner', 'App', 'common/socket/chatSocket']
	   ,function (spinner, 	App, chatSocket) {
			// 모듈 로딩 완료 후 스피너 해제.
			// App run 
			$(document).ready(function() {
				//main.html과 같은 id
				var app = new App('chatApp')
				chatSocket.open('/connectChat') // open이 완료되야해.. promise반환. 그다음에 run호출.
				 		  .then(function () {
								app.run(); //라우팅에 push 작업이있기에. 연결완료되고 호출해야함.

								console.log('chatApp run...')
								spinner.makeSingle().cancle();
				 		  })
				
			})
		})	

	});
	
	
	
	
})(require, $)	
