yengine.Game = function(game) {
    this.totalBunnies;
    this.bunnyGroup;
	this.totalSpacerocks;
	this.spacerockgroup;
	this.burst;
	this.gameover;
	this.countdown;
	this.overmessage;
	this.secondsElapsed;
	
	this.timer;
	
	this.music;
	this.ouch;
	this.boom;
	this.ding;
	
	yworld.call(this,"world_name");
	
	//this.entitys;

};

yengine.Game.prototype = {
    
    create: function() 
	{
		window.ygame.world.setBounds(0, 0, 1000, 1333);
		if(!this.created){this.created = true}else{return;}
	
		
		this.timer = this.time.create(false);
		this.timer.loop(1000, this.updateSeconds, this);
       
		//sound
		
		//this.music = new ysound("game_audio");
		
		//this.music = this.add.audio('game_audio');
		//this.music.play('', 0, 0.3, true);   //marker, position, volume, loop
		this.ouch = this.add.audio('hurt_audio');
		this.boom = this.add.audio('explosion_audio');
		this.ding = this.add.audio('select_audio');

		
	    this.buildWorld();
		this.secondsElapsed = 0;
		
        

    },
    
    buildWorld: function() 
	{
		
	
		e2 = new yfarm(50,50,'farm');//.init();
		e3 = new yplayer(705,345,'player');//.init();
		
		yworld.prototype.yadd.call(this,e2);
		yworld.prototype.yadd.call(this,e3);
		yworld.prototype.yadd.call(this,new game_manger());
		//ytrace(this)
		//animation tests
		//e2.graf.animations.add('norm',[0,1]);
		//e2.graf.animations.play('norm', 15, true);
	//	e2.graf.frame = 1;
		//yentity_p.change_frame.call(e2,1)
	  // this.add.image(0, 0, 'sky');

    },
	


	

	quitGame: function() {
		//this.state.start('StartMenu');
		yworld_p.change_world.call(this,'StartMenu');
	}, 
    update: function() 
	{
	
		if(this.cache.isSoundDecoded('game_audio') && this.ready == false) {}
		
		
		
		yworld_p.yupdate.call(this);
	
	}
    
};
