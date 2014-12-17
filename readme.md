Herald.js
===
(Released under MIT License) **DEMO:** http://nickdugger.com/herald/

Notification generation system with plugin support.

	new Herald(message[, type[, options]]);
	new Herald(message[, options]);
	new Herald(options);

**Example Usage:**

	var error = new Herald("Error, something went wrong!", "error");
	error.tell();
	
Or you can customize the `Herald` with a third "options" argument:

	var error = new Herald("Error, something went wrong!", "error", {
		title: "Whoops!",
		time: 3000, // will fade out after 3 seconds
		style: { 
			fontWeight: "bold"
		}
	});
	error.tell();
	
*Preferred Method:* Or you can put all arguments in an object:

	var warning = new Herald({
		title: "Warning!",
		message: "You've been warned!",
		type: "warning",
		icon: "url_here",
		time: 4000
	});
	warning.tell();
	
**Example Plugin:**

	Herald.api.on = function(event) {
		var _this = this;
		this.notification.addEventListener(event[0], function(e) {
			event[1].call(_this, e);
		});
	};
	
	var error = new Herald("You've earned an award!", {
		type: "award",
		on: ["click", function() {
			this.dismiss()
			// do stuff here
		}]
	});
	error.tell();
	
Example Plugin CSS:

	.herald-notification[data-type="award"] {
		background:black;
		color:white;
	}
