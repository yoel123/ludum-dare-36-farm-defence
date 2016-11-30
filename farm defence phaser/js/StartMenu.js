yengine.StartMenu = function(game) {
    this.startBG;
    this.startPrompt;
	this.ding;
}

yengine.StartMenu.prototype = {
	
	create: function () {
		
		window.ygame.world.setBounds( 0, 0,window.start_w, window.start_h);//reset world bounds
		startBG = this.add.image(this.world.centerX/2, this.world.centerY/2, 'titleimage');
		startBG.inputEnabled = true;
		startBG.events.onInputDown.addOnce(this.startGame, this);
		
		startPrompt = this.add.bitmapText(this.world.centerX-155, this.world.centerY+180, 'eightbitwonder', 'Touch to Start!', 24);
		startPrompt.inputEnabled = true;
		startPrompt.events.onInputDown.addOnce(this.startGame, this);
		this.ding = this.add.audio('select_audio');
	},

	startGame: function (pointer) {
		this.state.start('Game');
		this.ding.play();
	}
};