var debug = require('debug')('lupus-game:role-lupus');

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

	performAction(players) {
		if (this.engine.isDay()) return this._performActionDay(players);

		for (let user_id in players) {
			let player = players[user_id];
			if (player.user_id == this.user_id)
				if (player.alive)   break;
				else 				return;
			else if (player.alive && player.constructor.role_id == 'lupus')  return;
		}

		debug('The lupus ' + this.user_id + ' is choosen to eat the meat');

		let votes = this.engine.game.state.votes.filter(v => {
			return v.day == this.engine.game.state.day && this.engine.roles[v.user_id].constructor.role_id == 'lupus'
		});
		let voted = this._selectFromVotation(votes, votes.length/2|0+1);

		if (voted) {
			this.kill(voted);
			debug('The user ' + this.user_id + ' has eaten ' + voted);
		}
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
