module.exports = function() {
	this.Then(/^The (.+) at index (.+) should be$/, function (name, index, table, callback) {
		this.check_response(index, table, name, callback);
	});
};