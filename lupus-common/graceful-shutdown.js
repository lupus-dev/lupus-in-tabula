module.exports = function(server) {
	return function() {
		console.log("Received stop signal, shutting down gracefully.");
		server.close(function() {
			console.log("Closed out remaining connections.");
			process.exit()
		});

		// if after
		setTimeout(function() {
			console.error("Could not close connections in time, forcefully shutting down");
			process.exit()
		}, 10*1000);
	}
};
