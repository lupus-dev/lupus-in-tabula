var debug = require('debug')('lupus-game:role-guard');

var Role = require('../role');

class Guard extends Role {
	constructor(engine, user_id) {
		super(engine, user_id);
	}

	needVote() {
		let res = this._needVoteDay();
		if (!res) return false;
		if (this.engine.isNight())
			res.message = 'Vote who protect!';
		res.votables.push({ value: 'nobody', text: 'nobody' });
		return res;
	}

	isVoteValid(vote) {
		if (vote == 'nobody') return true;

		var player = this.engine.game.state.players.find(p => p.user_id == vote);
		if (!player) return false;

		return !!player.alive && player.user_id != this.user_id;
	}

	performAction(players) {
		if (this.engine.isDay()) return this._performActionDay(players);
		if (!this.player.alive) {
			debug('The guard didnt act because he died');
			return;
		}

		let vote = this.getLastVote();

		if (vote.vote == 'nobody') {
			debug('The guard ' + this.user_id + ' didn\'t protect anyone');
			return;
		}

		let prot = this.engine.roles[vote.vote];
		if (prot.constructor.role_id == 'lupus') {
			debug('The guard ' + this.user_id + ' died because he protected a lupus');
			this.player.alive = false;
		}

		this.protectUserFromRole(vote.vote, 'lupus');
	}
};

Guard.role_id = 'guard';
Guard.role_name = 'Guard';
Guard.team_id = 'villagers';
Guard.mana = 'white';
Guard.priority_night = 10;
Guard.priority_day = 1;
Guard.generation = {
	probability: 0.5,
	group: 1
};

module.exports = Guard;
