 var Users= require('../models/userModel.js');
 var LocalStrategy =require('passport-local').Strategy;
 module.exports=function(passport){
 passport.use('sign-in', new LocalStrategy({
    usernameField: 'userEmail',
    passwordField: 'userPassword', 
    passReqToCallback : true
  },function(req, userEmail, userPassword,done) { 
    Users.findOne({'userLocal.userEmail':userEmail }, 
      function(err, user) {
                if (err){
                  console.log(err);
                  return done(err);
                }
                // Username does not exist, log error & redirect back
                if (!user){
                    console.log('User Not Found with username '+userEmail);
                    return done(null, false, req.flash('message', 'User Not found.'));                 
                }
                if (!user.isValidPassword(userPassword, user.userLocal.userPassword)){
                    console.log(user.userLocal.userEmail);
                    console.log(userPassword);
                    console.log('Invalid Password');
                    return done(null, false, 
                        req.flash('message', 'Invalid Password'));
                }
                return done(null, user);                
      }
    );
  }));
}