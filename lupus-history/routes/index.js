var express = require('express');
var router = express.Router();

var ping_controller = require('../controllers/ping');
var new_game_controller = require('../controllers/new_game');
var all_games_controller = require('../controllers/all_games');

router.get('/', ping_controller);
router.post('/games', new_game_controller);

router.get('/games', all_games_controller);

module.exports = router;
