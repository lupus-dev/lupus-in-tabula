module.exports = function(game_id, event, data, res) {
	global.EngineManager.getEngine(game_id)
		.then(engine => {
			engine.events.emit(event, data, (err, data) => {
				if (err)
					return res.status(err.code).json({ error: err.error });
				res.status(data.code).json(data.data);
			});
		})
		.catch(err => res.status(404).json({ error: err.message }));
};
