module.exports = function(game_id, event, data, res) {
	global.EngineManager.getEngine(game_id)
		.then(engine => {
			engine.events.emit(event, data, (err, data) => {
				if (err)
					console.error('Error with ' + event + ':\n', err);
				if (err)
					return res.status(err.code || 500).json({ error: err.error || err });
				res.status(data.code || 500).json(data.data || { error: 'no data :(' });
			});
		})
		.catch(err => {
			console.error(err);
			res.status(404).json({ error: err.message });
		});
};
