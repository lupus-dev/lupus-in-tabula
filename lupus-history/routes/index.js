var express = require('express');
var router = express.Router();

var ping_controller = require('../controllers/ping');
var new_game_controller = require('../controllers/new_game');

router.get('/', ping_controller);
router.post('/', new_game_controller);

module.exports = router;
