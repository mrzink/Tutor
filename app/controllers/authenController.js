module.exports= function(router,passport){ 
    router.get('/',function(req,res){
        console.log('the first page');
        res.render('index.html');
    })

    router.get('/login',function(req,res){
        console.log('the second page');
       res.render('index.html');
    });
    
    router.post('/login',passport.authenticate('sign-in',{
         failureRedirect: '/login',
         failureFlash: true }),
         function(req,res){  
              if(req.isAuthenticated()===true){  
                if (req.body.remember===true) {
                     console.log('active cookie');
                      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
                } else {
                      req.session.cookie.expires = false; // Cookie expires at end of session
                }
                res.json({'login':true}); 
              }
              else{
                res.json({'login':false}); 
              }
         }
    );

    router.get('/signup',function(req,res){
        console.log('the third page');
        res.render('index.html');
    });
    
    router.post('/signup',passport.authenticate('sign-up',{
         successRedirect: '/users',
         failureRedirect: '/signup',
         failureFlash: true }
         )
    );

    router.get('/logout',function(req,res){
        req.logout();
        res.redirect('/login');
    });

    router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));
   
    router.get('/facebook/callback',passport.authenticate('facebook', 
            {
                successRedirect: '/users',
                failureRedirect: '/login' 
            }
    ));

    router.get('/google', passport.authenticate('google', {scope: ['email']}));
   
    router.get('/google/callback',passport.authenticate('google', 
            {
                successRedirect: '/users',
                failureRedirect: '/login' 
            }
    ));
};
