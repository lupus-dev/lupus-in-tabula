var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var mongooseUsers = mongoose.createConnection('mongodb://mongo/lupus-users');
var mongooseHistory = mongoose.createConnection('mongodb://mongo/lupus-history');

var User = mongooseUsers.model('User', require('../../../lupus-users/models/User').schema);
var Game = mongooseHistory.model('Game', require('../../../lupus-history/models/Game').schema);

module.exports = function($this) {
	$this.User = User;
	$this.Game = Game;

	$this.save_user = require('./support/save_user').bind($this);
	$this.login_user = require('./support/login_user').bind($this);
};