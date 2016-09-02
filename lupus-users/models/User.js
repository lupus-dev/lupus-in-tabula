var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Achievement = require('./Achievement');

var UserSchema = Schema({
	username: { type: String, index: true },
	password_hash: String,
	name: String,
	surname: String,
	level: Number,
	achievements: [
		{
			achievement: { type: Schema.Types.ObjectId, ref: 'Achievement' },
			unlock_date: Date
		}
	],
	friends: [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	],
	created_by_ip: String
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;