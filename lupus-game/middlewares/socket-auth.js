var sessions = require('lupus-common').sessions(global.redisClient);

module.exports = function(socket, data, callback) {
	var token = data.token;

	sessions.getSession(token, (err, session) => {
		if (err || !session) return callback(false);

		socket.session = session;
		callback(null, true);
	})
};