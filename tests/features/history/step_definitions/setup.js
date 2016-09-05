var apickli = require('apickli');
var mongoose = require('mongoose');

module.exports = function() {
	// cleanup before every scenario
	this.Before(function(scenario, callback) {
		this.apickli = new apickli.Apickli('http', 'proxy');
		callback();
	});

	this.Before({ tags: ['@clean'] }, function(scenario, callback) {
		var doCleaning = function() {
			mongoose.connection.db.dropDatabase();
			callback();
		}

		if (mongoose.connection.readyState != 1) {
			mongoose.connection.once('open', () => {
				doCleaning();
			})
		} else {
			doCleaning();
		}
	});

	this.Then(/^I print the response$/, function(callback) {
		var response = this.apickli.getResponseObject();
		console.log('State: ' + response.statusCode);
		console.log('Headers:', response.headers);
		console.log('Body:', response.body);
		callback();
	});
};