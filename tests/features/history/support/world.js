var World = function() {
	require('../../common/world')(this);
};

module.exports = function() {
	this.World = World;
};