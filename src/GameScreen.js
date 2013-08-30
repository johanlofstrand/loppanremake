
import animate;
import ui.View;
import ui.ImageView as ImageView;
import ui.TextView;
import src.Loppan as Loppan;
import device;
import ui.widget.SliderView as SliderView;
import src.soundcontroller as soundcontroller;

var score = 0, interval = 8;
var sound = soundcontroller.getSound();
var ref;
var subadd = [];

exports = Class(ui.View, function (supr) {
	
	this.init = function (opts) {
		opts = merge(opts, {
			x:0,
			y:0,
			width: device.width,
			height: device.height
		});

		supr(this, 'init', [opts]);

		this.build();
		ref = this;
	};


	this.build = function () {
		this.on('app:start', play_game.bind(this));
		score=0;

		var bg = new ImageView({
			superview: this,
			image: "resources/images/background630x400.png",
			x:0,
			y:0,
			width: device.width,
			height: device.height,
			z: 0
		});

		this._exitView = new ui.View({
			superview: this,
			x: 0,
			y: device.height-device.height/10,
			width: device.width/10,
			height: device.height/14
		});	
		this._exitView.on('InputSelect', function (event, point) {
			 console.log('End game...');
			 ref.emit('gamescreen:end');
		});

		
		this._sliderView = new SliderView({
		  superview: this,
		  x: device.width/5+device.width/18,
		  y: device.height-device.height/10,
		  width: device.width/3,
		  height: device.height/14,
		  thumbSize: device.width/2,
		  active: false,
		  track: {
		    activeColor: '#FFFFFF' 
		  },
		  thumb: {
		    activeColor: '#FFFF00', //bg color...
		    inactiveColor: '#FFFF00',
		  }
		});
		
		this._scoreboard = new ui.TextView({
			superview: this,
			x: device.width/2-device.width/12+(device.width/20)/2, //last arg corresponds to size /2 ... 
			y: device.height-device.height/10,
			width: device.width/6,
			height: device.height/14,
			autoSize: false,
			size: device.width/20,
			text: '0',
			verticalAlign: 'middle',
			horizontalAlign: 'left',
			wrap: false,
			color: '#000000'
		});
	};
});

function play_game () {
	score=0;
	this.antal_loppor=0;

	this.max_antal_loppor=5;
	this.sliderValue = device.width/3;
	this.sliderValueStart = this.sliderValue;
	this.i = setInterval(tick.bind(this), interval);
}

function tick () {
    	
	if (Math.floor(Math.random()*1000) > 980 && this.antal_loppor < this.max_antal_loppor) {
		this.antal_loppor++;
		scale_of_loppa = Math.random() + 0.75;
		loppa = new Loppan({scale: scale_of_loppa});
		loppa._loppan.style.x = Math.floor(Math.random()*(device.width-device.width/5) + device.width/11);
		loppa._loppan.style.y = device.height-device.height/8;
		//console.log('loppa x put on: ' + loppa._loppan.style.x + ' y: ' + loppa._loppan.style.y);		
		
		this.addSubview(loppa._loppan); //TODO: Använd view pool istället...

		loppa._loppan.once('loppan:hit', bind(this, function(touched_loppa) {
			score++;
			if (this.sliderValue < this.sliderValueStart -15) {
				this.sliderValue = this.sliderValue+15;
			}
			sound.play('whack');
			updateStatus(this,touched_loppa);
			
		}));
		loppa._loppan.once('loppan:missed', bind(this, function(missed_loppa) {
			score--;
			updateStatus(this,missed_loppa);
		}));
	}
	
	function updateStatus(that,loppa) {
		that.removeSubview(loppa);
		delete loppa;
		that._scoreboard.setText(score.toString());
		that.antal_loppor--;
		
	}
	
	this.sliderValue = this.sliderValue-0.1;
	this._sliderView.setThumbSize(this.sliderValue);
	
	//game over... 
	if (this.sliderValue<=0) {
		this.emit('gamescreen:end');	
	}


	   	
}

