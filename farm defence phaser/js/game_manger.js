
////////  game_manger////////
var game_manger = function(x,y,grafic)
{
	yentity.call(this,x,y,grafic);
	this.type= "game_manger";
	
	 this.player = "";
	 this.health_bar = "";
	 this.game_over = false;
	 this.buy_timer =  new y_timer(1);
	 this.wave_timer =  new y_timer(10);
	 this.wave_num = 1;
	 
	 this.credits = 40;
	 this.hp_level = 0;//enemy hp level
	 this.drag_obj = false;//is player currently placing somthing
	
	 //ui
	 this.credits_txt = window.ygame.add.bitmapText(30, 30, 'eightbitwonder', 'credits ' + this.credits, 20);
	 this.hp_txt = window.ygame.add.bitmapText(30, 60, 'eightbitwonder', 'hp ' + 0, 20);
	 
	 this.credits_txt.fixedToCamera = true;	
	 this.hp_txt.fixedToCamera = true;	
	 
	 //this.music = new y_sound("sound/ludom_dare.wav",.12,true);
};
game_manger.prototype =  yentity.prototype;
game_manger.prototype = 
{
	yinit:function()
	{
		if(this.did_init){return;}
		this.player = y_entity_p.get_by_type.call(this,"yplayer")[0];
		//this.music.play();
		this.did_init = true;
	}, //end init
	update:function()
	{
		this.yinit();
		this.ui();
		this.buy();
		this.do_wave();
		this.do_game_over();
		yentity_p.update.call(this);
	}, //end update
	reset: function()
	{
		//get player
		//init health bars 
		//add farm
		
	}, //end reset
	ui:function()
	{
		//credits
		 this.credits_txt.setText('credits: ' + this.credits);
			
		if(!this.player){return}
		 this.hp_txt.setText('hp: ' + this.player.stats.hp);
		 
		//healthbar
	},//end ui
	buy:function()
	{
		this.buy_timer.update();
		//get player
		//cretae obgects
		pl = new yfarm(0,0,"farm");
		ts = new trap();//spikes_trap
		
		tf = new trap();//"fence"_trap
		tf.trap_type ="fence";
		
		tt = new trap();//turret_trap
		tt.trap_type ="turret";
		
		this.buy_obj("DIGIT_1",40,pl);//(ykey,cost,obj)
		this.buy_obj("DIGIT_2",10,ts);//(ykey,cost,obj)
		this.buy_obj("DIGIT_3",10,tf);//(ykey,cost,obj)
		this.buy_obj("DIGIT_4",10,tt);//(ykey,cost,obj)
		/*
		
		this.buy_obj("DIGIT_2",10,tp);//(ykey,cost,obj)
		this.buy_obj("DIGIT_3",20,tf);//(ykey,cost,obj)
		this.buy_obj("DIGIT_4",50,tt);//(ykey,cost,obj)
		*/
	},//end buy
	buy_obj:function(ykey,cost,obj)
	{
	
		
		if(y_input2_p.key_up[y_key[ykey]]  && this.credits >=cost && !this.drag_obj)
		{
			//window.current_world.add(obj);
			yadd(this.world,obj)
			this.credits -=cost;
			this.drag_obj=true;	
			//ytrace(ykey);
		}
		y_input2_p.key_up[y_key[ykey]] = false;
	},//end buy_obj
	
	do_wave:function()
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
				yadd(this.world,e);
				//this.world.add(e);
			}
			
			this.wave_num++;
				
			//$(".ywave").text(" wave:"+this.wave_num);
			pl =yget_by_type(this,"yfarm");
			if(pl){len = pl.length;}else{len = 0;}
			ytrace(pl);
			this.credits += len*10;
		}
	},//end do_wave	
	do_game_over:function()
	{
		
		//no farms
		f=yget_by_type(this,"yfarm")[0];
		//f=false;
		if(!f)
		{
			this.game_over = true;
			
		}
		if(this.game_over)
		{
			yworld_p.change_world.call(this.world,'game_over');
			window.won = false;
		}
		
		//win
		if(this.credits >900)
		{
		//	this.music.pause();
		//	$("#"+this.health_bar.id).remove();
		//	y_world_p.change_world.call(window.game_world,window.win_world);
			
			yworld_p.change_world.call(this.world,'game_over');
			window.won = true;
		}
	}//end do_game_over
	
};//end game_manger.prototype
game_manger_p = game_manger.prototype;
//////// end game_manger////////

yplace = function()
{
	if(!this.place_timer){this.place_timer =  new y_timer(0.1);}
	p = y_entity_p.collide.call(this,"plant");//cant place   ontop echother
	t = y_entity_p.collide.call(this,"trap");//cant place   ontop echother
	gm = yentity_p.get_by_type.call(this,"game_manger")[0];
	
 	if(!this.active )
	{
		m= window.ygame.input.activePointer;
		c = window.ygame.camera;
		this.x = m.x +c.x;
		this.y = m.y+c.y;
		y_entity_p.move_by.call(this,0,0,0);
		
		gm.drag_obj = true;
		
	}
	//place
	isdown =window.ygame.input.mousePointer.isDown;
	if(isdown  && y_chack_timer(this.place_timer) && !t && !p ){this.active = true; gm.drag_obj=false;}
}//end place

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
