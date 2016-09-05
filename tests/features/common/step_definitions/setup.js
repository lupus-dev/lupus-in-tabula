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
		var remaining = mongoose.connections.length - 1;
		if (remaining == 0) callback();

		var doCleaning = function(i) {
			mongoose.connections[i].db.dropDatabase();
			remaining--;
			if (remaining == 0) callback();
		}

		for (let i = 1, l = mongoose.connections.length; i < l; i++) {
			if (mongoose.connections[i].readyState != 1) {
				mongoose.connections[i].once('open', () => {
					doCleaning(i);
				});
			} else {
				doCleaning(i);
			}
		}
	});
};