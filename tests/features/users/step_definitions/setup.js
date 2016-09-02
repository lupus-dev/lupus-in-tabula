var apickli = require('apickli');
var mongoose = require('mongoose');
	mongoose.connect('mongodb://mongo/lupus-users');

module.exports = function() {
	// cleanup before every scenario
	this.Before(function(scenario, callback) {
		this.apickli = new apickli.Apickli('http', 'proxy');
		callback();
	});

	this.Before({ tags: ['@clean'] }, function(scenario, callback) {
		for (var i in mongoose.connection.collections)
			mongoose.connection.collections[i].remove(function() {});
		callback();
	});
};