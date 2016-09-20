var EngineManager = require('./engine-manager');

module.exports = function() {
	global.EngineManager = new EngineManager();
};
