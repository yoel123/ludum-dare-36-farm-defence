
 ////////  yplayer////////
var yplayer = function(x,y,grafic)
{
	yentity.call(this,x,y,5,grafic);
	this.type= "yplayer";
	this.anchor_center = true;
	this.stats = new charecter(500,2,1);
};
yplayer.prototype =  yentity.prototype;
 yplayer.prototype = 
{
	yinit:function()
	{
		if(this.did_init){return;}
		this.graf.animations.add('attack',[1,2,1,2,1,0]);
		this.graf.frame = 0;
			//when animation finish
		this.graf.events.onAnimationComplete.add(function(){
			  //reset
			  this.att_anim = false;
			  this.take_dmg_anim = false;
		},this);
		this.did_init = true;
	}, //end init
	update:function()
	{
		this.yinit();
		this.hit();
		this.camera_control();
		this.anim();
		//ytrace(this.x+" "+this.y)
		yentity_p.update.call(this);
	}, //end update
	hit:function()
	{
		timer = this.stats.attack_timer;
		timer.update();
		mouse_down =  window.ygame.input.mousePointer.isDown;
		//ytrace(mouse_down);
		if(mouse_down && y_chack_timer(timer))
		{
			this.att_anim = true;
		
		}
	},//end hit	
	
	camera_control:function()
	{
		//window.ygame.camera.x +=
		yentity_p.kyboard_control.call(this);
		yentity_p.camera_folow.call(this);
		yentity_p.rotate_to_mouce.call(this);
	},//end camera_control	
	take_dmg:function()
	{
		
	},//end take_dmg	
	take_dmg:function()
	{
		this.stats.hp -=dmg;
		this.take_dmg_anim = true;
		if(this.stats.hp<=0)
		{
			// this.gm = y_entity_p.get_by_type.call(this,"game_manger")[0];
			//game over
			//this.gm.game_over = true;
		}
	},
	anim:function()
	{
		if(this.att_anim)
		{
		  this.graf.animations.play('attack', 15,false);
		  
		}
		
		if(this.take_dmg_anim)
		{
			//take_dmg
			//this.test_anim.play("take_dmg");//fire animation frame2
		}
		
	
		//ytrace(this.att_anim+" anim");
		
	}//end anim
	
};//end yplayer.prototype
yplayer_p = yplayer.prototype;
 //////// end yplayer////////
