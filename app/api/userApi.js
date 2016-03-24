var Users= require('../models/userModel.js');
module.exports=function(router,passport){
    router.route('/list')
    	.get(function(req,res){
    		console.log('api');
            Users.find({},function(err,data){           
                res.json(data);
            });
         })
    	.post(function(req,res){
            console.log('post');
    		Users.findOne({'userLocal.userEmail':req.body.userLocal.userEmail},function(err,user){
    			if(err)
    				console.error(err);
    			else{
    				if(user){
    					console.log('use is exist');
    					res.json({'error':'User is exist', 'add':false});
    				}else{
    					newUser= new Users();
    					newUser.userLocal.userEmail=req.body.userLocal.userEmail;                       
    					newUser.userLocal.userPassword=newUser.generateHash(req.body.userLocal.userPassword);
    					newUser.save(function(err){
    						if(err){
    							console.log(err);
    							res.json({'error':'add user failed','add':false});
    						}
    						else{
    							res.json({'error':'add success','add':true});
    						}
    					});
    				}
    			}
    		})
    	});

    router.route('/list/:id')
    	.get(function(req,res){
    		console.log('api');
            console.log(req.param.id);
            Users.findById({'_id':req.params.id},function(err,data){           
                res.json(data);
            });
         })
    	.put(function(req,res){
    		Users.findById({'_id':req.params.id},function(err,user){
    			if(err)
    				console.error(err);
    			else{
    				if(user){							   					   				 				
    					user.userLocal.userEmail=req.body.userLocal.userEmail;
    					user.userLocal.userPassword=user.generateHash(req.body.userLocal.userPassword);
    					user.save(function(err){
    						if(err){
    							console.log(err);
    							res.json({'error':'edit user failed','edit':false});
    						}
    						else{
    							res.json({'error':'add success','edit':true});
    						}
    					});
    				}
    				else{
    					res.json({'error':'edit user failed','edit':false});
    				}
    			}
    		})
    	})
    	.delete(function(req,res){
    		Users.findById({'_id':req.params.id},function(err,user){
    			if(err)
    				console.error(err);
    			else{
    				if(user){
    					user.remove(function(err){
    						if(err){
    							console.log(err);
    							res.json({'error':'delete user failed','delete':false});
    						}
    						else{
    							res.json({'error':'delete success','delete':true});
    						}
    					});
    				}
    				else{
    					res.json({'error':'delete user failed','delete':false});
    				}
    			}
    		})
    	});
}