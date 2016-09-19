module.exports = function() {
	this.When(/^I send to the socket the (.+) event$/, function (event, table, callback) {
		var socket = this.apickli.scenarioVariables.socket;

		if (!socket) return callback(new Error('The socket has not been created'));

		var data = {};
		var table_data = table.rowsHash();
		for (let i in table_data) {
			i = this.apickli.replaceVariables(i);
			table_data[i] = this.apickli.replaceVariables(table_data[i]);
			this.set_deep(data, i, JSON.parse(table_data[i]));
		}

		var ok = false;
		var x = socket.emit(event, data, (res) => {
			this.apickli.storeValueInScenarioScope('socket_response', res);
			ok = true;
			callback();
		});

		setTimeout(() => { if (!ok) callback() }, 500);
	});

	this.Then(/^The socket response should be$/, function (table, callback) {
		var response = this.apickli.scenarioVariables.socket_response;

		if (!response) return callback(new Error('The socket has not responded with data'));

		this.check_props(response, table.rowsHash(), 'response', callback);
	});
};