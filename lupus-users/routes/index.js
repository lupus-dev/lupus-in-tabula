var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    status: 'Lupus in Tabula users microservice!'
  });
});

module.exports = router;
