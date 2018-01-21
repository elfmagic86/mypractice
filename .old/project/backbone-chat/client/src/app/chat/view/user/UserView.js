

(function(define, Backbone, _) {

	define([ 'text!chat/view/template/user.html'
		    ,'common/util'
		    ,'chat/view/user/UserListView'
		    ,'chat/view/user/UserInfoView'
		    ], function (userTemplate, U, UserListView, UserInfoView) {

		var EL_IDS = { 
					   userContentArea : 'user-content-area'
					  ,userListBtn 	   : 'user-list-btn'
					  ,userInfoBtn 	   : 'user-info-btn'
					 }
		var UserView = {};

		UserView.template 		  = _.template(userTemplate);

		UserView.initialize = function () { //model : users
			// 1. new part , 2. render, 3.bind handler
			this.render();

	      	//
	      	this.$userListBtn.on('click', _.bind(this._showUserList, this))
	      	this.$userInfoBtn.on('click', _.bind(this._showUserInfo, this))

		}
		UserView.close      = function () {
			this.stopListening(this.model);
		}
	    UserView.render  = function () {
			this.$el.html(this.template({EL_IDS :EL_IDS})); 

			this.$userContentArea = U.findBy(EL_IDS.userContentArea, this.$el);
			this.$userListBtn     = U.findBy(EL_IDS.userListBtn, this.$el);
			this.$userInfoBtn = U.findBy(EL_IDS.userInfoBtn, this.$el);

			this._showUserList()
	    	return this;
	    }
	   	// 뷰 이벤트
	    UserView._showUserList = function (e) {
	    	var userListView = new UserListView({model: this.model})
	    	this.$userContentArea.html(userListView.el)
	    }
	    UserView._showUserInfo = function (e) {
	    	var currentUser  = this.model.find(function(user){ return user.get('me') })
	    	  , userInfoView = new UserInfoView({model: currentUser});
			this.$userContentArea.html(userInfoView.el);
	    }
		return Backbone.View.extend(UserView);

	})


})(define, Backbone, _)