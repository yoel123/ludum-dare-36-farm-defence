
 ////////  enemy////////
var enemy = function(x,y,speed,hp)
{ 

  this.type = 'enemy'; 
  m = "img/enmy.png";
  
 
 	
  y_entity.call(this,x,y,9999,speed,m);
  this.test_anim = new y_animation(this.id,30,30,"forword");
  this.test_anim.animations['move'] = [0,1,0,1,0];
  this.stats = new charecter(hp,10,2);
  
  this.target_set = false;
  
  this.volocity = {"x":0,"y":0};
  this.collision_show = false;
  
  this.stop = false;
  this.alive = true;
  this.alpha = 1;


} 
 
 enemy.prototype= new y_entity(); 
 
 var enemy_p = enemy.prototype; 
 
 enemy_p.init = function()
{

 if(!this.did_init)
 {
	 this.set_targ();
	 this.test_anim.go_to_frame(0);
	 this.gm = y_entity_p.get_by_type.call(this,"game_manger")[0];
	 this.did_init = true;
	return;
 }
}//end init 

 enemy_p.update = function()
{
	this.init();
	this.move();
	this.die();
	y_entity_p.update.call(this); 

 }//end update 
 
enemy_p.move = function()
{
	if(!this.alive){return;}
	if(this.hit()){return;}//move until you hit world
	if(this.stop){return;}//move until you hit world
	//this.test_anim.play("move");

	move_to2.call(this);//from gamemanger.js helper funcs
	if(!this.targ || this.targ.removed)
	{
		this.set_targ();
	}
}//end
enemy_p.hit = function()
{
	dmg =this.stats.dmg;
	this.stop = false;
	//hit player
	p = y_entity_p.colide.call(this,"player");
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
		b.world.remove(b);
		
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
	
	pl = y_entity_p.colide.call(this,"plant");
	if(pl && pl.active && y_chack_timer(this.stats.attack_timer))
	{
		pl.take_dmg(dmg);
	}
	
}//end hit
enemy_p.set_targ = function(p)
{
	
		p = y_entity_p.get_by_type.call(this,"plant");		
		p_num = Math.floor(y_random(0,p.length-1));//random plant
		p = p[p_num];//set random plant
		if(!p || !p.active){this.target_set = false; return;}//only active can be targ
		this.targ = p;
		this.target_set = true;
	
}
enemy_p.take_dmg = function(dmg)
{

	this.stats.hp -= dmg;

	if(this.stats.hp <= 0 && this.alive)
	{
		this.alive = false;
		this.gm.credits += 2;
		this.test_anim.go_to_frame(2);
	
		
	//	yremove(this,this);
		
	}

}
enemy_p.die = function()
{
	if(!this.alive )
	{
		if(this.alpha<0){this.world.remove(this);}
		y_entity_p.alpha.call(this,this.alpha);
		ytrace("in");
		this.alpha -= 0.003;
	}
}
  //enemy_p.update = function(){}//end



 //////// end enemy////////
