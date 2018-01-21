

(function(define, Backbone, _) {

	define([
		     'common/util'
		    ,'chat/view/user/UserItemView'
		    ], function (U, UserItemView) {

		var UserListView = {};

		UserListView.initialize = function () { //model : users
			// 1. new part , 2. render, 3.bind handler
			this.render();

			this.listenTo(this.model, 'add'   , this._appendUserItem);


	      	this.on('select:user', this._onSelectUser)
	      	this.on('remove:user', this._onRemoveUser)

		}
		UserListView.close      = function () {
			this.stopListening(this.model);
		}
	    UserListView.render  = function () {
			var self = this;
			this.model.forEach(function (user) {
				self._appendUserItem(user)
			})
	    	return this;
	    }

	    UserListView._appendUserItem = function (user) {
			var userItemView = new UserItemView({model: user, parentView: this});
			this.$el.append(userItemView.el);
			return userItemView;
	    }

	   	// 뷰 이벤트
		//userItem 클릭시 발생하는 이벤트.
	    var _selectedUserItem; //하나씩될테니뭐. 
	    UserListView._onSelectUser = function (userItemView) {
	    	// 같은경우는 useritemview에서 처리함.
	    	if(_selectedUserItem && _selectedUserItem !== userItemView) { _selectedUserItem.unSelect()}
	    	_selectedUserItem = userItemView;
	    }
	    // 이걸안하면.. 남아있는 경우가있어.
	    UserListView._onRemoveUser = function (userItemView) {
	    	if(_selectedUserItem && _selectedUserItem == userItemView) { _selectedUserItem = null}
	    }

		return Backbone.View.extend(UserListView);


	})


})(define, Backbone, _)