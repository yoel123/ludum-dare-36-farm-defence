
 ////////  enemy////////
var enemy = function(x,y,speed,hp)
{
	grafic = "enemy"
	yentity.call(this,x,y,0,grafic);
	this.speed = speed
	this.type= "enemy";
	this.stats = new charecter(hp,10,2);
	this.anchor_center = true;
	this.target_set = false;
	this.stop = false;
	this.alive = true;
	this.alpha = 1;
};
enemy.prototype =  yentity.prototype;
enemy.prototype = 
{
	yinit:function()
	{
		if(this.did_init){return;}
		this.graf.frame = 0;
		this.gm = y_entity_p.get_by_type.call(this,"game_manger")[0];
		this.did_init = true;
	}, //end init
		update:function()
	{
		this.yinit();
		this.move();
		this.die();
		yentity_p.update.call(this);
	}, //end update
	move:function()
	{
		if(!this.alive){return;}
		if(this.hit()){return;}//move until you hit world
		if(this.stop){return;}//move until you hit world
		if(!this.targ || this.targ.removed)
		{
			this.set_targ();
		}
		t = this.targ;
	
		s = -this.speed;
		//ytrace(s);
		move_to2.call(this);
	}, //end init
	hit:function()
	{
			dmg =this.stats.dmg;
			this.stop = false;
		
			p = y_entity_p.colide.call(this,"yplayer");
			if(p && y_chack_timer(this.stats.attack_timer))
			{
				p.take_dmg(dmg);
				
				return true;
			}
			
			//player attack
			if(p && p.att_anim)
			{
				this.take_dmg(p.stats.dmg);
			}
			
			b = y_entity_p.colide.call(this,"bullet");
			if(b)
			{
				
				this.take_dmg(b.dmg);
				//b.world.remove(b);
				yremove(this.world,b);
				
			}
			
			t = y_entity_p.colide.call(this,"trap");
			if(t && t.trap_type == "spikes" && t.active)
			{
				t.take_dmg(dmg);
				this.take_dmg(9999);
				
			}
			
			if(t && t.trap_type == "fence" && t.active)
			{
				t.take_dmg(dmg);
				this.stop = true;
			}
			
			pl = y_entity_p.colide.call(this,"yfarm");
			if(pl && pl.active && y_chack_timer(this.stats.attack_timer))
			{
				pl.take_dmg(dmg);
			}
	}, //end init
	set_targ:function()
	{
		p = y_entity_p.get_by_type.call(this,"yfarm");	
	//ytrace(p);		
		p_num = Math.floor(y_random(0,p.length-1));//random plant
		p = p[p_num];//set random plant
		if(!p || !p.active){this.target_set = false; return;}//only active can be targ
		this.targ = p;
		this.target_set = true;
	}, //end init
	
	take_dmg:function()
	{
		this.stats.hp -= dmg;
		ytrace(this.stats.hp);
		if(this.stats.hp <= 0 && this.alive)
		{
			this.alive = false;
			this.gm.credits += 2;
			this.graf.frame = 2;
		
			
		//	yremove(this,this);
			
		}
	}, //end init
	die:function()
	{
			if(!this.alive )
			{
				if(this.alpha<0){yremove(this.world,this);}
				
				y_entity_p.alpha.call(this,this.alpha);
				
				this.alpha -= 0.03;
			}
	} //end init
};//end enemy.prototype
enemy_p = enemy.prototype;
 //////// end enemy////////
