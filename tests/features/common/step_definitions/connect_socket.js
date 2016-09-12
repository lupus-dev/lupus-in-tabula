var socketio = require('socket.io-client');

module.exports = function() {
	this.When(/^I connect to (.+) socket$/, function (name, callback) {
		var socket = socketio.connect('http://proxy', { path: `/api/${name}/socket.io` });
		socket.on('error', (error) => { callback(new Error(error)); });
		socket.on('connect', () => {
			this.apickli.storeValueInScenarioScope('socket', socket);
			callback();
		});
	});
};