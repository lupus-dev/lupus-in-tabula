var apickli = require('apickli');
var mongoose = require('mongoose');

module.exports = function() {
	global.FAKEID = '0123456789aabbccddeeff00';
	// cleanup before every scenario
	this.Before(function(scenario, callback) {
		this.apickli = new apickli.Apickli('http', 'proxy');
		this.apickli.storeValueInScenarioScope('FAKEID', global.FAKEID);
		callback();
	});

	this.Before({ tags: ['@clean'] }, function(scenario, callback) {
		var remaining = global.mongooseConnections.length;
		if (remaining == 0) callback();

		var doCleaning = function(i) {
			let conn = global.mongooseConnections[i];

			let modelsCount = Object.keys(conn.models).length;
			if (modelsCount == 0) { console.error("ERRORE"); process.exit(1); }

			for (let model in conn.models) {
				conn.models[model].remove({}, () => {
					if (--modelsCount == 0)
						if (--remaining == 0)
							callback();
				});
			}
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
