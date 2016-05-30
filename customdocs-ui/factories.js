 myApp.factory('Patient', function($resource){
 	return $resource('/customdocs/service/patient');
 }).
 factory('Facility', function($resource){
 	return $resource('/customdocs/service/facility');
 }).
  factory('GetFacility', function($resource){
 	return $resource('/customdocs/service/getfacility');
 }).
  factory('EditFacility', function($resource){
 	return $resource('/customdocs/service/editfacility');
 }).
 factory('Doctors', function($resource){
 	return $resource('/customdocs/service/doctor');
 }).
 factory('GetDoctor', function($resource){
 	return $resource('/customdocs/service/getdoctor');
 }).
 factory('Insurances', function($resource) {
 	return $resource('/customdocs/service/insurance');
 }).
 factory('EditInsurance', function($resource) {
 	return $resource('/customdocs/service/editinsurance');
 }).
 factory('AppealsLetter', function($resource){
 	return $resource('/customdocs/service/appealsletter');
 }).
 factory('OpenAppealsLetters', function($resource){
 	return $resource('/customdocs/service/openappealsletters');
 }).
 factory('EditAppealLetter', function($resource){
 	return $resource('/customdocs/service/editappealletter');
 }).
 factory('EditPatients', function($resource){
 	return $resource('/customdocs/service/editpatient');
 }).
 factory('Collection', function($resource){
 	return $resource('/customdocs/service/collectionletter');
 }).
 factory('GetPatient', function($resource){
 	return $resource('/customdocs/service/getpatient');
 }).
 factory('GetPCPLetters', function($resource){
 	return $resource('/customdocs/service/pcpletters');
 });