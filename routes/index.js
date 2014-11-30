var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {title: 'Client page'})
});

router.get('/server', function(req,res) {
	res.render('server', {title: 'Server page'})
});

module.exports = router;
