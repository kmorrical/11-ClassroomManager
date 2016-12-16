(function(){
	'use strict';

	angular
	.module('app')
	.controller('ClassGridController', ClassGridController);

	ClassGridController.$inject =['classFactory'];
	function ClassGridController(classFactory) {
		var vm = this;
		vm.title= 'ClassGridController';
		vm.deleteClass=deleteClass;
		vm.classes= [];
		
		activate();

		///////
		function activate() {

		classFactory
          .getClasses()
          .then(function(response){
            vm.classes=response.data;
          });
		}


		       function deleteClass(classObj) {
            	classFactory
                .removeClass(classObj.classId) //make SURE this ID is LOWER CASE 
                .then(function(response) {
                var index =vm.classes.indexOf(classObj);
                vm.classes.splice(index,1);
                })
        }
		}
	
})();