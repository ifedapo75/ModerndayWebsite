/**
 * Created by orajiakuchukwudalu on 2016-04-28.
 */
var db = require('../config/mongodb');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var SALT_WORK_FACTOR = 10;


var userSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': require('shortid').generate
    },
    familyName:{type: String, required: true},
    givenName:{type: String, required: true},
    username:{type: String, required: true, unique:true, index:true},
    email:{type: String, required: true, unique: true, index: true},
    password: {type: String, required: true}
}, {collection: 'ModernUser', timestamps: true});


//CHANGE THIS IN PRODUCTION
//userSchema.set('autoIndex', false);

userSchema.pre('save', function(next) {
    console.log('INFO: Encrypting user password');

    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt,function(){},function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            console.log('INFO: Encrypted user password');
            next();
        });
    });
});

userSchema.pre('update', function(next) {
    console.log('updating');
    var user = this;

// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

// generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });


});

userSchema.method({
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        })}
});

module.exports = db.model('ModernUser', userSchema);
