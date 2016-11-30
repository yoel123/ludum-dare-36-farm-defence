
/////////////yengine/////////////
var ytrace= function(bla){return console.log(bla);}
///////////yworld//////////////////
yworld = function(name)
{
	this.entitys = [];
	this.entitys_count = 0;
	this.name

};



yworld.prototype = 
{
	yadd: function(e) 
	{
		this.entitys[this.entitys.length] = e;
		//e.init();
		yentity_p.init.call(e);
		e.world = this;
		this.entitys_count++;
		e.ecount = this.entitys_count;
		
		
	},
	
	yremove: function(e) 
	{
		if(e.remove){e.remove();}
	    e.graf.kill();
		index = this.entitys.indexOf(e);
		this.entitys.splice(index, 1);
		//delete this.entitys[e.ecount-1];
	    //this.entitys[e.ecount-1] = "none";
		this.entitys_count--;
	},
	
	yupdate: function() 
	{
		//for(var i = 0, len =this.entitys.length;len > i; i++ )
		for (var i in this.entitys) 
		{
			e= this.entitys[i];
			if(e && e !="none")
			{
				//ytrace(this.entitys[i].graf.visible )
				//ytrace(this.entitys)
				e.update()
			}
		}
		
		//chack if world changed and return world data
		if(window.worlds[this.name])
		{
			//ytrace(this.entitys_count)
			
			//loop all entitis
			for(var i = 0, len =this.entitys.length;len > i; i++ )
			{
				if(this.entitys[i])
				{
					//re init it
					yentity_p.init.call(this.entitys[i]);
					this.entitys[i].did_init = false;
				}
			}
			//this.entitys =  window.worlds[this.name].entitys; 
			//this.entitys_count =  window.worlds[this.name].entitys_count;
			//ytrace(this.entitys_count)	
			window.worlds[this.name] = false;
		}
		
	},
	
	set_bounds: function(x,y,w,h) 
	{
		window.ygame.world.setBounds(x,y,w,h);
	},
	
	get_cam: function()
	{
		x = window.ygame.camera.x;
		y = window.ygame.camera.y;
		
		return {x:x,y:y};
	},
	
	change_world: function(state)
	{
		//save this world data
		window.worlds[this.name] = this;
		window.current_world = this;
		
		//change state
		window.ygame.state.start(state);
	
	} //end change_world
};

yworld_p = yworld.prototype;

///////////end yworld//////////////////

///////////yentity//////////////////
yentity = function(x,y,s,grafic)
{
	
	this.type = "entity";
	this.speed = s;
	
	this.grafic = grafic;
	this.grafic_type = "sprite";
	this.x = x;
	this.y = y;
	this.anchor_center = false;
	this.frame = null;
	this.physics = true;
	this.show_hitbox = true;


};


