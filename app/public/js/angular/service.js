angular.module('Services',[])
.factory('login',function($resource){
	return $resource('/api/login');
})
.factory('view', function($resource){
	return $resource('/api/users/:id', { id: '@_id' }, {
   				 update: {method: 'PUT'}, 			
  });
});
