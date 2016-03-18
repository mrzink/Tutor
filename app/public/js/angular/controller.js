	angular.module('Controllers',[])
.controller('loginController', function($scope,login,$state){
	console.log('login');
	$scope.email="";
	$scope.password="";
	$scope.login=function Login(){
		login.save({
		'userEmail':$scope.email,
		'userPassword':$scope.password
	},function(data){
		if(data.error==false)
		{	
			console.log(data.error);
			console.log('success');	
			$state.go('list');
		}
		else
		{			
			console.log('failed not err');
			console.log(data);			
		}
	})}	
})
.controller('viewController', function($scope,view,$state){
	$scope.items=view.query();
	$scope.delete= function Delete(item){
		console.log(item),
		item.$delete(function()
		{
			var a = $scope.items.indexOf(item);
		 	$scope.items.splice(a, 1)						
		})
	}
	$scope.logout= function Logout(){
		$.get('/logout',function(data){
			console.log('logout');
			$state.go('login');
		})
	}
})
.controller('userController', function($scope,view,$state){
	$scope.user= new view();
	console.log('sadasd');
	$scope.submit=function Submit()
	{
		console.log('submit')
		$scope.user.$save(function(data){
		console.log(data);
		$state.go('list');
		})
	}
})
.controller('editController', function($scope,view,$stateParams,$state){
	console.log('edit');	
	$scope.user= view.get({'id': $stateParams.id});
	console.log($scope.user);
	$scope.submit=function Submit()
	{	
		$scope.user.$update(function(){
			console.log($scope.user);
			$state.go('list');
		})	
	}
});
