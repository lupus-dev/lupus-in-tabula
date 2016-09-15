var _ = require('underscore');
var bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = function(mongoose, connection) {
	if (mongoose.models.User) return mongoose.models.User;

	if (!connection) connection = mongoose;

	var Achievement = require('./Achievement')(mongoose, connection);

	var Schema = mongoose.Schema;

	var UserSchema = Schema({
		username: { type: String, index: true, required: true,
			validate: [
				(username, callback) => {
					User.findOne({ username: username }, (err, doc) => {
						if (err) return callback(false);
						if (_.isEmpty(doc)) return callback(true)
						if (this._id === doc._id) return callback(true);
						return callback(false);
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

	UserSchema.methods.toClientShort = function() {
		return {
			user_id: this._id,
			username: this.username,
			name: this.name,
			surname: this.surname,
			level: this.level
		};
	};

	UserSchema.methods.isValidPassword = function(password) {
		return bcrypt.compareSync(password, this.password_hash);
	}

	UserSchema.virtual('password').set(function(password) {
		var hash = bcrypt.hashSync(password, SALT_ROUNDS);
		this.password_hash = hash;
	});

	UserSchema.virtual('user_id')
		.get(function() {
			return this._id;
		})
		.set(function(user_id) {
			this._id = user_id;
		});

	return connection.model('User', UserSchema);
}