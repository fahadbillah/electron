/**
* ELECTRON Module
*
* Description
*/
angular.module('ELECTRON')
.controller('COACtrl', ['$scope', '$window', function($scope, $window){
	$scope.coa = JSON.parse($window.localStorage.getItem('coa')) || [
	{
		id: 1,
		name: 'Assets',
		parentId: null
	},
	{
		id: 2,
		name: 'Liability & Equity',
		parentId: null
	},
	{
		id: 3,
		name: 'Revenue',
		parentId: null
	},
	{
		id: 4,
		name: 'Expense',
		parentId: null
	},
	{
		id: 5,
		name: 'Non-current Assets',
		parentId: 1
	},
	{
		id: 6,
		name: 'current Assets',
		parentId: 1
	},
	];

	$scope.showCOAForm = false;
	


	// $scope.toggleCOAForm = function(parentId) {
	// 	$scope.coaItem = {
	// 		id: Math.floor(Math.random()*1000)+1,
	// 		name: '',
	// 		parentId: parentId
	// 	}
	// 	$scope.showCOAForm = $scope.showCOAForm ? false : true;
	// };
	// $scope.coaItemSubmit = function(coa) {
	// 	$rootScope.coa.push(coa);
	// };

	
}]);