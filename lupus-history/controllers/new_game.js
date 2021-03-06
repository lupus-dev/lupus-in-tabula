var _ = require('underscore');
var Game = global.Game;
var check_login = require('lupus-common').check_login;
var do_save = require('lupus-common').do_save;

module.exports = function(req, res, next) {
	if (!check_login(req, res)) return;

	var body = req.body;
	var game = new Game({
		owner_id: req.session.user_id,
		name: body.name,
		members: [req.session.user_id],
		state: {
			status: {
				code: 'draft'
			}
		},
		gen_info: {
			min_players: body.gen_info.min_players,
			max_players: body.gen_info.max_players
		}
	});

	do_save(game, res, 'toClientProtected', [req.session.user_id]);
};
