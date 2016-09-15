var express = require('express');
var router = express.Router();

var ping_controller = require('../controllers/ping');
var join_controller = require('../controllers/join');

router.get('/', ping_controller);
router.post('/:game_id/join', join_controller);

module.exports = router;
