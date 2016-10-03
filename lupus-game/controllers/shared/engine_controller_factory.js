var check_login = require('lupus-common').check_login;
var send_to_engine = require('./send_to_engine');

module.exports = function(event) {
	return function(req, res, next) {
		if (!check_login(req, res)) return;

		let data = {
			user_id: req.session.user_id,
			data: req.body
		};

		send_to_engine(req.params.game_id, event, data, res);
	}
};
