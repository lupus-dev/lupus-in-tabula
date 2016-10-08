var Role = require('../role');

class Lupus extends Role {
	constructor(engine, user_id) {
		super(engine, user_id);
	}

	needVote() {
		let res = this._needVoteDay();
		if (!res) return false;
		if (this.engine.isNight())
			res.message = 'Vote who tear to pieces!';
		return res;
	}
};

Lupus.role_id = 'lupus';
Lupus.role_name = 'Lupus';
Lupus.team_id = 'lupuses';
Lupus.mana = 'black';
Lupus.priority_night = 1;
Lupus.priority_day = 1;
Lupus.generation = {
	probability: 0,    // the lupuses are generated indipendently
	group: 0
};

module.exports = Lupus;
