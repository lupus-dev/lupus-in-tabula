var express = require('express');
var router = express.Router();

var ping_controller = require('../controllers/ping');
var new_user_controller = require('../controllers/new_user');
var generic_user_controller = require('../controllers/generic_user');

router.get('/', ping_controller);
router.post('/', new_user_controller);

router.get('/:user_ids', generic_user_controller);

module.exports = router;
