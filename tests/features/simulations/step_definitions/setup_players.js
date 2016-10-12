module.exports = function() {
	this.Given(/^There are the players$/, function (data, callback) {
		let players = [];
		let roles = data.rowsHash();
		let count = Object.keys(roles).length;

		for (let username in roles) {
			let role = roles[username];

			this.save_user({ username: '"' + username + '"' }, (user) => {
				players.push({
					user_id: user.user_id,
					role: role,
					alive: true
				});

				this.apickli.storeValueInScenarioScope(username + '_id', user.user_id);
				count--;
				if (count == 0) {
					this.apickli.storeValueInScenarioScope('players', JSON.stringify(players));
					callback();
				}
			});
		}
	});
};
