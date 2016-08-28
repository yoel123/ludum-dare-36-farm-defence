
 ////////  trap////////
var trap = function(x,y,z)
{ 
 
	this.type = 'trap'; 
	m = "img/traps.png";

	y_entity.call(this,x,y,z,0,m); 
	
	  //animation spritmap
	this.test_anim = new y_animation(this.id,100,100,"forword");
	this.max_frames = 7-1;
	
	this.trap_type = "spikes";
	this.stats = new charecter(1000,3,6);
	this.hitbox_width=80;
	this.hitbox_height=80;
	this.collision_show = false;

} 
 
 var trap_p = trap.prototype; 
 
trap_p.init = function()
{

	if(!this.did_init)
	{ 
		if(this.trap_type == "spikes")
		{
			this.test_anim.go_to_frame(0);
			this.stats.hp = 30;
		}
		if(this.trap_type == "fence")
		{
			this.test_anim.go_to_frame(2);
		}
		if(this.trap_type == "turret")
		{
			this.test_anim.go_to_frame(1);
			this.range = 320;
		}
		this.did_init = true;  
		return;
	}//if did init escape 

}//end init 

trap_p.update = function()
{
	this.init();
	this.target();
	yplace.call(this);
	

}//end update 
trap_p.take_dmg = function(dmg)
{
	this.stats.hp -= dmg;

	if(this.stats.hp <= 0)
	{
		
		yremove(this,this);
		
	}
}
trap_p.shot = function(targ)
{

		
		var b = new bullet(this.x+50,this.y+50);
		//set bullet target
		b.targ = targ;
		
		//rotate to targ
		angle = yget_angle(this.x+this.width/2,this.y+this.height/2,targ.x,targ.y)  * 180 / Math.PI;
		//rotate towerds
	   	y_entity_p.rotate.call(this,angle);

		this.fire_anim =true;//animate

		//set bullet demege
		b.dmg = this.stats.dmg;
		//who shot
		this.world.add(b);
}
trap_p.target = function()
{
	if(!this.active || this.trap_type != "turret"){return;}//if not active dont target
		
	shoot_timer =  this.stats.attack_timer;
	shoot_timer.update();
	//chack all enemis
	enmi = y_entity_p.get_by_type.call(this,"enemy");
	var enmi_list_len = enmi.length-1;
	
	for(var i = 0; enmi_list_len>=i ; i++)
	{
		e = enmi[i];
		//chack distanse between this and current enemy
		dist = y_entity_p.distanse.call(this,e.x,e.y);
		//if distance less the range fire weapon
			//ytrace(e)
			ytrace(dist	)
		if(dist<this.range && y_chack_timer(shoot_timer) && e.alive)
		{
			this.shot(e);
		}
	}
	
}
 //////// end trap////////
