//plant actualy


 ////////  player////////
var player = function(x,y)
{ 
 
	this.type = 'player'; 
	m = "img/sword_dude.png";

	y_entity.call(this,x,y,99999,7,m); 
 
 //animation spritmap
	this.test_anim = new y_animation(this.id,50,50,"forword");
	this.max_frames = 7-1;
    this.test_anim.animations['attack'] = [1,2,1,2,0];
    this.test_anim.animations['take_dmg'] = [0,3,0,3,0];
 
 
	this.stats = new charecter(500,2,2.5);
	
	this.no_cam = true;
 
 

} 
 
 
 var player_p = player.prototype; 
 
 player_p.init = function()
{

	 if(!this.did_init)
	 { 
		 this.test_anim.go_to_frame(0);
		 this.hitbox_width = 100 ;
		this.hitbox_height = 100;	
		//yw_h(this,this.width,this.height);
		window.div_pos = {};
		var offset = $("#y_game").offset();
		$(document).mousemove(function(e){
			divPos = {
				X: e.pageX - offset.left,
				Y: e.pageY - offset.top
			};
		});
		 this.did_init = true;  
		 return;
	 
	 }//if did init escape 

}//end init 

 player_p.update = function()
{
	 this.init();
	 this.hit();
	 this.camera_control();
	 this.anim();
	 m = y_input2_p.mouse_cor;

	


}//end update 

player_p.hit = function()
{
	timer = this.stats.attack_timer;
	timer.update();
	
	if(y_input2_p.mouse_down && y_chack_timer(timer))
	{
		this.att_anim = true;
	
	}
	
}//end shoot

player_p.take_dmg = function(dmg)
{
	this.stats.hp -=dmg;
	this.take_dmg_anim = true;
	if(this.stats.hp<=0)
	{
		 this.gm = y_entity_p.get_by_type.call(this,"game_manger")[0];
		//game over
		this.gm.game_over = true;
	}
}//end take_dmg

player_p.camera_control = function()
{
		//turn to mouce
		var offset = $("#y_game").offset();
		angle = yget_angle(this.x,this.y,y_input2_p.mouse_cor.x-offset.left,y_input2_p.mouse_cor.y-offset.top);
		//rotate towerds
		y_entity_p.rotate.call(this,r2d(angle));

	
		//move left
		if(y_input2_p.key_down[y_key.A] ||y_input2_p.key_down[y_key.left] && this.world.cam.x>=-500)
		{
			y_entity_p.camera_move.call(this,"left","");
		}
		//move right
		if(y_input2_p.key_down[y_key.D] || y_input2_p.key_down[y_key.right] && this.world.cam.x<=500)
		{
			y_entity_p.camera_move.call(this,"right","");
		}
		//move up
		if(y_input2_p.key_down[y_key.W]  || y_input2_p.key_down[y_key.up] && this.world.cam.y<=500)
		{
			y_entity_p.camera_move.call(this,"up","");
		}
		//move down
		if(y_input2_p.key_down[y_key.S]|| y_input2_p.key_down[y_key.down] && this.world.cam.y>=-500)
		{
			y_entity_p.camera_move.call(this,"down","");
		}
	// y_entity_p.camera_move.call(this,"up","");
	//ytrace(this.world.cam);
}

player_p.anim = function(dmg)
{
	if(this.att_anim)
	{
	   this.test_anim.play("attack");//fire animation frame2
	}
	
	if(this.take_dmg_anim)
	{
		//take_dmg
		this.test_anim.play("take_dmg");//fire animation frame2
	}
	
	if(this.test_anim.finished)
	{
		this.att_anim = false;
		this.take_dmg_anim = false;
		this.test_anim.go_to_frame(0);
	}	
}//end anim
 //////// end player////////
