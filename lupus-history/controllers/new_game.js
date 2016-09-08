var _ = require('underscore');
var Game = require('../models/Game');
var check_login = require('../common/check-login');

module.exports = function(req, res, next) {
	if (!check_login(req, res)) return;

	var body = req.body;
	var game = new Game({
		owner_id: req.session.user_id,
		name: body.name,
		members: body.members,
		state: { status: 0 },
		gen_info: {
			min_players: body.gen_info.min_players,
			max_players: body.gen_info.max_players
		}
	});

	game.save()
		.then((game) => {
			res.status(201).json(game.toClientProtected());
		})
		.catch((err) => {
			console.log(err);
			var errors = _.map(_.values(err.errors), (val) => {
				return val.message;
			});
			res.status(400).json({ error: errors.join('; ') });
		});
};