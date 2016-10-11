var debug = require('debug')('lupus-game:engine_game_vote');
var save_game = require('lupus-common').save_game;
var change_game_status = require('./shared/change_game_status');

module.exports = function(data, callback) {
	var role = this.roles[data.user_id];
	if (!role)
		return callback({ error: 'You are not in the game', code: 401 });

	if (!role.isVoteValid(data.data.vote))
		return callback({ error: 'Your vote is not valid', code: 400 });

	let vote = {
		user_id: data.user_id,
		vote: data.data.vote,
		day: this.game.state.day
	};

	this.game.state.votes.push(vote);
	debug(`The user ${data.user_id} has voted ${data.data.vote} in game ${this.game.game_id}`);

	this.updateQueue.enqueueVote(data.user_id, vote);
	this.events.emit('engine:voted', vote);
	save_game(this, data.user_id, callback);
};
