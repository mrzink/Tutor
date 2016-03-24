var configAuth2= require('../configs/auth.js');
var Users= require('../models/userModel.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports= function(passport){
	passport.use(new GoogleStrategy({
	    clientID: configAuth2.googleAuth.clientID,
	    clientSecret:configAuth2.googleAuth.clientSecret,
	    callbackURL: configAuth2.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		Users.findOne({'google.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				var newUser = new Users();
	    				newUser.google.id = profile.id;
	    				newUser.google.token = accessToken;
	    				newUser.google.name = profile.displayName;
	    				newUser.google.email = profile.emails[0].value;
	    				newUser.userLocal.userEmail=profile.emails[0].value;
	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    				console.log(profile);
	    			}
	    		});
	    	});
	    }

	));

}