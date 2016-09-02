var _ = require('underscore');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Achievement = require('./Achievement');

var UserSchema = Schema({
	username: { type: String, index: true, required: true,
		validate: [
			(username, callback) => {
				User.findOne({ username: username }, (err, doc) => {
					if (err) return callback(false);
					if (!_.isEmpty(doc)) return callback(false)
					return callback(true);
				});
			},
			'Username already taken'
		]
	},
	password_hash: { type: String, required: true },
	name: { type: String, required: true },
	surname: { type: String, required: true },
	level: { type: Number, default: 0, required: true },
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

UserSchema.methods.toClient = function() {
	return {
		user_id: this._id,
		username: this.username,
		name: this.name,
		surname: this.surname,
		level: this.level,
		achievements: this.achievements,
		friends: this.friends
	};
};

var User = mongoose.model('User', UserSchema);

module.exports = User;