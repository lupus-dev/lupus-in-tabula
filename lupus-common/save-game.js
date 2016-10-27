module.exports = function(engine, user_id, callback) {
	engine.game.save()
		.then(game => {
			callback(null, { data: engine.game.toClientProtected(user_id, engine.roles[user_id]), code: 200 });
		})
		.catch(err => {
			console.error(err);
			callback({ error: err, code: 500 });
		});
};
