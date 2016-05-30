var myApp = angular.module('myApp', ['ngRoute','routeModule', 'ngResource', 'ui.grid', 'ui.grid.autoResize','myControllers']);
myApp.service('currentEntityService', function(){
	var currentEntity = {};
	var currentAppealLetter = {};
	var pfields = [
	{fieldName: 'Name', 			placeholder: 'First Last', 		 	type: 'text', 	fieldId: 'name', 		pattern: '^[a-zA-Z ]+$', required: "true"},
	{fieldName: 'Account Id', 		placeholder: 'Enter Account Id', 	type: 'number', fieldId: 'accountId', 	pattern: '^[0-9]+$', required: "false"},
	{fieldName: 'Insurance Id',  	placeholder: 'Enter Insurance Id', 	type: 'text', 	fieldId: 'insId', 		pattern: '^[0-9A-Za-z-]+$', required: "false"},
	{fieldName: 'Date of Birth', 	placeholder: 'MM/DD/YYYY', 			type: 'date', 	fieldId: 'dateOfBirth', pattern: '', required: "true"},
	{fieldName: 'Street', 		  placeholder: 'Enter Street Name', 		type: 'text', 	fieldId: 'ptStreet',pattern: '^[a-zA-Z0-9 ]+$', required: "false"},
	{fieldName: 'Town', 		  placeholder: 'Enter Town Name', 		type: 'text', 	fieldId: 'ptTown',  pattern: '^[a-zA-Z ]+$', required: "false"},
	{fieldName: 'State', 		  placeholder: 'Enter State Abbreviation',type: 'text', 	fieldId: 'ptState', pattern: '^[A-Z]{2}', required: "false"},
	{fieldName: 'ZipCode', 		  placeholder: 'Enter ZipCode', 			type: 'text', 	fieldId: 'ptZip',   pattern: '^[0-9]+$', required: "false"}];

	var doctorFields = [
	{fieldName: 'Name', 		   placeholder: 'First Last', 		 						type: 'text', 		fieldId: 'name',  pattern: '^[a-zA-Z ]+$', required: "true"},
	{fieldName: 'NPI', 			   placeholder: 'Enter NPI Number', 						type: 'number', 	fieldId: 'npi',   pattern: '^[0-9]+$', required: "true"},
	{fieldName: 'Facility Tax ID', placeholder: 'Enter Affiliated Facility Tax ID Number', 	type: 'text', 		fieldId: 'facility', pattern: '^[0-9-]+$', required: "true"}];

	var insuranceFields = [
	{fieldName: 'Name', 		 	   placeholder: 'First Last', 					type: 'text', 	fieldId: 'name', pattern: '^[a-zA-Z ]+$', required: "true"},
	{fieldName: 'Department', 		   placeholder: 'Enter Department Name', 		type: 'text', 	fieldId: 'dept', pattern: '^[a-zA-Z0-9 ]+$', required: "true"},
	{fieldName: 'Street', 		   	   placeholder: 'Enter Street Name', 			type: 'text', 	fieldId: 'street', pattern: '^[a-zA-Z0-9 ]+$', required: "true"},
	{fieldName: 'Town', 		   	   placeholder: 'Enter Town Name', 				type: 'text', 	fieldId: 'town', pattern: '^[a-zA-Z ]+$', required: "true"},
	{fieldName: 'State', 		   	   placeholder: 'Enter State Abbreviation', 	type: 'text', 	fieldId: 'state', pattern: '^[A-Z]{2}', required: "true"},
	{fieldName: 'ZipCode', 			   placeholder: 'Enter ZipCode', 				type: 'text', 	fieldId: 'zip', pattern: '^[0-9]+$', required: "true"},
	{fieldName: 'Phone', 		   	   placeholder: '#-###-###-####', 				type: 'text', 	fieldId: 'phone', pattern: '^[0-9-]+$', required: "true"}];

	var facilityFields = [
	{fieldName: 'Facility Name',placeholder: 'Enter Facility Name', 		type: 'text', 	fieldId: 'facilityName', pattern: '^[a-zA-Z& ]+$', required: "true"},
	{fieldName: 'Street', 		placeholder: 'Enter Street Name', 			type: 'text', 	fieldId: 'street', 		 pattern: '^[a-zA-Z0-9 ]+$', required: "true"},
	{fieldName: 'Town',  		placeholder: 'Enter Town Name', 			type: 'text', 	fieldId: 'town', 		 pattern: '^[a-zA-Z ]+$', required: "true"},
	{fieldName: 'State', 		placeholder: 'Enter State Abbreviation', 	type: 'text', 	fieldId: 'state', 		 pattern: '^[A-Z]+$', required: "true"},
	{fieldName: 'ZipCode', 		placeholder: 'Enter ZipCode', 				type: 'text',   fieldId: 'zip', 		 pattern: '^[0-9]+$', required: "true"},
	{fieldName: 'Phone',	 	placeholder: '#-###-###-####', 				type: 'text', 	fieldId: 'phone', 		 pattern: '^[0-9-]+$', required: "true"},
	{fieldName: 'Fax',	 		placeholder: '#-###-###-####', 				type: 'text', 	fieldId: 'fax', 		 pattern: '^[0-9-]+$', required: "true"},
	{fieldName: 'Billing Phone',placeholder: '#-###-###-####', 				type: 'text', 	fieldId: 'billingPhone', 		 pattern: '^[0-9-]+$', required: "true"},
	{fieldName: 'NPI', 			placeholder: 'Enter NPI Number', 			type: 'number', fieldId: 'npi', 		 pattern: '^[0-9]+$', required: "true"},
	{fieldName: 'Tax ID', 		placeholder: 'Enter Tax ID Number', 		type: 'text',   fieldId: 'taxId', 		 pattern: '^[0-9-]+$', required: "true"}];

	this.setCurrentEntity = function(obj){
		currentEntity = obj;
		return true;
	};
	this.getCurrentEntity = function(){
		return currentEntity;
	};
	this.setCurrentAppealLetter = function(obj){
		currentAppealLetter = obj;
		return true;
	};
	this.getCurrentAppealLetter = function(){
		return currentAppealLetter;
	};
	this.formatDate = function(obj){
		"'"+obj+"'";
	};
	this.getPfields = function(){
		return pfields;
	}
	this.getDoctorFields = function(){
		return doctorFields;
	}
	this.getInsuranceFields = function(){
		return insuranceFields;
	}
	this.getFacilityFields = function(){
		return facilityFields;
	}
}).
service('batchService', function(){
	var batchArray = [];
	this.objectExists = function(object) {
		var i = 0;
		do {
		if((batchArray[i] != null) && (batchArray[i].collectionId == object.collectionId)){
			return true;
		} 
		i++;
	} 
	while (i < batchArray.length);
	}
	this.addObject = function(object){
		if (!this.objectExists(object)) {
			batchArray.push(object);
		}
	}
	this.removeObject = function(object){
		var position = batchArray.map(function(x){return x.collectionId}).indexOf(object.collectionId);
	
		if (position != -1){
		var removed = batchArray.splice(position, 1);
	
	}}
	this.getBatchArray = function(){
		return batchArray;
	}
    this.cleanBatchArray = function(){
        batchArray = [];
    }
});



