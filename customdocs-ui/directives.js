angular.module('myApp').
	directive('formField', function(Patient){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			 scope: {
			 	fields: '=',
			 	model: '=',
			 }, // {} = isolate, true = child, false/undefined = no change
			//controllerAs: 'testController',
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			 restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			 templateUrl: 'formfieldtemplate.html',
			 replace: true,
			 link: function($scope, element, attrs) {
			 	
			 }
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		};
	}).

	directive('selectField', function(){
		return{
			scope: {
				fields:'=',
				model:'=',
				addEntity: '&addEntity'
			},
			restrict: 'E',
			templateUrl: 'selectfieldtemplate.html',
			replace: true,
		};
	});