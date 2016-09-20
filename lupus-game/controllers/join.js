var check_login = require('lupus-common').check_login;
var handle_error = require('lupus-common').handle_error;
var Game = global.Game;

module.exports = function(req, res, next) {
	if (!check_login(req, res)) return;
	var game_id = req.params.game_id;
	var user_id = req.session.user_id

	global.EngineManager.getEngine(game_id)
		.then(engine => {
			engine.events.emit('game:join', { user_id: user_id }, (err, data) => {
				if (err)
					return res.status(err.code).json({ error: err.error });
				res.status(data.code).json(data.data);
			});
		})
		.catch(err => res.status(404).json({ error: err.message }));
};
