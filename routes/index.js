var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', current: "home" });
});

router.use('/contact', require('./contact'));

router.use('/aboutme', require('./aboutme'));


module.exports = router;
