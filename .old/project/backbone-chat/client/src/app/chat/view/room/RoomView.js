

(function(define, Backbone, _) {

	define([ 
		    'text!chat/view/template/room.html'
		   ,'common/util'
		   ,'common/socket/chatSocket'
		   , 'chat/view/room/RoomItemView' 
		   ], function (roomTpl, U, chatSocket, RoomItemView) {

		var EL_IDS = {
					   roomArea 	: 'room-area'
					  ,roomListArea : 'room-list-area'
					  ,cmdArea      : 'cmd-area'
					  ,createRoom   : 'create-room'
					 };				 
		// //
		var RoomView = {};

		RoomView.template = _.template(roomTpl);

		RoomView.initialize = function () {
			// 1. new partView , 2. render, 3.bind handler
			this.render();
			
			this.on('resize:home', this._resizeHome)
			this.on('resize:room', this._resizeRoom)
			//
	      	this.listenTo(this.model, 'add', this._appendRoom);

		}
		RoomView.close      = function () {
			this.stopListening(this.model);
		}
	    RoomView.render  = function () {
	    	var self = this;
	    	// 레이아웃.만들고.
	    	this.$el.html(this.template({ 'EL_IDS' : EL_IDS })); 

			this.$roomArea     = U.findBy(EL_IDS.roomArea, this.$el); 
			this.$roomListArea = U.findBy(EL_IDS.roomListArea, this.$el); 
	    	// room item들...만들기.
    		this.model.forEach(function (room) {
				self._appendUser(room);
			})

	    	return this;
	    }

	    //
	    RoomView._appendRoom = function (room) {
	    	var roomItemView = new RoomItemView({model: room })
			this.$roomListArea.append(roomItemView.el);

			return roomItemView
	    }

	    //
	    RoomView._resizeRoom = function () {
	    	this.$roomArea.css({height: '100px', 'max-height':'100px', overflow:'auto'});	    	
	    }
	    RoomView._resizeHome = function () {
			this.$roomArea.css({height: '330px', 'max-height':'330px', overflow:'auto'});	    	
	    }
	    //
		RoomView.events	  = {};
		RoomView.events["click "+ U.cssId(EL_IDS.createRoom)]  = "_onCreateRoom";
		RoomView._onCreateRoom = function (e) {
			var roomName = prompt('input name of room')
			if(_.isEmpty(roomName)) return alert('empyt name');

			chatSocket.push('new:room', roomName);
	    }

		return Backbone.View.extend(RoomView);
	})


})(define, Backbone, _)