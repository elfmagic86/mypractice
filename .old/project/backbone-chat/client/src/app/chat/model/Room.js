
(function(define, Backbone, _) {
	define([
		     'common/util'
		    ,'common/socket/chatSocket'
			], function(U, chatSocket) {

		var RoomModel = {}
		
		RoomModel.idAttribute = "num";

		RoomModel.defaults = function () {
			return	 { 
						selected : false
					 }
		} 
		var BASE_ROOM_NUM = 0;
		RoomModel.initialize = function () {
			var hash    = window.location.hash
			  , roomNum = this.get('num')
			  , path    = '/room/' + roomNum;

			if(hash.length < 4 && roomNum == BASE_ROOM_NUM) return this.set('selected', true)
			if(hash.lastIndexOf(path) > 0) return this.set('selected', true)
		}
		RoomModel.close = function () {
			this.stopListening(chatSocket);
		}
		return Backbone.Model.extend(RoomModel);
	})

})(define, Backbone, _)