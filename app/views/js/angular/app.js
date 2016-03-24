var app = angular.module('app', ['ui.router','Services','Controllers','ngResource','ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		
	$routeProvider.when('/auth/signup', {templateUrl: '/template/signup.html', controller: 'signupController'});
	$routeProvider.when('/auth/login', {templateUrl: '/template/login.html',controller:'loginController'});
	$routeProvider.when('/users', {templateUrl: '/template/listusers.html',controller:'viewController'});
	$routeProvider.when('/auth/edit/:id', {templateUrl: '/template/register.html',controller:'editController'});
	$routeProvider.when('/auth/add', {templateUrl: '/template/register.html',controller:'addController'});
	$routeProvider.when('/auth/facebook', {controller:'facebookController'});
	$routeProvider.when('/auth/google', {controller:'googleController'});
	$routeProvider.otherwise({redirectTo: '/'});
	$locationProvider.html5Mode({enabled: true, requireBase: false});
}]);
