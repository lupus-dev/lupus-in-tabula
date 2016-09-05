module.exports = function() {
	var $this = this;
	require('fs').readdirSync(__dirname + '/step_definitions/').forEach(function(file) {
		if (file.match(/\.js$/) !== null) {
			var name = file.replace('.js', '');
			require('./step_definitions/' + name).call($this);
		}
	});
};