
(function(define, Backbone, _) {

	define(['text!chat/view/template/chat.html',
		    'common/util',
		    'common/socket/chatSocket',
		    'chat/view/user/UserView'
		    ], function (chatTemplate, U, chatSocket, UserView) {


		var EL_IDS = {
						chatArea     : 'chat-area',

						inputMessage : 'chat-input',
						sendMessage  : 'chat-send-message',
						userInfo	 : 'chat-user-info',
						messageView	 : 'chat-message-view'
					 }
		//////////
		var ChatView = {}

		ChatView.template = _.template(chatTemplate);


  		//
  		//1. 부모가 되는 dom조각(tagName 생성.), 
  		//2. template 사용가능( 모델 바인딩) new View({model:model}) 이런형태로 전달된..
  		//3. events.. 템플릿에 이벤트 바인딩.
  		///////////// 암시적 단계로 템플릿이 완성됨./////////
  		//initialize:  모델의 change와 같은 암시적 이벤트 바인딩.
  		//			   여기서 이벤트는 "모델"에 바인딩 되어있기에 렌더하는 것이 템플릿에 영향을 주지않는다.
  		//             좀비대비..on과 listenTo가 있는데 listenTo는 해제가 자동이라고도하고?? unlisten??요런걸로 모두해제?된다고함.
  		ChatView.initialize =  function() {
  		  // 1. new partView , 2. render, 3.bind handler
  		  this._userView = new UserView( { model : this.model.get('users') });

	      this.render();

	      this.listenTo(chatSocket, 'new:message', _.bind(this._appendMessage, this));
	      this.listenTo(this.model, 'destroy', this.remove);

	      this.on('resize:home', this._resizeHome);
	      this.on('resize:room', this._resizeRoom);
	    };
	    ChatView.close   = function () {
	    	this.stopListening(chatSocket);
	    	this.stopListening(this.model);
	    	this._userView.close();
	    }
	    // Re-render the titles of the todo item.
	    // 모델 바인딩 된 html 스트링을 현재 $el에 붙임.
	    // render 후에는 접근할수있는 것들 만듬.
	    ChatView.render = function() {
			var modelData = _.extend({EL_IDS : EL_IDS}, this.model.toJSON() )
	    	this.$el.html(this.template(modelData)); // 모델과 바인딩.

	        this.$chatArea    = U.findBy(EL_IDS.chatArea   , this.$el);
	        this.$messageView = U.findBy(EL_IDS.messageView, this.$el);
	        this.$userInfo    = U.findBy(EL_IDS.userInfo   , this.$el);

	    	//part render
	    	this.$userInfo.html(this._userView.el);

		    return this;
    	};
	    ChatView._resizeHome = function () {
			this.$chatArea.css({height: '210px'});	    	
			this.$messageView.css({  height:'180px', 'max-height':'180px', overflow:'auto'});	    	
			this.$userInfo.css({  height:'210px', 'max-height':'210px', overflow:'auto'});	    	
	    }
	    ChatView._resizeRoom = function () {
	    	console.log('resize')
			this.$chatArea.css({height: '430px'});	    	
			this.$messageView.css({  height:'400px', 'max-height':'400px', overflow:'auto'});	    	
			this.$userInfo.css({  height:'430px', 'max-height':'430px', overflow:'auto'});	    	
	    }
    	
    	///////////// 뷰이벤트 /////////////////////////
		// 뷰 이벤트
		ChatView.events	  = {};
		ChatView.events["keypress "+ U.cssId(EL_IDS.inputMessage)] = "_onInputMessage";
		ChatView.events["click "+ U.cssId(EL_IDS.sendMessage)]    = "_onClickMessage";
		
	    ChatView._onInputMessage = function (e) {
	    	if(U.isKey('enter', e.charCode)) { 
	    		var message = e.target.value;
	    		if(_.isEmpty(message)) return;
	    		
	    		e.target.value = '';
	    		this._appendMessage(message, true)
	    		return this.model.set('message', message);
	    	};
		}
	    ChatView._onClickMessage = function (e) {
	    	var $input = $(U.cssId(EL_IDS.inputMessage))
	    	  , message = $input.val();
	    	if(_.isEmpty(message)) return;
	    	
	    	$input.val('');
	    	this._appendMessage(message, true)
	    	return this.model.set('message', message);
	    }
	    //크기제한할까?  그냥 텍스트 붙이는것은 어떤지?
	    ChatView._appendMessage = function (message, isMine) {
	    	var $messageView = U.findBy(EL_IDS.messageView, this.$el)
	    	var $messageEl = $('<div >').append(U.textForHtml(message));
	    	var $row = $('<div class="col-xs-12">').append($messageEl);
	    	
	    	if(isMine) { $messageEl.addClass('pull-right')}

	    	$messageView.append($row);
	    	$messageView.scrollTop(10000); //최하단
	    }



		//
		return Backbone.View.extend(ChatView)
	})


})(define, Backbone, _)