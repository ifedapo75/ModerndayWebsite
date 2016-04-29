/**
 * Created by orajiakuchukwudalu on 2016-04-28.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('about-me', {title: "About Me", current: "aboutme"});
});

module.exports = router;
