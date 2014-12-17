Herald.api.style = function(style) {
	for (var property in style) {
		this.notification.style[property] = style[property];
	};
};