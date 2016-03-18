try
{ 
    var express     =   require('express');
    var session     =   require('express-session');
    var bodyParser  =   require('body-parser');
    var app         =   express();
    var router      =   express.Router();
    var favicon=require('serve-favicon');
    var models= require('./app/models/mongo.js');
    var sess;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({'extended' : false}));
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/app/public');
    console.log(__dirname);
    app.use(express.static(__dirname+'/app/public'));
    app.use(favicon(__dirname + '/app/public/images/favicon.ico'));
    app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

    router.get('/',function(req,res){
        sess=req.session;
        console.log('config ssss'+sess.email);
        if(sess.email)
        {
            res.redirect('/users');
        }
        else
        {
            res.render('index.html');
        }
    });
    
    router.get('/users',function(req,res){
        sess=req.session;
        if(sess.email) 
        { 
            console.log('session send')
            res.render('index.html');
        }
        else
        {
            res.redirect('/');  
            console.log('session send')
        }
    });
   
    router.get('/logout',function(req,res){
         req.session.destroy(function(err){
                if(err){
                    console.log(err);
                }
                else
                {
                   console.log('end session'); 
                    res.redirect('/');
                    console.log("destroysssss");
                }
               
            });
    });

    router.route('/api/users/')
        .get(function(req,res){
            models.find({},function(err,data){
            // Mongo command to fetch all data from collection.         
                console.log(data);                 
                res.json(data);
            });
         })
        .post(function(req,res){
            var db = new models();
            var response = {};
            // fetch email and password from REST request.
            // Add strict validation when you use this in Production.
            db.userEmail = req.body.userEmail; 
            // Hash the password using SHA1 algorithm.
            db.userPassword =  require('crypto')
                              .createHash('sha1')
                              .update(req.body.userPassword)
                              .digest('base64');
            db.save(function(err){
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
                if(err) 
                {
                    response = {"error" : true,"message" : "Error adding data"};
                } 
                else
                {
                    response = {"error" : false,"message" : "Data added"};
                }
                res.json(response);
            });
         });
    router.route('/api/users/email/:email')
    		.get(function(req,res){
    			var response={};
    			models.find({'userEmail': req.params.email},function(err,data){
    				if(err)
    				{
    					response={'error':true,'message':'Not fetching data'};
    				}
    				else
    				{
    					response={'error':false,'message':data};
    					console.log(data);
    				}				
    				res.json(response);
    			})
    		})
    router.route('/api/users/:id')            
    		.get(function(req,res){
                 models.findById(req.params.id,function(err,data){
            // Mongo command to fetch all data from collection.         
                console.log(data);                 
                res.json(data);
                });
            })
    		.put(function(req,res){
    			var response={}
                console.log(req.params.id);
                console.log(req.body.userEmail);
    			models.findById(req.params.id,function(err,data){
    				if(err)
    				{
    					response = {"error" : true,"message" : "Error fetching data"};
    				}
    				else
    				{
    					 if(req.body.userEmail !== undefined) 
    					 {
                        // case where email needs to be updated.
                        	data.userEmail = req.body.userEmail;
                    	 }
                   		 if(req.body.userPassword !== undefined) 
                   		 {
                        // case where password needs to be updated
                       		data.userPassword = require('crypto')
                                                .createHash('sha1')
                                                .update(req.body.userPassword)
                                                .digest('base64');
                    	 }
                    	 data.save(function(err)
                    	 {	
                    	 	 if(err) 
                			 {
                   				 response = {"error" : true,"message" : "Error adding data"};
               				 } 
               				 else
                			 {
                   				 response = {"error" : false,"message" : "Data edit"};
                			 }  
                             res.json(response)     			 
                    	 })
    				}             
    				
    			})
    		})
            .delete(function(req,res){
                var response={};
                models.findById(req.params.id,function(err,data){
                    if(err)
                    {
                        response={'error':true,'message':'Error fetching data'};
                    }
                    else
                    {
                        models.remove({'_id': req.params.id},function(error){
                            if(err)
                            {
                                response={'error':true,'message':"Error delete data"};
                            }
                            else
                            {
                                  response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                            }
                            res.json(response);
                        })
                    }
                })
            });
    router.route('/api/login')
        .post(function(req,res){

                var user= req.body.userEmail;
                var pass=require('crypto')
                              .createHash('sha1')
                              .update(req.body.userPassword)
                              .digest('base64');
                var response={};
                console.log(req.body.userEmail);
                console.log(req.body.userPassword);
                models.findOne({ $and:[
                        {'userEmail':user},
                        {'userPassword':pass}
                        ]
                },function(err,data){
                    if(err)
                    {
                       response={'error':true,'message':'login failed'}; 
                    }
                    else
                    {            
                       if(data!=null)
                       {      
                         sess=req.session;   
                         sess.email=req.body.userEmail;                             
                         response={'error':false,'message':'login success'}; 
                       }  
                       else{
                         response={'error':true,'message':'login failed'}; 
                       }   
                    }
                    console.log(response);
                    res.json(response);
                });
         });      
    app.use('/',router);    
    app.set('port', process.env.PORT || 3000);

    var server= app.listen(app.get('port'), function() 
    {
         console.log('Express server listening on port ' + server.address().port);
    });
    console.log('Listening to PORT 3000');
}
catch(er){
    console.log('catch');
   console.log(er); 
}