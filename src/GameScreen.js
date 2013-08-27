/*
 * The game screen is a singleton view that consists of
 * a scoreboard and a collection of molehills.
 */

import animate;
import ui.View;
import ui.ImageView as ImageView;
import ui.TextView;
import src.Loppan as Loppan;
import device;
import ui.widget.SliderView as SliderView;
import src.soundcontroller as soundcontroller;

var score = 0, interval = 10;
var sound = soundcontroller.getSound();

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
	};


	this.build = function () {
		this.on('app:start', play_game.bind(this));

		var bg = new ImageView({
			superview: this,
			image: "resources/images/background630x400.png",
			x:0,
			y:0,
			width: device.width,
			height: device.height,
			z: 0
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
		    activeColor: '#FFFFFF' //background color...
		    //inactiveColor: '#FFFFFF', //background color...
		  },
		  thumb: {
		    activeColor: '#FFFF00', //background color...
		    inactiveColor: '#FFFF00',
		  }
		});
		
		this._scoreboard = new ui.TextView({
			superview: this,
			x: device.width/2,
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

/*
 * Game play
 */

function play_game () {
	this.antal_loppor=0;
	this.max_antal_loppor=5;
	this.i = setInterval(tick.bind(this), interval);
	this.sliderValue = device.width/3;
	this.sliderValueStart = this.sliderValue;
}

function tick () {
    	
	if (Math.floor(Math.random()*1000) > 989 && this.antal_loppor <= this.max_antal_loppor) {
		this.antal_loppor++;
		scale_of_loppa = Math.random() + 0.75;
		loppa = new Loppan({scale: scale_of_loppa});
		loppa._loppan.style.x = Math.floor(Math.random()*(device.width-device.width/5) + device.width/11);
		loppa._loppan.style.y = device.height-device.height/8;
		//console.log('loppa x put on: ' + loppa._loppan.style.x + ' y: ' + loppa._loppan.style.y);		
	
		this.addSubview(loppa._loppan);
		loppa._loppan.once('loppan:hit', bind(this, function(touched_loppa) {
			score++;
			if (this.sliderValue < this.sliderValueStart -10) {
				this.sliderValue = this.sliderValue+10;
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
	
	/*if (this.sliderValue<350) {
		this._sliderView.updateOpts({thumb: {
		    activeColor: '#FF0000', //background color...
		    inactiveColor: '#FF0000'
		  }});
		
	}*/
	   	
}

