var UPDATE_TYPES = require('../../update-queue').UPDATE_TYPES;

module.exports = function(debug, data, status, callback) {
	if (!callback) callback = function(){};

	var game = this.game;

	var action = status == 'open'   ? 'open' :
				 status == 'closed' ? 'close':
				 status == 'running' ? 'start' :
				 					  'do stuff with';

	if (data.user_id != game.owner_id)
		return callback({ error: 'Only the owner can ' + action + ' the game', code: 401 });

	if (status == 'open')
		if (game.state.status.code !== 'draft' && game.state.status.code !== 'closed')
			return callback({ error: 'You cannot open this game', code: 400 });
	if (status == 'closed')
		if (game.state.status.code !== 'open')
			return callback({ error: 'You cannot close this game', code: 400 });
	if (status == 'running')
		if (game.state.status.code !== 'open' && game.state.status.code !== 'closed' && game.state.status.code !== 'full')
			return callback({ error: 'You cannot start this game', code: 400 });

	game.state.status.code = status;
	debug(`The game ${game.game_id} status has been changed to ${status}`);
	this.updateQueue.enqueueStatusChange({ code: status });

	game.save()
		.then(game => {
			callback(null, { data: game.toClientProtected(data.user_id, this.roles[data.user_id]), code: 200 });
		})
		.catch(err => callback({ error: err, code: 500 }));
};
