
(function(define, Backbone, _) {
	define([
		     'common/util'
		    ,'common/socket/chatSocket'
		    ,'chat/model/User'
		    , 'chat/model/Room'
			], function(U, chatSocket, User, Room) {

		// 그리고 뷰는 이벤트를 구독하고있으면되고.		
		var ChatModel = {}
		// private filed  내부적으로 attributes에 (set동작)할당되어.. toJSON()으로 값 복사 가능.
		// defaults말고 a.message = '' 이렇게 하면. attributes에 할당이 안되어..이벤트도 받지못해.

		// new ChatModel().. 이때 defaults를 지금처럼 함수가 아닌 객체로주면.. 
		// '같은 defaults 객체를 '참조로 가짐. 즉, 초기화제대로안됨.
		ChatModel.defaults = function () {
			return	 { 
					   message       : ''
					 , users   	     : new Backbone.Collection()
					 , rooms         : new Backbone.Collection()
					 }
		} 


		ChatModel.initialize = function () {
			//client 이벤트를 핸들러
			this.on('change:message', 		  this._sendMessage);

			//start chat(open socket)  서버이벤트를 핸들러.
			this.listenTo(chatSocket, 'new:room', this._onNewRoom);

			this.listenTo(chatSocket, 'new:user', this._onNewUser);
			this.listenTo(chatSocket, 'get:user', this._onGetUsers);
			this.listenTo(chatSocket, 'remove:user', this._onRemoveUser);
		}
		ChatModel.close = function () {
			this.stopListening(chatSocket);
		}

		// 클라이언트(페이지)에 대한 이벤트 핸들러. 
		ChatModel._sendMessage = function () {
			var data =  this.get('message')
			chatSocket.push('new:message', data);
		}

		ChatModel._onNewRoom = function (newRooms) { //서버에서 리스트보낼수도있어.서
			if(!_.isArray(newRooms)) newRooms = [newRooms];

			for(var i in newRooms) {
				var newRoom = newRooms[i]
				this.get('rooms').add(new Room(newRoom));
			}
		}

		//----- public method 
		// 서버 이벤트 핸들러.
		ChatModel._onNewUser = function (userData) {
			var users = this.get('users')
			  , rooms = this.get('rooms')
			  , user  = new User(userData)
              , room  = rooms.get(userData.roomNum);

			users.add(user);
			if(room) room.trigger('new:user', user);
		}
		ChatModel._onGetUsers = function (_users) {
			var users = this.get('users');
			for(var i in _users) {
				users.add(new User(_users[i]) );
			}
		}
		ChatModel._onRemoveUser = function (userData) {
			var users = this.get('users')
			  , rooms = this.get('rooms')
              , room  = rooms.get(userData.roomNum);

			// user.remove();
			users.remove(userData);
			if(room) room.trigger('remove:user', userData);
		}

		return Backbone.Model.extend(ChatModel);
	})

})(define, Backbone, _)