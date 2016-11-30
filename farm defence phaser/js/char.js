charecter =function(hp,dmg,att_timer) 
{
	this.hp =hp || 2;
	this.max_hp = hp || 2;
	this.dmg = dmg || 1;
	this.attack_timer =  new y_timer(att_timer);
};