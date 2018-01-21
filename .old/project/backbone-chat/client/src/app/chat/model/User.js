
(function(define, Backbone, _) {
	define([
		     'common/util'
		    ,'common/socket/chatSocket'
			], function(U, chatSocket) {

		var UserModel = {}
		UserModel.defaults = function () {
			return	 { 
					   selected  : false
					  ,name      : ''
					 }
		} 

		UserModel.initialize = function () {
			//client 이벤트를 핸들러
			this.on('change:selected',  this._notifySelectedUser);
			this.on('change:name',  this._notifyChangeName);
			
			this.listenTo(chatSocket, 'update:user', this._updateUser);
		}
		UserModel.close = function () {
			this.stopListening(chatSocket);
		}

		UserModel._notifySelectedUser = function () {
			chatSocket.push('select:user', this.get('id')) //
		}
		UserModel._notifyChangeName = function () {
			chatSocket.push('update:user', this.toJSON()) //
		}
		UserModel._updateUser = function (updatedUser) {
			if(this.get('id') != updatedUser.id) return;

			this.set('name', updatedUser.name, {silent:true});
			this.trigger('update')
		}
		return Backbone.Model.extend(UserModel);
	})

})(define, Backbone, _)