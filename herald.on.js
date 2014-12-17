Herald.api.on = function(event) {
	var _this = this;
	this.notification.on(event[0], function(e) {
		event[1].call(_this, e);
	});
};