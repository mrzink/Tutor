var Users= require('../models/userModel.js');
var LocalStrategy =require('passport-local').Strategy;
module.exports= function(passport){
	passport.use('sign-up', new LocalStrategy({
		usernameField: 'userEmail',
		passwordField: 'userPassword',
		passReqToCallback: true
	},
	function(req, userEmail, userPassword, done){
		console.log(userEmail);
		process.nextTick(function(){
			Users.findOne({'userLocal.userEmail': userEmail}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				} else {
					var newUser = new Users();
					newUser.userLocal.userEmail = userEmail;
					console.log(userPassword);
					newUser.userLocal.userPassword= newUser.generateHash(userPassword);				
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			})

		});
	}));
}