exports.check_login = require('./check-login');
exports.client_ip = require('./client-ip');
exports.login_middleware = require('./login-middleware');
exports.sessions = require('./sessions');
exports.handle_error = require('./handle-error');
exports.generic_get = require('./generic-get');
exports.do_save = require('./do-save');
exports.gracefulShutdown = require('./graceful-shutdown');
exports.gameToClientProtected = require('./game-to-client-protected');
exports.save_game = require('./save-game');

exports.models = {};

require('fs').readdirSync(__dirname + '/models/').forEach(function(file) {
	if (file.match(/\.js$/) !== null) {
		var name = file.replace('.js', '');
		exports.models[name] = require('./models/' + name);
	}
});
