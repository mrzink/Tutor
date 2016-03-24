var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');

var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  =  new mongoSchema({
	userLocal:{
	    "userEmail" : { type: String, index: { unique: true }}, 
	    "userPassword" : String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
}
userSchema.methods.isValidPassword= function(userPassword,password){
	return bcrypt.compareSync(userPassword, password);
}
// create model if not exists.
var Users=mongoose.model('users',userSchema);
module.exports = Users;
