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
	 * This methods returns false if the user should not vote, otherwise a list
	 * of objects with all the allowed votes:
	 *     {
	 *         message: 'Vote who burn!'
	 *         votables: [
	 *             { value: 'ID_OF_THE_USER', text: 'USERNAME_OF_THE_USER' }
	 *         ]
	 *     }
	 */
	needVote() {
		return false;
	}

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
	 */
	performAction() {
		return false;
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
		throw new Error('Not implemented');
	}

	/**
	 * Visit a user by the current player
	 */
	visit(user_id) {
		throw new Error('Not implemented');
	}

	/**
	 * Protect a user for being killed. The interface of this method will be changed!
	 */
	protect(user_id) {
		throw new Error('Not implemented');
	}

	/**
	 * Check if the user is protected by being killed by the current user
	 */
	isProtected(user_id) {
		throw new Error('Not implemented');
	}
};

Role.role_id = null;
Role.role_name = null;
Role.team_id = null;
Role.mana = 'white';
Role.priority_night = 1;
Role.priority_day = 1;

module.exports = Role;
