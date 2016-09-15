var Game = global.Game;

module.exports = function(req, res, next) {
	Game.find()
		.sort('-created_at')
		.exec()
		.then((games) => {
			res.json(games.map((obj) => { return obj.toClientProtected(); }));
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};