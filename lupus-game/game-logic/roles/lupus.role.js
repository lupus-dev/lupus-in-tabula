var Role = require('../role');

class Lupus extends Role {
	constructor(engine, user_id) {
		super(engine, user_id);
	}

	needVote() {
		let res = this._needVoteDay();
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

module.exports = Lupus;
