(function(Herald) {
	if (window.Herald) {
		console.error(new Error("Conflict! window.Herald already exists."));
	} else {
		Herald();
	};
})(function() {
	function Herald(message, type, options) {
		this.title = null;
		this.message = message;
		this.type = type || "default";
		this.options = options;
	};
	Herald.api = Herald.prototype = {
		_: {
			setup: function(Herald) {
				if (Herald.options) {
					for (var option in Herald.options) {
						if (Herald.hasOwnProperty(option)) {
							Herald[option] = Herald.options[option];
						} else if (window.Herald.api.hasOwnProperty(option)) {
							window.Herald.api[option].call(Herald, Herald.options[option]);
						};
					};
				};
			},
			make: {
				container: function(Herald) {
					if (!document.querySelector(".herald-container")) {
						var container = document.createElement("div");
						container.classList.add("herald-container");
						document.body.appendChild(container);
					} else {
						var container = document.querySelector(".herald-container");
					};
					return container;
				},
				notification: function(Herald) {
					Herald.notification.classList.add("herald-notification");
					Herald.notification.dataset.type = Herald.type;
					if (Herald.title) Herald.notification.appendChild(this.title(Herald));
					if (Herald.message) Herald.notification.appendChild(this.message(Herald));
					return Herald.notification;
				},
				title: function(Herald) {
					var title = document.createElement("div");
					title.classList.add("herald-title");
					title.textContent = Herald.title;
					return title;
				},
				message: function(Herald) {
					var message = document.createElement("div");
					message.classList.add("herald-message");
					message.textContent = Herald.message;
					return message;
				}
			}
		},
		tell: function() {
			var _this = this;
			if (typeof _this.message === "object") {
				_this.options = _this.message;
			} else if (typeof _this.type === "object") {
				_this.options = _this.type;
			};
			this.notification = document.createElement("div");
			_this._.setup(_this);
			_this._.make.container(_this)
				.appendChild(_this._.make.notification(_this));
			if (_this.options && _this.options.time) {
				setTimeout(function() {
					_this.dismiss(_this);
				}, _this.options.time);
			};
		},
		dismiss: function() {
			var _this = this;
			if (!_this.notification.style.opacity) {
				_this.notification.style.opacity = 1;
			};
			if (_this.notification.style.opacity > 0) {
				setTimeout(function() {
					_this.notification.style.opacity -= 0.05;
					_this.dismiss(_this);
				}, 15);
			} else if (_this.notification.parentNode) {
				_this._.make.container().removeChild(_this.notification);
			};
		},
		style: function(style) {
			for (var property in style) {
				this.notification.style[property] = style[property];
			};
		},
		icon: function(src) {
			var icon = new Image();
			icon.src = src;
			icon.classList.add("herald-icon");
			this.notification.appendChild(icon);
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