

(function(define) {
	//선로딩 하는데 혹시나해서.
	define(['Spinner'],function() {
		var Spinner = window.Spinner; //그냥 전역으로 사용.
		if(!Spinner) return console.error('not exist window.Spinner');


		var spinner = {};

		var cachedSingleSpinner = null;
		spinner.makeSingle = function () {
			if(!cachedSingleSpinner) {cachedSingleSpinner = __createSingleSpinner();};
			return cachedSingleSpinner;

			function __createSingleSpinner() {
				var opts = {
					  lines: 13, // The number of lines to draw
					  length: 20, // The length of each line
					  width: 10, // The line thickness
					  radius: 30, // The radius of the inner circle
					  corners: 1, // Corner roundness (0..1)
					  rotate: 0, // The rotation offset
					  direction: 1, // 1: clockwise, -1: counterclockwise
					  color: '#000', // #rgb or #rrggbb or array of colors
					  speed: 1, // Rounds per second
					  trail: 60, // Afterglow percentage
					  shadow: false, // Whether to render a shadow
					  hwaccel: false, // Whether to use hardware acceleration
					  className: 'spinner', // The CSS class to assign to the spinner
					  zIndex: 2e9, // The z-index (defaults to 2000000000)
					  top: '30%', // Top position relative to parent
					  left: '50%' // Left position relative to parent
				};
				var _spinner =  new Spinner(opts);
				return new SingleSpinner(_spinner);
			};
		}
		// SingleSpinner class
		function SingleSpinner(_spinner) {
			this._spinner = _spinner;
			this._spinEl  = null;
			this._spinCount = 0;
		}
		SingleSpinner.prototype.spin = function () {
			this._spinCount = ++this._spinCount;
			if(!this._spinEl) { this._spinEl = document.createElement('div');};
			if(this._spinCount < 0) { return; } // 안함.
			if(!this._spinEl.parentElement) {document.body.appendChild(this._spinEl); }

			this._spinner.spin(this._spinEl);
			// console.log(this._spinCount)
		}
		SingleSpinner.prototype.cancle = function () {
			this._spinCount = --this._spinCount;
			// console.log(this._spinCount)
			if(this._spinCount < 1 && this._spinEl) { 
				document.body.removeChild(this._spinEl)
				this._spinEl = null;
			};
		};
		/////////////////////////////////

		return spinner;
	})
})(define)