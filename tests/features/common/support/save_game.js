var JSONPath = require('jsonpath-plus');

module.exports = function(game_info, callback) {
	var game = new this.Game({
		owner_id: '123aaabbbccc',
		name: 'Funny game',
		members: [ '123aaabbbccc' ],
		state: { status: 0 },
		gen_info: {
			min_players: 7,
			max_players: 15
		},
		// beacause $__save mess up with timestamps
		created_at: new Date(),
		updated_at: new Date()
	});

	for (let i in game_info)
		this.set_deep(game, i, JSON.parse(game_info[i]));

	var $this = this;

	// beacause of a bug of mongoose (?) $__save is called instead of save
	game.$__save({}, function(err, doc) {
		callback(doc);
	});
};