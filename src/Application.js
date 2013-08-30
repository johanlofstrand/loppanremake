//sdk imports
import device;
import ui.StackView as StackView;
//user imports
import src.TitleScreen as TitleScreen;
import src.GameScreen as GameScreen;
import src.soundcontroller as soundcontroller;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		var titlescreen = new TitleScreen(),
			gamescreen = new GameScreen();


		this.view.style.backgroundColor = '#30B040';

		//Add a new StackView to the root of the scene graph
		var rootView = new StackView({
			superview: this,
			x:0,
			y:0,
			width: device.width,
			height: device.height,
			clip: true,
			backgroundColor: '#37B34A'
		});

		rootView.push(titlescreen);

		var sound = soundcontroller.getSound();

		titlescreen.on('titlescreen:start', function () {
			sound.play('levelmusic');
			rootView.push(gamescreen);
			gamescreen.emit('app:start');
		});

		gamescreen.on('gamescreen:end', function () {
			sound.stop('levelmusic');
			rootView.popAll();
			
		});
	};

	this.launchUI = function () {};
});
