/**
 * Created by orajiakuchukwudalu on 2016-04-28.
 */
var db = require('../config/mongodb');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var postSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': require('shortid').generate
    },
    title:{type: String, required: true},
    body:{type: String, required: true, unique:true, index:true}
}, {collection: 'ModernPost', timestamps: true});


//CHANGE THIS IN PRODUCTION
//userSchema.set('autoIndex', false);

postSchema.pre('save', function(next) {

});

postSchema.pre('update', function(next) {

});

postSchema.method({

});

module.exports = db.model('ModernPost', postSchema);
