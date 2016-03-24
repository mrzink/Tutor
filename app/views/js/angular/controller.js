angular.module('Controllers',[])
.controller('viewController', function($scope,api,authen,$location){
	$scope.items=api.query();
	$scope.delete= function Delete(item){
		console.log(item),
		item.$delete(function(data)
		{
			if(data.delete===true){
				var a = $scope.items.indexOf(item);
			 	$scope.items.splice(a, 1)	
		 	}					
		})
	}
	$scope.logout= function Logout(){
		authen.logout()
			  .then(
			  		function(d){
			  			console.log(d);
			  			$location.path('auth/login');
			  		},
			  		function(e){
			  			console.log(e);
			  		}
			  	);
	}
})
.controller('addController', function($scope,api,$location){
	$scope.user= new api();
	console.log($scope.user);
	$scope.submit=function Submit()
	{
		console.log('add')
		$scope.user.$save(function(data){
			console.log(data);
			if(data.add===true){
				$location.path('/users');
			}
		})
	}
})
.controller('editController', function($scope,api,$routeParams,$location){
	console.log('edit');
	console.log($routeParams.id);	
	$scope.user= api.get({'id': $routeParams.id});
	$scope.submit=function Submit()
	{	
		$scope.user.$update(function(data){
			console.log($scope.user);
			if(data.edit===true){
				$location.path('/users');
			}		
		})	
	}
})
.controller('facebookController',function ($scope,$window) {	
	$scope.urlFacebook= function(){
		console.log('facebook');
			$window.location = $window.location.protocol + "//" + $window.location.host + "/auth/facebook";			
	}	
})
.controller('googleController',function ($scope,$window) {
	console.log('google');
	$scope.urlGoogle= function(){	
			console.log('google');
			$window.location = $window.location.protocol + "//" + $window.location.host +  "/auth/google";			
	}	
})
.controller('loginController', function ($scope,authen,$location) {
	$scope.login=function(){
		authen.login($scope)
			  .then(
			  		function(d){
			  			console.log(d);
			  			if(d.data.login===true){
			  				console.log('abdsfsfjsdsf');
			  				$location.path('/users');
			  			}
			  		},
			  		function(e){
			  			console.log(e);
			  			console.log('abdsfsfjsdsf++++');
			  		}
			  );
	}	
})
.controller('signupController', function ($scope,authen,$location) {
	console.log('signup');
	$scope.signup=function(){
		authen.signup($scope)
			  .then(
			  		function(d){
			  			console.log(d);
			  			$location.path('/users');
			  		},
			  		function(e){
			  			console.log(e);
			  		}
			  );
	}	
});

