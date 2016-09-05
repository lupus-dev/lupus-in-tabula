module.exports = function(username, password, callback) {
	this.apickli.addRequestHeader('Content-Type', 'application/json');
	var credentials = { username: username, password: password };
	this.apickli.setRequestBody(JSON.stringify(credentials));
	this.apickli.post('/users/session', (err, response) => {
		callback(JSON.parse(response.body));
	});
};