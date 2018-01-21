(function (define, _, $) {
	define([
			   'common/util'
			  ,'common/socket/chatSocket'
			  ,'chat/model/Chat'
			  ,'chat/view/ChatView'
			  ,'chat/view/room/RoomView'
		   ]
    ,function(
    		    U
    		   ,chatSocket
		   	   ,ChatModel
		   	   ,ChatView
		   	   ,RoomView
		   	 ){
		var appRouter = {}
		appRouter.routes = {
							  "":  "home"    //     ../
							 ,"/": "home"	//     ../#/
							 ,"room/:num": "room"	//     ../#/room/:num
						   }
		//

		//            		
		appRouter.initialize = function () {
		}
		
		appRouter.home = function () {
		// 사용법이 다르냐.. 모델은 자동 set이고. view는 model 이름일경우만. 자동할당..
			var chatModel     = this._newInstance('chatModel',   ChatModel)
			  , chatView      = this._newInstance('chatView' ,   ChatView , { model  : chatModel});
			var rooms 		  = chatModel.get('rooms') 
			  , roomView 	  = this._newInstance('roomView', RoomView, {model : rooms });
			
			chatSocket.push('init:home');

			this.trigger('render:center', roomView.el)
			this.trigger('render:bottom', chatView.el );

			chatView.trigger('resize:home');
			roomView.trigger('resize:home');
		}
		appRouter.room = function (roomNum) {
			var chatModel = this._newInstance('chatModel', ChatModel)
			  , chatView  = this._newInstance('chatView' , ChatView , { model  : chatModel});
			var rooms 	  = chatModel.get('rooms') 
			  , roomView  = this._newInstance('roomView', RoomView, {model : rooms });

			chatSocket.push('join:room', roomNum);

			this.trigger('render:center', roomView.el)
			this.trigger('render:bottom', chatView.el );

			chatView.trigger('resize:room');
			roomView.trigger('resize:room');
		}

		// 싱글톤인 _chatSocket에 모델이 자신의 함수를 핸들러로 전달하기에
		// 다른 곳으로 라우팅시 명시적으로 해제를 해줘야 메모리릭을 방지할수있음.
		// 나중에는 마리오네트의 Region을 생각해볼것. 
		var _cachedInstanceList = {} 
		appRouter._newInstance = function (key, Class, params) {
			if(U.notExist(Class)) return console.error('not exist Class', Class);

			var _cachedInstance = _cachedInstanceList[key];
			if(_cachedInstance) {//있다면. 해제작업. 
				if(U.notExist(_cachedInstance.close)) return console.error('instance of Class not exist close method to prevent zombie..');
				_cachedInstance.close();
			}
			// 재 배정 후 리턴.
			_cachedInstanceList[key] = new Class(params);
			return _cachedInstanceList[key];
		}
		//
		return Backbone.Router.extend(appRouter);
	});
})(define, _, $)
