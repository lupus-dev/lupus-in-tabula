var express = require('express');
var router = express.Router();

var ping_controller = require('../controllers/ping');
var join_controller = require('../controllers/join');
var leave_controller = require('../controllers/leave');
var open_controller = require('../controllers/open');

router.get('/', ping_controller);
router.post('/:game_id/join', join_controller);
router.delete('/:game_id/leave', leave_controller);
router.post('/:game_id/open', open_controller);

module.exports = router;
