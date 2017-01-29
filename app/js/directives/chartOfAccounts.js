/**
* ELECTRON Module
*
* Description
*/
angular.module('ELECTRON')
.directive('chartOfAccounts', ['$compile', '$filter', '$window', function($compile, $filter, $window){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			data: '=',
			toggleCOAForm: '&',
			coaItemSubmit: '&',
			showCOAForm: '=?showCOAForm',
			coaItemForm: '=?coaItemForm',
			coaItem: '=?coaItem'
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'partials/directives/coa.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			console.log($scope);

			var iElm = iElm;
			$scope.selectParent = function(id) {

			};


			$('chart-of-accounts').on('click', '.parent', function(event) {
				if ($(this).hasClass('fa-folder')) {
					$(this).removeClass('fa-folder').addClass('fa-folder-open');
					var currentItemId = $(this).closest('li').attr('data-id').split('_')[1];
					console.log('clicked : '+currentItemId);
					var data = $scope.data.filter(function(number){
					    return (number.parentId === parseInt(currentItemId));
					});
					
					console.log(data);
					console.log('no of child : '+data.length);

					var html = '';
					html += '<ul>';
					for (d in data) {
						html += '<li data-id="id_'+data[d].id+'" data-parent="pid_'+data[d].parentId+'">';
						html += '<i class="fa fa-folder parent"></i>&nbsp'+data[d].name+'<span class="pull-right"><i class="fa fa-plus" ng-click="toggleCOAForm('+data[d].id+')"></i> <i class="fa fa-edit"></i> <i class="fa fa-trash" ng-click="deleteItem('+data[d].id+')"></i></span>';
						html += '</li>';
					}
					html += '</ul>';
					elmnt = $compile( html )( $scope );
					console.log($('[data-id="id_'+currentItemId+'"'));
					$('[data-id="id_'+currentItemId+'"').append( elmnt );
				} else {
					$(this).removeClass('fa-folder-open').addClass('fa-folder');
					$(this).closest('li').children('ul').remove();
				}
				
			});



			$scope.toggleCOAForm = function(parentId) {
				$scope.coaItem = {
					id: Math.floor(Math.random()*1000)+1,
					name: '',
					parentId: parentId
				}
				$scope.showCOAForm = $scope.showCOAForm ? false : true;
				$('[name="name"]').focus();
			};

			$scope.coaItemSubmit = function(coa) {
				$scope.data.push(coa);
				$window.localStorage.setItem('coa', JSON.stringify($scope.data))
				console.log($scope.data);
				$scope.showCOAForm = false;
				$scope.coaItem = null;
				$scope.coaItemForm.$setPristine();
				if ($('[data-id="id_'+coa.parentId+'"]').hasClass('fa-folder-open')) {
					var html = '';
					html += '<ul>';
					html += '<li data-id="id_'+coa.id+'" data-parent="pid_'+coa.parentId+'">';
					html += '<i class="fa fa-folder parent"></i>&nbsp'+coa.name+'<span class="pull-right"><i class="fa fa-plus" ng-click="toggleCOAForm('+coa.id+')"></i> <i class="fa fa-edit"></i> <i class="fa fa-trash" ng-click="deleteItem('+coa.id+')"></i></span>';
					html += '</li>';
					html += '</ul>';
					elmnt = $compile( html )( $scope );
					$('[data-id="id_'+coa.parentId+'"]').append( elmnt );
				}
			};

			$scope.deleteItem = function(id) {
				var itemIndex = null;
				$scope.data.map(function(e, i) {
					if (e.id === id) {
						itemIndex = i;
					}
					if (e.parentId === id) {}
					console.log($scope.data[i]);
				})
			};
		}
	};
}])
.directive('addcoa', ['$rootScope', function($rootScope){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'partials/directives/addCoa.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
}])
.directive('active', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			data: '@'
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs) {
			$scope.$on('$routeChangeSuccess', function(event, current, prev) { 
				// if (current.$$route.routeName === ) {}
				// console.log(current);
				// console.log(prev);
				var current = current;
				$('li[active]').each(function(e){
					$(this).attr('active') === current.$$route.routeName ? $(this).addClass('active') : $(this).removeClass('active')
				});
			});
		}
	};
}]);