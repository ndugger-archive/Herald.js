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
			this.build();
			document.body.appendChild(this.notification);
		},
		build: function() {
			this.notification = document.createElement("div");
			if (typeof this.message === "object") {
				this.options = this.message;
			} else if (typeof this.type === "object") {
				this.options = this.type;
			};
			this.configure();
			this.notification.dataset.type = this.type;
			this.notification.classList.add("herald-notification");
			var message = document.createElement("div");
			message.textContent = this.message;
			message.classList.add("herald-message");
			this.notification.appendChild(message);
		},
		configure: function() {
			if (this.options) {
				for (var option in this.options) {
					switch (option) {
						case "style":
							for (var property in this.options[option]) {
								this.notification.style[property] = this.options[option][property];
							};
							break;
						default:
							if (this.hasOwnProperty(option)) {
								this[option] = this.options[option];
							} else if (Herald.api.hasOwnProperty(option)) {
								Herald.api[option].call(this, this.options[option]);
							};
							break;
					};
				};
			};
		}
	};
	window.Herald = Herald;
});