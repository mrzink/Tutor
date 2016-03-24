var Users= require('../models/userModel.js');
var login=require('../authentications/login.js')
var signup=require('../authentications/signup.js')
var facebook=require('../authentications/facebook.js')
var google=require('../authentications/google.js')
module.exports=function(passport){

	passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
            done(err, user);
        });
    });

    login(passport);
    signup(passport);
    facebook(passport);
    google(passport);
}