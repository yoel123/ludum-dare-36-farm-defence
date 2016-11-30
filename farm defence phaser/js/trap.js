
 ////////  trap////////
var trap = function(x,y)
{
	grafic = "trap";
	yentity.call(this,x,y,0,grafic);
	this.type= "trap";
	this.trap_type= "spikes";
	this.stats = new charecter(1000,0,4);
	this.anchor_center = true;
};
trap.prototype =  yentity.prototype;
trap.prototype = 
{
	yinit:function()
	{
		if(this.did_init){return;}
	    
		if(this.trap_type == "spikes")
		{
			this.graf.frame = 0;
			this.stats.hp = 30;
		}
		if(this.trap_type == "fence")
		{
			this.graf.frame = 2;
		}
		if(this.trap_type == "turret")
		{
			this.graf.frame = 1;
			this.range = 320;
		}
		
		this.did_init = true;
	}, //end init
	update:function()
	{
		this.yinit();
		this.target();
		yplace.call(this);
		
		yentity_p.update.call(this);
	}, //end update
	shot:function(targ)
	{
		var b = new bullet(this.x+50,this.y+50);
		//set bullet target
		b.targ = targ;
		
		//rotate to targ
		//angle = yget_angle(this.x,this.y,targ.x,targ.y)  * 180 / Math.PI;
		//rotate towerds
	    y_entity_p.rotate_to_t.call(this,targ);
		
		

		this.fire_anim =true;//animate

		//set bullet demege
		b.dmg = this.stats.dmg;
		//who shot
		
		w =this.world;//.add(b);
		yadd(w,b)
	},//end shot
	take_dmg:function()
	{
		this.stats.hp -= dmg;

		if(this.stats.hp <= 0)
		{
			
			yremove(this.world,this);
			
		}
	},//end take_dmg
	target:function()
	{
		if(!this.active || this.trap_type != "turret"){return;}//if not active dont target
		
		//shoot timer
		shoot_timer =  this.stats.attack_timer;
		shoot_timer.update();
		
		//chack all enemis
		enmi = y_entity_p.get_by_type.call(this,"enemy");
		var enmi_list_len = enmi.length-1;
		
		//loop all enemis
		for(var i = 0; enmi_list_len>=i ; i++)
		{
			//current enemy
			e = enmi[i];
			
			//chack distanse between this and current enemy
			dist = y_entity_p.distanse.call(this,e.x,e.y);
			//if distance less the range fire weapon
				//ytrace(e)
			//ytrace(dist	)
			if(dist<=this.range && y_chack_timer(shoot_timer) && e.alive)
			{
				this.shot(e);
				//ytrace("shot");
			}
		}
	}//end target
};//end trap.prototype
trap_p = trap.prototype;
 //////// end trap////////
