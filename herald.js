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
			if (typeof this.message === "object") {
				this.options = this.message;
			} else if (typeof this.type === "object") {
				this.options = this.type;
			};
			this.notification = document.createElement("div");
			this.setup();
			this.make.container.call(this)
				.appendChild(this.make.notification.call(this));
			if (this.options.seconds) {
				var _this = this;
				setTimeout(function() {
					_this.leave(_this);
				}, this.options.seconds * 1000);
			};
		},
		make: {
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
				this.notification.classList.add("herald-notification");
				this.notification.dataset.type = this.type;
				this.notification.appendChild(this.make.message.call(this));
				return this.notification;
			},
			message: function() {
				var message = document.createElement("div");
				message.classList.add("herald-message");
				message.textContent = this.message;
				return message;
			}
		},
		setup: function() {
			if (this.options) {
				for (var option in this.options) {
					if (this.hasOwnProperty(option)) {
						this[option] = this.options[option];
					} else if (Herald.api.hasOwnProperty(option)) {
						Herald.api[option].call(this, this.options[option]);
					};
				};
			};
		},
		leave: function(_this) {
			if (!this.notification.style.opacity) {
				this.notification.style.opacity = 1;
			};
			if (this.notification.style.opacity > 0) {
				setTimeout(function() {
					_this.notification.style.opacity -= 0.05;
					_this.leave(_this);
				}, 25);
			} else {
				this.notification.parentNode.removeChild(this.notification);
			};
		}
	};
	window.Herald = Herald;
});