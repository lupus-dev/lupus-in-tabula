module.exports = function(game_id, event, data, res) {
	global.EngineManager.getEngine(game_id)
		.then(engine => {
			engine.events.emit(event, data, (err, data) => {
				if (err) {
					if (!err.code || !err.error)
						return res.status(500).json({ error: 'missing code or error', data: err });
					return res.status(err.code).json({ error: err.error });
				}
				if (!data.code || !data.data)
					return res.status(500).json({ error: 'missing code or data', data: data });
				res.status(data.code).json(data.data);
			});
		})
		.catch(err => res.status(404).json({ error: err.message }));
};
