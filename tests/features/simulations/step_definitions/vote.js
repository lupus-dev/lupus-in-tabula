module.exports = function() {
	this.When(/^Player (.+) voted (.+) in game (.+)$/, function (user, vote, game, callback) {
		user = this.apickli.replaceVariables(user);
		vote = this.apickli.replaceVariables(vote);
		game = this.apickli.replaceVariables(game);

		this.login_user(user, 'SecretPassword', (res) => {
			this.apickli.addRequestHeader('Content-Type', 'application/json');
			this.apickli.addRequestHeader('Authorization', 'token ' + res.session.token);
			this.apickli.setRequestBody(JSON.stringify({ vote: vote }));

			this.apickli.post('/api/game/'+game+'/vote', (err, response) => {
				this.apickli.requestBody = '';
				this.apickli.headers = {};

				if (err) return callback(new Error(err));
				callback();
			});
		});
	});
};
