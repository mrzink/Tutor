var app=angular.module('loginApp', ['ui.router','Services','Controllers','ngResource']);
app.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('add',{
		url:'/add',
		templateUrl:'template/register.html',
		controller:'userController'
	})
	.state('edit',{
		url:'/:id}',
		templateUrl:'template/register.html',
		controller:'editController'
	})
	.state('list',{
		url:'/users',
		templateUrl:'template/listusers.html',
		controller:'viewController'
	})
	.state('login',{
		url:'/',
		templateUrl:'template/login.html',
		controller:'loginController'
	});
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
})
.run(function($state){
	console.log('asdasdasddsasdsddasasdsa');
	$state.go('login');
});