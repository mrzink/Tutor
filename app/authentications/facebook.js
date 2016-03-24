var configAuth2= require('../configs/auth.js');
var Users= require('../models/userModel.js');
var FacebookStrategy = require('passport-facebook').Strategy;
module.exports= function(passport){
	passport.use(new FacebookStrategy({
    clientID: configAuth2.facebookAuth.clientID,
    clientSecret: configAuth2.facebookAuth.clientSecret,
    callbackURL: configAuth2.facebookAuth.callbackURL,
    profileFields: ['id', 'displayName', 'link', 'photos', 'email']
  	},function(accessToken, refreshToken, profile, done) {
		    Users.findOne({'facebook.id':profile.id }, function (err, user) {
		     		if(err){
		     			console.log('errrrrr');
	    				return done(err);
		     		}
	    			if(user){
	    				console.log('errrrrr223232');
	    				return done(null, user);
	    			}
	    			else {
	    				console.log(profile);
	    				var newUser = new Users();
	    				newUser.facebook.id = profile.id;
	    				newUser.facebook.token = accessToken;
	    				newUser.facebook.name = profile.displayName;
	    				newUser.facebook.email = profile.emails[0].value;
	    				newUser.userLocal.userEmail=profile.emails[0].value;
	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    				
	    			}
      		});	
  	}
	));
}