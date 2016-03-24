module.exports=function(router,passport,isLoggedIn){
	
	router.get('/users',isLoggedIn,function(req, res){		
            res.render('index.html');
    });
    router.get('/*', function(req, res){
    	console.log('*');
		res.redirect('/users');
	})
}