var app = angular.module('app', ['ngRoute'], function ($httpProvider) {

	// Use x-www-form-urlencoded Content-Type
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		
	// Override $http service's default transformRequest
	  $httpProvider.defaults.transformRequest = [function(data) {
	    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	  }];
	});
	app.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'componenteCalendarios/vistaCalendarios.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
