module.exports = function(req, res) {
	if (!req.session) {
		res.status(401).json({ error: "You have to provide a correct token to do this" });
		return false;
	}
	return true;
};
