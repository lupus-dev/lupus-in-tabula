var debug = require('debug')('lupus-game:role');

class Role {
	constructor(engine, user_id) {
		this.engine = engine;
		this.user_id = user_id;
		this.player = engine.game.state.players.find(p => p.user_id == user_id);
	}

	/**
	 * This methods should return a string that will be displayed to the user
	 * for showing the role of the player
	 */
	splash() {
		return 'You are a ' + this.constructor.role_name;
	}

	/**
	 * An extra message displayed to the player near the votation box. It could
	 * contain HTML tags for styling
	 */
	extraMessage() {
		return null;
	}

	/**
	 * This methods returns false if the user should not vote, otherwise a list
	 * of objects with all the allowed votes:
	 *     {
	 *         message: 'Vote who burn!'
	 *         votables: [
	 *             { value: 'ID_OF_THE_USER', text: 'USERNAME_OF_THE_USER' }
	 *         ]
	 *     }
	 */
	needVote() {}

	_needVoteDay() {
		if (!this.player.alive) return false;
		if (this.getLastVote()) return false;

		let votables = [];
		for (let player of this.engine.game.state.players)
			if (player.alive && player.user_id != this.user_id)
				votables.push({ value: player.user_id });

		return {
			message: 'Vote who burn!',
			votables: votables
		};
	}

	/**
	 * Once a day this function is called and the role should execute its actions.
	 * For example the lupus will kill, the guard will protect etc..
	 * @param players List of Role instances sorted by execution time
	 */
	performAction(players) {
		if (this.engine.isDay())
			this._performActionDay(players);
	}

	_performActionDay(players) {
		for (let user_id in players) {
			let player = players[user_id];
			if (player.user_id == this.user_id)
				if (player.alive)   break;
				else 				return;
			else if (player.alive)  return;
		}

		debug('The user ' + this.user_id + ' is choosen to make the bonfire');

		let votes = this.engine.game.state.votes.filter(v => v.day == this.engine.game.state.day);
		let voted = this._selectFromVotation(votes, ((votes.length/2)|0)+1);

		if (voted) {
			this.kill(voted);
			debug('The user ' + this.user_id + ' has burned ' + voted);
		}
	}

	/**
	 * Check if the vote of the user is valid
	 */
	isVoteValid(vote) {
		if (vote == this.user_id) return false;
		var player = this.engine.game.state.players.find(p => p.user_id == vote);
		if (!player) return false;
		return !!player.alive;
	}

	/**
	 * Returns a subset of the visible votes
	 */
	visibleVotes(votes) {
		return votes.filter(v => v.user_id+'' == this.user_id);
	}

	get data() {
		return this.player.data;
	}

	set data(data) {
		// TODO implement set data
		// maybe like this?
		//
		// this.player.data = data;
		// this.game.save().exec();
		throw new Error('Not implemented');
	}

	/**
	 * Returns the vote of the player in the current day
	 */
	getLastVote() {
		return this.engine.game.state.votes.find((vote) => {
			return vote.user_id+'' == this.user_id+'' &&
				vote.day == this.engine.game.state.day;
		});
	}

	/**
	 * Kill a user by the current player. This checks if the kill is possible or not
	 */
	kill(user_id) {
		if (this.isProtected(this, this.engine.roles[user_id])) {
			debug('The user ' + this.user_id + ' didnt kill ' + user_id + ' beacuse he was protected');
			return;
		}
		this.engine.roles[user_id].player.alive = false;
		debug('The user ' + this.user_id + ' killed ' + user_id);
	}

	/**
	 * Visit a user by the current player
	 */
	visit(user_id) {
		throw new Error('Not implemented');
	}

	//protectUserFromUser(victim, killer) { this._protect('@'+killer, '@'+victim); }

	protectUserFromRole(victim, killer) { this._protect('#'+killer, '@'+victim); }
	//protectRoleFromUser(victim, killer) { this._protect('@'+killer, '#'+victim); }

	//protectUserFromAll(victim) { this._protect('*', '@'+victim); }
	//protectAllFromUser(killer) { this._protect('@'+killer, '*'); }

	//protectRoleFromAll(victim) { this._protect('*', '#'+victim); }
	//protectAllFromRole(killer) { this._protect('#'+killer, '*'); }

	_protect(killer, victim) {
		let protection = this.engine.game.state.protection;
		if (!protection[victim])
			protection[victim] = [];
		protection[victim].push(killer);
	}

	isProtected(killer, victim) {
		let id_killer = '@' + killer.user_id;
		let id_victim = '@' + victim.user_id;

		let role_killer = '#' + killer.constructor.role_id;
		let role_victim = '#' + victim.constructor.role_id;

		let protection = this.engine.game.state.protection;

		let scopes = [
			protection[id_victim],
			protection[role_victim],
			protection['*']
		];

		for (let scope of scopes)
			if (scope)
				if (scope.indexOf(id_killer) >= 0 || scope.indexOf(role_killer) >= 0 || scope.indexOf('*') >= 0)
					return true;
		return false;
	}

	_selectFromVotation(votes, quorum) {
		let candidates = {};
		let most_voted = null;
		for (let vote of votes) {
			if (candidates[vote.vote])
				candidates[vote.vote]++;
			else
				candidates[vote.vote] = 1;

			if (!candidates[most_voted] || candidates[most_voted] < candidates[vote.vote])
				most_voted = vote.vote;
		}

		if (candidates[most_voted] < quorum) {
			debug('Quorum not reached: ', candidates[most_voted], ' < ', quorum);
			return false;
		}

		return most_voted;
	}
};

Role.role_id = null;          // unique role identifier
Role.role_name = null;        // full name of the role
Role.team_id = null;          // identifier of the team
Role.mana = 'white';          // 'white' or 'black'
Role.priority_night = 1;      // relative priority of execution in night
Role.priority_day = 1;        // relative priority of execution in night
Role.generation = {           // generation information
	probability: 0,               // relative probability to be generated (not needed to be [0, 1))
	group: 0                      // copy of the same role to be generated at once
};

module.exports = Role;
