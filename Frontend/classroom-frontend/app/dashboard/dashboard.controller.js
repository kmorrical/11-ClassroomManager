(function() {
	'use strict';

	angular
	.module('app')
	.controller('DashboardController', DashboardController)

	DashboardController.$inject = [];

	function DashboardController() {
		var vm=this;
		vm.title='DashboardController';
		activate();
		////

		function activate(){
			
		}
	}
});