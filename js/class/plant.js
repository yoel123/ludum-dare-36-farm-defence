
 ////////  plant////////
var plant = function(x,y)
{ 
 
	this.type = 'plant'; 

	m = "img/farm_sprite.png";

	y_entity.call(this,x,y,77,0,m); 
	
	this.stats = new charecter(50,0,0);
	  //animation spritmap
	this.test_anim = new y_animation(this.id,100,100,"forword");
	this.max_frames = 7-1;
	this.hitbox_width=80;
	this.hitbox_height=80;
	
	this.collision_show = false;
	this.removed = false;

} 
 
 var plant_p = plant.prototype; 
 
 plant_p.init = function()
{

	 if(!this.did_init)
	 { 
		 //random apperence
		 rnd = y_random(0,2);
		 this.test_anim.go_to_frame(rnd);
		 //ytrace($("#"+this.id).html()+"#"+this.id);
		 this.did_init = true;  
		 return;
	 }//if did init escape 

}//end init 

 plant_p.update = function()
{
	this.init();
	yplace.call(this);
	


}//end update 

plant_p.take_dmg = function(dmg)
{
	
	this.stats.hp -= dmg;

	if(this.stats.hp <= 0)
	{
		this.removed = true;
		yremove(this,this);		
	}
}

 //////// end plant////////
