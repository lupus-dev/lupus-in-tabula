var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var GameSchema = Schema({
	owner_id: { type: ObjectId, index: true, required: true },
	name: { type: String, required: true },
	members: { type: [ObjectId], required: true },
	state: {
		day: Number,
		status: Number,
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
		roles: { type: Schema.Types.Mixed }
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;