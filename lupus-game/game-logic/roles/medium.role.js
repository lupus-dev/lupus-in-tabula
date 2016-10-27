var debug = require('debug')('lupus-game:role-medium');

var Seer = require('./seer.role');

class Medium extends Seer {
	constructor(engine, user_id) {
		super(engine, user_id);
	}

	needVote() {
		if (this.engine.isDay()) return this._needVoteDay();
		return this._genVotableResult(
			'Vote who look at!',
			p => !p.alive && p.user_id != this.user_id,
			[{ value: 'nobody', text: 'nobody' }]
		);
	}

	isVoteValid(vote) {
		if (vote == 'nobody') return true;

		var player = this.engine.game.state.players.find(p => p.user_id == vote);
		if (!player) return false;

		if (player.user_id == this.user_id) return false;
		if (this.engine.isDay()) return player.alive;

		return !player.alive;
	}
}

Medium.role_id = 'medium';
Medium.role_name = 'Medium';
// Other properties inherited by Seer (hope so)

module.exports = Medium;
