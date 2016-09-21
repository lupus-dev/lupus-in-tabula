module.exports = function() {
	this.Then(/^I should be able to receive a (.+)$/, function (event, callback) {
		var socket = this.apickli.scenarioVariables.socket;

		if (!socket) return callback(new Error('The socket has not been created'));

		socket.on(event, (data) => {
			var event_data = this.apickli.scenarioVariables.event_data || {};
			event_data[event] = event_data[event] || [];
			event_data[event].push(data);
			this.apickli.storeValueInScenarioScope('event_data', event_data);
		});

		callback();
	});

	this.Then(/^The (.+) event should be$/, function (event, table, callback) {
		var check = () => {
			var data = (this.apickli.scenarioVariables.event_data || {})[event];
			if (!data) return false;
			this.check_props(data.shift(), table.rowsHash(), event, callback);
			return true;
		};

		if (!check())
			setTimeout(() => {
				if (!check())
					callback(new Error('The ' + event + ' has not been triggered'));
			}, 500);
	});

};
