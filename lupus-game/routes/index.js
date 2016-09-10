var express = require('express');
var router = express.Router();

var ping_controller = require('../controllers/ping');

router.get('/', ping_controller);

module.exports = router;
