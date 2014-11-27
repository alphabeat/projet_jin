var express = require('express');
var router = express.Router();

/* GET server page. */
router.get('/', function(req, res) {
  res.render('server', { title: 'Server page' });
});

module.exports = router;
