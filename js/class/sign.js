
 ////////  sign////////
var sign = function(x,y,z,speed,mesh)
{ 
 
 this.type = 'sign'; 

 y_entity.call(this,x,y,z,speed,mesh); 
 
  
 this.no_cam = true;

} 
 
 var sign_p = sign.prototype; 
 
 sign_p.init = function()
{

	if(!this.did_init)
	{ 
		this.did_init = true;  
		sreturn;
	}//if did init escape 

}//end init 

 sign_p.update = function()
{
	this.init();
	y_entity_p.update.call(this); 

}//end update 

 //////// end sign////////
