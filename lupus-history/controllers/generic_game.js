var Game = global.Game;
var generic_get = require('lupus-common').generic_get;

module.exports = function(req, res, next) {
	var game_ids = req.params.game_ids.split(',');

	generic_get(Game, game_ids, 'games', res, 'toClientProtected');
};