var check_login = require('lupus-common').check_login;
var handle_error = require('lupus-common').handle_error;
var Game = global.Game;

module.exports = function(req, res, next) {
	if (!check_login(req, res)) return;

	var game_id = req.params.game_id;
	Game.findOne({ '_id': game_id })
		.then(game => {
			if (!game) return res.status(404).json({ error: 'Game not found' });

			var user_id = req.session.user_id
			var index = game.members.indexOf(user_id);
			if (index === -1)
				return res.status(400).json({ error: 'You are not in the game' });

			if (game.state.status.code !== 'open' &&
				game.state.status.code !== 'closed' &&
				game.state.status.code !== 'full')
				return res.status(400).json({ error: 'You currently cannot leave this game' });

			if (game.members.length == game.gen_info.max_players)
				// TODO notify the socket
				game.state.status.code = 'open';

			game.members.splice(index, 1);

			game.save()
				.then(game => res.json(game.toClientProtected()))
				.catch(handle_error(res).save);
		})
		.catch(handle_error(res).get);
};