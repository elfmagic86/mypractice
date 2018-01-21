

(function(define, Backbone, _) {

	define(['common/util'], function (U) {

		var userItemTpl = "<div  class='col-xs-12 thin-border %>'>"
						 +    "<%= name %>"
						 +"</div>"
		// //
		var UserItemView = {};

		UserItemView.template = _.template(userItemTpl);

		UserItemView.initialize = function (params) {
			// 1. new part , 2. render, 3.bind handler
			this._parentView = params.parentView
			this.render()

			this.listenTo(this.model, 'remove' , this._removeUserItem);
	      	this.listenTo(this.model, 'update' , this._updateUser);

			if(this.model.get('me')) return;
			else return this.$el.click(_.bind(this._onClick, this));
		}
		UserItemView.close = function () {
			this.stopListening(this.model);
		}
	    UserItemView.render  = function () {
	    	this.$el = $(this.template(this.model.toJSON()) )
	    	this.el  = this.$el[0];

	    	if(this.model.get('me')) {	this.$el.css("font-weight", "bold")	}
	    	if(this.model.get('selected')) {this.$el.css({ 'background-color': 'yellow'});}
	    	return this;
	    }
	    UserItemView._removeUserItem = function () {
	    	this._parentView.trigger('remove:user', this)
	    	this.stopListening(this.model);
	    	this.model.unset();
	    	this.$el.remove();
	    }
	    UserItemView._updateUser = function () {
	    	var $currentEl = this.$el;
	    	this.close()
	    	this.initialize({model:this.model, parentView: this._parentView})
	    	$currentEl.replaceWith(this.el);

	    }
	    // ----------- 뷰 이벤트
	    UserItemView._onClick = function () {
	    	// 구독자에게 알림.
	    	if(this.model.get('selected')) { //이미선택되었다면 취소
	    		this.unSelect()
	    	} else { //선택되지 않았다면 선택.
	    	   this.select()
	    	}
	    }

	    UserItemView.unSelect = function () {
	    	   this.$el.css({ 'background-color': ''});
	    	   this.model.set('selected', false)
	    }
	    UserItemView.select = function () {
	    	   this.$el.css({ 'background-color': 'yellow'});
	    	   this._parentView.trigger('select:user', this);
	    	   this.model.set('selected', true)
	    }

		return Backbone.View.extend(UserItemView);
	})


})(define, Backbone, _)