yentity.prototype = 
{
	init:function()
	{
		if(this.grafic_type =="img")
		{
			this.graf = window.ygame.add.image(this.x, this.y, this.grafic);
			this.physics = false;
		}
		if(this.grafic_type =="sprite")
		{
			this.graf = window.ygame.add.sprite(this.x, this.y, this.grafic,this.frame);
		}
		if(this.anchor_center)
		{
				this.graf.anchor.setTo(0.5, 0.5);
		}
		if(this.physics && this.grafic_type !="img")
		{
			window.ygame.physics.arcade.enable(this.graf, Phaser.Physics.ARCADE);
			this.graf.body.enable = true;
		}
		//this.move_by(60,0,true);
		
		

	},
	
	update:function()
	{

		
		this.isclicked = false;
	}, //end update
	remove:function()
	{
		this.graf.destroy();
	}, //end remove
	
	collide:function(type)
	{
		if(!this.physics){return;}
		//entity array from current world
		var entity_list = yentity_p.get_by_type.call(this,type);
	
		//length of the array
		var entity_list_len = entity_list.length-1;
		
		//show hitbox
		if(this.show_hitbox){yentity_p.hit_box.call(this);}
		
		//for(var i = 0; entity_list_len>=i ; i++)
		for (var i  in entity_list) 
		{
			//if(entity_list[i] == "none"){i++;}
			e = entity_list[i];
	
			if( window.ygame.physics.arcade.overlap(this.graf, e.graf) && e!=this)
			{
				//ytrace("hit");
				return e;
			}
		}
		
		return false;
	}, //end collide
	colide:function(type)
	{
		return yentity_p.collide.call(this,type);
	},
	
	hit_box:function()
	{


		//console.log(this.graf.body);
		//window.ygame.debug.body(this.graf)

	 
  
  //  testRect.fill();
	}, //end hit_box
	scale:function(w,h)
	{
		this.graf.scale.setTo(w,h);
	},
	hit_box_size:function(w,h,ox,oy)
	{
		 this.graf.body.setSize(w,h,ox,oy);
	}, //end hit_box_size
	
	get_by_type:function(type)
	{
		//entity array from current world
		var entity_list = this.world.entitys;
		
		//length of the array
		var entity_list_len = entity_list.length-1;
		
		var entity_catch = [];
		
		//for(var i = 0; entity_list_len>=i ; i++)
		for (var i in entity_list) 
		{
			//ytrace("test");
			//if(entity_list[i] == "none"){i++;}
			
			var entity_type =entity_list[i].type;
			
			if(type == entity_type)
			{ 
				entity_catch.push(entity_list[i]);
			}
		}
		return entity_catch;
	},//end get_by_type
	
	move_by:function(x,y,velocity)
	{
		if(this.physics && velocity)
		{
			this.graf.body.velocity.x = x;
			this.graf.body.velocity.y = y;
			this.x +=this.graf.x;
			this.y +=this.graf.y;
			return;
		}
		else
		{
			this.x +=x;
			this.y +=y;
			
		}
		
		  this.graf.x = this.x;
		  this.graf.y = this.y;
		
	}, //end move_by
	clicked:function()
	{
		this.graf.inputEnabled = true;
		f = function(){yentity_p.was_cliked.call(this)}
		this.graf.events.onInputDown.add(f, this);
	}, //end clicked
	was_cliked:function()
	{
		this.isclicked = true;
		//console.log(this);
	}, //end  was_cliked
	mouse_down:function()
	{
		
		this.graf.inputEnabled = true;
		d = function(){this.is_mouse_down = true};
		u = function(){this.is_mouse_down = false};
		this.graf.events.onInputDown.add(d, this);
		this.graf.events.onInputUp.add(u, this);
		
	},
	camera_folow:function()
	{
		
		 window.ygame.camera.follow(this.graf ,Phaser.Camera.STYLE_TOPDOWN);
	},
	
	rotate:function(a,physics)
	{
		if(this.physics && physics)
		{
			this.graf.body.angularVelocity  = a;
			return;
		}
		this.graf.angle = a;
	},
	rotate_to_mouce:function()
	{
		c = window.ygame.camera;
		 var targetAngle = window.ygame.math.angleBetween(this.graf.x-c.x, this.graf.y-c.y,window.ygame.input.activePointer.x, window.ygame.input.activePointer.y);   
		 this.graf.rotation = targetAngle;
	},
	rotate_to:function(x,y)
	{
		
		 var targetAngle = window.ygame.math.angleBetween(this.graf.x,this.graf.y,x,y)* 180 / Math.PI;   
		 this.graf.angle = targetAngle;
	},
	rotate_to_t:function(t)
	{
		
		 var targetAngle = window.ygame.math.angleBetween(this.graf.x,this.graf.y,t.x,t.y)* 180 / Math.PI;   
		// ytrace(targetAngle)
		 this.graf.angle = targetAngle ;
	},
	
	alpha:function(a)
	{
		this.graf.alpha = a; 
	},
	
	kyboard_control:function()
	{
		
		upKey = window.ygame.input.keyboard.addKey(Phaser.Keyboard.UP);
		downKey = window.ygame.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		leftKey = window.ygame.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightKey = window.ygame.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		
		w = window.ygame.input.keyboard.addKey(Phaser.Keyboard.W);
		a = window.ygame.input.keyboard.addKey(Phaser.Keyboard.A);
		s = window.ygame.input.keyboard.addKey(Phaser.Keyboard.S);
		d = window.ygame.input.keyboard.addKey(Phaser.Keyboard.D);
		
		if (upKey.isDown || w.isDown)
		{
			yentity_p.move_by.call(this,0,-this.speed);
		}
		else if (downKey.isDown || s.isDown)
		{
			yentity_p.move_by.call(this,0,this.speed);
		}

		if (leftKey.isDown || a.isDown)
		{
			yentity_p.move_by.call(this,-this.speed,0);
		}
		else if (rightKey.isDown || d.isDown)
		{
			yentity_p.move_by.call(this,this.speed,0);
		
		}
	},//end kyboard_control
	folow_mouce:function(xp,yp)
	{
		xp = xp||0;
		yp = yp||0;
		this.graf.x = window.ygame.input.activePointer.x+xp;
		this.graf.y = window.ygame.input.activePointer.y+yp;
	},
	change_frame:function(f)
	{
		//ytrace(this);
		this.graf.frame = f;
	}, //end change_frame
	distanse:function(x,y)
	{
		dx = this.x-x;
		dy = this.y-y;
		
		return Math.sqrt(dx * dx + dy * dy);
	}//distanse

};//end yentity

