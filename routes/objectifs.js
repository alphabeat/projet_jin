var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/objectifslist', function(req, res) {
  var db = req.db;
  db.collection('objectifs').find().toArray(function(err, items){
  	res.json(items);
  });
});

/* POST to add objectif */
router.post('/addobjectif', function(req, res) {
    var db = req.db;
    db.collection('objectifs').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
