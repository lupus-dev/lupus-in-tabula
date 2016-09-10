var Game = require('../models/Game');
var handle_error = require('lupus-common').handle_error;

module.exports = function(req, res, next) {
	var game_ids = req.params.game_ids.split(',');

	Game.find({ '_id': { $in: game_ids } })
		.exec()
		.then((games) => {
			if (games.length == 0)
				res.status(404).json({ error: 'No games found' });
			else
				res.json(games.reduce((obj, game) => {
					obj[game._id] = game.toClientProtected();
					return obj;
				}, {}));
		})
		.catch(handle_error(res).get);
};