var express = require('express');
var router = express.Router();
var socketapi = require("../socketapi")

router.get('/', function(req, res) {
  res.render('index')
});

module.exports = router;
