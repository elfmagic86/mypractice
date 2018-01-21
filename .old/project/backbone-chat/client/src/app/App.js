(function(define, Backbone, $, _) {
	// 라우터, app view, 소켓 연결 시작.
	define([
			'common/util'
		   ,'AppRouter'
		   ,'common/socket/chatSocket'

		   ,'text!view/template/layout.html'
		   ,'text!view/template/top.html'

		   ],
  function (
			 U,
			 AppRouter,
			 chatSocket,

			 layoutTpl, 
			 topTpl
			){
		//
		var EL_IDS    = {top : 'top', center : 'center', bottom : 'bottom'};
		 
		// view + 라우터 역할이라볼수있는데..
		var App = function App(appAreaId) {

			_.extend(this, Backbone.Events);
			this.$appArea = appAreaId ? $(U.cssId(appAreaId)) : $('body');
			this._renderLayout()
			
			this._router    = new AppRouter();
			
			 //router에...모델..참조를 넘겨줘..이건 app랑 생명주기같으니.. 
			this.listenTo(this._router, 'render:layout', this._renderLayout);
			this.listenTo(this._router, 'render:top',    this._onRenderTop);
			this.listenTo(this._router, 'render:center', this._onRenderCenter);
			this.listenTo(this._router, 'render:bottom', this._onRenderBottom);
			//log
			this.listenTo(this._router, 'route', function () {
				//모든 라우팅작업에서 스피너 시작. 종료시.종료.
				console.log('[route ] : ', arguments)
			})


		}
		App.prototype.run  = function () {
 
			// Backbone.emulateHTTP = true; //server에서 METHOD 지원안할경우. false
			// Backbone.emulateJSON = true; //server에서 application/json 지원안할경우. false
			Backbone.history.start()
			// 전체창.
		}
		// {center :, view : , model , }
		// App.prototype._onRenderTop = function () {
		// 	// U.replaceChild(EL_IDS.top, $(topTpl));
		// 	this.$top.html($(topTpl))
		// }
		App.prototype._onRenderCenter = function (el) {
			// U.replaceChild(EL_IDS.center, el)
			this.$center.html(el)
		}
		
		App.prototype._onRenderBottom = function (el) {
			// U.replaceChild(EL_IDS.bottom, el)
			this.$bottom.html(el)
		}

		var layoutTemplate = _.template(layoutTpl)
		App.prototype._renderLayout = function () {
			if(this.$appArea.length === 0) return console.error('not found area of app');

			this.$appArea.html( layoutTemplate({EL_IDS : EL_IDS}) )
			this.$center = U.findBy(EL_IDS.center   , this.$appArea);
			this.$bottom = U.findBy(EL_IDS.bottom   , this.$appArea);
			// this.$top    = U.findBy(EL_IDS.top      , this.$appArea);

			
		}

		return App;
	})


})(define, Backbone, $, _)