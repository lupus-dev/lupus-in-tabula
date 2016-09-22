var debug = require('debug')('lupus-game:engine_game_open');
var change_game_status = require('./shared/change_game_status');

module.exports = function(data, callback) {
	change_game_status.bind(this)(debug, data, 'open', callback);
};
