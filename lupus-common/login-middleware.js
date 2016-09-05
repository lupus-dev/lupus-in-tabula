module.exports = function(redis) {
	var sessions = require('./sessions')(redis);

	var getTokenFromHeader = function(header) {
		var authorization = header.split(' ');
		if (authorization[0] != 'token')
			return null;
		return authorization[1];
	};

	return function(req, res, next) {
		var token = null;

		if (req.headers['authorization'])
			token = getTokenFromHeader(req.headers['authorization']);

		if (req.query.token)
			token = req.query.token;

		if (!token)
			return next();

		sessions.getSession(token, (err, session) => {
			if (session) {
				// extend the token period
				sessions.renewSession(session);
				res.set('X-User-Id', session.user_id);
				req.session = session;
			}
			next();
		});
	};
}