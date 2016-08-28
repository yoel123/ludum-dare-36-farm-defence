
 ////////  bullet////////
var bullet = function(x,y,mesh)
{ 
 
	this.type = 'bullet'; 

	y_entity.call(this,x,y,99999,10,mesh); 
	
	this.dmg = 1;
	this.targ = {"x":0,"y":0};
	this.life = new y_timer(2);
	this.shooter = "ship";
	
	this.width = 11;
	this.height = 11;	
	this.hitbox_width = this.width ;
	this.hitbox_height = this.height;	
   yw_h(this,this.width,this.height);
   this.no_cam=true;


} 
 
 var bullet_p = bullet.prototype; 
 
 bullet_p.init = function()
{

 if(!this.did_init){ 
 this.did_init = true;  
 return;
}//if did init escape 

}//end init 

 bullet_p.update = function()
{
	this.init();
	this.move();
	this.life_chack();
	y_entity_p.update.call(this); 

}//end update

bullet_p.move = function()
{
	angle = yget_angle(this.x,this.y,this.targ.x,this.targ.y);
	//rotate towerds
	y_entity_p.rotate.call(this,angle);
	
	mx = this.speed * Math.cos(angle); 
	my = this.speed * Math.sin(angle) ; 
	distanse = y_entity_p.distanse.call(this,this.targ.x,this.targ.y)
	if(distanse <8){return;}
	y_entity_p.move_by.call(this,mx,my);
} 

bullet_p.life_chack = function()
{
	this.life.update();
	if(this.life.finished ){this.world.remove(this)}
}//end life

 //////// end bullet////////
