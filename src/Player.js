import animate;
import ui.View;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import ui.SpriteView as SpriteView;
import src.soundcontroller as soundcontroller;
import device;

//var loppan_img = new Image({url: "resources/images/loppansprite.png"});

exports = Class(ui.View, function (supr) {
	var player_width = 40;
	var player_height = 22;
	var speed = 10;
	var _player;
	var _frame;
	
	this.init = function (opts) {
		
		opts = merge(opts, {
			x:0,
			y:0,
			width: device.width,
			height: device.height,
		});
		
		supr(this, 'init', [opts]);
		this.build();
		
	};

	this.build = function () {
		this._frame=1;
		this._player = new SpriteView({
			superview: this,
			id: 'prov',
			width: player_width,
			height: player_height,
			scale: this._scale,
			anchorX: player_width/2, //to set rotation point correct.
			anchorY: player_height/2,
			url: 'resources/images/loppan',
			frameRate: 10, //how fast to switch between the sprites...
			autoStart: true,

		});
		this._player.on('InputStart', bind(this, function (evt, pt) {
			console.log('hit loppan x: ' + pt.x + ' y: '+ pt.y);
			this._active=0;
			this._player.emit('loppan:hit',this._player);
		}));
		
	};

});


