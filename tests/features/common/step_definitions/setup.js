var apickli = require('apickli');
var mongoose = require('mongoose');

module.exports = function() {
	// cleanup before every scenario
	this.Before(function(scenario, callback) {
		this.apickli = new apickli.Apickli('http', 'proxy');
		callback();
	});

	this.Before({ tags: ['@clean'] }, function(scenario, callback) {
		// -1 because connections[0] is invalid
		var remaining = global.mongooseConnections.length;
		if (remaining == 0) callback();

		var doCleaning = function(i) {
			global.mongooseConnections[i].db.dropDatabase();
			remaining--;
			if (remaining == 0) callback();
		}

		for (let i = 0, l = global.mongooseConnections.length; i < l; i++) {
			if (global.mongooseConnections[i].readyState != 1) {
				global.mongooseConnections[i].once('open', () => {
					doCleaning(i);
				});
			} else {
				doCleaning(i);
			}
		}
	});
};