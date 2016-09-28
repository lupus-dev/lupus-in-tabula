var Role = require('../role');

class Lupus extends Role {
	constructor(engine, user_id) {
		super(engine, user_id);
	}

	needVote() {
		if (this.getLastVote()) return false;
		return true;
	}
};

Lupus.role_id = 'lupus';
Lupus.role_name = 'Lupus';
Lupus.team_id = 'lupuses';
Lupus.mana = 'black';
Lupus.priority_night = 1;
Lupus.priority_day = 1;

module.exports = Lupus;
