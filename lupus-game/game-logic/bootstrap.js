var processGameUpdate = require('./process-game-update');

module.exports = function() {
	global.Game.changeEvent().on('game:update', processGameUpdate);
};