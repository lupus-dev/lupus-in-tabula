var express = require('express');
var router = express.Router();

var ping_controller = require('../controllers/ping');
var new_user_controller = require('../controllers/new_user');
var current_user_controller = require('../controllers/current_user');
var generic_user_controller = require('../controllers/generic_user');
var login_controller = require('../controllers/login');
var logout_controller = require('../controllers/logout');

router.get('/', ping_controller);
router.post('/', new_user_controller);

router.get('/me', current_user_controller);
router.get('/:user_ids', generic_user_controller);

router.post('/session', login_controller);
router.delete('/session', logout_controller);

module.exports = router;
