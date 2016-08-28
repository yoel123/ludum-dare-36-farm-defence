
function main()
{
	//worlds
	window.start_world = new y_world("y_game");
	window.game_world = new y_world("y_game");
	window.pause_world = new y_world("y_game");
	window.end_world = new y_world("y_game");
	window.win_world = new y_world("y_game");
	
	

	//init engine
	yoel_engine_p.current_world = window.start_world;
	yoel_engine_p.init();	
	
	//game screens

	start_screen = new game_screen("start_screen");
	

	
	end_screen = new game_screen("end");
	win_screen = new game_screen("victory");
		
	//add screens to worlds//////////
	window.start_world.add(start_screen);
	


	window.end_world.add(end_screen);
	
	window.win_world.add(win_screen);
	


	
	//end world and game_world not active at the start
	window.end_world.not_active();
	window.game_world.not_active();
	window.pause_world.not_active();
}//end main


