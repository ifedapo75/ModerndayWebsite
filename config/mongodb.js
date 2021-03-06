/**
 * Created by orajiakuchukwudalu on 2016-03-19.
 */
var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost/dapo';
var mongodbOptions = { };


/*
 //configuration for single connection
 //connection linked to mongoose, e.g. for model use "mongoose.model('User', User);"
 mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
 if (err) {
 console.log('Connection refused to ' + mongodbURL);
 console.log(err);
 } else {
 console.log('Connection successful to: ' + mongodbURL);
 }
 });
 */

//configuration for multiple connections
var connection = mongoose.createConnection(mongodbURL, mongodbOptions, function(err){
    if (err) {
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + mongodbURL);
    }
});

module.exports = connection;