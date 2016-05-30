var routeModule = angular.module('routeModule', []).

config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/patient', {
			templateUrl: 'newpatient.html',
			controller: 'testController'
		}).
		when('/collection', {
			templateUrl: 'collection.html',
			controller: 'collectionController'
		}).
		when('/facility', {
			templateUrl: 'newfacility.html',
			controller: 'facilityController'
		}).
		when('/editfacility', {
			templateUrl: 'newfacility.html',
			controller: 'editFacilityController'
		}).
		when('/facilities', {
			templateUrl: 'facilities.html',
			controller: 'facilityController'
		}).
		when('/doctor', {
			templateUrl: 'newdoctor.html',
			controller: 'doctorController'
		}).
		when('/editdoctor', {
			templateUrl: 'newdoctor.html',
			controller: 'editDoctorController'
		}).
		when('/doctors', {
			templateUrl: 'doctors.html',
			controller: 'doctorController'
		}).
		when('/insurance', {
			templateUrl: 'newinsurance.html',
			controller: 'insuranceController'
		}).
		when('/editinsurance', {
			templateUrl: 'newinsurance.html',
			controller: 'editInsController'
		}).
		when('/insurances', {
			templateUrl: 'insurances.html',
			controller: 'insuranceController'
		}).
		when('/appeals', {
			templateUrl: 'appeals.html',
			controller: 'appealsController'
		}).
		when('/pcpletter', {
			templateUrl: 'pcp.html',
			controller: 'pcpController'
		}).
		when('/dashboard', {
			templateUrl: 'dashboard.html',
			controller: 'dashboardController'
		}).
		when('/patients', {
			templateUrl: 'patients.html',
			controller: 'testController'
		}).
		when('/editpatient', {
			templateUrl: 'newpatient.html',
			controller: 'editController'
		}).
		otherwise({
			redirectTo: '/dashboard'
		})
}]);