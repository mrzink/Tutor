angular.module('Services',[])
.factory('api', function($resource){
	return $resource('/api/list/:id', { id: '@_id' }, {
   				 update: {method: 'PUT'}, 			
  });
})
.factory('authen',function ($http,$q) {	
	return {
		login: function($scope){
			return $http.post('/auth/login',{
				userEmail:$scope.userEmail,
				userPassword:$scope.userPassword,
				remember:$scope.remember			
			})
			.then(
				function(res){
					return res;
				},
				function(err){
					console.log(err);
					return $q.reject(err);
				}	
			);
		},
		signup: function($scope){
			return $http.post('/auth/signup',{
				userEmail:$scope.userEmail,
				userPassword:$scope.userPassword
			})
			.then(
				function(res){
					return res;
				},
				function(err){
					console.log(err);
					return $q.reject(err);
				}	
			);
		},
		logout: function($scope){
			return $http.get('/auth/logout')
			.then(
				function(res){
					return res;				
				},
				function(err){
					console.log(err);
					return $q.reject(err);
				}	
			);
		}
	};
})