yentity_p = yentity.prototype;
y_entity_p = yentity.prototype;

///////////end yentity//////////////////


///////////test yentity//////////////////

yentity_tst = function(x,y,grafic)
{
	yentity.call(this,x,y,grafic);
	//this.type= "yentity_tst";
};


yentity_tst.prototype =  yentity.prototype;
yentity_tst.prototype = 
{
	yinit:function()
	{
		if(this.did_init){return;}
		yentity_p.clicked.call(this);
		yentity_p.mouse_down.call(this);
		this.did_init = true;
	},
	update:function()
	{
		this.yinit();
		if(this.isclicked){ytrace("clicked")}
		if(this.is_mouse_down){ytrace("is_mouse_down")}
		e = yentity_p.folow_mouce.call(this)
		e = yentity_p.collide.call(this,"entity")
		if(e){ytrace("hit");}
		
		//yentity_p.rotate_to.call(this,10,10);
		yentity_p.kyboard_control.call(this);
		yentity_p.update.call(this);
	}
};

///////////end test yentity//////////////////




 ////////  ytestone////////
var ytestone = function(x,y,grafic)
{
	yentity.call(this,x,y,grafic);
	this.type= "ytestone";
};
ytestone.prototype =  yentity.prototype;
 ytestone.prototype = 
{
yinit:function()
{
	if(this.did_init){return;}
 this.did_init = true;
}, //end init
	update:function()
{
	this.yinit();
	yentity_p.update.call(this);
} //end update
};//end ytestone.prototype
ytestone_p = ytestone.prototype;
 //////// end ytestone////////




////////////////ysound////////////
ysound = function(name)
{
	this.sound = window.ygame.add.audio(name);
	this.marker = '';
	this.pos = 0;
	this.volume = 0.3;
	this.loop = false
	
}

ysound.prototype = 
{
	play:function()
	{
		t = this;
		this.sound.play(t.marker, t.pos, t.volume, t.loop);   //marker, position, volume, loop
	},
	stop:function()
	{
		this.sound.stop();
	}
};

////////////////end ysound////////////

////////////timer class/////////////

var y_timer = function(duration)
{
	this.duration = duration *60;
	this.counter = 0;
	this.finished = false;
};

y_timer.prototype.update = function()
{
	this.counter++;
	if(this.counter >= this.duration){this.finished = true; }
};

y_timer.prototype.reset = function()
{
	this.counter = 0;
	this.finished = false;	
}

y_timer.prototype.cduration = function(d)
{
	this.duration = d *60;
}

function y_chack_timer(timer)
{
	
	timer.update();
	if(timer.finished)
	{
		timer.reset();
		return true;
	}
}
////////////end timer class/////////////

function drag_world()
{
	//  window.ygame.world.setBounds(0, 0, 2444, 333);
    if (window.ygame.input.activePointer.isDown) {
		if (window.ygame.origDragPoint) {
			// move the camera by the amount the mouse has moved since last update
			window.ygame.camera.x += window.ygame.origDragPoint.x - window.ygame.input.activePointer.position.x;
			window.ygame.camera.y += window.ygame.origDragPoint.y - window.ygame.input.activePointer.position.y;
		}
		// set new drag origin to current position
		window.ygame.origDragPoint = window.ygame.input.activePointer.position.clone();
	}
	else {
		window.ygame.origDragPoint = null;
	}
}

