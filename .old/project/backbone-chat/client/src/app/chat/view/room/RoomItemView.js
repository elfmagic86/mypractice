
(function(define, Backbone, _) {

	define(['common/util'
			], function (U) {

		var roomItemTpl =
						   "<a href = '<%= isBase ? '/#/' : '/#/room/'+num %>'>"
						 + "<div class='col-xs-12 col-sm-4 btn btn-default thin-border <%= selected ? 'active' : '' %>' >"
						 +      "<%= name %>"
						 +	  "<br>"
						 +      "<div id='<%= EL_IDS.headCount %>'> <%= headCount %></div>"
						 +" </div>"
						 +  "</a>"
		var EL_IDS = { headCount : "head-count" }
		// //
		var RoomItemView = {};

		RoomItemView.template = _.template(roomItemTpl);

	    ///////// init, render, close
	    // 1. new partView , 2. render, 3.bind handler
		RoomItemView.initialize = function () {
			this.render()
			this.listenTo(this.model, 'new:user', this._increaseHeadCount);
			this.listenTo(this.model, 'remove:user', this._decreaseHeadCount);
		}
		RoomItemView.close      = function () {
			this.stopListening(this.model);
		}
		// 1. dom 2. this.$...
		RoomItemView.render  = function () {
	    	// 레이아웃.만들고.
	    	var roomData = this.model.toJSON()
	    	roomData.isBase = (roomData.num == 0) ? true : false
	    	roomData = _.extend({EL_IDS : EL_IDS}, roomData )
	    	this.$el.html(this.template( roomData) ); 
	    	this.$headCount = U.findBy(EL_IDS.headCount, this.$el);

	    	return this;
	    }
	    //
	    RoomItemView._decreaseHeadCount = function (userData) {

	    	var headCount = this.model.get('headCount')-1;

	    	this.model.set('headCount', headCount)
	    	this.$headCount.text(headCount)
	    }
	    RoomItemView._increaseHeadCount = function (user) {
	    	if(user.get('me')) return;

	    	var headCount = this.model.get('headCount')+ 1;

	    	this.model.set('headCount', headCount)
	    	this.$headCount.text(headCount)
	    }
	    
		return Backbone.View.extend(RoomItemView);
	})


})(define, Backbone, _)