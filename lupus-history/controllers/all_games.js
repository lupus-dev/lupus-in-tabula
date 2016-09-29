var Game = global.Game;

module.exports = function(req, res, next) {
	Game.find()
		.sort('-created_at')
		.exec()
		.then((games) => {
			var user_id = req.session ? req.session.user_id : null;
			res.json(games.map((obj) => { return obj.toClientProtected(user_id); }));
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};
