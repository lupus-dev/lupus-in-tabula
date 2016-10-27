module.exports = function(engine, user_id, callback) {
	console.log('######################## DEBUG: save_game start saving');
	engine.game.save()
		.then(game => {
			console.log('######################## DEBUG: save_game finished saving');
			console.log(require('util').inspect(game.state.players, { depth: null }));
			callback(null, { data: engine.game.toClientProtected(user_id, engine.roles[user_id]), code: 200 });
		})
		.catch(err => {
			console.error(err);
			callback({ error: err, code: 500 });
		});
};
