var debug = require('debug')('lupus-game:role-lupus');

var Role = require('../role');
var UpdateQueue = require('../update-queue');

class Lupus extends Role {
	constructor(engine, user_id) {
		super(engine, user_id);

		engine.events.on('engine:voted', (vote) => {
			if (vote.user_id == user_id)
				engine.updateQueue.enqueueRoom(
					engine.game.game_id+Lupus.socket_room_suffix,
					UpdateQueue.UPDATE_TYPES['PUBLIC_VOTE'],
					vote);
		});
	}

	extraMessage() {
		let otherLupusesVotes = this.engine.game.state.votes.filter(vote => {
			return vote.day == this.engine.game.state.day &&
				vote.user_id+'' != this.user_id &&
				this.engine.roles[vote.user_id].constructor.role_id == 'lupus';
		});

		if (otherLupusesVotes.length == 0) return null;

		let elements = [];
		for (let vote of otherLupusesVotes)
			elements.push({
				type: 'li',
				data: [
					{ type: 'user', data: vote.user_id },
					{ type: 'text', data: ' voted ' },
					{ type: 'user', data: vote.vote }
				]
			});

		let res = [
			{ type: 'text', data: 'Other lupuses voted:' },
			{ type: 'ul', data: elements }
		];

		debug(res);
		return res;
	}

	needVote() {
		if (this.engine.isDay()) return this._needVoteDay();
		return this._genVotableResult(
			'Vote who tear to pieces!',
			null,
			[{ value: this.user_id }]
		);
	}

	isVoteValid(vote) {
		if (this.engine.isDay() && vote == this.user_id) return false;
		var player = this.engine.game.state.players.find(p => p.user_id == vote);
		if (!player) return false;
		return !!player.alive;
	}

	visibleVotes(votes) {
		return votes.filter(vote => {
			if (vote.user_id+'' == this.user_id) return true;
			if (this.engine.roles[vote.user_id].constructor.role_id == 'lupus') return true;
			return false;
		});
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
		let voted = this._selectFromVotation(votes, ((votes.length/2)|0)+1);

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
Lupus.socket_room_suffix = ':lupuses';
Lupus.generation = {
	probability: 0,    // the lupuses are generated indipendently
	group: 0
};

module.exports = Lupus;
