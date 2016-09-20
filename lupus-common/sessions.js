var crypto = require('crypto');
const TOKEN_DURATION = 6*60*60*1000;

module.exports = function(redis) {
	return {
		genSession: function(user) {
			var session = {
				token: this.genToken(),
				user_id: user.user_id,
				expire_date: this.genExpireDate()
			};
			this.setSession(session);
			return session;
		},
		genToken: function() {
			return crypto.randomBytes(24).toString('hex');
		},
		genExpireDate: function() {
			var now = new Date();
			now.setTime(now.getTime() + TOKEN_DURATION);
			return now;
		},
		setSession: function(session) {
			redis.hmset('session:'+session.token, {
				user_id: session.user_id.toString(),
				expire_date: JSON.stringify(session.expire_date)
			});
		},
		getSession: function(token, callback) {
			redis.hgetall('session:'+token, (err, obj) => {
				if (!obj) return callback(err, null);
				var session = {
					token: token,
					user_id: obj.user_id,
					expire_date: JSON.parse(obj.expire_date)
				}
				return callback(err, session);
			});
		},
		renewSession: function(session) {
			session.expire_date = this.genExpireDate();
			redis.hset('session:'+session.token, 'expire_date', JSON.stringify(session.expire_date));
			return session;
		},
		removeSession: function(session) {
			redis.del('session:'+session.token);
		}
	};
};
