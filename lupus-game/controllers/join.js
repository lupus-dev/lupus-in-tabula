var check_login = require('lupus-common').check_login;
var handle_error = require('lupus-common').handle_error;
var Game = global.Game;

module.exports = function(req, res, next) {
	if (!check_login(req, res)) return;

	var game_id = req.params.game_id;
	Game.findOne({ '_id': game_id })
		.then(game => {
			if (!game) return res.status(404).json({ error: 'Game not found' });

			if (game.state.status.code !== 'open')
				return res.status(400).json({ error: 'You currently cannot join this game' });

			var user_id = req.session.user_id
			if (game.members.indexOf(user_id) !== -1)
				return res.status(400).json({ error: 'You are already in the game' });

			if (game.members.length + 1 > game.gen_info.max_players)
				// TODO change the state and notify the socket
				return res.status(400).json({ error: 'Sorry, the game is full!' })

			game.members.push(user_id);

			if (game.members.length >= game.gen_info.max_players)
				// TODO notify the socket
				game.state.status.code = 'full';

			// TODO notify the socket
			game.save()
				.then(game => res.json(game.toClientProtected()))
				.catch(handle_error(res).save);
		})
		.catch(handle_error(res).get);
};