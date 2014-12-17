(function(Herald) {
	if (window.Herald) {
		console.error(new Error("Conflict! window.Herald already exists."));
	} else {
		Herald();
	};
})(function() {
	function Herald(message, type, options) {
		this.message = message;
		this.type = type || "default";
		this.options = options;
	};
	Herald.api = Herald.prototype = {
		tell: function() {
			var _this = this;
			// start tell
			if (typeof _this.message === "object") {
				_this.options = _this.message;
			} else if (typeof _this.type === "object") {
				_this.options = _this.type;
			};
			this.notification = document.createElement("div");
			// start configuration
			function _setup() {
				if (_this.options) {
					for (var option in _this.options) {
						if (_this.hasOwnProperty(option)) {
							_this[option] = _this.options[option];
						} else if (Herald.api.hasOwnProperty(option)) {
							Herald.api[option].call(_this, _this.options[option]);
						};
					};
				};
			};
			_setup();
			// end configuration
			// start element creation
			var _make = {
				container: function() {
					if (!document.querySelector(".herald-container")) {
						var container = document.createElement("div");
						container.classList.add("herald-container");
						document.body.appendChild(container);
					} else {
						var container = document.querySelector(".herald-container");
					};
					return container;
				},
				notification: function() {
					_this.notification.classList.add("herald-notification");
					_this.notification.dataset.type = _this.type;
					_this.notification.appendChild(_make.message.call(_this));
					return _this.notification;
				},
				message: function() {
					var message = document.createElement("div");
					message.classList.add("herald-message");
					message.textContent = _this.message;
					return message;
				}
			};
			_make.container().appendChild(_make.notification.call(_this));
			// end element creation
			// start fading out
			if (_this.options && _this.options.seconds) {
				function _leave(_this) {
					if (!_this.notification.style.opacity) {
						_this.notification.style.opacity = 1;
					};
					if (_this.notification.style.opacity > 0) {
						setTimeout(function() {
							_this.notification.style.opacity -= 0.05;
							_leave(_this);
						}, 25);
					} else if (_this.notification.parentNode) {
						_make.container().removeChild(_this.notification);
					};
				};
				setTimeout(function() {
					_leave(_this);
				}, _this.options.seconds * 1000);
			};
			// end fading out
			// end tell
		},
		style: function(style) {
			for (var property in style) {
				this.notification.style[property] = style[property];
			};
		},
		on: function(event) {
			var _this = this;
			this.notification.addEventListener(event[0], function(e) {
				event[1].call(_this, e);
			});
		}
	};
	window.Herald = Herald;
});