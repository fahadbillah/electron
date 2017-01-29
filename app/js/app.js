/**
* ELECTRON Module
*
* Description
*/
angular.module('ELECTRON', [
	'ngRoute'
	])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/home.html',
		controller: 'HomeCtrl',
		routeName: 'home',
	})
	.when('/settings',{
		templateUrl: 'partials/settings.html',
		controller: 'SettingsCtrl',
		routeName: 'settings',
	})
	.when('/coa',{
		templateUrl: 'partials/coa.html',
		controller: 'COACtrl',
		routeName: 'coa',
	})
    .otherwise('/');
}]);