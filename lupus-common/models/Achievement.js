module.exports = function(mongoose, connection) {
	if (mongoose.models.Achievement) return mongoose.models.Achievement;

	if (!connection) connection = mongoose;

	var AchievementSchema = mongoose.Schema({
		name: String,
		description: String
	});

	return mongoose.model('Achievement', AchievementSchema);
}
