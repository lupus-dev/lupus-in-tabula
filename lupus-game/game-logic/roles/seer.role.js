var debug = require('debug')('lupus-game:role-seer');

var Role = require('../role');

class Seer extends Role {
	constructor(engine, user_id) {
		super(engine, user_id);
	}

	extraMessage() {
		let seen = ((this.player.data || {}).seen || []).find(seen => seen.day == this.engine.game.state.day - 2);
		if (!seen) return null;

		return [
			{ type: 'text', data: 'Last night you watched ' },
			{ type: 'user', data: seen.player },
			{ type: 'text', data: ' and he\'s mana was ' + seen.mana }
		];
	}

	needVote() {
		if (this.engine.isDay()) return this._needVoteDay();
		return this._genVotableResult(
			'Vote who look at!',
			null,
			[{ value: 'nobody', text: 'nobody' }]
		);
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
			debug('The ' + this.constructor.role_id + ' didnt act because he died');
			return;
		}

		let vote = this.getLastVote();

		if (vote.vote == 'nobody') {
			debug('The ' + this.constructor.role_id + ' ' + this.user_id + ' didn\'t look at anyone');
			return;
		}

		let otherPlayer = this.engine.roles[vote.vote];
		let mana = otherPlayer.constructor.mana;
		debug('The ' + this.constructor.role_id + ' has looked at ' + otherPlayer.user_id + ' and he is ' + mana);

		if (!this.player.data)      this.player.data = {};
		if (!this.player.data.seen) this.player.data.seen = [];

		this.player.data.seen.push({
			day: this.engine.game.state.day,
			player: otherPlayer.user_id,
			mana: mana
		});
		// this.player.data is a Mixed object, Mongoose needs to be notified when there
		// are changes. this.player is a SubDocument
		this.player.markModified('data');
	}
}

Seer.role_id = 'seer';
Seer.role_name = 'Seer';
Seer.team_id = 'villagers';
Seer.mana = 'white';
Seer.priority_night = 10;
Seer.priority_day = 1;
Seer.generation = {
	probability: 0.5,
	group: 1
};

module.exports = Seer;
