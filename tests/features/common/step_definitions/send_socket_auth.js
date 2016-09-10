module.exports = function() {
	this.When(/^I send authorization token (.+)$/, function (token, callback) {
		var socket = this.apickli.scenarioVariables.socket;

		token = this.apickli.replaceVariables(token);

		var _this = this;
		socket.emit('authentication', { token: token });
		socket.on('authenticated', function() {
			_this.apickli.storeValueInScenarioScope('socket_authenticated', true);
		});
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
};