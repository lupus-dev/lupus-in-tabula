module.exports = function() {
	this.When(/^I send authorization token (.+)$/, function (token, callback) {
		var socket = this.apickli.scenarioVariables.socket;

		token = this.apickli.replaceVariables(token);

		socket.emit('authentication', { token: token });
		socket.on('authenticated', () => {
			this.apickli.storeValueInScenarioScope('socket_authenticated', true);
		});
		socket.on('unauthorized', () => {
			this.apickli.storeValueInScenarioScope('socket_authenticated', false);
		})
		callback();
	});

	this.Then(/^I should be authenticated$/, function (callback) {
		if (this.apickli.scenarioVariables.socket_authenticated)
			callback();
		// allow 200ms timeout
		var _this = this;
		setTimeout(function () {
			if (!_this.apickli.scenarioVariables.socket_authenticated)
				callback(new Error('Authentication failed by timeout'));
			else
				callback();
		}, 200);
	});

	this.Then(/^I should not be authenticated$/, function (callback) {
		if (this.apickli.scenarioVariables.socket_authenticated)
			callback(new Error('The user was authenticated'));
		if (this.apickli.scenarioVariables.socket_authenticated === false)
			callback();
		// allow 200ms timeout
		setTimeout(() => {
			if (this.apickli.scenarioVariables.socket_authenticated)
				callback(new Error('The user was authenticated'));
			else
				callback();
		}, 200);
	});
};
