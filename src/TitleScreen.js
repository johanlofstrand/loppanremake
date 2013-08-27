

import ui.View;
import ui.ImageView;
import device;

exports = Class(ui.ImageView, function (supr) {
	this.init = function (opts) {
		opts = merge(opts, {
			x:0,
			y:0,
			width: device.width,
			height: device.height,
			image: "resources/images/startbild630x400.png"
		});

		supr(this, 'init', [opts]);

		this.build();
	};

	this.build = function() {
		var startbutton = new ui.View({
			superview: this,
			x:0,
			y:0,
			width: device.width,
			height: device.height
		});

		startbutton.on('InputSelect', bind(this, function () {
			this.emit('titlescreen:start');
		}));
	};
});
