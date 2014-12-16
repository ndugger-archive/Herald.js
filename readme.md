Herald.js
===
Notification generation system with plugin support.

	new Herald(message[, type, options]);
	new Herald(message[, options]);
	new Herald(options);

**Example Usage:**

	var error = new Herald("Error, something went wrong!", "error");
	error.tell();
	
Or you can customize the `Herald` with a third "options" argument:

	var error = new Herald("Error, something went wrong!", "error", {
		seconds: 3, // will fade out after 3 seconds
		style: {
			fontWeight: "bold"
		}
	});
	error.tell();
	
Or you can put all arguments in an object, for example:

	var warning = new Herald({
		message: "You've been warned!",
		type: "warning",
		options: {
			style: {
				fontWeight: "bold"
			}
		}
	});
	warning.tell();
	
**Example Plugin:**

	Herald.api.on = function(event) {
		var _this = this;
		this.notification.addEventListener(event[0], function(e) {
			event[1].call(_this, e);
		});
	};
	
	var error = new Herald("Error, something went wrong!", {
		type: "error",
		on: ["click", function() {
			this.leave(this); // 'this.leave' is a preexisting method
		}]
	});
	error.tell();
