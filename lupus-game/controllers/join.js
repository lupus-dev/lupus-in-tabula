var check_login = require('lupus-common').check_login;
var send_to_engine = require('./shared/send_to_engine');

module.exports = function(req, res, next) {
	if (!check_login(req, res)) return;

	send_to_engine(req.params.game_id, 'game:join', { user_id: req.session.user_id }, res);
};
