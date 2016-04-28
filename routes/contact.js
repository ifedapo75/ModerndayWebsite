/**
 * Created by orajiakuchukwudalu on 2016-04-28.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    var email = req.body.email;
    var message = req.body.message;
    var name = req.body.name;


    res.render('index', { title: 'Express' });
});

module.exports = router;
