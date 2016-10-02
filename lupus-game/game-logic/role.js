class Role {
	constructor(engine, user_id) {
		this.engine = engine;
		this.user_id = user_id;
		this.player = engine.state.players[user_id];
	}

	splash() {
		return 'You are a ' + this.constructor.role_name;
	}

	needVote() {
		return false;
	}

	performAction() {
		return false;
	}

	isVoteValid(vote) {
		if (vote == this.user_id) return false;
		var player = this.engine.state.players[user_id];
		if (!player) return false;
		return !!player.alive;
	}

	get data() {
		return null;
	}

	set data(data) {
		throw new Error('Not implemented');
	}

	getLastVote() {
		return this.engine.state.votes.find((vote) => {
			return vote.user_id == this.user_id && vote.day == this.engine.state.day;
		});
	}

	kill(user_id) {
		throw new Error('Not implemented');
	}

	visit(user_id) {
		throw new Error('Not implemented');
	}

	protect(user_id) {
		throw new Error('Not implemented');
	}

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
