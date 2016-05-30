var myControllers = angular.module('myControllers', []);

myControllers.
controller('testController', function($scope, $location,$route,  Patient, EditPatients, GetPatient, currentEntityService){
	$scope.patients = Patient.query();
	$scope.editVar="New Patient";
	$scope.dataObj = {};
	$scope.pfields = [
	{fieldName: 'Name', 		 placeholder: 'First Last', 		 	type: 'text', 	fieldId: 'name', 		pattern: '^[a-zA-Z ]+$', required: 'true'},
	{fieldName: 'Account Id', 	 placeholder: 'Enter Account Id', 	type: 'number', fieldId: 'accountId', 	pattern: '^[0-9]+$', required: "false"},
	{fieldName: 'Insurance Id',  placeholder: 'Enter Insurance Id', 	type: 'text', 	fieldId: 'insId', 		pattern: '^[0-9A-Za-z-]+$', required: "false"},
	{fieldName: 'Date of Birth', placeholder: 'MM/DD/YYYY', 			type: 'date', 	fieldId: 'dateOfBirth', pattern: '', required: "true"},
	{fieldName: 'Street', 		  placeholder: 'Enter Street Name', 		type: 'text', 	fieldId: 'ptStreet',pattern: '^[a-zA-Z0-9 ]+$', required: "false"},
	{fieldName: 'Town', 		  placeholder: 'Enter Town Name', 		type: 'text', 	fieldId: 'ptTown',  pattern: '^[a-zA-Z ]+$', required: "false"},
	{fieldName: 'State', 		  placeholder: 'Enter State Abbreviation',type: 'text', 	fieldId: 'ptState', pattern: '^[A-Z]{2}', required: "false"},
	{fieldName: 'ZipCode', 		  placeholder: 'Enter ZipCode', 			type: 'text', 	fieldId: 'ptZip',   pattern: '^[0-9]+$', required: "false"}];
	$scope.cancel = function(){
	}
	$scope.removePatient = function(id){
		EditPatients.remove({id: id}, function(){
				$route.reload();
		});
	
	};
	$scope.goEditRoute = function(id){
		GetPatient.get({id: id}, function(data){
			var pat = data;
			pat.dateOfBirth = new Date(pat.dateOfBirth);
			currentEntityService.setCurrentEntity(pat);
			$location.path('/editpatient');
		});
	};
	$scope.savePatient = function() {
		Patient.save($scope.dataObj, function(){
			currentEntityService.setCurrentEntity($scope.dataObj);
			$location.path('/dashboard');
		});
	}
}).
controller('editController', function($scope, $location, EditPatients, currentEntityService){
	$scope.editVar = "Edit Patient";
	$scope.pfields = currentEntityService.getPfields();
	$scope.dataObj = {};
	$scope.dataObj = currentEntityService.getCurrentEntity();
	$scope.savePatient = function(){
		EditPatients.save($scope.dataObj, function(){
					$location.path('/patients');
				});
	}
}).
controller('facilityController', function($scope, $route, Facility, $location, currentEntityService, EditFacility){
	$scope.editVar = "New Facility";
	$scope.facilityFields = currentEntityService.getFacilityFields();
	$scope.dataObj = {};
	$scope.facilities = Facility.query();
	$scope.saveFacility = function() {
		Facility.save($scope.dataObj, function(){
				$location.path("/facilities");
		});
	};
	$scope.getTableHeight = function() {
       var rowHeight = 41; // your row height
       var headerHeight = 30; // your header height
       return {
          height: ($scope.facilities.length * 42 + headerHeight + 200) + "px"
       };
    };
	$scope.gridOptions = {
		data: 'facilities', rowHeight: 41,enableHorizontalScrollbar: 0,
    	columnDefs: [
    	{field: 'facilityName', displayName: 'Facility Name'}, {field: 'npi', displayName: 'NPI'}, {field: 'taxId', displayName: 'Tax ID'},
    	{field: 'address', displayName: 'Address', cellTemplate: 
    	"<div class='ngCellText'>{{row.entity.street}}</br>{{row.entity.town}}, {{row.entity.state}} {{row.entity.zip}}</div>"},
    	{field: 'phone', displayName: 'Telephone'}, {field: 'fax', displayName: 'Fax'}, {field: 'billingPhone', displayName: "Billing Phone"},
      	{name: 'remove', displayName: 'Remove', cellTemplate: '<button class="btn btn-danger btn-sm" ng-click="grid.appScope.removeFacility(row.entity)"><span class="glyphicon glyphicon-remove-circle"></span></button>'},
      	{name: 'edit', displayName: 'Edit', cellTemplate: '<button class="btn btn-info btn-sm" ng-click="grid.appScope.goEditRoute(row.entity)"><span class="glyphicon glyphicon-edit"></span></button>'}]    
  	};
  	$scope.removeFacility = function(entity){
  		if (confirm("Are you sure you want to delete this facility?") == true){
  		EditFacility.remove({id: entity.id}, function(){
  			$route.reload();
  		});
  	}
  	}
  	$scope.goEditRoute = function(entity){
  		currentEntityService.setCurrentEntity(entity);
		$location.path('/editfacility');
  	}
}).
controller('editFacilityController', function($scope, currentEntityService, $location, EditFacility){
	$scope.editVar = "Edit Facility";
	$scope.facilityFields = currentEntityService.getFacilityFields();
	$scope.dataObj = {};
	$scope.dataObj = currentEntityService.getCurrentEntity();
	$scope.saveFacility = function(){
		EditFacility.save($scope.dataObj, function(){
			$location.path("/facilities");
		})
	}
}).
controller('doctorController', function($scope, Doctors, $location, $route, GetDoctor, currentEntityService, GetFacility){
	$scope.editVar="New Doctor";
	$scope.doctors = Doctors.query();
	$scope.dataObj = {};
	$scope.doctorFields = [
	{fieldName: 'Name', 		   placeholder: 'First Last', 		 						type: 'text', 		fieldId: 'name',  pattern: '^[a-zA-Z ]+$', required: "true"},
	{fieldName: 'NPI', 			   placeholder: 'Enter NPI Number', 						type: 'number', 	fieldId: 'npi',   pattern: '^[0-9]+$', required: "true"},
	{fieldName: 'Facility Tax ID', placeholder: 'Enter Affiliated Facility Tax ID Number', 	type: 'text', 		fieldId: 'facility', pattern: '^[0-9-]+$', required: "true"}];

$scope.gridOptions = {
		data: 'doctors', rowHeight: 35, enableHorizontalScrollbar: 0,
    	columnDefs: [
    	{field: 'name', displayName: 'Doctor Name'}, {field: 'npi', displayName: 'Doctor NPI'}, {field: 'facility', displayName: 'Facility Name'},
      	{name: 'remove', displayName: 'Remove', cellTemplate: '<button class="btn btn-danger btn-sm" ng-click="grid.appScope.removeDoctor(row.entity)"><span class="glyphicon glyphicon-remove-circle"></span></button>'},
      	{name: 'edit', displayName: 'Edit', cellTemplate: '<button class="btn btn-info btn-sm" ng-click="grid.appScope.goEditRoute(row.entity)"><span class="glyphicon glyphicon-edit"></span></button>'}]    
  };

	$scope.saveDoctor = function() {
		Doctors.save($scope.dataObj, function(){
			$location.path("/doctors");
		});
	}
	$scope.goEditRoute = function(entity){
		GetFacility.get({id: entity.facilityId}, function(facilityData){
			GetDoctor.get({id: entity.id}, function(doctorData){
			var doctor = {};
			doctor.name = doctorData.name;
			doctor.npi = doctorData.npi;
			doctor.id = doctorData.id;
			doctor.facility = facilityData.taxId;
			currentEntityService.setCurrentEntity(doctor);
			$location.path('/editdoctor');
		});
	});
}
  $scope.removeDoctor = function(entity){
  		if (confirm("Are you sure you want to delete this doctor?") == true) {	
			Doctors.remove({id: entity.id}, function(){
			$route.reload();
				});
		}
		
	}
}).
controller('editDoctorController', function(currentEntityService, $scope, GetDoctor, $location){
	$scope.editVar = "Edit Doctor";
	$scope.doctorFields = currentEntityService.getDoctorFields();
	$scope.dataObj = {};
	$scope.dataObj = currentEntityService.getCurrentEntity();
	$scope.saveDoctor = function(){
		GetDoctor.save($scope.dataObj, function(){
					$location.path('/doctors');
				});
	}
}).
controller('insuranceController', function($scope, Insurances, $location, $route, currentEntityService, EditInsurance){
	$scope.dataObj = {};
	$scope.editVar = "New Insurance";
	$scope.insuranceFields = currentEntityService.getInsuranceFields();
	$scope.saveInsurance = function() {
		Insurances.save($scope.dataObj, function(){
			$location.path("/appeals");
		});	
	};
	$scope.insurances = Insurances.query();
	$scope.getTableHeight = function() {
       var rowHeight = 41; // your row height
       var headerHeight = 30; // your header height
       return {
          height: ($scope.insurances.length * 42 + headerHeight + 200) + "px"
       };
    };
	$scope.gridOptions = {
		data: 'insurances', rowHeight: 41,enableHorizontalScrollbar: 0,
    	columnDefs: [
    	{field: 'name', displayName: 'Insurance Name'}, {field: 'dept', displayName: 'Department'}, 
    	{field: 'address', displayName: 'Address', cellTemplate: 
    	"<div class='ngCellText'>{{row.entity.street}}</br>{{row.entity.town}}, {{row.entity.state}} {{row.entity.zip}}</div>"},
    	{field: 'phone', displayName: 'Telephone'},
      	{name: 'remove', displayName: 'Remove', cellTemplate: '<button class="btn btn-danger btn-sm" ng-click="grid.appScope.removeInsurance(row.entity)"><span class="glyphicon glyphicon-remove-circle"></span></button>'},
      	{name: 'edit', displayName: 'Edit', cellTemplate: '<button class="btn btn-info btn-sm" ng-click="grid.appScope.goEditRoute(row.entity)"><span class="glyphicon glyphicon-edit"></span></button>'}]    
  	};
  	$scope.removeInsurance = function(entity){
		EditInsurance.remove({id: entity.id});
		$route.reload();
	};
	$scope.goEditRoute = function(entity){
			currentEntityService.setCurrentEntity(entity);
			$location.path('/editinsurance');
	};
}).
controller('editInsController', function($scope, currentEntityService, EditInsurance){
		$scope.editVar = "Edit Insurance";
		$scope.insuranceFields = currentEntityService.getInsuranceFields();
		$scope.dataObj = {};
		$scope.dataObj = currentEntityService.getCurrentEntity();
}).
controller('collectionController', function($scope, $location, $http, $q, Patient, Doctors, Facility, $route, Collection, batchService){
	$scope.patients = Patient.query();
	$scope.doctors = Doctors.query();
	$scope.facilities = Facility.query();
	$scope.selectedValue = [];
	$scope.collectionFields = [
		{fieldName: 'Patient', data: $scope.patients, showValue: 'name', addLink: 'patient'},
		{fieldName: 'Facility', data: $scope.facilities, showValue: 'facilityName', addLink: 'facility'}
	];
		$scope.addEntity = function(addEntityLink) {
		//currentEntityService.setCurrentEntity({});
		$location.path("/"+addEntityLink);
	
	};
	$scope.genCollectionLetter = function() {
	$scope.collectionDto = {patientId: "", facilityId: "", dateCreated: "", payment: ""};
		$scope.collectionDto.patientId = $scope.selectedValue.Patient.id;
		$scope.collectionDto.facilityId = $scope.selectedValue.Facility.id;
		$scope.collectionDto.dateCreated = new Date();
		$scope.collectionDto.payment = $scope.selectedAmountDue;
		$scope.collectionDto.letterType = $scope.letterType;

		if($scope.selectedValue.Patient.ptStreet != null && $scope.selectedValue.Patient.ptStreet != ""){
		var deferred = $q.defer();
		$http({
			method: "POST",
			data: $scope.collectionDto,
			url: '/customdocs/service/collectionletter'
		}).success(function(data, status){
			deferred.resolve(data);
			deferred.promise.then(function(data){
			window.location.href = "/customdocs/service/gencollectionletter?collectionId=" + data;
			$location.path("/dashboard");
		
			});
		});
	} else {
		alert("Patient Address is Required!!");
	}
		
	//Collection.save($scope.collectionDto).$promise.then(function(data)
		//window.location.href = "http://192.168.12.184:8080/customdocs/service/gencollectionletter?collectionId=" + $scope.collectionDto.collectionId;
		//currentEntityService.setCurrentAppealLetter(null);
		
	//});
    };
}).
controller('appealsController', function($scope, $location, Patient, Doctors, Facility, Insurances, AppealsLetter, currentEntityService){
	$scope.patients = Patient.query();
	$scope.doctors = Doctors.query();
	$scope.facilities = Facility.query();
	$scope.insurances = Insurances.query();
	$scope.selectedValue = [];
	if(currentEntityService.getCurrentAppealLetter() != null){
	$scope.selectedParOne = currentEntityService.getCurrentAppealLetter().parOne;
	$scope.selectedParTwo = currentEntityService.getCurrentAppealLetter().parTwo;
	$scope.selectedClaimId = currentEntityService.getCurrentAppealLetter().claimId;
	}
	$scope.appealFields = [
		{fieldName: 'Patient', data: $scope.patients, showValue: 'name', addLink: 'patient'},
		{fieldName: 'Insurance', data: $scope.insurances, showValue: 'name', addLink: 'insurance'},
		{fieldName: 'Facility', data: $scope.facilities, showValue: 'facilityName', addLink: 'facility'},
		{fieldName: 'Doctor', data: $scope.doctors, showValue: 'name', addLink: 'doctor'},
	];
	$scope.addEntity = function(addEntityLink) {
		//currentEntityService.setCurrentEntity({});
		$location.path("/"+addEntityLink);
	
	};
	$scope.genAppealsLetter = function() {
	$scope.appealsDto = {patientId: "", doctorId: "", facilityId: "", insuranceId: "", dateOfService: "", claimId: "", dateCreated: "", parOne: "", parTwo: ""};
		$scope.appealsDto.patientId = $scope.selectedValue.Patient.id;
		$scope.appealsDto.doctorId = $scope.selectedValue.Doctor.id;
		$scope.appealsDto.facilityId = $scope.selectedValue.Facility.id;
		$scope.appealsDto.insuranceId = $scope.selectedValue.Insurance.id;
		$scope.appealsDto.dateOfService = $scope.selectedDateOfService;
		$scope.appealsDto.claimId = $scope.selectedClaimId;
		$scope.appealsDto.dateCreated = new Date();
		$scope.appealsDto.parOne = $scope.selectedParOne;
		$scope.appealsDto.parTwo = $scope.selectedParTwo;
		if(($scope.selectedValue.Patient.accountId != null) && ($scope.selectedValue.Patient.accountId != 0) && ($scope.selectedValue.Patient.insId != null) && 
			($scope.selectedValue.Patient.insId != "")){
	AppealsLetter.save($scope.appealsDto).$promise.then(function(){
		window.location.href = "/customdocs/service/appealsletter?claimId=" + $scope.appealsDto.claimId;
		currentEntityService.setCurrentAppealLetter(null);
		$location.path("/dashboard");
	});
    }
 else {
	alert("Patient Insurance Id and Account Id is required!!");
}
}
}).
controller('pcpController', function($scope, Patient, Doctors, Facility, $location, $http){
	$scope.patients = Patient.query();
	$scope.doctors = Doctors.query();
	$scope.facilities = Facility.query();
	$scope.selectedValue = [];
	$scope.addEntity = function(addEntityLink) {
		$location.path("/"+addEntityLink);
	
	};
	$scope.genPCPLetter = function(){
		$scope.pcpLetterDetails = {patientId: "", doctorId: "", facilityId: "", dosNotPaid: "", startDate: "", amountDue: "", dateCreated: ""};
		$scope.pcpLetterDetails.patientId = $scope.selectedValue.Patient.id;
		$scope.pcpLetterDetails.doctorId = $scope.selectedValue.Doctor.id;
		$scope.pcpLetterDetails.facilityId = $scope.selectedValue.Facility.id;
		$scope.pcpLetterDetails.dosNotPaid = $scope.selectedDatesOfServices;
		$scope.pcpLetterDetails.startDate = $scope.selectedStartDate;
		$scope.pcpLetterDetails.amountDue = $scope.selectedAmountDue;
		$scope.pcpLetterDetails.dateCreated = new Date();
		
		$http({
			method: 'POST', 
			url: '/customdocs/service/genpcpletter',
			data: $scope.pcpLetterDetails}).success(function(data){
				var file = new Blob([data], {type: "application/octet-stream"});
				saveAs(file, "pcpletter.html");
				$location.path("/dashboard");
			});
	}
	$scope.pcpFields = [
		{fieldName: 'Patient', data: $scope.patients, showValue: 'name', addLink: 'patient'},
		{fieldName: 'Facility', data: $scope.facilities, showValue: 'facilityName', addLink: 'facility'},
		{fieldName: 'Doctor', data: $scope.doctors, showValue: 'name', addLink: 'doctor'}
	];
}).
controller('dashboardController', function($scope, $filter, $location, $http, $route, GetPCPLetters, OpenAppealsLetters, Collection, batchService, AppealsLetter, EditAppealLetter, currentEntityService){
	$scope.appealDetails = OpenAppealsLetters.query();
	$scope.collectionDetails = Collection.query();
	$scope.pcpLetters = GetPCPLetters.query();
	$scope.dash = false;
	$scope.pcp = false;
	$scope.secondDash = true;
	$scope.recordFlag  = [];
	$(function(){
	var handler;
	var isActive = $(".nav-tabs li")
	handler = isActive.click(function(){
		isActive.removeClass("btn-primary");
		isActive.addClass("btn-default");
		$(this).toggleClass("btn-primary");
		})
	})
	$scope.reverse = false;
	$scope.orderValue = 'patientName';
	$scope.setOrder = function(orderValue){
		if(orderValue === 'payment' || (typeof orderValue === 'function')){
			$scope.reverse = !$scope.reverse;
			$scope.orderValue = function(details){
				return Number(details.payment);
			}
		} else {
		$scope.reverse = ($scope.orderValue === orderValue) ? !$scope.reverse : false;
		$scope.orderValue = orderValue;
	}}
	$scope.setPageSize = function(size){
		$scope.pageSize = size;
	}
	$scope.pageSize = 10;
	$scope.currentStart = 0;
	$scope.numPages;
	$scope.$watch('collectionFilter', function(){
		$scope.currentStart = 0;
	})
	$scope.nextPage =  function(){
		var length = $scope.collectionDetails.length;
		if ($scope.currentStart+$scope.pageSize < length){
			$scope.currentStart +=$scope.pageSize;
		}
	}
	$scope.prevPage = function(){

		if ($scope.currentStart-$scope.pageSize < 0){
			$scope.currentStart = 0;
		} else {
			$scope.currentStart -= $scope.pageSize;
		}
	}
	$scope.addToBatch = function(object, index) {
			index+=2;
			
		$("#coltable tr:eq("+index+") #batchid").toggleClass("btn-primary");
		if (batchService.objectExists(object) == true){
			batchService.removeObject(object);
			console.log(batchService.getBatchArray());
		} else {
			
			batchService.addObject(object);
			console.log(batchService.getBatchArray());
		}
	
	}
	$scope.genCollectionBatch = function(){
		console.log(batchService.getBatchArray);
		if (batchService.getBatchArray().length > 0){
		$http({
			method: 'POST',
			url: '/customdocs/service/collectionbatch',
			headers: {accept: 'application/zip'},
			responseType: 'arraybuffer',
			data: batchService.getBatchArray(),
			  }).success(function(data){
            batchService.cleanBatchArray();
			var file = new Blob([data], {type: "application/zip"});
			saveAs(file, "temp.zip");
			$scope.collectionDetails = Collection.query();
			
						})
	    }else {alert("None selected!");}
	}
	$scope.showAppeals = function(){
		$scope.dash = true;
		$scope.secondDash = false;
		$scope.pcp = false;
	}
	$scope.showCollections = function(){
		$scope.dash = false;
		$scope.secondDash = true;
		$scope.pcp = false;
	}
	$scope.showPCPLetters = function(){
		$scope.dash = false;
		$scope.secondDash = false;
		$scope.pcp = true;
	}
	$scope.edit = function(claimId){
		EditAppealLetter.get({claimId: claimId}, function(data){
			currentEntityService.setCurrentAppealLetter(data);
			$location.path('/appeals')
		});
	}
	$scope.editCollection = function(collectionId){
		$http({
			method: 'POST',
			url: '/customdocs/service/collectionletter',
			data: collectionId
		}).success(function(data){
			$scope.recordFlag[data] = true;		
		})
		}
	$scope.removePCPLetter = function(pcpId){
		GetPCPLetters.remove({pcpId: pcpId}, function(){
			$scope.pcpLetters = GetPCPLetters.query();
		});
		
	}
	$scope.remove = function(claimId){
		AppealsLetter.remove({claimId: claimId}, function(){	
			$scope.appealDetails = OpenAppealsLetters.query();
		});
	}
	$scope.removeCollection = function(id){
		Collection.remove({collectionId: id}, function(){
		$scope.collectionDetails = Collection.query();
		});
	}
});