///////input////////
var y_input2 = function ()
{
	
}
y_input2_p = y_input2.prototype;

y_input2_p.key_down =  [];
y_input2_p.key_up =  [];

//keydown
window.addEventListener("keydown", function(event)
{
	event.preventDefault();
	y_input2.prototype.key_down[event.keyCode] = true;
	y_input2.prototype.key_up[event.keyCode] = false;

});

//keyup
window.addEventListener("keyup", function(event)
{
	y_input2.prototype.key_down[event.keyCode] = false;
	y_input2.prototype.key_up[event.keyCode] = true;
		//ytrace(event.keyCode);

});

y_key =  
{

 up: 38,
 down:40,
 left:37,
 right:39,
 
 ENTER:13,
 CONTROL:17,
 SPACE:32,
 SHIFT:16,

 CAPS_LOCK:20,
 DELETE:46,
 END:35,
 ESCAPE:27,
 HOME:36,
 INSERT:45,
 TAB:9,
 PAGE_DOWN:34,
 PAGE_UP:33,
 LEFT_SQUARE_BRACKET:219,
 RIGHT_SQUARE_BRACKET:221,
 
 A:65,
 B:66,
 C:67,
 D:68,
 E:69,
 F:70,
 G:71,
 H:72,
 I:73,
 J:74,
 K:75,
 L:76,
 M:77,
 N:78,
 O:79,
 P:80,
 Q:81,
 R:82,
 S:83,
 T:84,
 U:85,
 V:86,
 W:87,
 X:88,
 Y:89,
 Z:90,
		
 DIGIT_0:48,
 DIGIT_1:49,
 DIGIT_2:50,
 DIGIT_3:51,
 DIGIT_4:52,
 DIGIT_5:53,
 DIGIT_6:54,
 DIGIT_7:55,
 DIGIT_8:56,
 DIGIT_9:57,

}//end key
///////end input////////

/////shuffel///////

shuffle_array = function(arr)
{
	var shuffeld =arr;
	var element_num = arr.length;
	for(var i = element_num; i>1 ; i--)
	{
		j = Math.round(Math.random() * element_num-1);
		if(j<0){j=0;}
		var temp = shuffeld[j]
		shuffeld[j] = shuffeld[i-1];
		shuffeld[i-1]=temp;
		var v =i-1;
		//ytrace(shuffeld[j]+" "+shuffeld[i-1]+" "+v+" "+j);
	}
	//ytrace(shuffeld);
	return shuffeld;
}//end shuffle_array

//////end shuffle_array///////////////

//////////////// ystore (store data on cookie)/////////////////////////

var y_store = function(){};

y_store_p = y_store.prototype;

y_store_p.set = function(key,val)
{
	localStorage.setItem(key, JSON.stringify(val));
}//end set

y_store_p.get = function(key,val)
{
	result = localStorage.getItem(key);
	
	return JSON.parse(result);
}//end get
////////////////end ystore/////////////////////////	

function get_mouce()
{
		return window.ygame.input.activePointer;
}

function get_key(key)
{
	
	return window.ygame.input.keyboard.addKey(Phaser.Keyboard[key]);
}

function ynumber_array(lowEnd,highEnd)
{
	var list = [];
	for (var i = lowEnd; i <= highEnd; i++) {
		list.push(i);
	}
	return list;
	
}

function yadd(w,e)
{
	yworld.prototype.yadd.call(w,e);
}
function yremove(w,e)
{
	yworld.prototype.yremove.call(w,e);
}

function ycollide(that,type)
{
	 return y_entity_p.collide.call(that,type);
	 
}
function yget_by_type(that,type)
{
	 return y_entity_p.get_by_type.call(that,type);
}

function yget_angle(x,y,x2,y2)
{
	dx = x2-x;
	dy = y2-y;
	angle = Math.atan2(dy,dx);
	//return -angle;//cool
	//angle *= 180 / Math.PI;
	
	return angle;
}
///random/
function y_random(minimum,maximum)
{
  var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;	
  return randomnumber;
}
///end random//
