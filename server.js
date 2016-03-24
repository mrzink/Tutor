try
{ 
    //define module 
    var express     =   require('express');
    var session     =   require('express-session');
    var bodyParser  =   require('body-parser');
    var app         =   express();
    var cookieParser= require('cookie-parser');
    var favicon=require('serve-favicon');
    var passport=require('passport');
    var flash=require('connect-flash');
    var dirRoot=__dirname;
  
      //connect to mongo database
    var mongoose=require('mongoose');
    var connectionString= require(dirRoot +'/app/configs/dbconfig.js');
    var initpassport=require(dirRoot +'/app/authentications/passport.js');
    initpassport(passport);
    mongoose.connect(connectionString.url,function(err){
            if(err){
                console.log('Connecting failed')    
            }
            else{
                console.log('Connecting success')
            }
    });

    //setting app
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({'extended' : false}));
    app.engine('html', require('ejs').renderFile);
    app.set('views', dirRoot + '/app/views');
    app.use(express.static(dirRoot +'/app/views'));
    app.use(favicon(dirRoot + '/app/views/images/favicon.ico'));
    app.use(cookieParser());
    app.use(session({secret: 'anystringoftext',
                     saveUninitialized: true,
                     resave: true,
                     }));
   
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
              res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
              res.setHeader('Access-Control-Allow-Credentials', true);
              if ('OPTIONS' == req.method) {
                    res.send(200);
              } else {               
                  next();
              }            
    });

    var isLoggedIn=function isLoggedIn(req, res, next) {
                 if(req.isAuthenticated()===true){
                         return next();
                 }    
                 console.log(req.isAuthenticated());     
                 res.redirect('/auth/login');
           
    }

     var api= express.Router();
     require(dirRoot + '/app/api/userApi.js')(api,passport);
     app.use('/api',api);

     //using authen controller
    var auth=express.Router();
    require(dirRoot + '/app/controllers/authenController.js')(auth,passport);
    app.use('/auth',auth);
 
    //using basic controller
    var basic=express.Router();
    require(dirRoot + '/app/controllers/basicController.js')(basic,passport,isLoggedIn);
    app.use('/',basic);
     
    // creater nodejs server
    app.set('port', process.env.PORT || 3000);
    var server= app.listen(app.get('port'), function() 
    {
         console.log('Express server listening on port ' + server.address().port);
    });
}
catch(er){
   console.log(er); 
}