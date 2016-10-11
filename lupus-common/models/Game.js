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
			],
			protection: { type: Schema.Types.Mixed, default: {} }
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
		let game = {
			game_id: this._id,
			owner_id: this.owner_id,
			name: this.name,
			members: this.members,
			state: {
				status: this.state.status,
				day: this.state.day,
				players: {},
				votes: []
			},
			gen_info: {
				min_players: this.gen_info.min_players,
				max_players: this.gen_info.max_players
			}
		}
		for (let player of this.state.players)
			game.state.players[player.user_id] = {
				user_id: player.user_id,
				role: player.role,
				alive: player.alive
			};
		for (let vote of this.state.votes)
			game.state.votes.push({
				user_id: vote.user_id,
				vote: vote.vote,
				day: vote.day
			});

		return game;
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
