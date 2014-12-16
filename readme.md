Herald.js
===
Notification generation system with plugin support.

**Example Usage:**

	var error = new Herald("Error, something went wrong!", "error");
	error.tell();
	
Or you can customize the `Herald` with a third "options" argument:

	var error = new Herald("Error, something went wrong!", "error", {
		style: {
			fontWeight: "bold"
		}
	});
	error.tell();
	
Or you can put all arguments in an object, for example:

	var error = new Herald({
		message: "Error, something went wrong!",
		type: "error",
		options: {
			style: {
				fontWeight: "bold"
			}
		}
	});
	error.tell();
	
**Example Plugin:**

	Herald.api.on = function(event) {
		this.notification.addEventListener(event[0], event[1]);
	};
	
	var error = new Herald("Error, something went wrong!", {
		type: "error",
		on: ["click", function(e) {
			console.log(this);
		}]
	});
	error.tell();