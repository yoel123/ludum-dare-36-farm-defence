
 ////////  yfarm////////
var yfarm = function(x,y,grafic)
{
	yentity.call(this,x,y,0,grafic);
	this.anchor_center = true;
	this.type= "yfarm";
	this.stats = new charecter(50,0,0);
};
yfarm.prototype =  yentity.prototype;
 yfarm.prototype = 
{
	yinit:function()
	{
		if(this.did_init){return;}
		
		 rnd = y_random(0,2);
		 this.graf.frame = rnd;
		
		this.did_init = true;
	}, //end init
	
	take_dmg:function()
	{
		this.stats.hp -=dmg;
		this.take_dmg_anim = true;
		if(this.stats.hp<=0)
		{
			//remove
			yremove(this.world,this);
		}
	},
	
	update:function()
	{
		this.yinit();
		yplace.call(this);
		yentity_p.update.call(this);
	} //end update
};//end yfarm.prototype
yfarm_p = yfarm.prototype;
 //////// end yfarm////////