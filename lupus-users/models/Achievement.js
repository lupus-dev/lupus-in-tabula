var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AchievementSchema = Schema({
	name: String,
	description: String
});

var Achievement = mongoose.model('Achievement', AchievementSchema);

module.exports = Achievement;