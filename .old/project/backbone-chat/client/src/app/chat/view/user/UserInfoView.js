

(function(define, Backbone, _) {

	define([ 'text!chat/view/template/userInfo.html'
		    ,'common/util'
		    ], function (userInfoTpl, U) {

		var EL_IDS = { 
						changeNameBtn : 'change-name'
					   ,inputOfName	  : 'input-of-name'
					 }

		var UserInfoView = {};

		UserInfoView.template   = _.template(userInfoTpl);

		UserInfoView.initialize = function () { //model : users
			// 1. new part , 2. render, 3.bind handler
			this.render();
			this.$changeNameBtn.on('click', _.bind(this.changeName, this))
		}
		UserInfoView.close      = function () {
			this.stopListening(this.model);
		}

	    UserInfoView.render  = function () {
	    	var modelData =  _.extend({EL_IDS :EL_IDS}, this.model.toJSON() );
			this.$el.html(this.template(modelData) ); 

			this.$changeNameBtn = U.findBy(EL_IDS.changeNameBtn , this.$el);
			this.$inputOfName = U.findBy(EL_IDS.inputOfName , this.$el);

	    	return this;
	    }
	   	// 뷰 이벤트
	   	UserInfoView.changeName = function (e) {
	   		var name = this.$inputOfName.val()
	   		if(_.isEmpty(name)) return alert('name is empty!');
	   		
	   		this.model.set('name', name)
	   		alert('change name')
	   	}
		return Backbone.View.extend(UserInfoView);
	})


})(define, Backbone, _)