var gameToClientProtected = require('../game-to-client-protected');

module.exports = function(mongoose, connection) {
	if (mongoose.models.Game) return mongoose.models.Game;

	if (!connection) connection = mongoose;

	var Schema = mongoose.Schema;
	var ObjectId = Schema.Types.ObjectId;

	var GameSchema = Schema({
		owner_id: { type: ObjectId, index: true, required: true },
		name: { type: String, required: true },
		members: { type: [ObjectId], required: true },
		state: {
			day: Number,
			status: {
				code: { type: String, required: true },
				winner: String,
				message: String
			},
			players: [
				{
					user_id: { type: ObjectId, required: true },
					role: { type: String },
					alive: { type: Boolean },
					data: { type: Schema.Types.Mixed }
				}
			],
			votes: [
				{
					user_id: { type: ObjectId, required: true },
					vote: { type: Schema.Types.Mixed },
					day: { type: Number, required: true }
				}
			]
		},
		gen_info: {
			min_players: { type: Number, required: true },
			max_players: { type: Number, required: true },
			roles: { type: Schema.Types.Mixed },
			random: { type: Schema.Types.Mixed }
		},
	}, {
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	});

	GameSchema.methods.toClient = function() {
		return {
			game_id: this._id,
			owner_id: this.owner_id,
			name: this.name,
			members: this.members,
			state: this.state,
			gen_info: this.gen_info
		};
	}

	GameSchema.methods.toClientProtected = function(user_id, role) {
		return gameToClientProtected(this, user_id, role);
	}

	GameSchema.virtual('game_id')
		.get(function() {
			return this._id;
		})
		.set(function(game_id) {
			this._id = game_id;
		});

	return connection.model('Game', GameSchema);
}
