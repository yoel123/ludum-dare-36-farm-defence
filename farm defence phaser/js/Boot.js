var yengine = {};



yengine.Boot = function(game) 
{
	
};

yengine.Boot.prototype = {
    preload: function() {

        this.load.image('preloaderBar', 'images/loader_bar.png');
        this.load.image('titleimage', 'images/logo.png');
    },
    
    create: function() {
        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		if(window.innerWidth >600)
		{
			window.start_w = 500;
			window.start_h = window.innerHeight-100;
		}else{
			window.start_w = 270;

			window.start_h = window.innerHeight;	

		}
		this.scale.maxWidth = 	window.start_w;
		this.scale.maxHeight = 	window.start_h;
		
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		
		this.stage.forcePortrait = true;
		this.scale.updateLayout(true);
		this.input.addPointer();
		this.stage.backgroundColor = 'black';
		//this.stage.backgroundColor = '#4488AA';
        
        this.state.start('Preloader');
    }
}
