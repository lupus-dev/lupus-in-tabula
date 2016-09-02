var express = require('express');
var router = express.Router();

var new_user_controller = require('../controllers/new_user');

router.get('/', function(req, res, next) {
  res.json({
    status: 'Lupus in Tabula users microservice!'
  });
});

router.post('/', function(req, res, next) {
	return new_user_controller(req, res, next);
})

module.exports = router;
