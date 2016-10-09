module.exports = function() {
	this.Then(/^Wait (.+) ms$/, function (ms, callback) {
		setTimeout(() => callback(), ms);
	});
};
