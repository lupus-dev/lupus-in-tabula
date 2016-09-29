var Game = global.Game;
var generic_get = require('lupus-common').generic_get;

module.exports = function(req, res, next) {
	var game_ids = req.params.game_ids.split(',');

	var user_id = req.session ? req.session.user_id : null;
	generic_get(Game, game_ids, 'games', res, 'toClientProtected', [user_id]);
};
