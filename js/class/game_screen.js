
 ////////  game_screen////////
var game_screen = function(name)
{ 
	this.did_init = false;
	 this.type = 'game_screen'; 

	 y_entity.call(this,0,0,0,0,""); 
	 this.name = name;
	 this.html = "";

	 this.width = 300;
	 this.height = 300;
	 yw_h(this,this.width,this.height);

}; 


 var game_screen_p = game_screen.prototype; 
 
 game_screen_p.init = function()
{

 if(!this.did_init)
 {
	//click chack init
	y_entity_p.click_chack.call(this);
	//do elemnt id
	id="#"+this.id;
	$(id).hide();
	$(id).fadeIn(1000);
	
	//screen_html
	console.log(this.name)
	$(id).append(screens[this.name])
	
	this.click();
	this.did_init = true;
	return;
	 
 }//if did init escape 

 }//end init 

 game_screen_p.update = function()
{
  this.init();
  
  y_entity_p.update.call(this); 

 }//end update 
 
game_screen_p.click = function()
{

	//if(this.is_clicked){}else{return;}//exit if no click
	that = {
    that : this
	};
	
	$(document).on('click', '.start_game',that,function(e) {
		that = e.data.that;
       $("#"+that.id).fadeOut(1000,that.go_to_game);
    });
	
	$(document).on('click', '.game_over',that,function(e) {
		that = e.data.that;
       $("#"+that.id).fadeOut(1000,that.restart);
    });
	


}

game_screen_p.go_to_game = function()
{



	//change world to game world
	y_world_p.change_world.call(window.start_world,window.game_world);
		////////game objects add///////	
	//add player
    var p = new player(392,174);	
	window.game_world.add(p);
	//game menger create
	var gm = new game_manger(100,0,0,3);
	window.gm = gm;
	
	//add game manger
	window.game_world.add(gm);
	//reset game
	window.gm.reset();
	
}//end go_to_game

game_screen_p.game_over = function()
{
	//remove all game world entities 
	//go to start
	y_world_p.change_world.call(window.game_world,window.end_world);

}
game_screen_p.restart = function()
{
	//y_world_p.change_world.call(window.end_world,window.start_world);
	//reload page
	location.reload();
}


 //////// end game_screen////////
var screens=[];
screens['start_screen'] = "<img src='img/logo.png' class='logo'/>"+
"<a class='btn start_btn start_game' href='#'>start game</a>"+
"<a class='btn start_btn load_game' href='#'>load game</a>";

screens['end'] = "<h1 class='game_over'>game over<h1>";



var game_pused = "";
var end_level = "";

screens['end'] = "<h1>game over</h1>";
screens['victory'] = "<h1>you won</h1>";

