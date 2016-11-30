
 ////////  bullet////////
var bullet = function(x,y)
{
	yentity.call(this,x,y,0,"bullet");
	this.type= "bullet";
	this.dmg = 1;
	this.targ = {"x":0,"y":0};
	this.life = new y_timer(4);
	this.speed = 10;
	
};
bullet.prototype =  yentity.prototype;
 bullet.prototype = 
{
	yinit:function()
	{
		if(this.did_init){return;}
		this.graf.frame = 0;
		this.did_init = true;
	 
	}, //end init
	update:function()
	{
		this.yinit();
		this.move();
		this.life_chack();
		yentity_p.update.call(this);
	}, //end update
	
	move:function()
	{
		
		angle = yget_angle(this.x,this.y,this.targ.x,this.targ.y);
		//rotate towerds
		y_entity_p.rotate.call(this,angle);
		
		mx = this.speed * Math.cos(angle); 
		my = this.speed * Math.sin(angle) ; 
		distanse = y_entity_p.distanse.call(this,this.targ.x,this.targ.y)
		if(distanse <8){return;}
		y_entity_p.move_by.call(this,mx,my);
	}, //end move
	
	life_chack:function()
	{
		this.life.update();
		if(this.life.finished ){yremove(this.world,this);}
	} //end life_chack
};//end bullet.prototype
bullet_p = bullet.prototype;
 //////// end bullet////////
