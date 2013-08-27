import animate;
import ui.View;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import ui.SpriteView as SpriteView;
import src.soundcontroller as soundcontroller;
import device;

//var loppan_img = new Image({url: "resources/images/loppansprite.png"});

exports = Class(ui.View, function (supr) {
	var loppan_width = device.width/13;//40;
	var loppan_height = device.height/13; //22;
	var speed = 10;
	var _loppan;
	var _frame;
	var _direction;
	var _active;
	var _scale;
	
	this.init = function (opts) {
		
		opts = merge(opts, {
			x:0,
			y:0,
			width: device.width,
			height: device.height,
		});
		
		supr(this, 'init', [opts]);
		this._scale = opts.scale;
		this.build();
		
	};

	this.build = function () {
		this._frame=1;
		this._direction=0;
		this._active=1;
		this._loppan = new SpriteView({
			superview: this,
			id: 'prov',
			width: loppan_width,
			height: loppan_height,
			scale: this._scale,
			anchorX: loppan_width/2, //to set rotation point correct.
			anchorY: loppan_height/2,
			url: 'resources/images/loppan',
			frameRate: 10, //how fast to switch between the sprites...
			autoStart: true,

		});
		this._loppan.on('InputStart', bind(this, function (evt, pt) {
			console.log('hit loppan x: ' + pt.x + ' y: '+ pt.y);
			this._active=0;
			this._loppan.emit('loppan:hit',this._loppan);
		}));
		
		var i = setInterval(tick.bind(this), speed);
		
	};

	

});

	function tick() {
		this._frame++;
		if (this._frame % 4 == 0) {
			this._loppan.style.r += 0.025;
		}
		if (this._loppan.style.y < 10) {
			this._direction = 1;
		}
		if (this._loppan.style.y > device.height+1 && this._active == 1) {
			this._active=0;
			this._loppan.emit('loppan:missed', this._loppan);			
		}
		if (this._direction == 1) {
			this._loppan.style.y++;
		}
		else if (this._direction == 0 && this._active == 1) {
			this._loppan.style.y--;
		}
		
		
   	};
