var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/testDb',function(err){
	if(err)
	{
		console.log('Connecting failed')	
	}
	else
	{
		console.log('Connecting success')
	}
});
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "userEmail" : String,
    "userPassword" : String
};
// create model if not exists.
module.exports = mongoose.model('users',userSchema);