yengine.Game_over = function(game) {

	
	yworld.call(this,"game_over");
	
	
	//this.entitys;


};

yengine.Game_over.prototype = {
    
    create: function() 
	{
		if(!this.created){this.created = true}else{return;}
		this.build_world();
		ytrace(window.ygame);
	}, 
	
	build_world: function() 
	{
	
		txt = window.ygame.add.bitmapText(30, 10, 'eightbitwonder', 'game over');
		if(window.won == true)
		{
			txt = window.ygame.add.bitmapText(30, 50,'eightbitwonder', 'you won');
	
		}else
		{
		    txt = window.ygame.add.bitmapText(30, 50, 'eightbitwonder', 'you lost');	
		}
	},
	update: function() 
	{
		yworld_p.yupdate.call(this);
	}
}