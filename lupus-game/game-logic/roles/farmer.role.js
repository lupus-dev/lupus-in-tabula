var Role = require('../role');

class Farmer extends Role {
	constructor(engine, user_id) {
		super(engine, user_id);
	}

	needVote() {
		if (this.engine.isNight()) return false;
		return !this.getLastVote();
	}
}

Farmer.role_id = 'farmer';
Farmer.role_name = 'Farmer';
Farmer.team_id = 'villagers';
Farmer.mana = 'white';
Farmer.priority_night = 0;
Farmer.priority_day = 1;

module.exports = Farmer;
