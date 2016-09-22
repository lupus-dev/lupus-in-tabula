var express = require('express');
var router = express.Router();

var ping_controller = require('../controllers/ping');
var engine_controller_factory = require('../controllers/shared/engine_controller_factory');

router.get('/', ping_controller);
router.post('/:game_id/join', engine_controller_factory('game:join'));
router.delete('/:game_id/leave', engine_controller_factory('game:leave'));
router.post('/:game_id/open', engine_controller_factory('game:open'));
router.post('/:game_id/close', engine_controller_factory('game:close'));

module.exports = router;
