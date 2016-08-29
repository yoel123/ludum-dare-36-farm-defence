
 ////////  game_manger////////
var game_manger = function(x,y,z,speed,mesh)
{ 

	 this.type = 'game_manger'; 

	 y_entity.call(this,x,y,z,speed,mesh); 
	

	//objects (add on game_manger_p.reset )
	 this.player = "";
	 this.health_bar = "";
	 this.game_over = false;
	 this.buy_timer =  new y_timer(1);
	 this.wave_timer =  new y_timer(30);
	 this.wave_num = 1;
	 
	 this.credits = 40;
	 this.hp_level = 0;//enemy hp level
	 this.drag_obj = false;//is player currently placing somthing
	 
	 this.music = new y_sound("sound/ludom_dare.wav",.12,true);
} 

var game_manger_p = game_manger.prototype; 
 
 game_manger_p.init = function()
{

 if(!this.did_init)
 {
	  //init objects
	this.music.play();
	 this.did_init = true;
	 return;
 }//if did init escape 

}//end init 

 game_manger_p.update = function()
{
	this.init();
	this.ui();
	this.do_wave();
	this.do_game_over();
	
	y_entity_p.update.call(this); 

 }//end update 
 
game_manger_p.reset = function()
{
	 this.player = y_entity_p.get_by_type.call(this,"player")[0];
	 player =  this.player;
	//objects
	 this.health_bar = new y_bar(250,5,999999,player.stats.max_hp,player.stats.hp);
	 this.health_bar.init();
	this.world.add(new plant(500,40,2))
	 this.health_bar.change_color('#827878',"#FF0000");
	 $("#"+this.health_bar.id).append("<span class='ycredits'>"+this.credits+"</sapan>");
	 $("#"+this.health_bar.id).append("<span class='ywave'> wave"+this.wave_num+"</sapan>");
	 this.game_over = false;
}//end reset

game_manger_p.ui = function()
{
	//bars
	this.health_bar.update();

	//update bars
	this.health_bar.val =this.player.stats.hp;//make it equal to hp
	this.health_bar.update_filler();
	$(".ycredits").text("credits:"+this.credits);
	
	
	//buy stuff
	this.buy_timer.update();
	p = y_entity_p.get_by_type.call(this,"player")[0];//get player
	pl = new plant(p.x,p.y);
	tp = new trap(p.x,p.y);
	tp.trap_type = "spikes";
	tf = new trap(p.x,p.y);
	tf.trap_type = "fence";
	tt = new trap(p.x,p.y);
	tt.trap_type = "turret";
	this.buy_obj("DIGIT_1",40,pl);//(ykey,cost,obj)
	this.buy_obj("DIGIT_2",10,tp);//(ykey,cost,obj)
	this.buy_obj("DIGIT_3",20,tf);//(ykey,cost,obj)
	this.buy_obj("DIGIT_4",50,tt);//(ykey,cost,obj)
	
}//end ui

game_manger_p.do_wave = function()
{
	if(y_chack_timer(this.wave_timer))
	{
		//chose start pos randomly
		wave_start_r = [[450,-190],[940,350],[550,550],[-190,250]];
		start_p = Math.floor( y_random(0,3) );//start array pos
		wave_start_point = wave_start_r[start_p];
		
		max_for_wave = this.wave_num +1;//increase num of enemys
		
		//make enemy harder to kill
		if(max_for_wave>10){max_for_wave=10; this.hp_level++;}
		
		for(i=0; i<max_for_wave;i++)
		{
			rndx = y_random(wave_start_point[0],wave_start_point[0]+250)-100;
			rndy = y_random(wave_start_point[1],wave_start_point[1]+250)-100;
			//ytrace(rndx);
			speed = y_random(1,3);
			rnd_hp = y_random(2,4) +this.hp_level;
			e = new enemy(rndx,rndy,speed,rnd_hp);
		
			this.world.add(e);
		}
		
		this.wave_num++;
		$(".ywave").text(" wave:"+this.wave_num);
		pl =yget_by_type(this,"plant");
		if(pl){len = pl.length;}else{len = 0;}
		this.credits += len*10;
	}
}
game_manger_p.do_game_over = function()
{
	//no farms
	f= y_entity_p.get_by_type.call(this,"plant")[0];
	if(!f)
	{
		this.game_over = true;
	}
	
	if(this.game_over)
	{
		this.music.pause();
		$("#"+this.health_bar.id).remove();
		
		y_world_p.change_world.call(window.game_world,window.end_world);
	}
	//win
	if(this.credits >900)
	{
		this.music.pause();
		$("#"+this.health_bar.id).remove();
		y_world_p.change_world.call(window.game_world,window.win_world);
	}
}

game_manger_p.buy_obj = function(ykey,cost,obj)
	{
		if(y_input2_p.key_up[y_key[ykey]]  && this.credits >=cost && !this.drag_obj)
		{
			this.world.add(obj);
			this.credits -=cost;
			this.drag_obj=true;		
		}
		y_input2_p.key_up[y_key[ykey]] = false;
	}//end 



 //////// end game_manger////////
 
 
 //misc hellper funcs and behaviours
 function move_to2()
{
	if(!this.targ){return;}
		//move until impact
	angle = yget_angle(this.x,this.y,this.targ.x,this.targ.y);
	//rotate towerds
	y_entity_p.rotate.call(this,angle);
	
	mx = this.speed * Math.cos(angle); 
	my = this.speed * Math.sin(angle) ; 
	distanse = y_entity_p.distanse.call(this,this.targ.x,this.targ.y)

	y_entity_p.move_by.call(this,mx,my);
}//

yplace = function()
{
	if(!this.place_timer){this.place_timer =  new y_timer(0.1);}
	p = y_entity_p.colide.call(this,"plant");//cant place   ontop echother
	t = y_entity_p.colide.call(this,"trap");//cant place   ontop echother
	gm = y_entity_p.get_by_type.call(this,"game_manger")[0];
 	if(!this.active )
	{
		m=y_input2_p.mouse_cor;
		//follow mouse
		var offset = $("#y_game").offset();
		this.x = m.x-offset.left-30;
		this.y = m.y-offset.top-30;
		y_entity_p.move_by.call(this,0,0,0);
		
		gm.drag_obj = true;
	}
	//place
	if(y_input2_p.mouse_down && y_chack_timer(this.place_timer) && !t && !p ){this.active = true; gm.drag_obj=false;}
}//end place
//move_to2.call(this);//from gamemanger.js helper funcs
