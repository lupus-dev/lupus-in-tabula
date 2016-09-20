var sessions = require('lupus-common').sessions(global.redisClient);
var debug = require('debug')('lupus-game:socket-auth');

module.exports = function(socket, data, callback) {
	var token = data.token;

	sessions.getSession(token, (err, session) => {
		if (err || !session) {
			debug('Failed authentication with token ' + token);
			return callback(false);
		}

		socket.session = session;
		debug('Authenticated user ' + session.user_id + ' on socket');
		callback(null, true);
	})
};
