var debug = require('debug')('lupus-game:engine_game_vote');
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
	this.game.save()
		.then(game => {
			callback(null, { data: this.game.toClientProtected(data.user_id, this.roles[data.user_id]), code: 200 });
		})
		.catch(err => callback({ error: err, code: 500 }));
};
