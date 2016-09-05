var redisClient = global.redisClient;
var sessions = require('../common/sessions.js')(redisClient);

module.exports = function(req, res, next) {
	if (!req.session)
		return res.status(401).json({ error: "You have to provide a correct token to do this" });

	sessions.removeSession(req.session);
	res.status(200).json({ message: "Logged out" });
};