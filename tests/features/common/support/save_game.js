module.exports = function(game_info, callback) {
	var game = new this.Game({
		owner_id: global.FAKEID,
		name: 'Funny game',
		members: [ global.FAKEID ],
		state: {
			status: {
				code: 'open'
			}
		},
		gen_info: {
			min_players: 7,
			max_players: 15
		},
		// beacause $__save mess up with timestamps
		created_at: new Date(),
		updated_at: new Date()
	});

	for (let i in game_info) {
		real_i = this.apickli.replaceVariables(i);
		game_info[i] = this.apickli.replaceVariables(game_info[i]);
		this.set_deep(game, real_i, JSON.parse(game_info[i]));
	}

	// beacause of a bug of mongoose (?) $__save is called instead of save
	game.$__save({}, function(err, doc) {
		callback(doc);
	});
};
