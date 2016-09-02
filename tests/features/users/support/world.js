var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/lupus-users');

var User = mongoose.model('User', require('../../../../lupus-users/models/User').schema);

var World = function() {
	this.User = User;
};

module.exports = function() {
	this.World = World;
};