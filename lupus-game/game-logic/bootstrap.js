var fs = require('fs');

var EngineManager = require('./engine-manager');
var Role = require('./role');

module.exports = function() {
	global.EngineManager = new EngineManager();

	global.roles = {};
	fs.readdirSync(__dirname + '/roles/').forEach((file) => {
		if (file.match(/\.role\.js$/) !== null) {
			var name = file.replace('.role.js', '');
			var role = require('./roles/' + name + '.role');
			global.roles[role.role_id] = role;
		}
	});
};
